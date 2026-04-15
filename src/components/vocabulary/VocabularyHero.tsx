import { useState } from 'react';

interface VocabularyHeroProps {
  wordsToday?: number;
  dailyGoal?: number;
  level?: string;
}

const VocabularyHero = ({
  wordsToday = 24,
  dailyGoal = 30,
  level = 'Nâng cao C1',
}: VocabularyHeroProps) => {
  const progressPct = Math.min(100, Math.round((wordsToday / dailyGoal) * 100));

  return (
    <section className="mb-10 grid grid-cols-12 gap-6">
      {/* Left — gradient hero card */}
      <div
        className="col-span-12 lg:col-span-8 bg-gradient-to-br from-primary to-primary-container
                   p-10 rounded-[2rem] text-on-primary relative overflow-hidden
                   flex flex-col justify-end min-h-[280px]"
      >
        {/* Decorative book illustration */}
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 translate-x-1/4 -translate-y-1/4 pointer-events-none select-none">
          <span className="material-symbols-outlined text-[18rem] text-white">menu_book</span>
        </div>

        <div className="relative z-10">
          <h2 className="font-headline text-4xl font-extrabold tracking-tight mb-3 max-w-lg leading-tight">
            Làm chủ kho từ vựng học thuật của bạn.
          </h2>
          <p className="text-primary-fixed text-base font-body max-w-md mb-8 leading-relaxed">
            Mở rộng vốn từ bằng phương pháp nhớ chủ động. Theo dõi tiến độ từng ngày.
          </p>
          <button
            id="btn-practice-flashcards"
            className="bg-white text-primary px-7 py-3.5 rounded-full font-headline font-bold
                       flex items-center gap-2 hover:opacity-90 active:scale-95
                       transition-all w-fit shadow-lg"
          >
            <span
              className="material-symbols-outlined"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              style
            </span>
            Luyện Flashcard
          </button>
        </div>
      </div>

      {/* Right — stat cards */}
      <div className="col-span-12 lg:col-span-4 flex flex-col gap-5">
        {/* Daily Goal */}
        <div className="bg-secondary-container/30 p-6 rounded-[2rem] flex-1 flex flex-col justify-between border border-secondary-fixed-dim/20">
          <div>
            <span className="bg-secondary text-on-secondary text-[10px] uppercase font-headline font-bold tracking-widest px-2.5 py-1 rounded-full">
              Mục tiêu hôm nay
            </span>
            <h3 className="font-headline text-2xl font-bold mt-4 text-on-secondary-container">
              {wordsToday}/{dailyGoal} Từ
            </h3>
          </div>
          <div>
            <div className="w-full h-3 bg-surface-container-highest rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-secondary to-secondary-fixed-dim rounded-full
                           shadow-[0_0_8px_rgba(0,108,73,0.25)] transition-all duration-700"
                style={{ width: `${progressPct}%` }}
              />
            </div>
            <p className="text-xs text-on-surface-variant mt-1.5 font-medium">{progressPct}% hoàn thành</p>
          </div>
        </div>

        {/* Vocabulary Level */}
        <div
          className="bg-surface-container-lowest p-6 rounded-[2rem] flex-1
                     shadow-sm border border-outline-variant/10
                     flex items-center justify-between"
        >
          <div>
            <p className="text-on-surface-variant font-body text-sm">Cấp độ từ vựng</p>
            <h3 className="font-headline text-3xl font-extrabold text-primary mt-1">{level}</h3>
          </div>
          <div className="h-16 w-16 bg-primary-fixed rounded-2xl flex items-center justify-center text-primary shrink-0">
            <span className="material-symbols-outlined text-4xl">trending_up</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VocabularyHero;
