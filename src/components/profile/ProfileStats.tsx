interface StatItem {
  label: string;
  value: string;
  icon: string;
  color: string;
  bg: string;
}

interface ProfileStatsProps {
  stats: StatItem[];
}

const ProfileStats = ({ stats }: ProfileStatsProps) => {
  return (
    <section className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      {stats.map((item) => (
        <div key={item.label} className="bg-surface-container-low rounded-2xl p-4 flex flex-col gap-2 border border-outline-variant/10">
          <div className={`w-10 h-10 rounded-xl ${item.bg} flex items-center justify-center`}>
            <span className={`material-symbols-outlined text-[1.3rem] ${item.color}`} style={{ fontVariationSettings: "'FILL' 1" }}>
              {item.icon}
            </span>
          </div>
          <p className={`font-headline font-extrabold text-xl ${item.color}`}>{item.value}</p>
          <p className="text-on-surface-variant text-xs">{item.label}</p>
        </div>
      ))}
    </section>
  );
};

export default ProfileStats;
