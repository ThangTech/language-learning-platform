import { NavLink } from 'react-router-dom';

const NAV_ITEMS = [
  { label: 'Tổng quan', icon: 'dashboard', to: '/dashboard/user' },
  { label: 'Từ vựng', icon: 'menu_book', to: '/vocabulary' },
  { label: 'Ngữ pháp', icon: 'school', to: '/grammar' },
  { label: 'Luyện nghe', icon: 'headphones', to: '/listening' },
  { label: 'Bài kiểm tra', icon: 'quiz', to: '/quiz' },
  { label: 'Bảng xếp hạng', icon: 'leaderboard', to: '/leaderboard' },
  { label: 'Chuỗi ngày học', icon: 'local_fire_department', to: '/streaks' },
];

const BOTTOM_ITEMS = [
  { label: 'Thông báo', icon: 'notifications', to: '/notifications', badge: 3 },
  { label: 'Hồ sơ cá nhân', icon: 'account_circle', to: '/profile' },
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

      {/* Main Nav */}
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
            {({ isActive }) => (
              <>
                <span
                  className="material-symbols-outlined text-[1.25rem]"
                  style={{
                    fontVariationSettings: isActive
                      ? "'FILL' 1, 'wght' 500"
                      : "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24",
                  }}
                >
                  {item.icon}
                </span>
                <span>{item.label}</span>
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Divider */}
      <div className="border-t border-outline-variant/50 my-4" />

      {/* Bottom nav items */}
      <div className="flex flex-col gap-1 mb-4">
        {BOTTOM_ITEMS.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex items-center gap-3 py-2.5 px-4 rounded-xl font-headline text-sm font-semibold
               transition-all duration-200 no-underline relative
               ${
                 isActive
                   ? 'text-primary bg-primary-fixed/40 border-r-4 border-primary'
                   : 'text-on-surface-variant hover:text-primary hover:bg-surface-container-low'
               }`
            }
          >
            {({ isActive }) => (
              <>
                <span className="relative">
                  <span
                    className="material-symbols-outlined text-[1.25rem]"
                    style={{
                      fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0",
                    }}
                  >
                    {item.icon}
                  </span>
                  {item.badge && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-error text-on-error rounded-full text-[9px] font-bold flex items-center justify-center">
                      {item.badge}
                    </span>
                  )}
                </span>
                <span>{item.label}</span>
              </>
            )}
          </NavLink>
        ))}
      </div>

      {/* Bottom section */}
      <div className="pt-4 border-t border-outline-variant">
        <NavLink to="/listening" className="no-underline block">
          <button
            className="w-full py-3.5 px-4 bg-primary text-on-primary rounded-full
                       font-headline font-bold text-sm tracking-tight
                       shadow-lg shadow-primary/25 hover:opacity-90 active:scale-95
                       transition-all duration-200 flex items-center justify-center gap-2"
          >
            <span className="material-symbols-outlined text-[1.1rem]" style={{ fontVariationSettings: "'FILL' 1" }}>
              headphones
            </span>
            Bắt đầu bài hôm nay
          </button>
        </NavLink>

        {/* User profile */}
        <NavLink to="/profile" className="no-underline">
          <div className="mt-5 flex items-center gap-3 p-2 rounded-xl hover:bg-surface-container-low transition-colors cursor-pointer">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBFLYF2XedKygLG3Dj7zr9jw332SFyGv5S6WG-xnpwnmgOZZmBxh_sOd1Sp5kVcsliepb4h0IHwm4OLxx77W9n-Qforo1l2EAVewNdt7Ne9Gf-r0XULdHUECMIcBZto9y6VHzI5pqaI-3muDltJR39ygDR6nDDNwcvx-krHOfbT36dH6xLi98LPjgdLKfrOTyvXCpADhgXo2IINeNNCd7reXbR8AUckJn_YrLlE1MtAW2ae6x9sSVvKvVN-8dyyHXtLqAueBid39LP7"
              alt="Ảnh đại diện người dùng"
              className="w-10 h-10 rounded-full object-cover shrink-0"
            />
            <div className="overflow-hidden flex-1">
              <p className="font-headline font-bold text-sm text-on-surface leading-tight truncate">
                Học Viên
              </p>
              <p className="text-xs text-secondary mt-0.5 font-medium">Miễn phí</p>
            </div>
            <span className="material-symbols-outlined text-outline text-[1rem]">chevron_right</span>
          </div>
        </NavLink>
      </div>
    </aside>
  );
};

export default DashboardSidebar;
