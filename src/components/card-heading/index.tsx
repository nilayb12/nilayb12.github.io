import { Card } from '@heroui/react';
import { skeleton } from '../../utils';

/** Title row for the left-column cards: a small accent icon and the heading. */
const CardHeading = ({
  icon,
  loading,
  children,
}: {
  icon: React.ReactNode;
  loading: boolean;
  children: React.ReactNode;
}) => (
  <Card.Header>
    <Card.Title className="flex items-center gap-2">
      {loading ? (
        skeleton({ widthCls: 'w-32', heightCls: 'h-6' })
      ) : (
        <>
          <span aria-hidden className="text-lg text-accent">
            {icon}
          </span>
          {children}
        </>
      )}
    </Card.Title>
  </Card.Header>
);

export default CardHeading;
