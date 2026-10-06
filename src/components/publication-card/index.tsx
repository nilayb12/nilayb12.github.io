import { Card } from '@heroui/react';
import { AiOutlineBook } from 'react-icons/ai';
import { SanitizedPublication } from '../../interfaces/sanitized-config';
import { skeleton } from '../../utils';
import SectionHeader from '../section-header';

const PublicationCard = ({
  publications,
  loading,
}: {
  publications: SanitizedPublication[];
  loading: boolean;
}) => (
  <Card className="p-6 lg:p-8">
    <SectionHeader
      icon={<AiOutlineBook />}
      title="Publications"
      subtitle={`${publications.length} ${publications.length === 1 ? 'publication' : 'publications'}`}
      loading={loading}
    />
    <div className="grid grid-cols-1 gap-4">
      {publications.map((item, index) =>
        loading ? (
          <Card key={index} variant="secondary" className="p-6">
            {skeleton({
              widthCls: 'w-2/3',
              heightCls: 'h-6',
              className: 'mb-3',
            })}
            {skeleton({ widthCls: 'w-1/3', heightCls: 'h-4' })}
          </Card>
        ) : (
          <a
            key={index}
            href={item.link}
            target="_blank"
            rel="noreferrer"
            className="group block rounded-3xl"
          >
            <Card
              variant="secondary"
              className="p-6 transition-colors group-hover:bg-surface-tertiary"
            >
              <Card.Header>
                <Card.Title className="text-base">{item.title}</Card.Title>
                <Card.Description>
                  {[item.conferenceName, item.journalName]
                    .filter(Boolean)
                    .join(' · ')}
                  {item.authors && (
                    <span className="block">{item.authors}</span>
                  )}
                </Card.Description>
              </Card.Header>
              {item.description && (
                <Card.Content className="pt-2 text-sm">
                  {item.description}
                </Card.Content>
              )}
            </Card>
          </a>
        ),
      )}
    </div>
  </Card>
);

export default PublicationCard;
