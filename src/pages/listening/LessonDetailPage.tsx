import AudioPlayer from '../../components/listening/AudioPlayer';
import QuizCard from '../../components/listening/QuizCard';

const LessonDetailPage = () => {
  return (
    <div className="min-h-screen pt-20">
      <div className="max-w-7xl mx-auto px-8 py-16">
        <h1 className="font-headline text-4xl font-bold mb-4">Chi tiết bài nghe</h1>
        <p className="text-on-surface-variant">Bài học luyện nghe</p>

        <div className="mt-8">
          <AudioPlayer />
        </div>

        <div className="mt-8">
          <h2 className="font-headline text-2xl font-bold mb-4">Quiz liên quan</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <QuizCard />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LessonDetailPage;