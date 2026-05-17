interface ListeningHeroProps {
  totalLessons: number;
}

const ListeningHero = ({ totalLessons }: ListeningHeroProps) => {
  return (
    <section className="bg-surface-container-lowest rounded-[2rem] p-8 border border-outline-variant/10 shadow-sm mb-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div>
          <p className="font-headline text-sm font-bold text-primary uppercase tracking-wider mb-2">
            VSTEPS Listening
          </p>
          <h1 className="font-headline text-4xl font-bold text-on-surface mb-3">
            Bài học luyện nghe
          </h1>
          <p className="font-body text-on-surface-variant max-w-2xl">
            Nghe hội thoại, tin tức và bài giảng theo cấp độ từ A1 đến B2. Luyện nghe hiểu theo lộ trình rõ ràng.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 min-w-[220px]">
          <div className="bg-surface-container-low p-4 rounded-2xl text-center">
            <p className="font-headline text-2xl font-bold text-primary">{totalLessons}</p>
            <p className="font-body text-xs text-on-surface-variant">Bài nghe</p>
          </div>
          <div className="bg-surface-container-low p-4 rounded-2xl text-center">
            <p className="font-headline text-2xl font-bold text-tertiary">A1 - B2</p>
            <p className="font-body text-xs text-on-surface-variant">Cấp độ</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ListeningHero;
