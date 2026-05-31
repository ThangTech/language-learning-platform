import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { message } from 'antd';
import { getLessonById } from '../../services/listening';
import { getQuizzesByLesson } from '../../services/quiz';
import AudioPlayer from '../../components/listening/AudioPlayer';
import VstepQuizSection from '../../components/listening/VstepQuizSection';
import VstepDictationSection from '../../components/listening/VstepDictationSection';
import type { ListeningLessonDto } from '../../interfaces/listening';
import type { QuizDto } from '../../interfaces/quiz';

const getLevelColor = (level?: string) => {
  if (level === 'A1' || level === 'A2') return 'bg-primary-fixed text-on-primary-fixed';
  return 'bg-secondary-fixed text-on-secondary-container';
};

const LessonDetailPage = () => {
  const { id } = useParams();
  const [lesson, setLesson] = useState<ListeningLessonDto | null>(null);
  const [quiz, setQuiz] = useState<QuizDto | null>(null);

  useEffect(() => {
    const load = async () => {
      if (!id) return;

      try {
        const [lessonRes, quizRes] = await Promise.all([
          getLessonById(id),
          getQuizzesByLesson(id),
        ]);

        if (lessonRes.success && lessonRes.data) {
          setLesson(lessonRes.data);
        } else {
          message.error(lessonRes.message || 'Không thể tải bài nghe');
        }

        if (quizRes.success && quizRes.data) {
          setQuiz(quizRes.data[0] ?? null);
        }
      } catch (error: any) {
        message.error(error?.response?.data?.message || 'Lỗi kết nối');
      }
    };

    void load();
  }, [id]);

  if (!lesson) {
    return (
      <div className="max-w-3xl mx-auto py-20 text-center text-on-surface-variant">
        Đang tải bài nghe...
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto pb-20">
      <nav className="flex items-center gap-2 text-sm text-on-surface-variant mb-8">
        <Link to="/listening" className="hover:text-primary transition-colors no-underline">
          Luyện nghe
        </Link>
        <span className="material-symbols-outlined text-[1rem]">chevron_right</span>
        <span className="text-on-surface font-medium">{lesson.title}</span>
      </nav>

      <div className="mb-6 flex flex-wrap items-center gap-3">
        <span className={`rounded-full px-3 py-1 text-xs font-headline font-bold ${getLevelColor(lesson.level)}`}>
          {lesson.level}
        </span>
        <span className="text-sm text-on-surface-variant">
          {Math.floor(lesson.duration / 60)}:{(lesson.duration % 60).toString().padStart(2, '0')}
        </span>
      </div>

      <h1 className="font-headline text-3xl font-extrabold text-on-surface mb-2">
        {lesson.title}
      </h1>
      <p className="text-on-surface-variant mb-8 max-w-2xl">
        {lesson.description}
      </p>

      <AudioPlayer
        title={lesson.audioTitle}
        totalDuration={lesson.totalDuration}
        src={lesson.audioUrl || undefined}
      />

      {quiz && quiz.questions.length > 0 && (
        <>
          <VstepQuizSection quizId={quiz.id} questions={quiz.questions} />
          <VstepDictationSection questions={quiz.questions} />
        </>
      )}
    </div>
  );
};

export default LessonDetailPage;
