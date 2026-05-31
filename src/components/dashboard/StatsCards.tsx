interface StatCardProps {
  icon: string;
  iconBgClass: string;
  iconColorClass: string;
  value: string | number;
  label: string;
  badge?: React.ReactNode;
}

interface StatsCardsProps {
  wordsLearned: number;
  quizzesCompleted: number;
  listeningCompleted: number;
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

const StatsCards = ({ wordsLearned, quizzesCompleted, listeningCompleted }: StatsCardsProps) => {
  return (
    <div className="col-span-12 grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Vocabulary Terms */}
      <StatCard
        icon="translate"
        iconBgClass="bg-secondary/10"
        iconColorClass="text-secondary"
        value={wordsLearned.toLocaleString('vi-VN')}
        label="Từ vựng đã học"
        badge={
          wordsLearned === 0
            ? <span className="font-headline font-bold text-sm text-outline">Chưa có</span>
            : <span className="font-headline font-bold text-sm text-secondary">Đang tiến bộ 🚀</span>
        }
      />

      {/* Quizzes Cleared */}
      <StatCard
        icon="fact_check"
        iconBgClass="bg-tertiary/10"
        iconColorClass="text-tertiary"
        value={quizzesCompleted}
        label="Bài kiểm tra đã hoàn thành"
        badge={
          <div className="flex -space-x-2">
            <div
              className="w-8 h-8 rounded-full border-2 border-surface-container-lowest
                         bg-primary-fixed flex items-center justify-center
                         font-headline text-[10px] font-bold text-on-primary-fixed"
            >
              {quizzesCompleted > 0 ? '✓' : '–'}
            </div>
          </div>
        }
      />

      {/* Listening Done */}
      <StatCard
        icon="headphones"
        iconBgClass="bg-primary/10"
        iconColorClass="text-primary"
        value={listeningCompleted}
        label="Bài nghe đã hoàn thành"
        badge={
          <div className="w-24 h-2 bg-surface-container-highest rounded-full overflow-hidden">
            <div
              className="bg-primary h-full rounded-full transition-all duration-500"
              style={{ width: `${Math.min(100, listeningCompleted * 10)}%` }}
            />
          </div>
        }
      />
    </div>
  );
};

export default StatsCards;
