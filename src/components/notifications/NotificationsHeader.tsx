interface NotificationsHeaderProps {
  unreadCount: number;
  onMarkAllRead: () => void;
}

const NotificationsHeader = ({ unreadCount, onMarkAllRead }: NotificationsHeaderProps) => {
  return (
    <div className="flex items-center justify-between mb-8 gap-4 flex-wrap">
      <div>
        <h1 className="font-headline text-3xl font-extrabold text-on-surface flex items-center gap-3">
          Thông báo
          {unreadCount > 0 && (
            <span className="bg-error text-on-error text-sm font-bold px-2.5 py-0.5 rounded-full">{unreadCount}</span>
          )}
        </h1>
        <p className="text-on-surface-variant text-sm mt-1">
          {unreadCount > 0 ? `Bạn có ${unreadCount} thông báo chưa đọc` : 'Tất cả đã được đọc'}
        </p>
      </div>
      {unreadCount > 0 && (
        <button
          onClick={onMarkAllRead}
          className="px-5 py-2.5 rounded-full border border-outline-variant text-on-surface-variant text-sm font-medium hover:bg-surface-container transition-all flex items-center gap-2"
        >
          <span className="material-symbols-outlined text-[1rem]">done_all</span>
          Đánh dấu tất cả đã đọc
        </button>
      )}
    </div>
  );
};

export default NotificationsHeader;
