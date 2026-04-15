interface WelcomeHeroProps {
  username?: string;
  improvementPercent?: number;
  streakDays?: number;
}

const WelcomeHero = ({
  username = 'Học Viên',
  improvementPercent = 12,
  streakDays = 15,
}: WelcomeHeroProps) => {
  return (
    <section className="mb-10 flex flex-col md:flex-row justify-between items-end gap-6">
      {/* Left: greeting */}
      <div className="space-y-2">
        <h1 className="font-headline text-5xl font-extrabold tracking-tighter text-on-surface leading-tight">
          Chào mừng trở lại,{' '}
          <br />
          <span className="text-primary">{username}.</span>
        </h1>
        <p className="text-on-surface-variant text-base max-w-md leading-relaxed">
          Độ chính xác ngôn ngữ của bạn đã cải thiện{' '}
          <span className="font-semibold text-secondary">{improvementPercent}%</span> tuần này.
          Hãy tiếp tục phát huy!
        </p>
      </div>

      {/* Right: streak card */}
      <div
        className="bg-secondary-container px-6 py-5 rounded-3xl
                   flex items-center gap-5
                   shadow-xl shadow-secondary/10
                   rotate-1 hover:rotate-0 transition-transform duration-300 shrink-0"
      >
        <div className="bg-white/40 backdrop-blur-md p-3.5 rounded-2xl flex items-center justify-center">
          <span
            className="material-symbols-outlined text-4xl text-on-secondary-container"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            local_fire_department
          </span>
        </div>
        <div>
          <p className="font-headline font-bold text-2xl text-on-secondary-container leading-tight">
            {streakDays} Ngày liên tiếp
          </p>
          <p className="text-on-secondary-container/70 text-sm mt-0.5">Kiên trì xuất sắc! 🎉</p>
        </div>
      </div>
    </section>
  );
};

export default WelcomeHero;
