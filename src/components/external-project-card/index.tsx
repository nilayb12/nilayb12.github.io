import { Card } from '@heroui/react';
import { MdOpenInNew } from 'react-icons/md';
import { SanitizedExternalProject } from '../../interfaces/sanitized-config';
import { ga, skeleton } from '../../utils';
import LazyImage from '../lazy-image';
import SectionHeader from '../section-header';

const ExternalProjectCard = ({
  externalProjects,
  header,
  loading,
  googleAnalyticId,
}: {
  externalProjects: SanitizedExternalProject[];
  header: string;
  loading: boolean;
  googleAnalyticId?: string;
}) => (
  <Card className="p-6 lg:p-8">
    <SectionHeader
      icon={<MdOpenInNew />}
      title={header}
      subtitle={`${externalProjects.length} ${externalProjects.length === 1 ? 'project' : 'projects'}`}
      loading={loading}
    />
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      {externalProjects.map((item, index) =>
        loading ? (
          <Card key={index} variant="secondary" className="p-6">
            {skeleton({
              widthCls: 'w-32',
              heightCls: 'h-6',
              className: 'mb-3',
            })}
            {skeleton({ widthCls: 'w-full', heightCls: 'h-4' })}
          </Card>
        ) : (
          <a
            key={index}
            href={item.link}
            target="_blank"
            rel="noreferrer"
            className="group block rounded-3xl"
            onClick={() => {
              if (googleAnalyticId)
                ga.event('Click External Project', { post: item.title });
            }}
          >
            <Card
              variant="secondary"
              className="h-full gap-4 p-6 transition-colors group-hover:bg-surface-tertiary"
            >
              {item.imageUrl && (
                <div className="aspect-video overflow-hidden rounded-2xl bg-surface-tertiary">
                  <LazyImage
                    src={item.imageUrl}
                    alt=""
                    className="size-full object-cover"
                    placeholder={skeleton({
                      widthCls: 'w-full',
                      heightCls: 'h-full',
                      shape: '',
                    })}
                  />
                </div>
              )}
              <Card.Header>
                <Card.Title className="text-base">{item.title}</Card.Title>
                {item.description && (
                  <Card.Description>{item.description}</Card.Description>
                )}
              </Card.Header>
            </Card>
          </a>
        ),
      )}
    </div>
  </Card>
);

export default ExternalProjectCard;
