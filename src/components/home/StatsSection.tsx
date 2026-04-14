const StatsSection = () => {
  return (
    <section className="px-8 py-20">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12 bg-surface-container-highest/30 rounded-[3rem] p-12">
        <div className="text-center md:text-left max-w-md">
          <h2 className="font-headline text-3xl font-extrabold mb-4">Mạng lưới Học viên Toàn cầu</h2>
          <p className="text-on-surface-variant font-body">
            Tham gia cộng đồng những người đam mê ngôn ngữ chuyên nghiệp nhất thế giới.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-8 md:gap-16">
          <div className="text-center">
            <p className="font-headline text-4xl md:text-5xl font-extrabold text-primary mb-2">500k+</p>
            <p className="text-xs uppercase font-bold tracking-widest text-on-surface-variant">Học viên tích cực</p>
          </div>
          <div className="text-center">
            <p className="font-headline text-4xl md:text-5xl font-extrabold text-secondary mb-2">120+</p>
            <p className="text-xs uppercase font-bold tracking-widest text-on-surface-variant">Khóa học chuyên sâu</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;