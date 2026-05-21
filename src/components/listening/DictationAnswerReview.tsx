interface DictationAnswerReviewProps {
  currentIndex: number;
  scores: (number | null)[];
  items: { id: string; sentence: string }[];
}

const DictationAnswerReview = ({
  currentIndex,
  scores,
  items,
}: DictationAnswerReviewProps) => {
  return (
    <div className="w-full bg-surface-container-low rounded-[1.5rem] p-6 text-left">
      <h3 className="font-headline font-bold text-on-surface mb-4">Chi tiết từng câu</h3>
      <div className="flex flex-col gap-3">
        {items.map((item, index) => (
          <div key={item.id} className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                (scores[index] ?? 0) >= 80 ? 'bg-secondary/15 text-secondary' :
                (scores[index] ?? 0) >= 50 ? 'bg-tertiary/15 text-tertiary' :
                'bg-error/15 text-error'
              }`}>
                {index + 1}
              </div>
              <p className="text-sm text-on-surface line-clamp-1">{item.sentence}</p>
            </div>
            <span className={`font-headline font-bold text-sm shrink-0 ${
              (scores[index] ?? 0) >= 80 ? 'text-secondary' :
              (scores[index] ?? 0) >= 50 ? 'text-tertiary' :
              'text-error'
            }`}>
              {scores[index] !== null ? `${scores[index]}%` : '—'}
            </span>
          </div>
        ))}
      </div>
      <p className="mt-4 text-xs text-on-surface-variant">Câu hiện tại: {currentIndex + 1}</p>
    </div>
  );
};

export default DictationAnswerReview;
