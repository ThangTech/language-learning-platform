import { Link } from 'react-router-dom';

interface WelcomeHeroProps {
  username?: string;
  streakDays?: number;
  hasStudiedToday?: boolean;
}

const WelcomeHero = ({
  username = 'Học Viên',
  streakDays = 0,
  hasStudiedToday = false,
}: WelcomeHeroProps) => {
  const streakMessage =
    streakDays === 0
      ? 'Hôm nay hãy bắt đầu chuỗi học của bạn!'
      : hasStudiedToday
        ? `Tuyệt vời! Bạn đã học hôm nay 🎉`
        : `Đừng để chuỗi ${streakDays} ngày bị gián đoạn!`;

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
          {streakDays === 0
            ? 'Bắt đầu hành trình học tiếng Anh chuẩn VSTEP của bạn ngay hôm nay!'
            : `Bạn đang có chuỗi `}
          {streakDays > 0 && (
            <span className="font-semibold text-secondary">{streakDays} ngày học liên tiếp</span>
          )}
          {streakDays > 0 && '. Hãy tiếp tục phát huy!'}
        </p>
      </div>

      {/* Right: streak card */}
      <div className="flex flex-col gap-4 items-end">
        <div
          className={`px-6 py-5 rounded-3xl flex items-center gap-5 shadow-xl transition-transform duration-300 rotate-1 hover:rotate-0 shrink-0 ${
            streakDays === 0
              ? 'bg-surface-container shadow-outline/10'
              : 'bg-secondary-container shadow-secondary/10'
          }`}
        >
          <div
            className={`backdrop-blur-md p-3.5 rounded-2xl flex items-center justify-center ${
              streakDays === 0 ? 'bg-surface-container-high' : 'bg-white/40'
            }`}
          >
            <span
              className={`material-symbols-outlined text-4xl ${
                streakDays === 0 ? 'text-outline' : 'text-on-secondary-container'
              }`}
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              local_fire_department
            </span>
          </div>
          <div>
            <p
              className={`font-headline font-bold text-2xl leading-tight ${
                streakDays === 0 ? 'text-on-surface-variant' : 'text-on-secondary-container'
              }`}
            >
              {streakDays === 0 ? 'Chưa có chuỗi' : `${streakDays} Ngày liên tiếp`}
            </p>
            <p
              className={`text-sm mt-0.5 ${
                streakDays === 0 ? 'text-outline' : 'text-on-secondary-container/70'
              }`}
            >
              {streakMessage}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          <Link to="/listening" className="no-underline">
            <button className="px-5 py-2.5 rounded-full bg-primary text-on-primary font-headline font-bold text-sm hover:opacity-90 transition-all">
              Học Listening
            </button>
          </Link>
          <Link to="/progress" className="no-underline">
            <button className="px-5 py-2.5 rounded-full border border-primary text-primary font-headline font-bold text-sm hover:bg-primary/5 transition-all">
              Xem tiến độ
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default WelcomeHero;
