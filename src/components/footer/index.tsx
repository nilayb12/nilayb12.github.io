import { skeleton } from '../../utils';

const Footer = ({
  content,
  loading,
}: {
  content: string | null;
  loading: boolean;
}) => {
  if (!content) return null;
  return loading ? (
    skeleton({ widthCls: 'w-52', heightCls: 'h-5' })
  ) : (
    <div
      className="text-sm text-muted [&_a]:text-accent [&_a:hover]:underline"
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
};

export default Footer;
