import { SanitizedCertification } from '../../interfaces/sanitized-config';
import TimelineCard from '../timeline';

const CertificationCard = ({
  certifications,
  loading,
}: {
  certifications: SanitizedCertification[];
  loading: boolean;
}) => (
  <TimelineCard
    heading="Certifications"
    loading={loading}
    entries={certifications.map((c) => ({
      time: c.year,
      title: c.name,
      subtitle: c.body,
      link: c.link || undefined,
    }))}
  />
);

export default CertificationCard;
