import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { message } from 'antd';
import DictationResultSummary from '../../components/listening/DictationResultSummary';
import DictationAnswerReview from '../../components/listening/DictationAnswerReview';
import DictationFooter from '../../components/listening/DictationFooter';
import DictationProgress from '../../components/listening/DictationProgress';
import DictationActionPanel from '../../components/listening/DictationActionPanel';
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
  const completedScores = scores.filter((score): score is number => score !== null);
  const avgScore = completedScores.length > 0 ? Math.round(completedScores.reduce((a, b) => a + b, 0) / completedScores.length) : 0;

  const levelColor = dictationSet?.level === 'A1' || dictationSet?.level === 'A2'
    ? 'bg-primary-fixed text-on-primary-fixed'
    : 'bg-secondary-fixed text-on-secondary-container';

  const resetCurrentState = () => {
    setShowHint(false);
    setSubmitted(false);
    setLastScore(null);
    setLastSentence('');
    setLastAnswer('');
  };

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
      resetCurrentState();
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
    resetCurrentState();
    setIsFinished(false);
    setSavingResult(false);
    setSubmitError('');
  };

  const handlePrev = () => {
    if (currentIndex === 0) return;

    setCurrentIndex(currentIndex - 1);
    resetCurrentState();
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

  return (
    <div className="max-w-4xl mx-auto pb-20">
      <nav className="mb-8 flex items-center gap-2 text-sm text-on-surface-variant">
        <Link to="/listening" className="no-underline transition-colors hover:text-primary">Luyện nghe</Link>
        <span className="material-symbols-outlined text-[1rem]">chevron_right</span>
        <span className="font-medium text-on-surface">Chép chính tả</span>
      </nav>

      <div className="mb-8 flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <span className={`rounded-full px-3 py-1 text-xs font-headline font-bold ${levelColor}`}>{dictationSet.level}</span>
          <span className="flex items-center gap-1 rounded-full bg-surface-container px-3 py-1 text-xs text-on-surface-variant">
            <span className="material-symbols-outlined text-[0.9rem]">keyboard</span>
            Chép chính tả
          </span>
        </div>
        <h1 className="font-headline text-3xl font-extrabold text-on-surface">{dictationSet.title}</h1>
        <p className="max-w-xl text-sm leading-relaxed text-on-surface-variant">{dictationSet.description}</p>
      </div>

      <DictationProgress
        totalCount={items.length}
        currentIndex={currentIndex}
        scores={scores}
        onSelectIndex={(index) => {
          setCurrentIndex(index);
          resetCurrentState();
        }}
      />

      <DictationActionPanel
        currentIndex={currentIndex}
        totalCount={items.length}
        title={current.audioTitle}
        sentence={current.sentence}
        hint={current.hint}
        showHint={showHint}
        submitted={submitted}
        lastScore={lastScore}
        submitError={submitError}
        savingResult={savingResult}
        lastSentence={lastSentence}
        lastAnswer={lastAnswer}
        onToggleHint={() => setShowHint(!showHint)}
        onCheck={handleCheck}
        onPrev={handlePrev}
        onNext={() => { void handleNext(); }}
      />

      <DictationFooter onRestart={handleRestart} />
      <DictationAnswerReview currentIndex={currentIndex} scores={scores} items={items} />
    </div>
  );
};

export default DictationPage;
