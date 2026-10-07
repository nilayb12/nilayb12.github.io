import { Card, buttonVariants } from '@heroui/react';
import { AiOutlineFork, AiOutlineGithub, AiOutlineStar } from 'react-icons/ai';
import { RiArrowRightUpLine, RiGlobalLine } from 'react-icons/ri';
import { GithubProject } from '../../interfaces/github-project';
import { ga, getLanguageColor, skeleton } from '../../utils';
import SectionHeader from '../section-header';

/**
 * The repo's deployed website, if it has one: its "Website" field on GitHub,
 * otherwise its GitHub Pages address when Pages is enabled.
 */
const getLiveUrl = (project: GithubProject): string | undefined => {
  const homepage = project.homepage?.trim();
  if (homepage && !homepage.includes('github.com/')) {
    return /^https?:\/\//.test(homepage) ? homepage : `https://${homepage}`;
  }
  if (project.has_pages) {
    const owner = (
      project.full_name ?? new URL(project.html_url).pathname.slice(1)
    ).split('/')[0];
    const ownerSite = `${owner}.github.io`.toLowerCase();
    return project.name.toLowerCase() === ownerSite
      ? `https://${ownerSite}/`
      : `https://${ownerSite}/${project.name}/`;
  }
  return undefined;
};

const ProjectSkeleton = () => (
  <Card variant="secondary" className="p-6">
    {skeleton({ widthCls: 'w-32', heightCls: 'h-6', className: 'mb-3' })}
    {skeleton({ widthCls: 'w-full', heightCls: 'h-4', className: 'mb-2' })}
    {skeleton({ widthCls: 'w-3/4', heightCls: 'h-4', className: 'mb-6' })}
    {skeleton({ widthCls: 'w-28', heightCls: 'h-4' })}
  </Card>
);

const ProjectCard = ({
  item,
  googleAnalyticsId,
}: {
  item: GithubProject;
  googleAnalyticsId?: string;
}) => {
  const liveUrl = getLiveUrl(item);
  const track = (action: string) => {
    if (googleAnalyticsId) ga.event(action, { project: item.name });
  };

  return (
    <Card
      variant="secondary"
      className="group relative h-full p-6 transition-colors hover:bg-surface-tertiary has-[.repo-link:focus-visible]:outline-2 has-[.repo-link:focus-visible]:outline-offset-2 has-[.repo-link:focus-visible]:outline-focus"
    >
      <Card.Header>
        <Card.Title className="flex items-center gap-1 text-base">
          {/* Stretched link: its ::after covers the card, so the whole card opens the repo */}
          <a
            href={item.html_url}
            target="_blank"
            rel="noreferrer"
            className="repo-link truncate outline-none after:absolute after:inset-0 after:rounded-[inherit] after:content-['']"
            onClick={() => track('Click project')}
          >
            {item.name}
          </a>
          <RiArrowRightUpLine
            aria-hidden
            className="shrink-0 text-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
          />
        </Card.Title>
        {item.description && (
          <Card.Description className="line-clamp-3">
            {item.description}
          </Card.Description>
        )}
      </Card.Header>

      <Card.Footer className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-4 text-sm text-muted">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1" title="Stars">
            <AiOutlineStar aria-hidden /> {item.stargazers_count}
          </span>
          <span className="flex items-center gap-1" title="Forks">
            <AiOutlineFork aria-hidden /> {item.forks_count}
          </span>
          {item.language && (
            <span className="flex items-center gap-1.5">
              <span
                aria-hidden
                className="size-2.5 rounded-full"
                style={{ backgroundColor: getLanguageColor(item.language) }}
              />
              {item.language}
            </span>
          )}
        </div>

        {liveUrl && (
          // Sits above the stretched link so it gets its own clicks
          <a
            href={liveUrl}
            target="_blank"
            rel="noreferrer"
            aria-label={`Open the live site for ${item.name}`}
            className={`${buttonVariants({ variant: 'secondary', size: 'sm' })} relative z-10 ml-auto`}
            onClick={() => track('Click live site')}
          >
            <RiGlobalLine aria-hidden />
            Live site
          </a>
        )}
      </Card.Footer>
    </Card>
  );
};

const GithubProjectCard = ({
  header,
  githubProjects,
  loading,
  limit,
  googleAnalyticsId,
}: {
  header: string;
  githubProjects: GithubProject[];
  loading: boolean;
  limit: number;
  googleAnalyticsId?: string;
}) => {
  if (!loading && githubProjects.length === 0) return null;

  return (
    <Card className="p-6 lg:p-8">
      <SectionHeader
        icon={<AiOutlineGithub />}
        title={header}
        subtitle={`${githubProjects.length} featured ${githubProjects.length === 1 ? 'repository' : 'repositories'}`}
        loading={loading}
      />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {loading
          ? Array.from({ length: limit }, (_, i) => <ProjectSkeleton key={i} />)
          : githubProjects.map((item) => (
              <ProjectCard
                key={item.html_url}
                item={item}
                googleAnalyticsId={googleAnalyticsId}
              />
            ))}
      </div>
    </Card>
  );
};

export default GithubProjectCard;
