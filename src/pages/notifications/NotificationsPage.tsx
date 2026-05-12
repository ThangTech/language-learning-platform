import { useState } from 'react';

const CATEGORIES = ['Tất cả', 'Bài học', 'Thành tích', 'Hệ thống', 'Khuyến mãi'];

interface NotifItem {
  id: string;
  category: string;
  icon: string;
  iconColor: string;
  iconBg: string;
  title: string;
  body: string;
  time: string;
  isRead: boolean;
}

const NOTIFS: NotifItem[] = [
  {
    id: 'n1', category: 'Bài học',
    icon: 'local_fire_department', iconColor: 'text-primary', iconBg: 'bg-primary/10',
    title: '🔥 Đừng để tắt chuỗi 7 ngày!',
    body: 'Bạn chưa học hôm nay. Chỉ cần 10 phút để giữ vững chuỗi ngày học liên tiếp.',
    time: '5 phút trước', isRead: false,
  },
  {
    id: 'n2', category: 'Thành tích',
    icon: 'emoji_events', iconColor: 'text-tertiary', iconBg: 'bg-tertiary/10',
    title: '🏆 Thành tích mới: Học giả tháng!',
    body: 'Bạn đã học đủ 20 ngày trong tháng này. Thành tích "Học giả tháng" đã được mở khóa!',
    time: '1 giờ trước', isRead: false,
  },
  {
    id: 'n3', category: 'Bài học',
    icon: 'headphones', iconColor: 'text-primary', iconBg: 'bg-primary/10',
    title: 'Bài nghe mới: Tin tức buổi sáng B2',
    body: 'Bài học mới trong chủ đề Tin tức vừa được thêm vào. Thử ngay nhé!',
    time: '3 giờ trước', isRead: false,
  },
  {
    id: 'n4', category: 'Hệ thống',
    icon: 'update', iconColor: 'text-secondary', iconBg: 'bg-secondary/10',
    title: 'Cập nhật tính năng mới',
    body: 'Chép chính tả nay có tính năng kiểm tra từng từ chi tiết hơn. Hãy thử trải nghiệm!',
    time: 'Hôm qua', isRead: true,
  },
  {
    id: 'n5', category: 'Bài học',
    icon: 'quiz', iconColor: 'text-secondary', iconBg: 'bg-secondary/10',
    title: 'Nhắc nhở: Ôn tập từ vựng',
    body: 'Bạn có 14 từ vựng cần ôn lại theo lịch Spaced Repetition hôm nay.',
    time: 'Hôm qua', isRead: true,
  },
  {
    id: 'n6', category: 'Khuyến mãi',
    icon: 'redeem', iconColor: 'text-tertiary', iconBg: 'bg-tertiary/10',
    title: '🎁 Ưu đãi đặc biệt: Nâng cấp Premium',
    body: 'Giảm 40% gói Premium trong 48 giờ. Mở khóa toàn bộ bài học và không giới hạn bài kiểm tra.',
    time: '2 ngày trước', isRead: true,
  },
];

