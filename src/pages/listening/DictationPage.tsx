import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { message } from 'antd';
import AudioPlayer from '../../components/listening/AudioPlayer';
import DictationInput from '../../components/listening/DictationInput';
import { getDictationSetById } from '../../services/listening';
import type { DictationSetDto, DictationSentenceDto } from '../../interfaces/listening';

const DictationPage = () => {
  const { id } = useParams();
  const [dictationSet, setDictationSet] = useState<DictationSetDto | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [scores, setScores] = useState<(number | null)[]>([]);
  const [showHint, setShowHint] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

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
  const current = items[currentIndex];
  const completedCount = scores.filter((s) => s !== null).length;
  const avgScore = scores.filter((s) => s !== null).length > 0
    ? Math.round(scores.filter((s): s is number => s !== null).reduce((a, b) => a + b, 0) / scores.filter((s) => s !== null).length)
    : 0;

  const levelColor = dictationSet?.level === 'A1' || dictationSet?.level === 'A2'
    ? 'bg-primary-fixed text-on-primary-fixed'
    : 'bg-secondary-fixed text-on-secondary-container';

  const handleCheck = (text: string) => {
    if (!current) return;

    const inputWords = text.trim().toLowerCase().replace(/[.,!?]/g, '').split(/\s+/);
    const expectedWords = current.sentence.toLowerCase().replace(/[.,!?]/g, '').split(/\s+/);
    const correct = expectedWords.filter((w, i) => inputWords[i] === w).length;
    const score = Math.round((correct / expectedWords.length) * 100);
    const nextScores = [...scores];
    nextScores[currentIndex] = score;
    setScores(nextScores);
  };

  const handleNext = () => {
    if (currentIndex < items.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setShowHint(false);
      return;
    }

    setIsFinished(true);
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setScores(Array(items.length).fill(null));
    setShowHint(false);
    setIsFinished(false);
  };

  if (!dictationSet) {
    return <div className="max-w-3xl mx-auto py-20 text-center text-on-surface-variant">Đang tải bộ chép chính tả...</div>;
  }

  if (isFinished) {
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
            Bạn đã hoàn thành {items.length} câu chép chính tả. Đây là kết quả của bạn.
          </p>
        </div>

        <div className="w-full grid grid-cols-3 gap-4">
          {[
            { label: 'Điểm trung bình', value: `${avgScore}%`, icon: 'grade', color: avgScore >= 80 ? 'text-secondary' : avgScore >= 50 ? 'text-tertiary' : 'text-error' },
            { label: 'Câu hoàn thành', value: `${completedCount}/${items.length}`, icon: 'check_circle', color: 'text-primary' },
            { label: 'Câu xuất sắc', value: `${scores.filter((s) => (s ?? 0) >= 90).length}`, icon: 'star', color: 'text-tertiary' },
          ].map((stat) => (
            <div key={stat.label} className="bg-surface-container-low rounded-2xl p-5 flex flex-col items-center gap-2">
              <span className={`material-symbols-outlined text-[2rem] ${stat.color}`} style={{ fontVariationSettings: "'FILL' 1" }}>{stat.icon}</span>
              <p className={`font-headline text-2xl font-extrabold ${stat.color}`}>{stat.value}</p>
              <p className="text-on-surface-variant text-xs text-center">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="w-full bg-surface-container-low rounded-[1.5rem] p-6 text-left">
          <h3 className="font-headline font-bold text-on-surface mb-4">Chi tiết từng câu</h3>
          <div className="flex flex-col gap-3">
            {items.map((ex, i) => (
              <div key={ex.id} className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                    (scores[i] ?? 0) >= 80 ? 'bg-secondary/15 text-secondary' :
                    (scores[i] ?? 0) >= 50 ? 'bg-tertiary/15 text-tertiary' :
                    'bg-error/15 text-error'
                  }`}>
                    {i + 1}
                  </div>
                  <p className="text-sm text-on-surface line-clamp-1">{ex.sentence}</p>
                </div>
                <span className={`font-headline font-bold text-sm shrink-0 ${
                  (scores[i] ?? 0) >= 80 ? 'text-secondary' :
                  (scores[i] ?? 0) >= 50 ? 'text-tertiary' :
                  'text-error'
                }`}>{scores[i] !== null ? `${scores[i]}%` : '—'}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex gap-4 w-full">
          <button onClick={handleRestart} className="flex-1 bg-primary text-on-primary py-3.5 rounded-full font-headline font-bold text-sm hover:opacity-90 active:scale-95 transition-all flex items-center justify-center gap-2">
            <span className="material-symbols-outlined text-[1.1rem]">refresh</span>
            Làm lại
          </button>
          <Link to="/listening" className="no-underline flex-1">
            <button className="w-full border border-outline-variant text-on-surface-variant py-3.5 rounded-full font-headline font-bold text-sm hover:bg-surface-container transition-all flex items-center justify-center gap-2">
              <span className="material-symbols-outlined text-[1.1rem]">arrow_back</span>
              Về trang nghe
            </button>
          </Link>
        </div>
      </div>
    );
  }

  if (!current) {
    return <div className="max-w-3xl mx-auto py-20 text-center text-on-surface-variant">Không có câu chép chính tả nào.</div>;
  }

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
            {items.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`w-8 h-8 rounded-full text-xs font-headline font-bold transition-all flex items-center justify-center ${
                  i === currentIndex
                    ? 'bg-primary text-on-primary shadow-md scale-110'
                    : scores[i] !== null
                    ? scores[i]! >= 80
                      ? 'bg-secondary/20 text-secondary border border-secondary/30'
                      : 'bg-tertiary/20 text-tertiary border border-tertiary/30'
                    : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'
                }`}
              >
                {scores[i] !== null ? <span className="material-symbols-outlined text-[0.9rem]" style={{ fontVariationSettings: "'FILL' 1" }}>{scores[i]! >= 80 ? 'check' : 'close'}</span> : i + 1}
              </button>
            ))}
          </div>
          <p className="text-sm text-on-surface-variant font-medium">{currentIndex + 1} / {items.length}</p>
        </div>
        <div className="w-full h-2 bg-surface-container-highest rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-primary to-primary-container rounded-full transition-all duration-500" style={{ width: `${(currentIndex / items.length) * 100}%` }} />
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
            onClick={() => { if (currentIndex > 0) { setCurrentIndex(currentIndex - 1); setShowHint(false); } }}
            disabled={currentIndex === 0}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-outline-variant text-on-surface-variant text-sm font-medium hover:bg-surface-container transition-all disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <span className="material-symbols-outlined text-[1.1rem]">arrow_back</span>
            Câu trước
          </button>
          <button
            onClick={handleNext}
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

      <div className="mt-8 bg-primary/5 border border-primary/10 rounded-[1.5rem] p-6 flex gap-4">
        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
          <span className="material-symbols-outlined text-primary text-[1.4rem]" style={{ fontVariationSettings: "'FILL' 1" }}>tips_and_updates</span>
        </div>
        <div>
          <h3 className="font-headline font-bold text-on-surface mb-1">Mẹo luyện tập hiệu quả</h3>
          <p className="text-on-surface-variant text-sm leading-relaxed">
            Nghe ít nhất <strong className="text-primary">2-3 lần</strong> trước khi bắt đầu gõ. Lần đầu để hiểu tổng thể, lần sau chú ý từng từ.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DictationPage;
