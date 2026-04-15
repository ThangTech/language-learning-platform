interface StatCardProps {
  icon: string;
  iconBgClass: string;
  iconColorClass: string;
  value: string;
  label: string;
  badge?: React.ReactNode;
}

const StatCard = ({ icon, iconBgClass, iconColorClass, value, label, badge }: StatCardProps) => (
  <div
    className="bg-surface-container-lowest p-8 rounded-[2rem] flex flex-col justify-between
               hover:-translate-y-1 transition-transform duration-300"
  >
    <div className="flex justify-between items-start mb-12">
      <div className={`p-3 rounded-2xl ${iconBgClass} ${iconColorClass}`}>
        <span className="material-symbols-outlined text-[1.2rem]">{icon}</span>
      </div>
      {badge}
    </div>
    <div>
      <p className="font-headline text-4xl font-extrabold tracking-tighter">{value}</p>
      <p className="text-outline font-medium text-sm mt-0.5">{label}</p>
    </div>
  </div>
);

const StatsCards = () => {
  return (
    <div className="col-span-12 grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Vocabulary Terms */}
      <StatCard
        icon="translate"
        iconBgClass="bg-secondary/10"
        iconColorClass="text-secondary"
        value="1.284"
        label="Từ vựng đã học"
        badge={
          <span className="font-headline font-bold text-sm text-secondary">+24 hôm nay</span>
        }
      />

      {/* Quizzes Cleared */}
      <StatCard
        icon="fact_check"
        iconBgClass="bg-tertiary/10"
        iconColorClass="text-tertiary"
        value="156"
        label="Bài kiểm tra đã hoàn thành"
        badge={
          <div className="flex -space-x-2">
            <div
              className="w-8 h-8 rounded-full border-2 border-surface-container-lowest
                         bg-primary-fixed flex items-center justify-center
                         font-headline text-[10px] font-bold text-on-primary-fixed"
            >
              A+
            </div>
            <div
              className="w-8 h-8 rounded-full border-2 border-surface-container-lowest
                         bg-secondary-container flex items-center justify-center
                         font-headline text-[10px] font-bold text-on-secondary-container"
            >
              B
            </div>
          </div>
        }
      />

      {/* Focused Learning */}
      <StatCard
        icon="schedule"
        iconBgClass="bg-primary/10"
        iconColorClass="text-primary"
        value="42,5h"
        label="Thời gian học tập"
        badge={
          <div className="w-24 h-2 bg-surface-container-highest rounded-full overflow-hidden">
            <div className="bg-primary h-full w-3/4 rounded-full" />
          </div>
        }
      />
    </div>
  );
};

export default StatsCards;