const NotificationsPage = () => {
  const [selected, setSelected] = useState('Tất cả');
  const [notifs, setNotifs] = useState(NOTIFS);

  const filtered = notifs.filter((n) => selected === 'Tất cả' || n.category === selected);
  const unreadCount = notifs.filter((n) => !n.isRead).length;

  const markAllRead = () => setNotifs(notifs.map((n) => ({ ...n, isRead: true })));
  const markRead = (id: string) => setNotifs(notifs.map((n) => n.id === id ? { ...n, isRead: true } : n));
  const deleteNotif = (id: string) => setNotifs(notifs.filter((n) => n.id !== id));

  return (
    <div className="max-w-3xl mx-auto pb-16">

      {/* ── Header ───────────────────────────────────────────────────────── */}
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
          <button onClick={markAllRead}
            className="px-5 py-2.5 rounded-full border border-outline-variant text-on-surface-variant text-sm font-medium hover:bg-surface-container transition-all flex items-center gap-2">
            <span className="material-symbols-outlined text-[1rem]">done_all</span>
            Đánh dấu tất cả đã đọc
          </button>
        )}
      </div>

      {/* ── Category tabs ────────────────────────────────────────────────── */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2 mb-6">
        {CATEGORIES.map((c) => (
          <button key={c} onClick={() => setSelected(c)}
            className={`px-5 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
              selected === c
                ? 'bg-primary text-on-primary font-bold shadow'
                : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container'
            }`}>
            {c}
            {c === 'Tất cả' && unreadCount > 0 && (
              <span className="ml-1.5 bg-error text-on-error text-[10px] font-bold px-1.5 py-0.5 rounded-full">{unreadCount}</span>
            )}
          </button>
        ))}
      </div>

      {/* ── Notification list ────────────────────────────────────────────── */}
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center py-20 text-center">
          <span className="material-symbols-outlined text-[4rem] text-on-surface-variant/30 mb-4">notifications_off</span>
          <h3 className="font-headline font-bold text-xl text-on-surface mb-2">Không có thông báo</h3>
          <p className="text-on-surface-variant text-sm">Chưa có thông báo nào trong danh mục này.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {/* Unread section */}
          {filtered.some((n) => !n.isRead) && (
            <>
              <p className="text-xs font-headline font-bold text-on-surface-variant uppercase tracking-widest px-1 mt-2">Chưa đọc</p>
              {filtered.filter((n) => !n.isRead).map((notif) => (
                <NotifCard key={notif.id} notif={notif} onRead={markRead} onDelete={deleteNotif} />
              ))}
            </>
          )}

          {/* Read section */}
          {filtered.some((n) => n.isRead) && (
            <>
              <p className="text-xs font-headline font-bold text-on-surface-variant uppercase tracking-widest px-1 mt-4">Đã đọc</p>
              {filtered.filter((n) => n.isRead).map((notif) => (
                <NotifCard key={notif.id} notif={notif} onRead={markRead} onDelete={deleteNotif} />
              ))}
            </>
          )}
        </div>
      )}
    </div>
  );
};

// ─── NotifCard ─────────────────────────────────────────────────────────────────
const NotifCard = ({
  notif,
  onRead,
  onDelete,
}: {
  notif: NotifItem;
  onRead: (id: string) => void;
  onDelete: (id: string) => void;
}) => (
  <div
    className={`flex items-start gap-4 p-4 rounded-2xl border transition-all group cursor-pointer ${
      !notif.isRead
        ? 'bg-primary/5 border-primary/20 hover:bg-primary/8'
        : 'bg-surface-container-low border-outline-variant/10 hover:border-outline-variant/30'
    }`}
    onClick={() => onRead(notif.id)}
  >
    {/* Icon */}
    <div className={`w-11 h-11 rounded-xl ${notif.iconBg} flex items-center justify-center shrink-0 mt-0.5`}>
      <span className={`material-symbols-outlined text-[1.3rem] ${notif.iconColor}`} style={{ fontVariationSettings: "'FILL' 1" }}>
        {notif.icon}
      </span>
    </div>

    {/* Content */}
    <div className="flex-1 min-w-0">
      <div className="flex items-start gap-2">
        <p className={`font-headline font-bold text-sm text-on-surface leading-snug flex-1 ${!notif.isRead ? 'text-on-surface' : 'text-on-surface-variant'}`}>
          {notif.title}
        </p>
        {!notif.isRead && (
          <span className="w-2.5 h-2.5 rounded-full bg-primary shrink-0 mt-1" />
        )}
      </div>
      <p className="text-on-surface-variant text-xs mt-1 leading-relaxed line-clamp-2">{notif.body}</p>
      <div className="flex items-center gap-3 mt-2">
        <span className="text-xs text-outline">{notif.time}</span>
        <span className="text-xs text-on-surface-variant bg-surface-container px-2 py-0.5 rounded-full">{notif.category}</span>
      </div>
    </div>

    {/* Delete button */}
    <button
      onClick={(e) => { e.stopPropagation(); onDelete(notif.id); }}
      className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-outline hover:bg-error/10 hover:text-error transition-all opacity-0 group-hover:opacity-100"
    >
      <span className="material-symbols-outlined text-[1rem]">close</span>
    </button>
  </div>
);

export default NotificationsPage;
