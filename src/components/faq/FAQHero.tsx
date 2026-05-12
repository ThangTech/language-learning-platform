interface FAQHeroProps {
  totalQuestions?: number;
  categories?: string;
  satisfactionRate?: string;
}

const FAQHero = ({
  totalQuestions = 50,
  categories = '8 danh mục',
  satisfactionRate = '95%',
}: FAQHeroProps) => {
  return (
    <section className="mb-10 grid grid-cols-12 gap-6">
      {/* Left — gradient hero card */}
      <div
        className="col-span-12 lg:col-span-8 bg-gradient-to-br from-primary-container to-primary
                   p-10 rounded-[2rem] text-on-primary relative overflow-hidden
                   flex flex-col justify-end min-h-[280px]"
      >
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 translate-x-1/4 -translate-y-1/4 pointer-events-none select-none">
          <span className="material-symbols-outlined text-[18rem] text-white">quiz</span>
        </div>

        <div className="relative z-10">
          <h2 className="font-headline text-4xl font-extrabold tracking-tight mb-3 max-w-lg leading-tight">
            Câu hỏi thường gặp.
          </h2>
          <p className="text-primary-fixed text-base font-body max-w-md mb-8 leading-relaxed">
            Tìm nhanh câu trả lời cho các câu hỏi phổ biến nhất về nền tảng học tiếng Anh của chúng tôi.
          </p>
          <button
            className="bg-white text-primary px-7 py-3.5 rounded-full font-headline font-bold
                       flex items-center gap-2 hover:opacity-90 active:scale-95
                       transition-all w-fit shadow-lg"
          >
            <span
              className="material-symbols-outlined"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              search
            </span>
            Tìm kiếm câu hỏi
          </button>
        </div>
      </div>

      {/* Right — stat cards */}
      <div className="col-span-12 lg:col-span-4 flex flex-col gap-5">
        {/* Total Questions */}
        <div className="bg-surface-container-low/30 p-6 rounded-[2rem] flex-1 flex flex-col justify-between border border-primary-fixed-dim/20">
          <div>
            <span className="bg-primary text-on-primary text-[10px] uppercase font-headline font-bold tracking-widest px-2.5 py-1 rounded-full">
              Câu hỏi
            </span>
            <h3 className="font-headline text-2xl font-bold mt-4 text-on-surface">
              {totalQuestions}+ Câu hỏi
            </h3>
          </div>
          <div className="h-10 w-10 bg-primary-fixed rounded-2xl flex items-center justify-center text-primary shrink-0">
            <span className="material-symbols-outlined text-2xl">help</span>
          </div>
        </div>

        {/* Categories & Satisfaction */}
        <div className="bg-surface-container-lowest p-6 rounded-[2rem] flex-1 shadow-sm border border-outline-variant/10 flex items-center justify-between">
          <div>
            <p className="text-on-surface-variant font-body text-sm">Danh mục</p>
            <h3 className="font-headline text-2xl font-extrabold text-primary mt-1">{categories}</h3>
            <p className="text-on-surface-variant font-body text-sm mt-2">Tỷ lệ hài lòng</p>
            <h3 className="font-headline text-2xl font-extrabold text-primary mt-1">{satisfactionRate}</h3>
          </div>
          <div className="h-16 w-16 bg-primary-fixed rounded-2xl flex items-center justify-center text-primary shrink-0">
            <span className="material-symbols-outlined text-4xl">thumb_up</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQHero;