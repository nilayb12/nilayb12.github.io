import GitProfile from '../src/components/gitprofile';
import CONFIG from '../gitprofile.config';
import { getSanitizedConfig } from '../src/utils';
import { getGithubData } from '../src/lib/github-data';
import { resolveSkillIcons } from '../src/lib/skill-icons.server';
import { findResume } from '../src/lib/resume.server';
import { SanitizedConfig } from '../src/interfaces/sanitized-config';

export default async function Home() {
  const sanitized = getSanitizedConfig(CONFIG);
  const initialData =
    Object.keys(sanitized).length > 0
      ? await getGithubData(sanitized as SanitizedConfig)
      : null;

  // Matched once at build time; only the logos you use end up in the page.
  const skillIcons = resolveSkillIcons(CONFIG.skills);

  // Shows the Résumé card only if a résumé PDF exists (or is configured).
  const resume = findResume(
    CONFIG.resume.fileUrl,
    initialData?.profile.name?.trim() || CONFIG.seo.title,
  );

  return (
    <GitProfile
      config={CONFIG}
      initialData={initialData}
      skillIcons={skillIcons}
      resume={resume}
    />
  );
}
