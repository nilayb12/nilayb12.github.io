import GitProfile from '../src/components/gitprofile';
import CONFIG from '../gitprofile.config';
import { getSanitizedConfig } from '../src/utils';
import { getGithubData } from '../src/lib/github-data';
import { resolveSkillIcons } from '../src/lib/skill-icons.server';
import { SanitizedConfig } from '../src/interfaces/sanitized-config';

export default async function Home() {
  const sanitized = getSanitizedConfig(CONFIG);
  const initialData =
    Object.keys(sanitized).length > 0
      ? await getGithubData(sanitized as SanitizedConfig)
      : null;

  // Matched once at build time; only the logos you use end up in the page.
  const skillIcons = resolveSkillIcons(CONFIG.skills);

  return (
    <GitProfile
      config={CONFIG}
      initialData={initialData}
      skillIcons={skillIcons}
    />
  );
}
