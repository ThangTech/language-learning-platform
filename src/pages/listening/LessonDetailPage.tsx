import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { message } from 'antd';
import AudioPlayer from '../../components/listening/AudioPlayer';
import QuizCard, { type QuizData } from '../../components/listening/QuizCard';
import { getLessonById, getDictationSets } from '../../services/listening';
import { getQuizzesByLesson } from '../../services/quiz';
import type { DictationSetDto, ListeningLessonDto } from '../../interfaces/listening';

interface TranscriptLine {
  time: string;
  speaker: string;
  text: string;
}

const parseTranscript = (value?: string) => {
  if (!value) return [] as TranscriptLine[];

  try {
    return JSON.parse(value) as TranscriptLine[];
  } catch {
    return [] as TranscriptLine[];
  }
};

const LessonDetailPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [lesson, setLesson] = useState<ListeningLessonDto | null>(null);
  const [dictationSet, setDictationSet] = useState<DictationSetDto | null>(null);
  const [quizzes, setQuizzes] = useState<QuizData[]>([]);
  const [showTranscript, setShowTranscript] = useState(false);
  const [activeHighlight, setActiveHighlight] = useState<number | null>(null);

  useEffect(() => {
    const load = async () => {
      if (!id) return;

      try {
        const [lessonRes, dictationRes, quizRes] = await Promise.all([
          getLessonById(id),
          getDictationSets(),
          getQuizzesByLesson(id),
        ]);

        if (lessonRes.success && lessonRes.data) {
          setLesson(lessonRes.data);
        } else {
          message.error(lessonRes.message || 'Không thể tải bài nghe');
        }

        if (dictationRes.success && dictationRes.data) {
          const matched = dictationRes.data.find((item) => item.lessonId === id) ?? null;
          setDictationSet(matched);
        }

        if (quizRes.success && quizRes.data) {
          setQuizzes(quizRes.data.map((quiz) => ({
            id: quiz.id,
            title: quiz.title,
            description: quiz.description,
            totalQuestions: quiz.questions?.length ?? 0,
            difficulty: quiz.difficulty as QuizData['difficulty'],
            difficultyColor: quiz.difficultyColor,
            type: quiz.type as QuizData['type'],
            typeIcon: quiz.typeIcon,
            duration: quiz.duration,
          })));
        }
      } catch (error: any) {
        message.error(error?.response?.data?.message || 'Lỗi kết nối');
      }
    };

    load();
  }, [id]);

  const transcriptLines = parseTranscript(lesson?.transcriptJson);
  const levelColor = lesson?.level === 'A1' || lesson?.level === 'A2'
    ? 'bg-primary-fixed text-on-primary-fixed'
    : 'bg-secondary-fixed text-on-secondary-container';
  const lessonTitle = lesson?.title || 'Bài nghe';
  const lessonDuration = lesson ? `${Math.floor(lesson.duration / 60)}:${(lesson.duration % 60).toString().padStart(2, '0')}` : '0:00';
  const dictationQuiz = dictationSet
    ? [{
        id: dictationSet.id,
        title: dictationSet.title,
        description: dictationSet.description,
        totalQuestions: dictationSet.totalExercises,
        difficulty: dictationSet.level === 'A1' || dictationSet.level === 'A2' ? 'Dễ' : 'Trung bình',
        difficultyColor: dictationSet.level === 'A1' || dictationSet.level === 'A2' ? 'bg-secondary/10 text-secondary' : 'bg-tertiary/10 text-tertiary',
        type: 'Chép chính tả',
        typeIcon: 'keyboard',
        duration: `${dictationSet.totalExercises} câu`,
      } satisfies QuizData]
    : [];
  const startQuiz = quizzes[0] ?? dictationQuiz[0] ?? null;

  if (!lesson) {
    return (
      <div className="max-w-3xl mx-auto py-20 text-center text-on-surface-variant">
        Đang tải bài nghe...
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto pb-20">
      <nav className="flex items-center gap-2 text-sm text-on-surface-variant mb-8">
        <Link to="/listening" className="hover:text-primary transition-colors no-underline">Luyện nghe</Link>
        <span className="material-symbols-outlined text-[1rem]">chevron_right</span>
        <span className="text-on-surface font-medium">{lessonTitle}</span>
      </nav>

      <div className="grid grid-cols-12 gap-8">
        <div className="col-span-12 lg:col-span-8 flex flex-col gap-8">
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2 flex-wrap">
              <span className={`px-3 py-1 rounded-full text-xs font-headline font-bold ${levelColor}`}>
                {lesson.level}
              </span>
              <span className="flex items-center gap-1 text-xs text-on-surface-variant bg-surface-container px-3 py-1 rounded-full">
                <span className="material-symbols-outlined text-[0.9rem]">{lesson.topicIcon || 'headphones'}</span>
                {lesson.topic}
              </span>
              <span className="flex items-center gap-1 text-xs text-on-surface-variant bg-surface-container px-3 py-1 rounded-full">
                <span className="material-symbols-outlined text-[0.9rem]">schedule</span>
                {lessonDuration}
              </span>
            </div>
            <h1 className="font-headline text-3xl md:text-4xl font-extrabold text-on-surface leading-tight">{lesson.title}</h1>
            <p className="text-on-surface-variant text-base leading-relaxed max-w-2xl">{lesson.description}</p>
          </div>

          <AudioPlayer title={lesson.audioTitle} totalDuration={lesson.totalDuration} src={lesson.audioUrl || undefined} />

          <div className="bg-primary/5 border border-primary/10 rounded-[1.5rem] p-6">
            <h2 className="font-headline font-bold text-lg text-on-surface mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>target</span>
              Mục tiêu bài học
            </h2>
            <ul className="flex flex-col gap-3">
              {[
                'Hiểu ý chính của bài nghe',
                'Bắt thông tin chi tiết',
                'Nhận diện từ khóa theo ngữ cảnh',
                'Luyện phản xạ nghe thực tế',
              ].map((obj, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-on-surface">
                  <span className="w-5 h-5 rounded-full bg-primary/15 text-primary flex items-center justify-center shrink-0 mt-0.5">
                    <span className="material-symbols-outlined text-[0.85rem]" style={{ fontVariationSettings: "'FILL' 1" }}>check</span>
                  </span>
                  {obj}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-surface-container-low rounded-[1.5rem] border border-outline-variant/10 overflow-hidden">
            <button onClick={() => setShowTranscript(!showTranscript)} className="w-full flex items-center justify-between p-6 hover:bg-surface-container transition-colors">
              <span className="font-headline font-bold text-lg text-on-surface flex items-center gap-2">
                <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>subtitles</span>
                Lời thoại
              </span>
              <span className={`material-symbols-outlined text-on-surface-variant transition-transform ${showTranscript ? 'rotate-180' : ''}`}>expand_more</span>
            </button>

            {showTranscript && (
              <div className="px-6 pb-6 flex flex-col gap-3">
                {transcriptLines.map((line, i) => (
                  <div
                    key={i}
                    onMouseEnter={() => setActiveHighlight(i)}
                    onMouseLeave={() => setActiveHighlight(null)}
                    className={`flex gap-4 p-4 rounded-xl transition-all cursor-default ${activeHighlight === i ? 'bg-primary/5' : ''}`}
                  >
                    <span className="text-xs text-on-surface-variant font-mono mt-1 shrink-0 w-10">{line.time}</span>
                    <div>
                      <span className={`text-xs font-headline font-bold ${line.speaker === 'Nhân viên' ? 'text-primary' : 'text-secondary'}`}>
                        {line.speaker}:
                      </span>
                      <p className="text-on-surface text-sm mt-1 leading-relaxed">{line.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div>
            <h2 className="font-headline font-bold text-2xl text-on-surface mb-6 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>quiz</span>
              Bài kiểm tra liên quan
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[...quizzes, ...dictationQuiz].map((quiz) => (
                <QuizCard key={quiz.id} quiz={quiz} />
              ))}
            </div>
          </div>
        </div>

        <aside className="col-span-12 lg:col-span-4 flex flex-col gap-6">
          <div className="bg-surface-container-low rounded-[1.5rem] p-6 border border-outline-variant/10 flex flex-col gap-4 sticky top-28">
            <h3 className="font-headline font-bold text-lg text-on-surface">Bắt đầu học</h3>

            <div className="flex flex-col gap-3">
              {dictationSet ? (
                <Link to={`/listening/dictation/${dictationSet.id}`} className="no-underline">
                  <button className="w-full bg-primary text-on-primary py-3 rounded-full font-headline font-bold text-sm hover:opacity-90 active:scale-95 transition-all flex items-center justify-center gap-2">
                    <span className="material-symbols-outlined text-[1.1rem]" style={{ fontVariationSettings: "'FILL' 1" }}>keyboard</span>
                    Chép chính tả
                  </button>
                </Link>
              ) : (
                <button className="w-full bg-primary text-on-primary py-3 rounded-full font-headline font-bold text-sm opacity-60 flex items-center justify-center gap-2" disabled>
                  <span className="material-symbols-outlined text-[1.1rem]" style={{ fontVariationSettings: "'FILL' 1" }}>keyboard</span>
                  Chép chính tả
                </button>
              )}
              <button
                onClick={() => {
                  if (startQuiz?.type === 'Chép chính tả') {
                    navigate(`/listening/dictation/${dictationSet?.id}`);
                    return;
                  }
                  navigate('/quiz');
                }}
                className="w-full border border-primary text-primary py-3 rounded-full font-headline font-bold text-sm hover:bg-primary/5 active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined text-[1.1rem]" style={{ fontVariationSettings: "'FILL' 1" }}>fact_check</span>
                Làm bài trắc nghiệm
              </button>
              <button className="w-full border border-outline-variant text-on-surface-variant py-3 rounded-full font-headline font-bold text-sm hover:bg-surface-container transition-all flex items-center justify-center gap-2">
                <span className="material-symbols-outlined text-[1.1rem]">bookmark</span>
                Lưu bài học
              </button>
            </div>

            <div className="border-t border-outline-variant/20 pt-4">
              <h4 className="font-headline font-semibold text-sm text-on-surface-variant mb-3 uppercase tracking-wide">Thông tin bài học</h4>
              <div className="flex flex-col gap-2">
                {[
                  { icon: 'signal_cellular_alt', label: 'Cấp độ', value: lesson.level },
                  { icon: 'schedule', label: 'Thời lượng', value: lessonDuration },
                  { icon: 'quiz', label: 'Số câu hỏi', value: `${[...quizzes, ...dictationQuiz].reduce((a, q) => a + q.totalQuestions, 0)} câu` },
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

          <div className="flex flex-col gap-3">
            <Link
              to="/listening"
              className="w-full flex items-center gap-3 p-4 bg-surface-container-low rounded-2xl border border-outline-variant/10 hover:bg-surface-container transition-colors text-left no-underline"
            >
              <span className="material-symbols-outlined text-primary">arrow_back</span>
              <div>
                <p className="text-xs text-on-surface-variant">Quay lại</p>
                <p className="font-headline font-bold text-sm text-on-surface">Danh sách bài học</p>
              </div>
            </Link>
            <Link
              to="/listening"
              className="w-full flex items-center justify-between gap-3 p-4 bg-surface-container-low rounded-2xl border border-outline-variant/10 hover:bg-surface-container transition-colors text-left no-underline"
            >
              <div>
                <p className="text-xs text-on-surface-variant">Bài tiếp theo</p>
                <p className="font-headline font-bold text-sm text-on-surface">Xem danh sách bài nghe</p>
              </div>
              <span className="material-symbols-outlined text-primary">arrow_forward</span>
            </Link>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default LessonDetailPage;
