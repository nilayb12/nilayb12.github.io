import { Card } from '@heroui/react';
import { AiOutlineFork, AiOutlineGithub, AiOutlineStar } from 'react-icons/ai';
import { RiArrowRightUpLine } from 'react-icons/ri';
import { GithubProject } from '../../interfaces/github-project';
import { ga, getLanguageColor, skeleton } from '../../utils';
import SectionHeader from '../section-header';

const ProjectSkeleton = () => (
  <Card variant="secondary" className="p-6">
    {skeleton({ widthCls: 'w-32', heightCls: 'h-6', className: 'mb-3' })}
    {skeleton({ widthCls: 'w-full', heightCls: 'h-4', className: 'mb-2' })}
    {skeleton({ widthCls: 'w-3/4', heightCls: 'h-4', className: 'mb-6' })}
    {skeleton({ widthCls: 'w-28', heightCls: 'h-4' })}
  </Card>
);

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
              <a
                key={item.html_url}
                href={item.html_url}
                target="_blank"
                rel="noreferrer"
                className="group block rounded-3xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
                onClick={() => {
                  if (googleAnalyticsId)
                    ga.event('Click project', { project: item.name });
                }}
              >
                <Card
                  variant="secondary"
                  className="h-full p-6 transition-colors group-hover:bg-surface-tertiary"
                >
                  <Card.Header>
                    <Card.Title className="flex items-center gap-1 text-base">
                      <span className="truncate">{item.name}</span>
                      <RiArrowRightUpLine className="shrink-0 text-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
                    </Card.Title>
                    {item.description && (
                      <Card.Description className="line-clamp-3">
                        {item.description}
                      </Card.Description>
                    )}
                  </Card.Header>
                  <Card.Footer className="mt-auto flex items-center justify-between pt-4 text-sm text-muted">
                    <div className="flex gap-4">
                      <span className="flex items-center gap-1">
                        <AiOutlineStar /> {item.stargazers_count}
                      </span>
                      <span className="flex items-center gap-1">
                        <AiOutlineFork /> {item.forks_count}
                      </span>
                    </div>
                    {item.language && (
                      <span className="flex items-center gap-1.5">
                        <span
                          className="size-2.5 rounded-full"
                          style={{
                            backgroundColor: getLanguageColor(item.language),
                          }}
                        />
                        {item.language}
                      </span>
                    )}
                  </Card.Footer>
                </Card>
              </a>
            ))}
      </div>
    </Card>
  );
};

export default GithubProjectCard;
