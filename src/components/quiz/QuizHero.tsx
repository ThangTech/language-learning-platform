interface QuizHeroProps {
  totalQuizzes: number;
}

const QuizHero = ({ totalQuizzes }: QuizHeroProps) => {
  return (
    <section className="mb-10 grid grid-cols-12 gap-6">
      <div className="col-span-12 lg:col-span-8 bg-gradient-to-br from-secondary to-secondary-container p-10 rounded-[2rem] text-on-secondary relative overflow-hidden flex flex-col justify-end min-h-[260px]">
        <div className="absolute top-0 right-0 opacity-10 translate-x-8 -translate-y-4 pointer-events-none select-none">
          <span className="material-symbols-outlined text-[16rem] text-white">quiz</span>
        </div>
        <div className="relative z-10">
          <h1 className="font-headline text-4xl font-extrabold tracking-tight mb-3 max-w-lg leading-tight">
            Kiểm tra kiến thức<br />của bạn.
          </h1>
          <p className="text-secondary-fixed text-base max-w-md mb-8 leading-relaxed">
            Làm quiz để củng cố từ vựng, ngữ pháp và kỹ năng nghe.
          </p>
        </div>
      </div>

      <div className="col-span-12 lg:col-span-4 bg-surface-container-lowest border border-outline-variant/10 p-6 rounded-[2rem] shadow-sm flex items-center justify-between">
        <div>
          <p className="text-on-surface-variant text-sm">Tổng bài quiz</p>
          <h3 className="font-headline text-4xl font-extrabold text-secondary mt-1">{totalQuizzes}</h3>
        </div>
        <div className="h-16 w-16 bg-secondary-fixed rounded-2xl flex items-center justify-center text-secondary shrink-0">
          <span className="material-symbols-outlined text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>grade</span>
        </div>
      </div>
    </section>
  );
};

export default QuizHero;
