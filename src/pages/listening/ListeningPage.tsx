import { useState } from 'react';
import { Link } from 'react-router-dom';
import LessonCard, { type LessonData } from '../../components/listening/LessonCard';
import QuizCard, { type QuizData } from '../../components/listening/QuizCard';

// ─── Mock Data ────────────────────────────────────────────────────────────────
const LESSONS: LessonData[] = [
  {
    id: 'l1',
    title: 'Hội thoại tại sân bay',
    description: 'Luyện nghe các tình huống giao tiếp thực tế tại sân bay: check-in, hải quan, lên máy bay.',
    level: 'A2',
    levelColor: 'bg-primary-fixed text-on-primary-fixed',
    duration: '3:05',
    totalQuestions: 5,
    topic: 'Du lịch',
    topicIcon: 'flight',
    isCompleted: true,
    score: 92,
  },
  {
    id: 'l2',
    title: 'Tin tức buổi sáng – Môi trường',
    description: 'Nghe bản tin thời sự tiếng Anh về biến đổi khí hậu và môi trường toàn cầu.',
    level: 'B2',
    levelColor: 'bg-secondary-fixed text-on-secondary-container',
    duration: '4:30',
    totalQuestions: 8,
    topic: 'Tin tức',
    topicIcon: 'newspaper',
    isCompleted: false,
  },
  {
    id: 'l3',
    title: 'Bài giảng đại học: Kinh tế học',
    description: 'Nghe trích đoạn bài giảng học thuật về cung cầu và thị trường tự do.',
    level: 'C1',
    levelColor: 'bg-tertiary-fixed text-on-tertiary',
    duration: '6:15',
    totalQuestions: 10,
    topic: 'Học thuật',
    topicIcon: 'school',
    isCompleted: false,
  },
  {
    id: 'l4',
    title: 'Đặt bàn tại nhà hàng',
    description: 'Tình huống đặt bàn, gọi món và thanh toán tại nhà hàng theo phong cách Anh-Mỹ.',
    level: 'A1',
    levelColor: 'bg-primary-fixed text-on-primary-fixed',
    duration: '2:20',
    totalQuestions: 4,
    topic: 'Ẩm thực',
    topicIcon: 'restaurant',
    isCompleted: true,
    score: 78,
  },
  {
    id: 'l5',
    title: 'Podcast: Công nghệ & Tương lai',
    description: 'Lắng nghe cuộc trò chuyện giữa hai chuyên gia về AI và tương lai của công việc.',
    level: 'B2',
    levelColor: 'bg-secondary-fixed text-on-secondary-container',
    duration: '7:00',
    totalQuestions: 9,
    topic: 'Công nghệ',
    topicIcon: 'podcasts',
    isCompleted: false,
  },
  {
    id: 'l6',
    title: 'Phỏng vấn xin việc',
    description: 'Nghe và phân tích cuộc phỏng vấn xin việc bằng tiếng Anh với câu hỏi phổ biến.',
    level: 'B1',
    levelColor: 'bg-secondary-fixed text-on-secondary-container',
    duration: '5:45',
    totalQuestions: 7,
    topic: 'Nghề nghiệp',
    topicIcon: 'work',
    isCompleted: false,
  },
];

const QUIZZES: QuizData[] = [
  {
    id: 'q1',
    title: 'Nghe chọn đáp án đúng – Chủ đề Du lịch',
    description: 'Bài kiểm tra trắc nghiệm sau khi nghe các đoạn hội thoại về chủ đề du lịch.',
    totalQuestions: 10,
    difficulty: 'Dễ',
    difficultyColor: 'bg-secondary/10 text-secondary',
    type: 'Trắc nghiệm',
    typeIcon: 'fact_check',
    duration: '10 phút',
    isNew: false,
  },
  {
    id: 'q2',
    title: 'Điền từ còn thiếu – Bản tin thời sự',
    description: 'Nghe bản tin và điền các từ còn thiếu vào chỗ trống trong transcript.',
    totalQuestions: 8,
    difficulty: 'Trung bình',
    difficultyColor: 'bg-tertiary/10 text-tertiary',
    type: 'Điền vào chỗ trống',
    typeIcon: 'border_color',
    duration: '15 phút',
    isNew: true,
  },
  {
    id: 'q3',
    title: 'Chép chính tả – Hội thoại ngắn',
    description: 'Nghe và gõ lại từng câu trong đoạn hội thoại ngắn. Kiểm tra độ chính xác từng từ.',
    totalQuestions: 6,
    difficulty: 'Trung bình',
    difficultyColor: 'bg-tertiary/10 text-tertiary',
    type: 'Chép chính tả',
    typeIcon: 'keyboard',
    duration: '12 phút',
    isNew: false,
  },
  {
    id: 'q4',
    title: 'Xác định ý chính – Bài giảng học thuật',
    description: 'Nghe đoạn bài giảng ngắn và trả lời các câu hỏi về ý chính và thông tin chi tiết.',
    totalQuestions: 12,
    difficulty: 'Khó',
    difficultyColor: 'bg-error/10 text-error',
    type: 'Trắc nghiệm',
    typeIcon: 'psychology',
    duration: '20 phút',
    isNew: true,
  },
];

