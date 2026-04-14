const FeaturesSection = () => {
  return (
    <section className="px-8 py-24 bg-surface-container-low">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 text-center lg:text-left">
          <h2 className="font-headline text-3xl md:text-4xl font-bold mb-4">Xuất sắc về Cấu trúc</h2>
          <p className="text-on-surface-variant font-body max-w-2xl">
            Phương pháp WinLex tích hợp tính chính xác với sự phát triển tự nhiên qua ba trụ cột cốt lõi.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Vocabulary Card */}
          <div className="bg-surface-container-lowest rounded-xl p-8 ambient-shadow group hover:-translate-y-2 transition-all duration-300">
            <div className="w-12 h-12 rounded-xl bg-primary-fixed mb-6 flex items-center justify-center group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-primary">menu_book</span>
            </div>
            <h3 className="font-headline text-xl font-bold mb-4">Từ vựng chuyên sâu</h3>
            <p className="text-on-surface-variant text-sm mb-8 leading-relaxed">
              Kho từ vựng chuyên môn được chọn lọc kỹ càng, tập trung vào thuật ngữ chuyên nghiệp.
            </p>
            <div className="bg-surface-container-low rounded-xl p-6">
              <div className="flex justify-between items-start mb-4">
                <span className="text-[10px] uppercase font-bold tracking-widest text-primary/60">Tiếng Pháp Nâng cao</span>
                <span className="material-symbols-outlined text-xs text-on-surface-variant">volume_up</span>
              </div>
              <p className="font-headline text-2xl font-extrabold mb-1">Éphémère</p>
              <p className="text-xs text-on-surface-variant italic mb-4">/e.fe.mɛʁ/</p>
              <div className="bg-secondary-container/30 text-on-secondary-container text-[10px] px-2 py-0.5 rounded-full inline-block">
                Tính từ
              </div>
            </div>
          </div>

          {/* Grammar Card */}
          <div className="bg-surface-container-lowest rounded-xl p-8 ambient-shadow group hover:-translate-y-2 transition-all duration-300">
            <div className="w-12 h-12 rounded-xl bg-secondary-container mb-6 flex items-center justify-center group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-secondary">architecture</span>
            </div>
            <h3 className="font-headline text-xl font-bold mb-4">Ngữ pháp chuyên sâu</h3>
            <p className="text-on-surface-variant text-sm mb-8 leading-relaxed">
              Hướng dẫn cấu trúc chuyên sâu giúp bạn hiểu ngữ pháp như nền tảng của tư duy.
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-surface-container-low rounded-lg">
                <span className="material-symbols-outlined text-primary text-sm">checklist</span>
                <span className="text-xs font-medium">Sắc thái Subjunctive</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-surface-container-low rounded-lg">
                <span className="material-symbols-outlined text-primary text-sm">checklist</span>
                <span className="text-xs font-medium">Logic Thì hoàn hảo</span>
              </div>
            </div>
          </div>

          {/* Leaderboard Card */}
          <div className="bg-surface-container-lowest rounded-xl p-8 ambient-shadow group hover:-translate-y-2 transition-all duration-300">
            <div className="w-12 h-12 rounded-xl bg-tertiary-fixed mb-6 flex items-center justify-center group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-tertiary">trophy</span>
            </div>
            <h3 className="font-headline text-xl font-bold mb-4">Cạnh tranh lành mạnh</h3>
            <p className="text-on-surface-variant text-sm mb-8 leading-relaxed">
              So sánh tiến độ học tập của bạn với cộng đồng học viên toàn cầu.
            </p>
            <div className="bg-surface-container-low rounded-xl p-4">
              <div className="flex items-center justify-between py-2 border-b border-outline-variant/20">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-slate-300 overflow-hidden">
                    <img
                      className="w-full h-full object-cover"
                      alt="Julian"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuDeGmrrY8PBZ2PpnI1AK09vtbI5ZWeeIcGrvrNDeSW2C_Q_4Y7q-KPyMPlhVVqNaQAbQP2mHojciSLVWnVkj584cVgbz7X_0sSTQRgidNwE-7Ejdcwek5CyN_uHYPmgKDspINmVPGMD8bx-ySS4uYafkKl00JH4AFk_JSGKJapCjAqMHFXmyNEFsjGxgpg97OdFxzATka07-Z0kfpyicBmw_APq_OIAts6WAHa0YyMErphPMl7UaCQ5MmziwYVUzkzxyXEX_mT0p4-k"
                    />
                  </div>
                  <span className="text-[10px] font-bold">Julian V.</span>
                </div>
                <span className="text-[10px] font-headline font-bold text-primary">12,450 điểm</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-primary-fixed flex items-center justify-center">
                    <span className="text-[10px] font-bold text-primary">ME</span>
                  </div>
                  <span className="text-[10px] font-bold">Bạn</span>
                </div>
                <span className="text-[10px] font-headline font-bold text-secondary">11,200 điểm</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;