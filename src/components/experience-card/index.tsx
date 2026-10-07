import { TbBriefcase } from 'react-icons/tb';
import { SanitizedExperience } from '../../interfaces/sanitized-config';
import TimelineCard from '../timeline';

const ExperienceCard = ({
  experiences,
  loading,
}: {
  experiences: SanitizedExperience[];
  loading: boolean;
}) => (
  <TimelineCard
    heading="Experience"
    icon={<TbBriefcase />}
    loading={loading}
    entries={experiences.map((e) => ({
      time: `${e.from} – ${e.to}`,
      title: e.position,
      subtitle: e.company,
      link: e.companyLink || undefined,
      description: e.description,
    }))}
  />
);

export default ExperienceCard;
