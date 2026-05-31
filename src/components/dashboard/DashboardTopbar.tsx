import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getUser, logout } from '../../services/auth';
import { getStreak } from '../../services/progress';
import { getLessons } from '../../services/listening';
import { getWords } from '../../services/vocabulary';
import { getNotifications } from '../../services/notification';
import { Button } from 'antd';
import { LogoutOutlined } from '@ant-design/icons';
import type { ListeningLessonDto } from '../../interfaces/listening';
import type { WordDto } from '../../interfaces/vocabulary';

interface SearchResult {
  id: string;
  label: string;
  sub: string;
  icon: string;
  route: string;
}

const DashboardTopbar = () => {
  const [searchValue, setSearchValue] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [streakDays, setStreakDays] = useState(0);
  const [unreadCount, setUnreadCount] = useState(0);
  const navigate = useNavigate();
  const user = getUser();
  const isAdmin = user?.role?.toLowerCase() === 'admin';

  useEffect(() => {
    if (isAdmin) return;
    const load = async () => {
      try {
        const res = await getStreak();
        if (res.success && res.data) setStreakDays(res.data.currentStreak);
      } catch { }
    };
    void load();
  }, [isAdmin]);

  useEffect(() => {
    if (isAdmin) return;
    const load = async () => {
      try {
        const res = await getNotifications();
        if (res.success && res.data) {
          setUnreadCount(res.data.filter((n) => !n.isRead).length);
        }
      } catch { }
    };
    void load();
  }, [isAdmin]);

  useEffect(() => {
    const q = searchValue.trim();
    if (!q) {
      setSearchResults([]);
      setShowDropdown(false);
      return;
    }

    const timer = setTimeout(async () => {
      try {
        const [lessonRes, wordRes] = await Promise.all([
          getLessons(1, 4, undefined, q),
          getWords(1, 4, undefined, q),
        ]);

        const results: SearchResult[] = [];

        if (lessonRes.success && lessonRes.data?.items) {
          lessonRes.data.items.forEach((l: ListeningLessonDto) => {
            results.push({
              id: `lesson-${l.id}`,
              label: l.title,
              sub: `Bài nghe · ${l.level} · ${l.durationText}`,
              icon: 'headphones',
              route: `/listening/${l.id}`,
            });
          });
        }

        if (wordRes.success && wordRes.data?.items) {
          wordRes.data.items.forEach((w: WordDto) => {
            results.push({
              id: `word-${w.id}`,
              label: w.term,
              sub: `Từ vựng · ${w.definition}`,
              icon: 'style',
              route: `/vocabulary?q=${encodeURIComponent(w.term)}`,
            });
          });
        }

        setSearchResults(results);
        setShowDropdown(true);
      } catch {
        setSearchResults([]);
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [searchValue]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleSelectResult = (route: string) => {
    setShowDropdown(false);
    setSearchValue('');
    navigate(route);
  };

  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') {
      setShowDropdown(false);
      return;
    }
    if (e.key === 'Enter') {
      const q = searchValue.trim();
      if (!q) return;
      if (searchResults.length > 0) {
        handleSelectResult(searchResults[0].route);
      } else {
        navigate(`/listening?q=${encodeURIComponent(q)}`);
        setSearchValue('');
        setShowDropdown(false);
      }
    }
  };

  return (
    <header
      className="sticky top-0 z-40 flex items-center justify-between
                 pl-72 pr-8 py-3.5
                 bg-surface/80 backdrop-blur-xl
                 border-b border-outline-variant/50 shadow-sm shadow-primary/5"
    >
      <div className="flex-1 max-w-xl relative">
        <div className="relative">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-[1.1rem]">
            search
          </span>
          <input
            type="text"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onKeyDown={handleSearchKeyDown}
            onFocus={() => searchResults.length > 0 && setShowDropdown(true)}
            onBlur={() => setTimeout(() => setShowDropdown(false), 150)}
            placeholder="Tìm bài nghe, từ vựng..."
            className="w-full pl-10 pr-4 py-2 rounded-full text-sm
                       bg-surface-container-low border border-outline-variant/50
                       text-on-surface placeholder:text-outline
                       focus:outline-none focus:ring-2 focus:ring-primary/30
                       transition-all"
          />
        </div>

        {showDropdown && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-surface border border-outline-variant/30 rounded-2xl shadow-xl overflow-hidden z-50">
            {searchResults.length === 0 ? (
              <div className="px-4 py-3 text-sm text-on-surface-variant text-center">
                Không tìm thấy kết quả cho "{searchValue}"
              </div>
            ) : (
              <ul>
                {searchResults.map((r) => (
                  <li key={r.id}>
                    <button
                      className="w-full flex items-center gap-3 px-4 py-3 hover:bg-surface-container transition-colors text-left"
                      onMouseDown={() => handleSelectResult(r.route)}
                    >
                      <span
                        className="material-symbols-outlined text-primary text-[1.1rem] shrink-0"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        {r.icon}
                      </span>
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-on-surface truncate">{r.label}</p>
                        <p className="text-xs text-on-surface-variant truncate">{r.sub}</p>
                      </div>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>

      <Link to="/" className="hidden lg:flex items-center gap-2 no-underline text-sm font-headline font-bold text-primary px-3 py-2 rounded-full hover:bg-primary/5 transition-colors">
        <span className="material-symbols-outlined text-[1.1rem]">home</span>
        Trang chủ
      </Link>

      <div className="flex items-center gap-5 ml-6">
        {!isAdmin && (
          <>
            <Link
              to="/streaks"
              className="no-underline flex items-center gap-1.5 hover:text-primary transition-colors"
              aria-label="Chuỗi ngày học"
            >
              <span
                className={`material-symbols-outlined ${streakDays > 0 ? 'text-primary' : 'text-outline'}`}
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                local_fire_department
              </span>
              <span className={`font-headline font-bold text-sm ${streakDays > 0 ? 'text-primary' : 'text-outline'}`}>
                {streakDays}
              </span>
            </Link>

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
            <div className="w-9 h-9 rounded-full bg-primary-fixed flex items-center justify-center border-2 border-outline-variant hover:border-primary transition-colors cursor-pointer overflow-hidden">
              {user?.avatarUrl ? (
                <img src={user.avatarUrl} alt="avatar" className="w-full h-full object-cover" />
              ) : (
                <span className="font-headline font-bold text-primary text-sm">
                  {user?.initials || 'U'}
                </span>
              )}
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
