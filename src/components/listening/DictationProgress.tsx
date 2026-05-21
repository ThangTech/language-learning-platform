interface DictationProgressProps {
  totalCount: number;
  currentIndex: number;
  scores: (number | null)[];
  onSelectIndex: (index: number) => void;
}

const DictationProgress = ({ totalCount, currentIndex, scores, onSelectIndex }: DictationProgressProps) => {
  return (
    <div className="mb-8">
      <div className="mb-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {Array.from({ length: totalCount }).map((_, index) => (
            <button
              key={index}
              onClick={() => onSelectIndex(index)}
              className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-headline font-bold transition-all ${
                index === currentIndex
                  ? 'bg-primary text-on-primary shadow-md scale-110'
                  : scores[index] !== null
                    ? scores[index]! >= 80
                      ? 'bg-secondary/20 text-secondary border border-secondary/30'
                      : 'bg-tertiary/20 text-tertiary border border-tertiary/30'
                    : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'
              }`}
            >
              {scores[index] !== null ? (
                <span className="material-symbols-outlined text-[0.9rem]" style={{ fontVariationSettings: "'FILL' 1" }}>
                  {scores[index]! >= 80 ? 'check' : 'close'}
                </span>
              ) : (
                index + 1
              )}
            </button>
          ))}
        </div>
        <p className="text-sm font-medium text-on-surface-variant">
          {currentIndex + 1} / {totalCount}
        </p>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-surface-container-highest">
        <div
          className="h-full rounded-full bg-gradient-to-r from-primary to-primary-container transition-all duration-500"
          style={{ width: `${(currentIndex / totalCount) * 100}%` }}
        />
      </div>
    </div>
  );
};

export default DictationProgress;
