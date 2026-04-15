import { NavLink } from 'react-router-dom';

const NAV_ITEMS = [
  { label: 'Tổng quan', icon: 'dashboard', to: '/dashboard/user' },
  { label: 'Từ vựng', icon: 'menu_book', to: '/vocabulary' },
  { label: 'Ngữ pháp', icon: 'school', to: '/grammar' },
  { label: 'Bài kiểm tra', icon: 'quiz', to: '/quiz' },
  { label: 'Bảng xếp hạng', icon: 'leaderboard', to: '/leaderboard' },
];

const DashboardSidebar = () => {
  return (
    <aside
      className="flex flex-col fixed left-0 top-0 h-screen w-64 py-8 px-5
                 bg-surface-container-lowest border-r border-outline-variant z-50"
    >
      {/* Logo */}
      <div className="mb-10 px-1">
        <span className="font-headline text-xl font-extrabold tracking-tight text-primary">
          WinLex
        </span>
        <p className="text-xs text-outline mt-0.5 font-body">Nền tảng học ngôn ngữ</p>
      </div>

      {/* Nav */}
      <nav className="flex-1 flex flex-col gap-1">
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === '/dashboard/user'}
            className={({ isActive }) =>
              `flex items-center gap-3 py-3 px-4 rounded-xl font-headline text-sm font-semibold
               transition-all duration-200 no-underline
               ${
                 isActive
                   ? 'text-primary bg-primary-fixed/40 border-r-4 border-primary'
                   : 'text-on-surface-variant hover:text-primary hover:bg-surface-container-low'
               }`
            }
          >
            <span
              className="material-symbols-outlined text-[1.25rem]"
              style={{
                fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24",
              }}
            >
              {item.icon}
            </span>
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      {/* Bottom section */}
      <div className="pt-6 border-t border-outline-variant">
        <button
          className="w-full py-3.5 px-4 bg-primary text-on-primary rounded-full
                     font-headline font-bold text-sm tracking-tight
                     shadow-lg shadow-primary/25 hover:opacity-90 active:scale-95
                     transition-all duration-200"
        >
          Bắt đầu bài hôm nay
        </button>

        {/* User profile */}
        <div className="mt-6 flex items-center gap-3">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBFLYF2XedKygLG3Dj7zr9jw332SFyGv5S6WG-xnpwnmgOZZmBxh_sOd1Sp5kVcsliepb4h0IHwm4OLxx77W9n-Qforo1l2EAVewNdt7Ne9Gf-r0XULdHUECMIcBZto9y6VHzI5pqaI-3muDltJR39ygDR6nDDNwcvx-krHOfbT36dH6xLi98LPjgdLKfrOTyvXCpADhgXo2IINeNNCd7reXbR8AUckJn_YrLlE1MtAW2ae6x9sSVvKvVN-8dyyHXtLqAueBid39LP7"
            alt="Ảnh đại diện người dùng"
            className="w-10 h-10 rounded-full object-cover shrink-0"
          />
          <div className="overflow-hidden">
            <p className="font-headline font-bold text-sm text-on-surface leading-tight truncate">
              Học Viên
            </p>
            <p className="text-xs text-secondary mt-0.5 font-medium">Miễn phí</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default DashboardSidebar;
