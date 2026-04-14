const CTASection = () => {
  return (
    <section className="px-8 py-24 mb-16">
      <div className="max-w-7xl mx-auto relative overflow-hidden rounded-[2.5rem] bg-slate-900 py-24 px-12 text-center text-white">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: 'radial-gradient(circle at 20% 50%, #2563eb, transparent 50%), radial-gradient(circle at 80% 50%, #006c49, transparent 50%)',
          }}
        />
        <div className="relative z-10">
          <h2 className="font-headline text-4xl md:text-5xl font-bold mb-6">Tham gia Cộng đồng Toàn cầu</h2>
          <p className="font-body text-lg text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed">
            Ngừng học như một khách du lịch. Bắt đầu suy nghĩ như người bản ngữ. Hành trình của bạn hướng tới sự thành thạo ngôn ngữ bắt đầu với một bước quyết định.
          </p>
          <button className="bg-white text-slate-900 px-10 py-5 rounded-full font-headline font-extrabold text-lg hover:bg-primary-fixed hover:scale-105 transition-all">
            Đặt chỗ ngay
          </button>
          <p className="mt-8 text-sm text-slate-400 font-medium">Lớp học mùa Đông sắp khai giảng với số lượng giới hạn.</p>
        </div>
      </div>
    </section>
  );
};

export default CTASection;