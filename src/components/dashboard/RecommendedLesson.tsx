const RecommendedLesson = () => {
  return (
    <div
      className="col-span-12 lg:col-span-8
                 bg-surface-container-lowest rounded-[2rem] p-8
                 relative overflow-hidden group"
    >
      {/* Subtle gradient wash */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-60 pointer-events-none" />

      {/* Ghost icon background */}
      <div
        className="absolute right-[-20px] bottom-[-20px] w-64 h-64 select-none pointer-events-none
                   opacity-10 group-hover:opacity-20 transition-opacity duration-500"
      >
        <span className="material-symbols-outlined text-[12rem] text-primary">history_edu</span>
      </div>

      <div className="relative z-10 flex flex-col h-full">
        {/* Tag + duration */}
        <div className="flex items-center gap-3 mb-6">
          <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-[11px] font-headline font-bold tracking-widest uppercase">
            Gợi ý tiếp theo
          </span>
          <span className="text-outline text-xs uppercase tracking-widest">• 12 phút</span>
        </div>

        {/* Title */}
        <h2 className="font-headline text-3xl font-bold tracking-tight mb-4 max-w-md leading-tight">
          Nghệ thuật viết học thuật: Liên từ & Liên kết câu
        </h2>

        {/* Description */}
        <p className="text-on-surface-variant mb-8 max-w-lg leading-relaxed text-sm">
          Làm chủ cách dùng <em>"tuy nhiên"</em>, <em>"mặc dù vậy"</em>, và{' '}
          <em>"bất chấp"</em> để nâng tầm văn phong viết của bạn lên mức chuyên nghiệp.
        </p>

        {/* Actions */}
        <div className="mt-auto flex items-center gap-3">
          <button
            id="btn-resume-lesson"
            className="bg-primary text-on-primary px-8 py-3.5 rounded-full
                       font-headline font-bold text-sm
                       shadow-lg shadow-primary/25
                       hover:-translate-y-0.5 active:translate-y-0
                       transition-all duration-200"
          >
            Tiếp tục học
          </button>
          <button
            id="btn-bookmark-lesson"
            className="p-3.5 rounded-full border border-outline-variant/60
                       text-on-surface-variant
                       hover:bg-surface-container-low hover:text-primary
                       transition-colors"
            aria-label="Lưu bài học"
          >
            <span className="material-symbols-outlined text-[1.2rem]">bookmark</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecommendedLesson;
