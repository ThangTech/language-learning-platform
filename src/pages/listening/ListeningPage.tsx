import LessonCard from '../../components/listening/LessonCard';
import QuizCard from '../../components/listening/QuizCard';

const ListeningPage = () => {
  return (
    <div className="min-h-screen pt-20">
      <div className="max-w-7xl mx-auto px-8 py-16">
        <h1 className="font-headline text-4xl font-bold mb-4">Luyện nghe</h1>
        <p className="text-on-surface-variant">Nâng cao kỹ năng nghe tiếng Anh</p>

        <div className="mt-8">
          <h2 className="font-headline text-2xl font-bold mb-4">Bài học</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <LessonCard />
            <LessonCard />
            <LessonCard />
          </div>
        </div>

        <div className="mt-8">
          <h2 className="font-headline text-2xl font-bold mb-4">Quiz</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <QuizCard />
            <QuizCard />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListeningPage;