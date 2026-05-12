import { useState } from 'react';
import { Link } from 'react-router-dom';

// ─── Mock Data ────────────────────────────────────────────────────────────────
const CATEGORIES = ['Tất cả', 'Từ vựng', 'Ngữ pháp', 'Luyện nghe', 'Tổng hợp'];
const DIFFICULTIES = ['Tất cả', 'Dễ', 'Trung bình', 'Khó'];

interface QuizItem {
  id: string;
  title: string;
  category: string;
  difficulty: 'Dễ' | 'Trung bình' | 'Khó';
  questions: number;
  duration: string;
  icon: string;
  iconColor: string;
  iconBg: string;
  bestScore?: number;
  isNew?: boolean;
}

const QUIZZES: QuizItem[] = [
  {
    id: 'q1', title: 'Từ vựng chủ đề Du lịch', category: 'Từ vựng',
    difficulty: 'Dễ', questions: 15, duration: '10 phút',
    icon: 'flight', iconColor: 'text-primary', iconBg: 'bg-primary/10',
    bestScore: 92,
  },
  {
    id: 'q2', title: 'Thì hiện tại hoàn thành', category: 'Ngữ pháp',
    difficulty: 'Trung bình', questions: 20, duration: '15 phút',
    icon: 'rule', iconColor: 'text-secondary', iconBg: 'bg-secondary/10',
    bestScore: 74,
  },
  {
    id: 'q3', title: 'Nghe & chọn đáp án đúng', category: 'Luyện nghe',
    difficulty: 'Trung bình', questions: 10, duration: '12 phút',
    icon: 'hearing', iconColor: 'text-tertiary', iconBg: 'bg-tertiary/10',
    isNew: true,
  },
  {
    id: 'q4', title: 'Từ đồng nghĩa & trái nghĩa', category: 'Từ vựng',
    difficulty: 'Khó', questions: 25, duration: '20 phút',
    icon: 'compare_arrows', iconColor: 'text-primary', iconBg: 'bg-primary/10',
  },
  {
    id: 'q5', title: 'Mệnh đề quan hệ (Relative Clauses)', category: 'Ngữ pháp',
    difficulty: 'Khó', questions: 18, duration: '18 phút',
    icon: 'account_tree', iconColor: 'text-secondary', iconBg: 'bg-secondary/10',
    bestScore: 60,
  },
  {
    id: 'q6', title: 'Kiểm tra tổng hợp Level B1', category: 'Tổng hợp',
    difficulty: 'Trung bình', questions: 30, duration: '25 phút',
    icon: 'workspace_premium', iconColor: 'text-tertiary', iconBg: 'bg-tertiary/10',
    isNew: true,
  },
];

const difficultyStyle: Record<string, string> = {
  'Dễ': 'bg-secondary/10 text-secondary',
  'Trung bình': 'bg-tertiary/10 text-tertiary',
  'Khó': 'bg-error/10 text-error',
};

// ─── Component ────────────────────────────────────────────────────────────────
const QuizPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('Tất cả');
  const [selectedDifficulty, setSelectedDifficulty] = useState('Tất cả');

  const filtered = QUIZZES.filter((q) => {
    const matchCat = selectedCategory === 'Tất cả' || q.category === selectedCategory;
    const matchDiff = selectedDifficulty === 'Tất cả' || q.difficulty === selectedDifficulty;
    return matchCat && matchDiff;
  });

  const doneCount = QUIZZES.filter((q) => q.bestScore !== undefined).length;
  const avgScore = Math.round(
    QUIZZES.filter((q) => q.bestScore !== undefined)
      .reduce((sum, q) => sum + (q.bestScore ?? 0), 0) / (doneCount || 1)
  );

  return (
    <div className="max-w-6xl mx-auto pb-16">

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="mb-10 grid grid-cols-12 gap-6">
        {/* Left */}
        <div className="col-span-12 lg:col-span-8 bg-gradient-to-br from-secondary to-secondary-container p-10 rounded-[2rem] text-on-secondary relative overflow-hidden flex flex-col justify-end min-h-[260px]">
          <div className="absolute top-0 right-0 opacity-10 translate-x-8 -translate-y-4 pointer-events-none select-none">
            <span className="material-symbols-outlined text-[16rem] text-white">quiz</span>
          </div>
          <div className="relative z-10">
            <h1 className="font-headline text-4xl font-extrabold tracking-tight mb-3 max-w-lg leading-tight">
              Kiểm tra kiến thức<br />của bạn.
            </h1>
            <p className="text-secondary-fixed text-base max-w-md mb-8 leading-relaxed">
              Làm bài kiểm tra để củng cố từ vựng, ngữ pháp và kỹ năng nghe. Càng luyện nhiều, điểm càng cao!
            </p>
            <button className="bg-white text-secondary px-7 py-3.5 rounded-full font-headline font-bold flex items-center gap-2 hover:opacity-90 active:scale-95 transition-all w-fit shadow-lg text-sm">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>bolt</span>
              Làm bài ngẫu nhiên
            </button>
          </div>
        </div>

        {/* Right stats */}
        <div className="col-span-12 lg:col-span-4 flex flex-col gap-5">
          <div className="bg-secondary-container/30 border border-secondary-fixed-dim/20 p-6 rounded-[2rem] flex-1 flex flex-col justify-between">
            <span className="bg-secondary text-on-secondary text-[10px] uppercase font-headline font-bold tracking-widest px-2.5 py-1 rounded-full w-fit">
              Đã hoàn thành
            </span>
            <div>
              <h3 className="font-headline text-3xl font-extrabold text-on-secondary-container mt-3">
                {doneCount}/{QUIZZES.length}
              </h3>
              <div className="w-full h-2.5 bg-surface-container-highest rounded-full mt-3 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-secondary to-secondary-fixed-dim rounded-full"
                  style={{ width: `${(doneCount / QUIZZES.length) * 100}%` }}
                />
              </div>
              <p className="text-xs text-on-surface-variant mt-1">{Math.round((doneCount / QUIZZES.length) * 100)}% hoàn thành</p>
            </div>
          </div>
          <div className="bg-surface-container-lowest border border-outline-variant/10 p-6 rounded-[2rem] flex-1 flex items-center justify-between shadow-sm">
            <div>
              <p className="text-on-surface-variant text-sm">Điểm trung bình</p>
              <h3 className="font-headline text-3xl font-extrabold text-secondary mt-1">{avgScore}%</h3>
            </div>
            <div className="h-16 w-16 bg-secondary-fixed rounded-2xl flex items-center justify-center text-secondary shrink-0">
              <span className="material-symbols-outlined text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>grade</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Filters ──────────────────────────────────────────────────────── */}
      <section className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2 flex-wrap">
          {CATEGORIES.map((c) => (
            <button key={c} onClick={() => setSelectedCategory(c)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${
                selectedCategory === c
                  ? 'bg-secondary text-on-secondary font-bold shadow-md'
                  : 'bg-surface-container-low text-on-surface-variant hover:bg-secondary/10'
              }`}>
              {c}
            </button>
          ))}
        </div>
        <div className="relative">
          <select value={selectedDifficulty} onChange={(e) => setSelectedDifficulty(e.target.value)}
            className="appearance-none bg-surface-container-lowest border border-outline-variant/30 rounded-full pl-6 pr-10 py-2.5 text-sm font-medium text-on-surface focus:outline-none focus:ring-2 focus:ring-secondary/20 shadow-sm cursor-pointer">
            {DIFFICULTIES.map((d) => <option key={d} value={d}>{d === 'Tất cả' ? 'Độ khó: Tất cả' : d}</option>)}
          </select>
          <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-outline text-[1.2rem]">expand_more</span>
        </div>
      </section>

      {/* ── Quiz Grid ────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((quiz) => (
          <div key={quiz.id} className="bg-surface-container-low rounded-[1.5rem] p-6 flex flex-col gap-4 hover:shadow-lg hover:-translate-y-1 transition-all border border-outline-variant/10 relative overflow-hidden">
            {quiz.isNew && (
              <span className="absolute top-4 right-4 bg-primary text-on-primary text-[10px] font-headline font-bold px-2.5 py-1 rounded-full">MỚI</span>
            )}

            <div className="flex items-start gap-4">
              <div className={`w-13 h-13 w-14 h-14 rounded-2xl ${quiz.iconBg} flex items-center justify-center shrink-0`}>
                <span className={`material-symbols-outlined text-[1.8rem] ${quiz.iconColor}`} style={{ fontVariationSettings: "'FILL' 1" }}>
                  {quiz.icon}
                </span>
              </div>
              <div className="flex-1">
                <h3 className="font-headline font-bold text-on-surface leading-snug">{quiz.title}</h3>
                <p className="text-on-surface-variant text-xs mt-1">{quiz.category}</p>
              </div>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              <span className={`px-2.5 py-1 rounded-full text-[11px] font-headline font-bold ${difficultyStyle[quiz.difficulty]}`}>
                {quiz.difficulty}
              </span>
              <span className="text-on-surface-variant text-xs flex items-center gap-1">
                <span className="material-symbols-outlined text-[0.9rem]">help</span>
                {quiz.questions} câu
              </span>
              <span className="text-on-surface-variant text-xs flex items-center gap-1">
                <span className="material-symbols-outlined text-[0.9rem]">schedule</span>
                {quiz.duration}
              </span>
            </div>

            {quiz.bestScore !== undefined && (
              <div className="flex items-center gap-2 bg-surface-container rounded-xl px-3 py-2">
                <span className="material-symbols-outlined text-secondary text-[1rem]" style={{ fontVariationSettings: "'FILL' 1" }}>emoji_events</span>
                <span className="text-xs text-on-surface-variant">Điểm cao nhất:</span>
                <span className="font-headline font-bold text-secondary text-sm">{quiz.bestScore}%</span>
              </div>
            )}

            <div className="flex gap-3 mt-auto">
              <button className="flex-1 bg-secondary text-on-secondary py-2.5 rounded-full font-headline font-bold text-sm hover:opacity-90 active:scale-95 transition-all">
                {quiz.bestScore !== undefined ? 'Làm lại' : 'Bắt đầu'}
              </button>
              <button className="px-4 py-2.5 rounded-full border border-outline-variant text-on-surface-variant text-sm hover:bg-surface-container transition-colors">
                Xem trước
              </button>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="flex flex-col items-center py-24 text-center">
          <span className="material-symbols-outlined text-[4rem] text-on-surface-variant/30 mb-4">search_off</span>
          <h3 className="font-headline font-bold text-xl mb-2">Không tìm thấy bài quiz</h3>
          <p className="text-on-surface-variant text-sm">Thử thay đổi bộ lọc.</p>
        </div>
      )}

      {/* Quick jump */}
      <div className="mt-12 flex flex-col sm:flex-row gap-4">
        <Link to="/listening" className="no-underline flex-1">
          <div className="bg-primary/5 border border-primary/15 rounded-2xl p-5 flex items-center gap-4 hover:bg-primary/10 transition-colors cursor-pointer">
            <span className="material-symbols-outlined text-primary text-[2rem]" style={{ fontVariationSettings: "'FILL' 1" }}>headphones</span>
            <div>
              <p className="font-headline font-bold text-on-surface">Luyện nghe</p>
              <p className="text-on-surface-variant text-xs">Nghe và chép chính tả</p>
            </div>
            <span className="material-symbols-outlined text-outline ml-auto">arrow_forward</span>
          </div>
        </Link>
        <Link to="/vocabulary" className="no-underline flex-1">
          <div className="bg-secondary/5 border border-secondary/15 rounded-2xl p-5 flex items-center gap-4 hover:bg-secondary/10 transition-colors cursor-pointer">
            <span className="material-symbols-outlined text-secondary text-[2rem]" style={{ fontVariationSettings: "'FILL' 1" }}>menu_book</span>
            <div>
              <p className="font-headline font-bold text-on-surface">Từ vựng</p>
              <p className="text-on-surface-variant text-xs">Ôn tập flashcard</p>
            </div>
            <span className="material-symbols-outlined text-outline ml-auto">arrow_forward</span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default QuizPage;
