import { Card, Chip } from '@heroui/react';
import { skeleton } from '../../utils';

const SkillCard = ({
  loading,
  skills,
}: {
  loading: boolean;
  skills: string[];
}) => (
  <Card>
    <Card.Header>
      <Card.Title>
        {loading
          ? skeleton({ widthCls: 'w-32', heightCls: 'h-6' })
          : 'Tech stack'}
      </Card.Title>
    </Card.Header>
    <Card.Content>
      <div className="flex flex-wrap gap-2">
        {loading
          ? Array.from({ length: 12 }, (_, i) => (
              <div key={i}>
                {skeleton({ widthCls: 'w-16', heightCls: 'h-6' })}
              </div>
            ))
          : skills.map((skill) => (
              <Chip key={skill} color="accent" variant="soft" size="sm">
                {skill}
              </Chip>
            ))}
      </div>
    </Card.Content>
  </Card>
);

export default SkillCard;
