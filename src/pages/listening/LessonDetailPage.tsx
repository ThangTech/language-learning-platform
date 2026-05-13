import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import AudioPlayer from '../../components/listening/AudioPlayer';
import QuizCard, { type QuizData } from '../../components/listening/QuizCard';

// ─── Mock Lesson Data ─────────────────────────────────────────────────────────
const MOCK_LESSON = {
  id: 'l1',
  title: 'Hội thoại tại sân bay',
  description: 'Luyện nghe các tình huống giao tiếp thực tế tại sân bay: check-in, hải quan, lên máy bay.',
  level: 'A2',
  levelColor: 'bg-primary-fixed text-on-primary-fixed',
  topic: 'Du lịch',
  topicIcon: 'flight',
  duration: '3:05',
  totalDuration: 185,
  objectives: [
    'Hiểu các từ vựng liên quan đến sân bay và du lịch',
    'Nắm bắt thông tin chi tiết trong hội thoại ngắn',
    'Phân biệt giọng Anh-Mỹ trong tình huống thực tế',
    'Luyện phản xạ nghe theo tốc độ tự nhiên',
  ],
  transcript: [
    { time: '0:00', speaker: 'Nhân viên', text: "Good morning! Welcome to Terminal 3. May I see your passport and boarding pass, please?" },
    { time: '0:08', speaker: 'Hành khách', text: "Of course. Here you go. I also have a checked bag." },
    { time: '0:14', speaker: 'Nhân viên', text: "Thank you. Are you traveling alone today, or with someone?" },
    { time: '0:20', speaker: 'Hành khách', text: "I'm traveling alone. My flight is to New York — JFK." },
    { time: '0:28', speaker: 'Nhân viên', text: "Perfect. Your bag will be checked through to JFK. Here is your boarding pass. Your gate is B14, and boarding starts at 10:15." },
    { time: '0:40', speaker: 'Hành khách', text: "Thank you so much! Is there a lounge near gate B14?" },
    { time: '0:47', speaker: 'Nhân viên', text: "Yes, there is a lounge on Level 2, just past the security checkpoint. Have a safe flight!" },
  ],
  audioTitle: 'Hội thoại tại sân bay – Check-in quầy',
};

const RELATED_QUIZZES: QuizData[] = [
  {
    id: 'rq1',
    title: 'Trắc nghiệm: Hội thoại sân bay',
    description: 'Kiểm tra mức độ hiểu của bạn sau khi nghe đoạn hội thoại check-in tại sân bay.',
    totalQuestions: 5,
    difficulty: 'Dễ',
    difficultyColor: 'bg-secondary/10 text-secondary',
    type: 'Trắc nghiệm',
    typeIcon: 'fact_check',
    duration: '8 phút',
  },
  {
    id: 'rq2',
    title: 'Chép chính tả: Câu hội thoại',
    description: 'Nghe từng câu và gõ lại chính xác nội dung, bao gồm dấu câu.',
    totalQuestions: 7,
    difficulty: 'Trung bình',
    difficultyColor: 'bg-tertiary/10 text-tertiary',
    type: 'Chép chính tả',
    typeIcon: 'keyboard',
    duration: '10 phút',
    isNew: true,
  },
];

