/** Dữ liệu bar theo tuần — xen kẽ Độ chính xác (primary) và Ghi nhớ (secondary). */
const BARS = [
  { type: 'accuracy', heightPercent: 40 },
  { type: 'retention', heightPercent: 60 },
  { type: 'accuracy', heightPercent: 55 },
  { type: 'retention', heightPercent: 85 },
  { type: 'accuracy', heightPercent: 70 },
  { type: 'retention', heightPercent: 92 },
  { type: 'accuracy', heightPercent: 80 },
  { type: 'retention', heightPercent: 75 },
  { type: 'accuracy', heightPercent: 95 },
  { type: 'retention', heightPercent: 88 },
] as const;

const DAY_LABELS = ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'];

const FluencyChart = () => {
  return (
    <div className="col-span-12 bg-surface-container-low rounded-[2rem] p-10">
      {/* Chart header */}
      <div className="flex items-center justify-between mb-10">
        <h3 className="font-headline font-bold text-2xl tracking-tight text-on-surface">
          Tiến trình học tập
        </h3>

        {/* Legend */}
        <div className="flex gap-5">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-primary" />
            <span className="font-headline text-sm font-medium text-on-surface-variant">
              Độ chính xác
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-secondary" />
            <span className="font-headline text-sm font-medium text-on-surface-variant">
              Ghi nhớ
            </span>
          </div>
        </div>
      </div>

      {/* Bars */}
      <div className="h-48 flex items-end gap-3">
        {BARS.map((bar, i) => (
          <div
            key={i}
            style={{ height: `${bar.heightPercent}%` }}
            className={`flex-1 rounded-t-2xl transition-colors duration-200 cursor-pointer
              ${
                bar.type === 'accuracy'
                  ? 'bg-primary/20 hover:bg-primary/50'
                  : 'bg-secondary/20 hover:bg-secondary/50'
              }`}
            title={`${bar.type === 'accuracy' ? 'Độ chính xác' : 'Ghi nhớ'}: ${bar.heightPercent}%`}
          />
        ))}
      </div>

      {/* Day labels */}
      <div className="flex justify-between mt-4 px-1">
        {DAY_LABELS.map((day) => (
          <span key={day} className="font-headline text-xs font-bold text-outline tracking-widest">
            {day}
          </span>
        ))}
      </div>
    </div>
  );
};

export default FluencyChart;
