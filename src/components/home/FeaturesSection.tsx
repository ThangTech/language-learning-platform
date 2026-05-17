const FeaturesSection = () => {
  return (
    <section className="px-8 py-24 bg-surface-container-low">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 text-center lg:text-left">
          <h2 className="font-headline text-3xl md:text-4xl font-bold mb-4">Trọng tâm luyện nghe</h2>
          <p className="text-on-surface-variant font-body max-w-2xl">
            Lộ trình VSTEPS chia rõ các phần: nghe hiểu, đọc lời thoại, chép chính tả và làm bài kiểm tra nhanh.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-surface-container-lowest rounded-xl p-8 ambient-shadow group hover:-translate-y-2 transition-all duration-300">
            <div className="w-12 h-12 rounded-xl bg-primary-fixed mb-6 flex items-center justify-center group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-primary">headphones</span>
            </div>
            <h3 className="font-headline text-xl font-bold mb-4">Nghe hiểu theo cấp độ</h3>
            <p className="text-on-surface-variant text-sm mb-8 leading-relaxed">
              Bài nghe được chia theo trình độ để người học nắm ý chính, chi tiết và ngữ cảnh từng bước.
            </p>
            <div className="bg-surface-container-low rounded-xl p-6">
              <div className="flex justify-between items-start mb-4">
                <span className="text-[10px] uppercase font-bold tracking-widest text-primary/60">VSTEPS</span>
                <span className="material-symbols-outlined text-xs text-on-surface-variant">play_circle</span>
              </div>
              <p className="font-headline text-2xl font-extrabold mb-1">A2 → B1</p>
              <p className="text-xs text-on-surface-variant italic mb-4">Nghe theo chủ đề thực tế</p>
              <div className="bg-secondary-container/30 text-on-secondary-container text-[10px] px-2 py-0.5 rounded-full inline-block">
                Luyện nghe
              </div>
            </div>
          </div>

          <div className="bg-surface-container-lowest rounded-xl p-8 ambient-shadow group hover:-translate-y-2 transition-all duration-300">
            <div className="w-12 h-12 rounded-xl bg-secondary-container mb-6 flex items-center justify-center group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-secondary">subtitles</span>
            </div>
            <h3 className="font-headline text-xl font-bold mb-4">Lời thoại và chép chính tả</h3>
            <p className="text-on-surface-variant text-sm mb-8 leading-relaxed">
              Mở phần lời thoại để đối chiếu, rồi luyện chép chính tả theo từng mốc thời gian.
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-surface-container-low rounded-lg">
                <span className="material-symbols-outlined text-primary text-sm">checklist</span>
                <span className="text-xs font-medium">Bám sát từng câu</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-surface-container-low rounded-lg">
                <span className="material-symbols-outlined text-primary text-sm">checklist</span>
                <span className="text-xs font-medium">Luyện nghe chi tiết</span>
              </div>
            </div>
          </div>

          <div className="bg-surface-container-lowest rounded-xl p-8 ambient-shadow group hover:-translate-y-2 transition-all duration-300">
            <div className="w-12 h-12 rounded-xl bg-tertiary-fixed mb-6 flex items-center justify-center group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-tertiary">quiz</span>
            </div>
            <h3 className="font-headline text-xl font-bold mb-4">Quiz củng cố nhanh</h3>
            <p className="text-on-surface-variant text-sm mb-8 leading-relaxed">
              Sau mỗi bài nghe, người học làm quiz để kiểm tra mức độ hiểu và ghi nhớ nội dung trọng tâm.
            </p>
            <div className="bg-surface-container-low rounded-xl p-4">
              <div className="flex items-center justify-between py-2 border-b border-outline-variant/20">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-slate-300 overflow-hidden flex items-center justify-center">
                    <span className="text-[10px] font-bold text-on-surface">A2</span>
                  </div>
                  <span className="text-[10px] font-bold">Nghe hiểu</span>
                </div>
                <span className="text-[10px] font-headline font-bold text-primary">5 câu</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-primary-fixed flex items-center justify-center">
                    <span className="text-[10px] font-bold text-primary">ME</span>
                  </div>
                  <span className="text-[10px] font-bold">Bạn</span>
                </div>
                <span className="text-[10px] font-headline font-bold text-secondary">Làm ngay</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;