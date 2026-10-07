import { TbSchool } from 'react-icons/tb';
import { SanitizedEducation } from '../../interfaces/sanitized-config';
import TimelineCard from '../timeline';

const EducationCard = ({
  educations,
  loading,
}: {
  educations: SanitizedEducation[];
  loading: boolean;
}) => (
  <TimelineCard
    heading="Education"
    icon={<TbSchool />}
    loading={loading}
    entries={educations.map((e) => ({
      time: `${e.from} – ${e.to}`,
      title: e.degree,
      subtitle: e.institution,
      description: e.description,
    }))}
  />
);

export default EducationCard;