const LEVELS = ['Tất cả', 'A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
const TOPICS = ['Tất cả', 'Du lịch', 'Tin tức', 'Học thuật', 'Ẩm thực', 'Công nghệ', 'Nghề nghiệp'];

// ─── Component ────────────────────────────────────────────────────────────────
const ListeningPage = () => {
  const [selectedLevel, setSelectedLevel] = useState('Tất cả');
  const [selectedTopic, setSelectedTopic] = useState('Tất cả');
  const [activeTab, setActiveTab] = useState<'lessons' | 'quizzes'>('lessons');

  const filteredLessons = LESSONS.filter((l) => {
    const matchLevel = selectedLevel === 'Tất cả' || l.level === selectedLevel;
    const matchTopic = selectedTopic === 'Tất cả' || l.topic === selectedTopic;
    return matchLevel && matchTopic;
  });

  const completedCount = LESSONS.filter((l) => l.isCompleted).length;
  const totalLessons = LESSONS.length;
  const progressPct = Math.round((completedCount / totalLessons) * 100);

  return (
    <div className="max-w-7xl mx-auto pb-20">

      {/* ── Hero Section ─────────────────────────────────────────────────── */}
      <section className="mb-10 grid grid-cols-12 gap-6">

        {/* Left — gradient hero card */}
        <div className="col-span-12 lg:col-span-8 bg-gradient-to-br from-primary to-primary-container p-10 rounded-[2rem] text-on-primary relative overflow-hidden flex flex-col justify-end min-h-[280px]">
          {/* Decorative icon */}
          <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 translate-x-1/4 -translate-y-1/4 pointer-events-none select-none">
            <span className="material-symbols-outlined text-[18rem] text-white">headphones</span>
          </div>

          <div className="relative z-10">
            <h1 className="font-headline text-4xl font-extrabold tracking-tight mb-3 max-w-lg leading-tight">
              Luyện nghe tiếng Anh<br />mỗi ngày.
            </h1>
            <p className="text-primary-fixed text-base font-body max-w-md mb-8 leading-relaxed">
              Cải thiện kỹ năng nghe qua các đoạn hội thoại, podcast và bài giảng thực tế. Luyện tai, phản xạ và từ vựng cùng lúc.
            </p>
            <Link to="/listening/dictation/d1" className="no-underline">
              <button className="bg-white text-primary px-7 py-3.5 rounded-full font-headline font-bold flex items-center gap-2 hover:opacity-90 active:scale-95 transition-all w-fit shadow-lg text-sm">
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>keyboard</span>
                Thử chép chính tả
              </button>
            </Link>
          </div>
        </div>

        {/* Right — stat cards */}
        <div className="col-span-12 lg:col-span-4 flex flex-col gap-5">
          {/* Progress card */}
          <div className="bg-secondary-container/30 p-6 rounded-[2rem] flex-1 flex flex-col justify-between border border-secondary-fixed-dim/20">
            <div>
              <span className="bg-secondary text-on-secondary text-[10px] uppercase font-headline font-bold tracking-widest px-2.5 py-1 rounded-full">
                Tiến độ học
              </span>
              <h3 className="font-headline text-2xl font-bold mt-4 text-on-secondary-container">
                {completedCount}/{totalLessons} Bài
              </h3>
            </div>
            <div>
              <div className="w-full h-3 bg-surface-container-highest rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-secondary to-secondary-fixed-dim rounded-full shadow-[0_0_8px_rgba(0,108,73,0.25)] transition-all duration-700"
                  style={{ width: `${progressPct}%` }}
                />
              </div>
              <p className="text-xs text-on-surface-variant mt-1.5 font-medium">{progressPct}% hoàn thành</p>
            </div>
          </div>

          {/* Streak / Level card */}
          <div className="bg-surface-container-lowest p-6 rounded-[2rem] flex-1 shadow-sm border border-outline-variant/10 flex items-center justify-between">
            <div>
              <p className="text-on-surface-variant font-body text-sm">Chuỗi ngày học</p>
              <h3 className="font-headline text-3xl font-extrabold text-primary mt-1">7 ngày 🔥</h3>
            </div>
            <div className="h-16 w-16 bg-primary-fixed rounded-2xl flex items-center justify-center text-primary shrink-0">
              <span className="material-symbols-outlined text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>local_fire_department</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Quick Stats ──────────────────────────────────────────────────── */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        {[
          { icon: 'hearing', label: 'Bài đã nghe', value: '14', color: 'text-primary' },
          { icon: 'timer', label: 'Giờ luyện tập', value: '3.5h', color: 'text-secondary' },
          { icon: 'spellcheck', label: 'Chính tả đúng', value: '87%', color: 'text-tertiary' },
          { icon: 'emoji_events', label: 'Điểm cao nhất', value: '98%', color: 'text-primary' },
        ].map((stat) => (
          <div key={stat.label} className="bg-surface-container-low rounded-2xl p-5 flex items-center gap-4 border border-outline-variant/10">
            <div className={`w-11 h-11 rounded-xl bg-surface-container-high flex items-center justify-center ${stat.color}`}>
              <span className="material-symbols-outlined text-[1.4rem]" style={{ fontVariationSettings: "'FILL' 1" }}>
                {stat.icon}
              </span>
            </div>
            <div>
              <p className={`font-headline text-xl font-extrabold ${stat.color}`}>{stat.value}</p>
              <p className="text-on-surface-variant text-xs">{stat.label}</p>
            </div>
          </div>
        ))}
      </section>

      {/* ── Tabs ─────────────────────────────────────────────────────────── */}
      <div className="flex items-center gap-2 mb-8 border-b border-outline-variant/30">
        {(['lessons', 'quizzes'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-3 font-headline font-bold text-sm transition-all border-b-2 -mb-px ${
              activeTab === tab
                ? 'border-primary text-primary'
                : 'border-transparent text-on-surface-variant hover:text-on-surface'
            }`}
          >
            {tab === 'lessons' ? (
              <span className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[1.1rem]">play_circle</span>
                Bài học ({LESSONS.length})
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[1.1rem]">quiz</span>
                Bài kiểm tra ({QUIZZES.length})
              </span>
            )}
          </button>
        ))}
      </div>

      {/* ── Filters (Lessons only) ────────────────────────────────────────── */}
      {activeTab === 'lessons' && (
        <section className="mb-8 flex flex-wrap items-center justify-between gap-4">
          {/* Level pills */}
          <div className="flex items-center gap-2 flex-wrap">
            {LEVELS.map((lvl) => (
              <button
                key={lvl}
                onClick={() => setSelectedLevel(lvl)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${
                  selectedLevel === lvl
                    ? 'bg-primary text-on-primary font-bold shadow-md'
                    : 'bg-surface-container-low text-on-surface-variant hover:bg-primary-fixed/30'
                }`}
              >
                {lvl}
              </button>
            ))}
          </div>

          {/* Topic dropdown */}
          <div className="relative">
            <select
              value={selectedTopic}
              onChange={(e) => setSelectedTopic(e.target.value)}
              className="appearance-none bg-surface-container-lowest border border-outline-variant/30 rounded-full pl-6 pr-10 py-2.5 text-sm font-medium text-on-surface focus:ring-2 focus:ring-primary/20 focus:border-primary focus:outline-none transition-all shadow-sm cursor-pointer"
            >
              {TOPICS.map((t) => (
                <option key={t} value={t}>
                  {t === 'Tất cả' ? 'Chủ đề: Tất cả' : t}
                </option>
              ))}
            </select>
            <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-outline text-[1.2rem]">
              expand_more
            </span>
          </div>
        </section>
      )}

      {/* ── Content Grid ─────────────────────────────────────────────────── */}
      {activeTab === 'lessons' ? (
        filteredLessons.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredLessons.map((lesson) => (
              <LessonCard key={lesson.id} lesson={lesson} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <span className="material-symbols-outlined text-[4rem] text-on-surface-variant/30 mb-4">search_off</span>
            <h3 className="font-headline font-bold text-xl text-on-surface mb-2">Không tìm thấy bài học</h3>
            <p className="text-on-surface-variant">Thử thay đổi bộ lọc cấp độ hoặc chủ đề.</p>
          </div>
        )
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {QUIZZES.map((quiz) => (
            <QuizCard key={quiz.id} quiz={quiz} />
          ))}
        </div>
      )}

      {/* ── Floating Jewel ───────────────────────────────────────────────── */}
      <div className="fixed bottom-10 right-10 z-50">
        <div className="bg-surface/60 backdrop-blur-md p-2 rounded-full shadow-2xl border border-outline-variant/20 flex items-center gap-4 pr-6">
          <div className="h-12 w-12 rounded-full bg-gradient-to-tr from-primary to-primary-container flex items-center justify-center text-white shadow-lg">
            <span className="material-symbols-outlined text-[1.5rem]" style={{ fontVariationSettings: "'FILL' 1" }}>
              headphones
            </span>
          </div>
          <div>
            <p className="font-headline text-[10px] font-bold text-on-surface-variant uppercase tracking-tighter">
              Luyện nghe
            </p>
            <p className="font-headline text-sm font-bold text-on-surface">Tiếp tục hôm nay</p>
          </div>
        </div>
      </div>

    </div>
  );
};

export default ListeningPage;
