import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getUser, logout } from '../../services/auth';
import { getStreak } from '../../services/progress';
import { Button } from 'antd';
import { LogoutOutlined } from '@ant-design/icons';

// Số thông báo chưa đọc — mock tạm vì BE chưa có API notifications
// Khi BE có API, thay bằng gọi API thật ở đây
const MOCK_UNREAD_COUNT = 3;

// Từ khóa tìm kiếm → navigate đến trang tương ứng
const resolveSearchRoute = (q: string): string => {
  const keyword = q.toLowerCase().trim();
  if (!keyword) return '';

  if (/nghe|listen|listening|bài nghe/.test(keyword)) return `/listening?q=${encodeURIComponent(q)}`;
  if (/từ vựng|vocab|vocabulary|từ/.test(keyword)) return `/vocabulary?q=${encodeURIComponent(q)}`;
  if (/ngữ pháp|grammar|văn phạm/.test(keyword)) return `/grammar?q=${encodeURIComponent(q)}`;
  if (/quiz|bài kiểm|kiểm tra|test/.test(keyword)) return `/quiz?q=${encodeURIComponent(q)}`;
  if (/streak|chuỗi|lửa/.test(keyword)) return `/streaks`;
  if (/tiến trình|tiến độ|progress/.test(keyword)) return `/progress`;
  if (/hồ sơ|profile/.test(keyword)) return `/profile`;

  // Mặc định: tìm ở listening (nội dung chính của app)
  return `/listening?q=${encodeURIComponent(q)}`;
};

const DashboardTopbar = () => {
  const [searchValue, setSearchValue] = useState('');
  const [streakDays, setStreakDays] = useState(0);
  const [unreadCount, setUnreadCount] = useState(MOCK_UNREAD_COUNT);
  const navigate = useNavigate();
  const user = getUser();
  const isAdmin = user?.role?.toLowerCase() === 'admin';

  // Load streak thật từ API
  useEffect(() => {
    if (isAdmin) return;
    const loadStreak = async () => {
      try {
        const res = await getStreak();
        if (res.success && res.data) {
          setStreakDays(res.data.currentStreak);
        }
      } catch {
        // không hiện lỗi, để streak = 0
      }
    };
    void loadStreak();
  }, [isAdmin]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== 'Enter') return;
    const route = resolveSearchRoute(searchValue);
    if (route) {
      navigate(route);
      setSearchValue('');
    }
  };

  return (
    <header
      className="sticky top-0 z-40 flex items-center justify-between
                 pl-72 pr-8 py-3.5
                 bg-surface/80 backdrop-blur-xl
                 border-b border-outline-variant/50 shadow-sm shadow-primary/5"
    >
      {/* Search */}
      <div className="flex-1 max-w-xl">
        <div className="relative">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-[1.1rem]">
            search
          </span>
          <input
            type="text"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onKeyDown={handleSearchKeyDown}
            placeholder="Tìm bài nghe, từ vựng, ngữ pháp... (Enter)"
            className="w-full pl-10 pr-4 py-2 rounded-full text-sm
                       bg-surface-container-low border border-outline-variant/50
                       text-on-surface placeholder:text-outline
                       focus:outline-none focus:ring-2 focus:ring-primary/30
                       transition-all"
          />
        </div>
      </div>

      <Link to="/" className="hidden lg:flex items-center gap-2 no-underline text-sm font-headline font-bold text-primary px-3 py-2 rounded-full hover:bg-primary/5 transition-colors">
        <span className="material-symbols-outlined text-[1.1rem]">home</span>
        Trang chủ
      </Link>

      {/* Right actions */}
      <div className="flex items-center gap-5 ml-6">
        {!isAdmin && (
          <>
            {/* Streak — số thật từ API */}
            <Link
              to="/streaks"
              className="no-underline flex items-center gap-1.5 text-on-surface-variant hover:text-primary transition-colors"
              aria-label="Chuỗi ngày học"
            >
              <span
                className={`material-symbols-outlined ${streakDays > 0 ? 'text-primary' : 'text-outline'}`}
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                local_fire_department
              </span>
              <span className={`font-headline font-bold text-sm ${streakDays > 0 ? 'text-primary' : 'text-outline'}`}>
                {streakDays > 0 ? `${streakDays}` : '0'}
              </span>
            </Link>

            {/* Notification — dot chỉ hiện khi có unread */}
            <Link
              to="/notifications"
              className="no-underline relative text-on-surface-variant hover:text-on-surface transition-colors"
              aria-label={`Thông báo${unreadCount > 0 ? ` (${unreadCount} chưa đọc)` : ''}`}
              onClick={() => setUnreadCount(0)}
            >
              <span className="material-symbols-outlined">notifications</span>
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 min-w-[1.1rem] h-[1.1rem] bg-error text-on-error text-[10px] font-bold rounded-full flex items-center justify-center px-0.5">
                  {unreadCount > 9 ? '9+' : unreadCount}
                </span>
              )}
            </Link>
          </>
        )}

        {!isAdmin && (
          <Link to="/profile" className="no-underline">
            <div className="w-9 h-9 rounded-full bg-primary-fixed flex items-center justify-center border-2 border-outline-variant hover:border-primary transition-colors cursor-pointer">
              <span className="font-headline font-bold text-primary text-sm">
                {user?.initials || 'U'}
              </span>
            </div>
          </Link>
        )}

        <Button icon={<LogoutOutlined />} onClick={handleLogout}>
          Đăng xuất
        </Button>
      </div>
    </header>
  );
};

export default DashboardTopbar;
