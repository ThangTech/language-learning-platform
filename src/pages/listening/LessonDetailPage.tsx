import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { message } from 'antd';
import AudioPlayer from '../../components/listening/AudioPlayer';
import QuizCard, { type QuizData } from '../../components/listening/QuizCard';
import LessonDetailHeader from '../../components/listening/LessonDetailHeader';
import LessonTranscript from '../../components/listening/LessonTranscript';
import LessonSidebar from '../../components/listening/LessonSidebar';
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
            description: quiz.description ?? '',
            totalQuestions: quiz.questions?.length ?? 0,
            difficulty: quiz.difficulty as QuizData['difficulty'],
            difficultyColor: quiz.difficultyColor,
            type: quiz.type as QuizData['type'],
            typeIcon: quiz.typeIcon,
            duration: quiz.duration,
            lessonId: quiz.lessonId,
          })));
        }
      } catch (error: any) {
        message.error(error?.response?.data?.message || 'Lỗi kết nối');
      }
    };

    load();
  }, [id]);

  const transcriptLines = parseTranscript(lesson?.transcriptJson);
  const transcriptCount = transcriptLines.length;
  const hasTranscript = transcriptCount > 0;
  const transcriptLabel = hasTranscript ? `${transcriptCount} dòng lời thoại` : 'Chưa có lời thoại';

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
  const totalQuestions = [...quizzes, ...dictationQuiz].reduce((total, quiz) => total + quiz.totalQuestions, 0);

  if (!lesson) {
    return (
      <div className="max-w-3xl mx-auto py-20 text-center text-on-surface-variant">
        Đang tải bài nghe...
      </div>
    );
  }

  const handleOpenQuiz = () => {
    if (startQuiz?.type === 'Chép chính tả' && dictationSet) {
      navigate(`/listening/dictation/${dictationSet.id}`);
      return;
    }

    if (startQuiz?.lessonId) {
      navigate(`/quiz?lessonId=${startQuiz.lessonId}`);
      return;
    }

    navigate('/quiz');
  };

  return (
    <div className="max-w-7xl mx-auto pb-20">
      <nav className="flex items-center gap-2 text-sm text-on-surface-variant mb-8">
        <Link to="/listening" className="hover:text-primary transition-colors no-underline">Luyện nghe</Link>
        <span className="material-symbols-outlined text-[1rem]">chevron_right</span>
        <span className="text-on-surface font-medium">{lessonTitle}</span>
      </nav>

      <div className="grid grid-cols-12 gap-8">
        <div className="col-span-12 lg:col-span-8 flex flex-col gap-8">
          <LessonDetailHeader
            level={lesson.level}
            levelColor={levelColor}
            topicIcon={lesson.topicIcon}
            topic={lesson.topic}
            duration={lessonDuration}
            title={lesson.title}
            description={lesson.description}
          />

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
              ].map((item, index) => (
                <li key={index} className="flex items-start gap-3 text-sm text-on-surface">
                  <span className="w-5 h-5 rounded-full bg-primary/15 text-primary flex items-center justify-center shrink-0 mt-0.5">
                    <span className="material-symbols-outlined text-[0.85rem]" style={{ fontVariationSettings: "'FILL' 1" }}>check</span>
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <LessonTranscript
            showTranscript={showTranscript}
            transcriptLabel={transcriptLabel}
            hasTranscript={hasTranscript}
            transcriptLines={transcriptLines}
            activeHighlight={activeHighlight}
            onToggle={() => setShowTranscript(!showTranscript)}
            onHover={setActiveHighlight}
          />

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

        <LessonSidebar
          lessonLevel={lesson.level}
          lessonDuration={lessonDuration}
          lessonTopic={lesson.topic}
          totalQuestions={totalQuestions}
          dictationSetId={dictationSet?.id}
          hasDictationSet={Boolean(dictationSet)}
          onOpenQuiz={handleOpenQuiz}
        />
      </div>
    </div>
  );
};

export default LessonDetailPage;