// ─── Component ────────────────────────────────────────────────────────────────
const LessonDetailPage = () => {
  const { id } = useParams();
  const lesson = MOCK_LESSON;
  void id;

  const [showTranscript, setShowTranscript] = useState(false);
  const [activeHighlight, setActiveHighlight] = useState<number | null>(null);
  const transcriptLines = lesson.transcript;

  return (
    <div className="max-w-7xl mx-auto pb-20">

      {/* ── Breadcrumb ───────────────────────────────────────────────────── */}
      <nav className="flex items-center gap-2 text-sm text-on-surface-variant mb-8">
        <Link to="/listening" className="hover:text-primary transition-colors no-underline">Luyện nghe</Link>
        <span className="material-symbols-outlined text-[1rem]">chevron_right</span>
        <span className="text-on-surface font-medium">{lesson.title}</span>
      </nav>

      <div className="grid grid-cols-12 gap-8">

        {/* ── Left Column ──────────────────────────────────────────────── */}
        <div className="col-span-12 lg:col-span-8 flex flex-col gap-8">

          {/* Lesson Header */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2 flex-wrap">
              <span className={`px-3 py-1 rounded-full text-xs font-headline font-bold ${lesson.levelColor}`}>
                {lesson.level}
              </span>
              <span className="flex items-center gap-1 text-xs text-on-surface-variant bg-surface-container px-3 py-1 rounded-full">
                <span className="material-symbols-outlined text-[0.9rem]">{lesson.topicIcon}</span>
                {lesson.topic}
              </span>
              <span className="flex items-center gap-1 text-xs text-on-surface-variant bg-surface-container px-3 py-1 rounded-full">
                <span className="material-symbols-outlined text-[0.9rem]">schedule</span>
                {lesson.duration}
              </span>
            </div>
            <h1 className="font-headline text-3xl md:text-4xl font-extrabold text-on-surface leading-tight">
              {lesson.title}
            </h1>
            <p className="text-on-surface-variant text-base leading-relaxed max-w-2xl">
              {lesson.description}
            </p>
          </div>

          {/* Audio Player */}
          <AudioPlayer
            title={lesson.audioTitle}
            totalDuration={lesson.totalDuration}
          />

          {/* Objectives */}
          <div className="bg-primary/5 border border-primary/10 rounded-[1.5rem] p-6">
            <h2 className="font-headline font-bold text-lg text-on-surface mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>target</span>
              Mục tiêu bài học
            </h2>
            <ul className="flex flex-col gap-3">
              {lesson.objectives.map((obj, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-on-surface">
                  <span className="w-5 h-5 rounded-full bg-primary/15 text-primary flex items-center justify-center shrink-0 mt-0.5">
                    <span className="material-symbols-outlined text-[0.85rem]" style={{ fontVariationSettings: "'FILL' 1" }}>check</span>
                  </span>
                  {obj}
                </li>
              ))}
            </ul>
          </div>

          {/* Transcript toggle */}
          <div className="bg-surface-container-low rounded-[1.5rem] border border-outline-variant/10 overflow-hidden">
            <button
              onClick={() => setShowTranscript(!showTranscript)}
              className="w-full flex items-center justify-between p-6 hover:bg-surface-container transition-colors"
            >
              <span className="font-headline font-bold text-lg text-on-surface flex items-center gap-2">
                <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>subtitles</span>
                Transcript (Bản ghi lời thoại)
              </span>
              <span className={`material-symbols-outlined text-on-surface-variant transition-transform ${showTranscript ? 'rotate-180' : ''}`}>
                expand_more
              </span>
            </button>

            {showTranscript && (
              <div className="px-6 pb-6 flex flex-col gap-3">
                {transcriptLines.map((line, i) => (
                  <div
                    key={i}
                    onMouseEnter={() => setActiveHighlight(i)}
                    onMouseLeave={() => setActiveHighlight(null)}
                    className={`flex gap-4 p-4 rounded-xl transition-all cursor-default ${
                      activeHighlight === i ? 'bg-primary/5' : ''
                    }`}
                  >
                    <span className="text-xs text-on-surface-variant font-mono mt-1 shrink-0 w-10">{line.time}</span>
                    <div>
                      <span className={`text-xs font-headline font-bold ${
                        line.speaker === 'Nhân viên' ? 'text-primary' : 'text-secondary'
                      }`}>
                        {line.speaker}:
                      </span>
                      <p className="text-on-surface text-sm mt-1 leading-relaxed">{line.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Related Quizzes */}
          <div>
            <h2 className="font-headline font-bold text-2xl text-on-surface mb-6 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>quiz</span>
              Bài kiểm tra liên quan
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {RELATED_QUIZZES.map((quiz) => (
                <QuizCard key={quiz.id} quiz={quiz} />
              ))}
            </div>
          </div>
        </div>

        {/* ── Right Sidebar ────────────────────────────────────────────── */}
        <aside className="col-span-12 lg:col-span-4 flex flex-col gap-6">

          {/* Action Card */}
          <div className="bg-surface-container-low rounded-[1.5rem] p-6 border border-outline-variant/10 flex flex-col gap-4 sticky top-28">
            <h3 className="font-headline font-bold text-lg text-on-surface">Bắt đầu học</h3>

            <div className="flex flex-col gap-3">
              <Link to={`/listening/dictation/d1`} className="no-underline">
                <button className="w-full bg-primary text-on-primary py-3 rounded-full font-headline font-bold text-sm hover:opacity-90 active:scale-95 transition-all flex items-center justify-center gap-2">
                  <span className="material-symbols-outlined text-[1.1rem]" style={{ fontVariationSettings: "'FILL' 1" }}>keyboard</span>
                  Chép chính tả
                </button>
              </Link>
              <button className="w-full border border-primary text-primary py-3 rounded-full font-headline font-bold text-sm hover:bg-primary/5 active:scale-95 transition-all flex items-center justify-center gap-2">
                <span className="material-symbols-outlined text-[1.1rem]" style={{ fontVariationSettings: "'FILL' 1" }}>fact_check</span>
                Làm bài trắc nghiệm
              </button>
              <button className="w-full border border-outline-variant text-on-surface-variant py-3 rounded-full font-headline font-bold text-sm hover:bg-surface-container transition-all flex items-center justify-center gap-2">
                <span className="material-symbols-outlined text-[1.1rem]">bookmark</span>
                Lưu bài học
              </button>
            </div>

            {/* Divider */}
            <div className="border-t border-outline-variant/20 pt-4">
              <h4 className="font-headline font-semibold text-sm text-on-surface-variant mb-3 uppercase tracking-wide">Thông tin bài học</h4>
              <div className="flex flex-col gap-2">
                {[
                  { icon: 'signal_cellular_alt', label: 'Cấp độ', value: lesson.level },
                  { icon: 'schedule', label: 'Thời lượng', value: lesson.duration },
                  { icon: 'quiz', label: 'Số câu hỏi', value: `${RELATED_QUIZZES.reduce((a, q) => a + q.totalQuestions, 0)} câu` },
                  { icon: 'category', label: 'Chủ đề', value: lesson.topic },
                ].map((info) => (
                  <div key={info.label} className="flex items-center justify-between text-sm">
                    <span className="text-on-surface-variant flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-[1rem]">{info.icon}</span>
                      {info.label}
                    </span>
                    <span className="font-medium text-on-surface">{info.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Navigation to prev/next */}
          <div className="flex flex-col gap-3">
            <Link to="/listening" className="no-underline">
              <button className="w-full flex items-center gap-3 p-4 bg-surface-container-low rounded-2xl border border-outline-variant/10 hover:bg-surface-container transition-colors text-left">
                <span className="material-symbols-outlined text-primary">arrow_back</span>
                <div>
                  <p className="text-xs text-on-surface-variant">Quay lại</p>
                  <p className="font-headline font-bold text-sm text-on-surface">Danh sách bài học</p>
                </div>
              </button>
            </Link>
            <Link to="/listening/l2" className="no-underline">
              <button className="w-full flex items-center justify-between gap-3 p-4 bg-surface-container-low rounded-2xl border border-outline-variant/10 hover:bg-surface-container transition-colors text-left">
                <div>
                  <p className="text-xs text-on-surface-variant">Bài tiếp theo</p>
                  <p className="font-headline font-bold text-sm text-on-surface">Tin tức buổi sáng</p>
                </div>
                <span className="material-symbols-outlined text-primary">arrow_forward</span>
              </button>
            </Link>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default LessonDetailPage;
