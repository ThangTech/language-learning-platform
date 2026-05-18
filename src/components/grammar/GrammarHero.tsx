import { Link } from 'react-router-dom';

interface GrammarHeroProps {
  totalTopics: number;
  completedCount: number;
}

const GrammarHero = ({ totalTopics, completedCount }: GrammarHeroProps) => {
  return (
    <section className="bg-surface-container-lowest rounded-[2rem] p-8 border border-outline-variant/10 shadow-sm mb-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div>
          <p className="font-headline text-sm font-bold text-primary uppercase tracking-wider mb-2">
            Ngữ pháp
          </p>
          <h1 className="font-headline text-4xl font-bold text-on-surface mb-3">
            Ngữ pháp cho lộ trình VSTEPS
          </h1>
          <p className="font-body text-on-surface-variant max-w-2xl">
            Học theo chủ đề, xem ví dụ và hoàn thành từng phần để theo dõi tiến độ.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link to="/listening" className="no-underline">
              <button className="px-5 py-2.5 rounded-full bg-primary text-on-primary font-headline font-bold text-sm hover:opacity-90 transition-all">
                Sang Listening
              </button>
            </Link>
            <Link to="/progress" className="no-underline">
              <button className="px-5 py-2.5 rounded-full border border-primary text-primary font-headline font-bold text-sm hover:bg-primary/5 transition-all">
                Xem tiến độ
              </button>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 min-w-[220px]">
          <div className="bg-surface-container-low p-4 rounded-2xl text-center">
            <p className="font-headline text-2xl font-bold text-primary">{totalTopics}</p>
            <p className="font-body text-xs text-on-surface-variant">Chủ đề</p>
          </div>
          <div className="bg-surface-container-low p-4 rounded-2xl text-center">
            <p className="font-headline text-2xl font-bold text-tertiary">{completedCount}</p>
            <p className="font-body text-xs text-on-surface-variant">Đã học</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GrammarHero;
