import AudioPlayer from './AudioPlayer';
import DictationInput from './DictationInput';

interface DictationActionPanelProps {
  currentIndex: number;
  totalCount: number;
  title: string;
  sentence: string;
  hint: string;
  showHint: boolean;
  submitted: boolean;
  lastScore: number | null;
  submitError: string;
  savingResult: boolean;
  lastSentence: string;
  lastAnswer: string;
  onToggleHint: () => void;
  onCheck: (text: string) => void;
  onPrev: () => void;
  onNext: () => void;
}

const DictationActionPanel = ({
  currentIndex,
  totalCount,
  title,
  sentence,
  hint,
  showHint,
  submitted,
  lastScore,
  submitError,
  savingResult,
  lastSentence,
  lastAnswer,
  onToggleHint,
  onCheck,
  onPrev,
  onNext,
}: DictationActionPanelProps) => {
  return (
    <div className="flex flex-col gap-8 rounded-[2rem] border border-outline-variant/10 bg-surface-container-low p-8">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="mb-1 text-xs font-headline font-bold uppercase tracking-widest text-on-surface-variant">
            Câu {currentIndex + 1}
          </p>
          <h2 className="font-headline text-xl font-bold text-on-surface">{title}</h2>
        </div>
        <button
          onClick={onToggleHint}
          className={`flex items-center gap-1.5 rounded-full border px-4 py-2 text-sm font-medium transition-all ${
            showHint ? 'border-tertiary/30 bg-tertiary/10 text-tertiary' : 'border-outline-variant text-on-surface-variant hover:bg-surface-container'
          }`}
        >
          <span className="material-symbols-outlined text-[1rem]">lightbulb</span>
          Gợi ý
        </button>
      </div>

      {submitted && lastScore !== null && (
        <div
          className={`rounded-xl border p-4 ${
            lastScore >= 80 ? 'border-secondary/20 bg-secondary/10' : lastScore >= 50 ? 'border-tertiary/20 bg-tertiary/10' : 'border-error/20 bg-error/10'
          }`}
        >
          <p className="font-headline font-bold text-on-surface">{lastScore}% chính xác</p>
          <p className="mt-1 text-sm text-on-surface-variant">Bạn vừa nộp câu này. Có thể bấm Câu tiếp theo để chuyển sang câu kế tiếp.</p>
        </div>
      )}

      {submitError && <div className="rounded-xl border border-error/20 bg-error/10 p-4 text-sm text-error">{submitError}</div>}

      {savingResult && <div className="rounded-xl border bg-surface-container p-4 text-sm text-on-surface-variant">Đang lưu kết quả...</div>}

      {showHint && (
        <div className="flex items-start gap-3 rounded-xl border border-tertiary/15 bg-tertiary/5 p-4">
          <span className="material-symbols-outlined mt-0.5 text-[1.2rem] text-tertiary" style={{ fontVariationSettings: "'FILL' 1" }}>
            lightbulb
          </span>
          <p className="text-sm leading-relaxed text-on-surface">{hint}</p>
        </div>
      )}

      <AudioPlayer title={title} totalDuration={undefined} />

      <div className="flex items-center gap-3 rounded-xl bg-surface-container px-4 py-3 text-xs text-on-surface-variant">
        <span className="material-symbols-outlined text-[1rem] text-primary">info</span>
        <span>
          Nhấn <strong className="text-primary">Kiểm tra</strong> để xem kết quả từng từ. Bạn có thể nghe lại nhiều lần trước khi nộp.
        </span>
      </div>

      <DictationInput expectedText={sentence} onCheck={onCheck} />

      <div className="flex items-center justify-between border-t border-outline-variant/20 pt-2">
        <button
          onClick={onPrev}
          disabled={currentIndex === 0}
          className="flex items-center gap-2 rounded-full border border-outline-variant px-5 py-2.5 text-sm font-medium text-on-surface-variant transition-all hover:bg-surface-container disabled:cursor-not-allowed disabled:opacity-40"
        >
          <span className="material-symbols-outlined text-[1.1rem]">arrow_back</span>
          Câu trước
        </button>
        <button
          onClick={onNext}
          className="flex items-center gap-2 rounded-full bg-primary px-6 py-2.5 text-sm font-headline font-bold text-on-primary transition-all hover:opacity-90 active:scale-95"
        >
          {currentIndex < totalCount - 1 ? (
            <>
              Câu tiếp theo <span className="material-symbols-outlined text-[1.1rem]">arrow_forward</span>
            </>
          ) : (
            <>
              Xem kết quả <span className="material-symbols-outlined text-[1.1rem]">emoji_events</span>
            </>
          )}
        </button>
      </div>

      {lastSentence && lastAnswer && submitted && (
        <div className="rounded-[1.5rem] border border-outline-variant/10 bg-surface-container-low p-6">
          <h3 className="mb-4 font-headline font-bold text-on-surface">Kết quả câu vừa nộp</h3>
          <div className="grid gap-3 text-sm">
            <div>
              <p className="mb-1 text-xs text-on-surface-variant">Bạn nhập</p>
              <p className="text-on-surface">{lastAnswer}</p>
            </div>
            <div>
              <p className="mb-1 text-xs text-on-surface-variant">Đáp án đúng</p>
              <p className="text-on-surface">{lastSentence}</p>
            </div>
            <div>
              <p className="mb-1 text-xs text-on-surface-variant">Điểm câu này</p>
              <p className="font-headline font-bold text-secondary">{lastScore ?? 0}%</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DictationActionPanel;
