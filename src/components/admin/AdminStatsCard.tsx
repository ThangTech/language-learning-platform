interface StatCardProps {
  title: string;
  value: string | number;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
  icon: string;
  color: 'primary' | 'secondary' | 'tertiary';
}

const colorClasses = {
  primary: 'bg-primary-fixed text-primary',
  secondary: 'bg-secondary-fixed text-secondary',
  tertiary: 'bg-tertiary-fixed text-tertiary',
};

const AdminStatsCard = ({
  title,
  value,
  change,
  changeType = 'positive',
  icon,
  color,
}: StatCardProps) => {
  const changeColor =
    changeType === 'positive'
      ? 'text-secondary'
      : changeType === 'negative'
      ? 'text-error'
      : 'text-on-surface-variant';

  return (
    <div className="bg-surface-container-low p-6 rounded-[1.5rem] border border-outline-variant/10">
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="font-body text-sm text-on-surface-variant mb-1">{title}</p>
          <h3 className="font-headline text-3xl font-bold text-on-surface">{value}</h3>
        </div>
        <div className={`h-12 w-12 ${colorClasses[color]} rounded-xl flex items-center justify-center`}>
          <span className="material-symbols-outlined text-2xl">{icon}</span>
        </div>
      </div>
      {change && (
        <p className={`font-body text-sm ${changeColor}`}>{change}</p>
      )}
    </div>
  );
};

export default AdminStatsCard;