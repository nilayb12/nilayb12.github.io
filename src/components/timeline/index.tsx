import { Card } from '@heroui/react';
import { skeleton } from '../../utils';

export interface TimelineEntry {
  time: React.ReactNode;
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  link?: string;
}

/**
 * A card with a vertical timeline. Used for experience, education and
 * certifications, which all share the same "when / what / where" shape.
 */
const TimelineCard = ({
  heading,
  entries,
  loading,
}: {
  heading: string;
  entries: TimelineEntry[];
  loading: boolean;
}) => (
  <Card>
    <Card.Header>
      <Card.Title>
        {loading ? skeleton({ widthCls: 'w-32', heightCls: 'h-6' }) : heading}
      </Card.Title>
    </Card.Header>
    <Card.Content>
      <ol className="relative ms-1.5 border-s border-separator">
        {(loading ? Array.from({ length: 2 }, () => null) : entries).map(
          (e, i) => (
            <li key={i} className="mb-5 ps-5 last:mb-0">
              <span
                className={`absolute -start-[5px] mt-1.5 size-2.5 rounded-full ring-4 ring-surface ${
                  i === 0 && !loading ? 'bg-accent' : 'bg-default'
                }`}
              />
              {e === null ? (
                <div className="space-y-2">
                  {skeleton({ widthCls: 'w-5/12', heightCls: 'h-3' })}
                  {skeleton({ widthCls: 'w-7/12', heightCls: 'h-4' })}
                  {skeleton({ widthCls: 'w-6/12', heightCls: 'h-3' })}
                </div>
              ) : (
                <>
                  <div className="font-mono text-xs text-muted">{e.time}</div>
                  {e.title && (
                    <h3 className="mt-0.5 font-medium text-foreground">
                      {e.title}
                    </h3>
                  )}
                  {e.subtitle && (
                    <div className="text-sm text-muted">
                      {e.link ? (
                        <a
                          href={e.link}
                          target="_blank"
                          rel="noreferrer"
                          className="hover:text-accent hover:underline"
                        >
                          {e.subtitle}
                        </a>
                      ) : (
                        e.subtitle
                      )}
                    </div>
                  )}
                </>
              )}
            </li>
          ),
        )}
      </ol>
    </Card.Content>
  </Card>
);

export default TimelineCard;
