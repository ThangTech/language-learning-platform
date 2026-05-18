import { NavLink } from 'react-router-dom';
import { getUser } from '../../services/auth';

const USER_NAV_ITEMS = [
  { label: 'Tổng quan', icon: 'dashboard', to: '/dashboard/user' },
  { label: 'Từ vựng', icon: 'menu_book', to: '/vocabulary' },
  { label: 'Ngữ pháp', icon: 'school', to: '/grammar' },
  { label: 'Luyện nghe', icon: 'headphones', to: '/listening' },
  { label: 'Bài kiểm tra', icon: 'quiz', to: '/quiz' },
  { label: 'Bảng xếp hạng', icon: 'leaderboard', to: '/leaderboard' },
  { label: 'Chuỗi ngày học', icon: 'local_fire_department', to: '/streaks' },
];

const ADMIN_NAV_ITEMS = [
  { label: 'Tổng quan Admin', icon: 'admin_panel_settings', to: '/dashboard/admin' },
  { label: 'Quản lý người dùng', icon: 'groups', to: '/dashboard/admin/users' },
  { label: 'Quản lý từ vựng', icon: 'menu_book', to: '/vocabulary' },
  { label: 'Quản lý ngữ pháp', icon: 'school', to: '/grammar' },
  { label: 'Quản lý bài nghe', icon: 'headphones', to: '/listening' },
  { label: 'Quản lý quiz', icon: 'quiz', to: '/quiz' },
];

const BOTTOM_ITEMS = [
  { label: 'Thông báo', icon: 'notifications', to: '/notifications', badge: 3 },
  { label: 'Hồ sơ cá nhân', icon: 'account_circle', to: '/profile' },
];

const DashboardSidebar = () => {
  const user = getUser();
  const isAdmin = user?.role?.toLowerCase() === 'admin';
  const navItems = isAdmin ? ADMIN_NAV_ITEMS : USER_NAV_ITEMS;

  return (
    <aside
      className="flex flex-col fixed left-0 top-0 h-screen w-64 py-8 px-5
                 bg-surface-container-lowest border-r border-outline-variant z-50"
    >
      <div className="mb-10 px-1">
        <span className="font-headline text-xl font-extrabold tracking-tight text-primary">
          WinLex
        </span>
        <p className="text-xs text-outline mt-0.5 font-body">
          {isAdmin ? 'Khu vực quản trị' : 'Nền tảng học ngôn ngữ'}
        </p>
      </div>

      <nav className="flex-1 flex flex-col gap-1">
        {navItems.map((item) => (
          <NavLink
            key={item.to + item.label}
            to={item.to}
            end={item.to === '/dashboard/user' || item.to === '/dashboard/admin'}
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

      {!isAdmin && (
        <>
          <div className="border-t border-outline-variant/50 my-4" />

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
                        style={{ fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0" }}
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
        </>
      )}

      <div className="pt-4 border-t border-outline-variant">
        {!isAdmin && (
          <div className="flex flex-col gap-3">
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
            <NavLink to="/progress" className="no-underline block">
              <button
                className="w-full py-3 px-4 border border-outline-variant text-on-surface rounded-full
                           font-headline font-bold text-sm hover:bg-surface-container-low transition-all duration-200 flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined text-[1.1rem]" style={{ fontVariationSettings: "'FILL' 1" }}>
                  insights
                </span>
                Xem tiến độ
              </button>
            </NavLink>
          </div>
        )}

        {!isAdmin && (
          <NavLink to="/profile" className="no-underline">
            <div className="mt-5 flex items-center gap-3 p-2 rounded-xl hover:bg-surface-container-low transition-colors cursor-pointer">
              <div className="w-10 h-10 rounded-full bg-primary-fixed flex items-center justify-center shrink-0">
                <span className="font-headline font-bold text-primary">
                  {user?.initials || 'U'}
                </span>
              </div>
              <div className="overflow-hidden flex-1">
                <p className="font-headline font-bold text-sm text-on-surface leading-tight truncate">
                  {user?.fullName || user?.email || 'Người dùng'}
                </p>
                <p className="text-xs text-secondary mt-0.5 font-medium">
                  Học viên
                </p>
              </div>
              <span className="material-symbols-outlined text-outline text-[1rem]">chevron_right</span>
            </div>
          </NavLink>
        )}
      </div>
    </aside>
  );
};

export default DashboardSidebar;
