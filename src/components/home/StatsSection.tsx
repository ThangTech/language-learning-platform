const StatsSection = () => {
  return (
    <section className="px-8 py-20">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12 bg-surface-container-highest/30 rounded-[3rem] p-12">
        <div className="text-center md:text-left max-w-md">
          <h2 className="font-headline text-3xl font-extrabold mb-4">Theo dõi tiến độ rõ ràng</h2>
          <p className="text-on-surface-variant font-body">
            Người học nhìn được số bài nghe, cấp độ và lượt luyện tập để biết mình đang tiến bộ thế nào.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-8 md:gap-16">
          <div className="text-center">
            <p className="font-headline text-4xl md:text-5xl font-extrabold text-primary mb-2">500+</p>
            <p className="text-xs uppercase font-bold tracking-widest text-on-surface-variant">Bài nghe</p>
          </div>
          <div className="text-center">
            <p className="font-headline text-4xl md:text-5xl font-extrabold text-secondary mb-2">4</p>
            <p className="text-xs uppercase font-bold tracking-widest text-on-surface-variant">Cấp độ</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;