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
    loading={loading}
    entries={experiences.map((e) => ({
      time: `${e.from} – ${e.to}`,
      title: e.position,
      subtitle: e.company,
      link: e.companyLink || undefined,
    }))}
  />
);

export default ExperienceCard;
