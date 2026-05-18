import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getUser, logout } from '../../services/auth';
import { Button } from 'antd';
import { LogoutOutlined } from '@ant-design/icons';

const DashboardTopbar = () => {
  const [searchValue, setSearchValue] = useState('');
  const navigate = useNavigate();
  const user = getUser();
  const isAdmin = user?.role?.toLowerCase() === 'admin';

  const handleLogout = () => {
    logout();
    navigate('/login');
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
            placeholder="Tìm bài học, từ vựng..."
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
            {/* Streak */}
            <Link
              to="/streaks"
              className="no-underline flex items-center gap-1.5 text-on-surface-variant hover:text-primary transition-colors"
              aria-label="Chuỗi ngày học"
            >
              <span
                className="material-symbols-outlined text-primary"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                local_fire_department
              </span>
              <span className="font-headline font-bold text-sm text-primary">15</span>
            </Link>

            {/* Notification */}
            <Link
              to="/notifications"
              className="no-underline relative text-on-surface-variant hover:text-on-surface transition-colors"
              aria-label="Thông báo"
            >
              <span className="material-symbols-outlined">notifications</span>
              <span className="absolute top-0 right-0 w-2 h-2 bg-error rounded-full" />
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
