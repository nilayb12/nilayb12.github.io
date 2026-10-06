import { skeleton } from '../../utils';

/**
 * Header used at the top of the wide right-hand sections
 * (repositories, projects, articles, publications).
 */
const SectionHeader = ({
  icon,
  title,
  subtitle,
  loading,
}: {
  icon: React.ReactNode;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  loading: boolean;
}) => (
  <div className="mb-6 flex items-center gap-3">
    {loading ? (
      skeleton({ widthCls: 'size-11', shape: 'rounded-xl' })
    ) : (
      <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-accent-soft text-xl text-accent-soft-foreground">
        {icon}
      </div>
    )}
    <div className="min-w-0 flex-1">
      <h2 className="truncate text-lg font-semibold text-foreground">
        {loading ? skeleton({ widthCls: 'w-48', heightCls: 'h-6' }) : title}
      </h2>
      {subtitle !== undefined && (
        <div className="mt-0.5 truncate text-sm text-muted">
          {loading
            ? skeleton({ widthCls: 'w-32', heightCls: 'h-4' })
            : subtitle}
        </div>
      )}
    </div>
  </div>
);

export default SectionHeader;
