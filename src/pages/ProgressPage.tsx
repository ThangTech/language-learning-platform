import { Link } from 'react-router-dom';

const ProgressPage = () => {
  return (
    <div className="min-h-screen pt-20">
      <div className="max-w-7xl mx-auto px-8 py-16">
        <h1 className="font-headline text-4xl font-bold mb-4">Tiến độ luyện nghe</h1>
        <p className="text-on-surface-variant max-w-2xl mb-8">
          Theo dõi số bài nghe đã hoàn thành, mức độ đang học và nhịp tiến bộ của bạn trong lộ trình VSTEPS.
        </p>

        <div className="flex flex-wrap gap-3">
          <Link to="/listening" className="no-underline">
            <button className="px-5 py-3 rounded-full bg-primary text-on-primary font-headline font-bold text-sm hover:opacity-90 transition-all">
              Đi tới Listening
            </button>
          </Link>
          <Link to="/vocabulary" className="no-underline">
            <button className="px-5 py-3 rounded-full border border-primary text-primary font-headline font-bold text-sm hover:bg-primary/5 transition-all">
              Ôn từ vựng
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProgressPage;