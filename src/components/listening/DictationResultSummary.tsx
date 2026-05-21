interface DictationResultSummaryProps {
  avgScore: number;
  completedCount: number;
  totalCount: number;
  scores: (number | null)[];
}

const DictationResultSummary = ({
  avgScore,
  completedCount,
  totalCount,
  scores,
}: DictationResultSummaryProps) => {
  return (
    <div className="max-w-3xl mx-auto px-6 md:px-8 pt-28 pb-20 flex flex-col items-center text-center gap-8">
      <div className={`w-24 h-24 rounded-full flex items-center justify-center shadow-xl ${
        avgScore >= 80 ? 'bg-gradient-to-br from-secondary to-secondary-container' :
        avgScore >= 50 ? 'bg-gradient-to-br from-tertiary to-tertiary-container' :
        'bg-gradient-to-br from-error to-error-container'
      }`}>
        <span className="material-symbols-outlined text-white text-[3rem]" style={{ fontVariationSettings: "'FILL' 1" }}>
          {avgScore >= 80 ? 'emoji_events' : avgScore >= 50 ? 'sentiment_satisfied' : 'refresh'}
        </span>
      </div>

      <div>
        <h1 className="font-headline text-3xl md:text-4xl font-extrabold text-on-surface mb-3">
          {avgScore >= 80 ? '🎉 Xuất sắc!' : avgScore >= 50 ? '👍 Khá tốt!' : 'Cố gắng hơn nhé!'}
        </h1>
        <p className="text-on-surface-variant text-base max-w-md leading-relaxed">
          Bạn đã hoàn thành {totalCount} câu chép chính tả. Đây là kết quả của bạn.
        </p>
      </div>

      <div className="w-full grid grid-cols-3 gap-4">
        {[
          { label: 'Điểm trung bình', value: `${avgScore}%`, icon: 'grade', color: avgScore >= 80 ? 'text-secondary' : avgScore >= 50 ? 'text-tertiary' : 'text-error' },
          { label: 'Câu hoàn thành', value: `${completedCount}/${totalCount}`, icon: 'check_circle', color: 'text-primary' },
          { label: 'Câu xuất sắc', value: `${scores.filter((score) => (score ?? 0) >= 90).length}`, icon: 'star', color: 'text-tertiary' },
        ].map((stat) => (
          <div key={stat.label} className="bg-surface-container-low rounded-2xl p-5 flex flex-col items-center gap-2">
            <span className={`material-symbols-outlined text-[2rem] ${stat.color}`} style={{ fontVariationSettings: "'FILL' 1" }}>
              {stat.icon}
            </span>
            <p className={`font-headline text-2xl font-extrabold ${stat.color}`}>{stat.value}</p>
            <p className="text-on-surface-variant text-xs text-center">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DictationResultSummary;
