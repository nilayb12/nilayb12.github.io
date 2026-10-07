import { Card, Chip } from '@heroui/react';
import { TbStack2 } from 'react-icons/tb';
import type { ResolvedSkillIcon } from '../../interfaces/skill-icon';
import SkillIcon, { SkillIconStyle } from '../skill-icon';
import { skeleton } from '../../utils';
import CardHeading from '../card-heading';

const SkillCard = ({
  loading,
  skills,
  icons,
  iconStyle,
}: {
  loading: boolean;
  skills: string[];
  /** Icons resolved at build time, keyed by skill name. */
  icons: Record<string, ResolvedSkillIcon>;
  iconStyle: SkillIconStyle;
}) => (
  <Card>
    <CardHeading icon={<TbStack2 />} loading={loading}>
      Tech stack
    </CardHeading>
    <Card.Content>
      <div className="flex flex-wrap gap-2">
        {loading
          ? Array.from({ length: 12 }, (_, i) => (
              <div key={i}>
                {skeleton({ widthCls: 'w-16', heightCls: 'h-6' })}
              </div>
            ))
          : skills.map((skill) => (
              <Chip
                key={skill}
                // Brand-coloured logos sit on neutral chips so they don't clash with the accent
                color={iconStyle === 'brand' ? 'default' : 'accent'}
                variant="soft"
                size="sm"
                className="gap-1.5"
              >
                <SkillIcon icon={icons[skill]} style={iconStyle} />
                {skill}
              </Chip>
            ))}
      </div>
    </Card.Content>
  </Card>
);

export default SkillCard;
