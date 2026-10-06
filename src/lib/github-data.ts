import 'server-only';
import { SanitizedConfig } from '../interfaces/sanitized-config';
import { Profile } from '../interfaces/profile';
import { GithubProject } from '../interfaces/github-project';

export interface GithubData {
  profile: Profile;
  githubProjects: GithubProject[];
  /** Stars across all your own (non-fork) public repositories. */
  totalStars: number;
  followers: number;
}

/**
 * Fetches the GitHub profile and repositories once, at build time.
 *
 * In GitHub Actions the workflow passes GITHUB_TOKEN, which lifts the API
 * limit from 60 to 1,000+ requests/hour. Locally it works without a token.
 * Returns null on any failure so the build never breaks; the page then
 * falls back to fetching in the visitor's browser, as GitProfile always did.
 */
// GitHub Actions sets GITHUB_API_URL; defaults to the public API elsewhere.
const API = process.env.GITHUB_API_URL || 'https://api.github.com';

export async function getGithubData(
  config: SanitizedConfig,
): Promise<GithubData | null> {
  const headers: Record<string, string> = {
    Accept: 'application/vnd.github+json',
  };
  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }
  const get = async (url: string) => {
    const res = await fetch(url, { headers, cache: 'force-cache' });
    if (!res.ok) throw new Error(`${res.status} ${res.statusText} for ${url}`);
    return res.json();
  };

  try {
    const user = await get(`${API}/users/${config.github.username}`);
    const profile: Profile = {
      avatar: user.avatar_url,
      name: user.name || ' ',
      bio: user.bio || '',
      location: user.location || '',
      company: user.company || '',
    };

    let githubProjects: GithubProject[] = [];
    const gh = config.projects.github;

    if (gh.display) {
      let query = '';
      let extra = '';
      if (gh.mode === 'automatic' && user.public_repos > 0) {
        const exclude = gh.automatic.exclude.projects
          .map((p) => `+-repo:${p}`)
          .join('');
        query = `user:${config.github.username}+fork:${!gh.automatic.exclude.forks}${exclude}`;
        extra = `&sort=${gh.automatic.sortBy}&per_page=${gh.automatic.limit}`;
      } else if (gh.mode !== 'automatic' && gh.manual.projects.length > 0) {
        query =
          gh.manual.projects.map((p) => `+repo:${p}`).join('') + '+fork:true';
      }
      if (query) {
        const data = await get(
          `${API}/search/repositories?q=${query}${extra}&type=Repositories`,
        );
        // Keep only the fields the cards use, so the page stays small
        githubProjects = (data.items as GithubProject[]).map((r) => ({
          name: r.name,
          full_name: r.full_name,
          html_url: r.html_url,
          description: r.description,
          stargazers_count: r.stargazers_count,
          forks_count: r.forks_count,
          language: r.language,
        }));
        // Keep the order you listed in manual mode
        if (gh.mode !== 'automatic') {
          const order = gh.manual.projects.map((p) => p.toLowerCase());
          githubProjects.sort(
            (a, b) =>
              order.indexOf((a.full_name ?? '').toLowerCase()) -
              order.indexOf((b.full_name ?? '').toLowerCase()),
          );
        }
      }
    }

    // Sum stars across your own public repos (up to 300) for the header pill.
    let totalStars = 0;
    for (let page = 1; page <= 3; page++) {
      const repos: { fork: boolean; stargazers_count: number }[] = await get(
        `${API}/users/${config.github.username}/repos?per_page=100&type=owner&page=${page}`,
      );
      totalStars += repos
        .filter((r) => !r.fork)
        .reduce((sum, r) => sum + (Number(r.stargazers_count) || 0), 0);
      if (repos.length < 100) break;
    }

    return {
      profile,
      githubProjects,
      totalStars,
      followers: Number(user.followers) || 0,
    };
  } catch (error) {
    console.warn(
      '[gitprofile] Build-time GitHub fetch failed; the page will fetch in the browser instead.\n',
      error,
    );
    return null;
  }
}
