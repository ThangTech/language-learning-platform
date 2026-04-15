import { useState } from 'react';

const DashboardTopbar = () => {
  const [searchValue, setSearchValue] = useState('');

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

      {/* Right actions */}
      <div className="flex items-center gap-5 ml-6">
        {/* Notification */}
        <button
          id="btn-notifications"
          className="relative text-on-surface-variant hover:text-on-surface transition-colors"
          aria-label="Thông báo"
        >
          <span className="material-symbols-outlined">notifications</span>
          <span className="absolute top-0 right-0 w-2 h-2 bg-error rounded-full" />
        </button>

        {/* Streak */}
        <button
          id="btn-streak"
          className="flex items-center gap-1.5 text-on-surface-variant hover:text-primary transition-colors"
          aria-label="Chuỗi ngày học"
        >
          <span
            className="material-symbols-outlined text-primary"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            local_fire_department
          </span>
          <span className="font-headline font-bold text-sm text-primary">15</span>
        </button>
      </div>
    </header>
  );
};

export default DashboardTopbar;
