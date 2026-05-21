import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { message } from 'antd';
import AudioPlayer from '../../components/listening/AudioPlayer';
import DictationInput from '../../components/listening/DictationInput';
import DictationResultSummary from '../../components/listening/DictationResultSummary';
import DictationAnswerReview from '../../components/listening/DictationAnswerReview';
import DictationFooter from '../../components/listening/DictationFooter';
import { getDictationSetById, submitListeningResult } from '../../services/listening';
import type { DictationSetDto, DictationSentenceDto } from '../../interfaces/listening';

const DictationPage = () => {
  const { id } = useParams();
  const [dictationSet, setDictationSet] = useState<DictationSetDto | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [scores, setScores] = useState<(number | null)[]>([]);
  const [showHint, setShowHint] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [savingResult, setSavingResult] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [lastScore, setLastScore] = useState<number | null>(null);
  const [lastSentence, setLastSentence] = useState('');
  const [lastAnswer, setLastAnswer] = useState('');

  useEffect(() => {
    const load = async () => {
      if (!id) return;

      try {
        const result = await getDictationSetById(id);
        if (result.success && result.data) {
          setDictationSet(result.data);
          setScores(Array(result.data.sentences.length).fill(null));
        } else {
          message.error(result.message || 'Không thể tải bộ chép chính tả');
        }
      } catch (error: any) {
        message.error(error?.response?.data?.message || 'Lỗi kết nối');
      }
    };

    load();
  }, [id]);

  const items = dictationSet?.sentences ?? [];
  const current: DictationSentenceDto | undefined = items[currentIndex];
  const completedCount = scores.filter((score) => score !== null).length;
  const avgScore = scores.filter((score) => score !== null).length > 0
    ? Math.round(scores.filter((score): score is number => score !== null).reduce((a, b) => a + b, 0) / scores.filter((score) => score !== null).length)
    : 0;

  const levelColor = dictationSet?.level === 'A1' || dictationSet?.level === 'A2'
    ? 'bg-primary-fixed text-on-primary-fixed'
    : 'bg-secondary-fixed text-on-secondary-container';

  const handleCheck = (text: string) => {
    if (!current) return;

    const inputWords = text.trim().toLowerCase().replace(/[.,!?]/g, '').split(/\s+/);
    const expectedWords = current.sentence.toLowerCase().replace(/[.,!?]/g, '').split(/\s+/);
    const correct = expectedWords.filter((word, index) => inputWords[index] === word).length;
    const score = Math.round((correct / expectedWords.length) * 100);
    const nextScores = [...scores];
    nextScores[currentIndex] = score;
    setScores(nextScores);
    setLastScore(score);
    setLastSentence(current.sentence);
    setLastAnswer(text);
    setSubmitted(true);
    setSubmitError('');
  };

  const handleNext = async () => {
    if (currentIndex < items.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setShowHint(false);
      setSubmitted(false);
      setLastScore(null);
      setLastSentence('');
      setLastAnswer('');
      return;
    }

    setSavingResult(true);
    setSubmitError('');

    try {
      if (id) {
        const result = await submitListeningResult(id, avgScore);
        if (!result.success) {
          setSubmitError(result.message || 'Không thể lưu kết quả');
          return;
        }
      }

      setIsFinished(true);
    } catch (error: any) {
      setSubmitError(error?.response?.data?.message || 'Không thể lưu kết quả');
    } finally {
      setSavingResult(false);
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setScores(Array(items.length).fill(null));
    setShowHint(false);
    setIsFinished(false);
    setSubmitted(false);
    setSavingResult(false);
    setSubmitError('');
    setLastScore(null);
    setLastSentence('');
    setLastAnswer('');
  };

  if (!dictationSet) {
    return <div className="max-w-3xl mx-auto py-20 text-center text-on-surface-variant">Đang tải bộ chép chính tả...</div>;
  }

  if (isFinished) {
    return (
      <DictationResultSummary
        avgScore={avgScore}
        completedCount={completedCount}
        totalCount={items.length}
        scores={scores}
      />
    );
  }

  if (!current) {
    return <div className="max-w-3xl mx-auto py-20 text-center text-on-surface-variant">Không có câu chép chính tả nào.</div>;
  }

  const totalQuestions = items.length;

  return (
    <div className="max-w-4xl mx-auto pb-20">
      <nav className="flex items-center gap-2 text-sm text-on-surface-variant mb-8">
        <Link to="/listening" className="hover:text-primary transition-colors no-underline">Luyện nghe</Link>
        <span className="material-symbols-outlined text-[1rem]">chevron_right</span>
        <span className="text-on-surface font-medium">Chép chính tả</span>
      </nav>

      <div className="flex flex-col gap-3 mb-8">
        <div className="flex items-center gap-2">
          <span className={`px-3 py-1 rounded-full text-xs font-headline font-bold ${levelColor}`}>{dictationSet.level}</span>
          <span className="flex items-center gap-1 text-xs text-on-surface-variant bg-surface-container px-3 py-1 rounded-full">
            <span className="material-symbols-outlined text-[0.9rem]">keyboard</span>
            Chép chính tả
          </span>
        </div>
        <h1 className="font-headline text-3xl font-extrabold text-on-surface">{dictationSet.title}</h1>
        <p className="text-on-surface-variant text-sm leading-relaxed max-w-xl">{dictationSet.description}</p>
      </div>

      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            {items.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-8 h-8 rounded-full text-xs font-headline font-bold transition-all flex items-center justify-center ${
                  index === currentIndex
                    ? 'bg-primary text-on-primary shadow-md scale-110'
                    : scores[index] !== null
                      ? scores[index]! >= 80
                        ? 'bg-secondary/20 text-secondary border border-secondary/30'
                        : 'bg-tertiary/20 text-tertiary border border-tertiary/30'
                      : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'
                }`}
              >
                {scores[index] !== null ? <span className="material-symbols-outlined text-[0.9rem]" style={{ fontVariationSettings: "'FILL' 1" }}>{scores[index]! >= 80 ? 'check' : 'close'}</span> : index + 1}
              </button>
            ))}
          </div>
          <p className="text-sm text-on-surface-variant font-medium">{currentIndex + 1} / {totalQuestions}</p>
        </div>
        <div className="w-full h-2 bg-surface-container-highest rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-primary to-primary-container rounded-full transition-all duration-500" style={{ width: `${(currentIndex / totalQuestions) * 100}%` }} />
        </div>
      </div>

      <div className="bg-surface-container-low rounded-[2rem] p-8 border border-outline-variant/10 flex flex-col gap-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs text-on-surface-variant font-headline font-bold uppercase tracking-widest mb-1">Câu {currentIndex + 1}</p>
            <h2 className="font-headline font-bold text-xl text-on-surface">{current.audioTitle}</h2>
          </div>
          <button
            onClick={() => setShowHint(!showHint)}
            className={`px-4 py-2 rounded-full text-sm font-medium border transition-all flex items-center gap-1.5 ${showHint ? 'bg-tertiary/10 border-tertiary/30 text-tertiary' : 'border-outline-variant text-on-surface-variant hover:bg-surface-container'}`}
          >
            <span className="material-symbols-outlined text-[1rem]">lightbulb</span>
            Gợi ý
          </button>
        </div>

        {submitted && lastScore !== null && (
          <div className={`rounded-xl p-4 border ${lastScore >= 80 ? 'bg-secondary/10 border-secondary/20' : lastScore >= 50 ? 'bg-tertiary/10 border-tertiary/20' : 'bg-error/10 border-error/20'}`}>
            <p className="font-headline font-bold text-on-surface">{lastScore}% chính xác</p>
            <p className="text-sm text-on-surface-variant mt-1">Bạn vừa nộp câu này. Có thể bấm Câu tiếp theo để chuyển sang câu kế tiếp.</p>
          </div>
        )}

        {submitError && (
          <div className="rounded-xl p-4 border bg-error/10 border-error/20 text-sm text-error">
            {submitError}
          </div>
        )}

        {savingResult && (
          <div className="rounded-xl p-4 border bg-surface-container text-sm text-on-surface-variant">
            Đang lưu kết quả...
          </div>
        )}

        {showHint && (
          <div className="bg-tertiary/5 border border-tertiary/15 rounded-xl p-4 flex items-start gap-3">
            <span className="material-symbols-outlined text-tertiary text-[1.2rem] mt-0.5" style={{ fontVariationSettings: "'FILL' 1" }}>lightbulb</span>
            <p className="text-sm text-on-surface leading-relaxed">{current.hint}</p>
          </div>
        )}

        <AudioPlayer title={current.audioTitle} totalDuration={current.duration} />

        <div className="flex items-center gap-3 text-xs text-on-surface-variant bg-surface-container rounded-xl px-4 py-3">
          <span className="material-symbols-outlined text-primary text-[1rem]">info</span>
          <span>Nhấn <strong className="text-primary">Kiểm tra</strong> để xem kết quả từng từ. Bạn có thể nghe lại nhiều lần trước khi nộp.</span>
        </div>

        <DictationInput expectedText={current.sentence} onCheck={handleCheck} />

        <div className="flex items-center justify-between pt-2 border-t border-outline-variant/20">
          <button
            onClick={() => { if (currentIndex > 0) { setCurrentIndex(currentIndex - 1); setShowHint(false); setSubmitted(false); setLastScore(null); setLastSentence(''); setLastAnswer(''); } }}
            disabled={currentIndex === 0}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-outline-variant text-on-surface-variant text-sm font-medium hover:bg-surface-container transition-all disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <span className="material-symbols-outlined text-[1.1rem]">arrow_back</span>
            Câu trước
          </button>
          <button
            onClick={() => { void handleNext(); }}
            className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-primary text-on-primary text-sm font-headline font-bold hover:opacity-90 active:scale-95 transition-all"
          >
            {currentIndex < items.length - 1 ? (
              <>Câu tiếp theo <span className="material-symbols-outlined text-[1.1rem]">arrow_forward</span></>
            ) : (
              <>Xem kết quả <span className="material-symbols-outlined text-[1.1rem]">emoji_events</span></>
            )}
          </button>
        </div>
      </div>

      <DictationFooter onRestart={handleRestart} />

      {lastSentence && lastAnswer && submitted && (
        <div className="mt-6 bg-surface-container-low rounded-[1.5rem] p-6 border border-outline-variant/10">
          <h3 className="font-headline font-bold text-on-surface mb-4">Kết quả câu vừa nộp</h3>
          <div className="grid gap-3 text-sm">
            <div>
              <p className="text-xs text-on-surface-variant mb-1">Bạn nhập</p>
              <p className="text-on-surface">{lastAnswer}</p>
            </div>
            <div>
              <p className="text-xs text-on-surface-variant mb-1">Đáp án đúng</p>
              <p className="text-on-surface">{lastSentence}</p>
            </div>
            <div>
              <p className="text-xs text-on-surface-variant mb-1">Điểm câu này</p>
              <p className="font-headline font-bold text-secondary">{lastScore ?? 0}%</p>
            </div>
          </div>
        </div>
      )}

      <DictationAnswerReview currentIndex={currentIndex} scores={scores} items={items} />
    </div>
  );
};

export default DictationPage;
