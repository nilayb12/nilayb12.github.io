export interface GithubProject {
  name: string;
  full_name?: string;
  html_url: string;
  description: string;
  stargazers_count: string;
  forks_count: string;
  language: string;
  /** The repo's 'Website' field on GitHub, if set. */
  homepage?: string | null;
  /** Whether GitHub Pages is enabled for the repo. */
  has_pages?: boolean;
}
