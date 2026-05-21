import { useState } from 'react';
import NotificationsHeader from '../../components/notifications/NotificationsHeader';
import NotificationsTabs from '../../components/notifications/NotificationsTabs';
import NotificationsEmptyState from '../../components/notifications/NotificationsEmptyState';
import NotificationsSection from '../../components/notifications/NotificationsSection';

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
  { id: 'n1', category: 'Bài học', icon: 'local_fire_department', iconColor: 'text-primary', iconBg: 'bg-primary/10', title: '🔥 Đừng để tắt chuỗi 7 ngày!', body: 'Bạn chưa học hôm nay. Chỉ cần 10 phút để giữ vững chuỗi ngày học liên tiếp.', time: '5 phút trước', isRead: false },
  { id: 'n2', category: 'Thành tích', icon: 'emoji_events', iconColor: 'text-tertiary', iconBg: 'bg-tertiary/10', title: '🏆 Thành tích mới: Học giả tháng!', body: 'Bạn đã học đủ 20 ngày trong tháng này. Thành tích "Học giả tháng" đã được mở khóa!', time: '1 giờ trước', isRead: false },
  { id: 'n3', category: 'Bài học', icon: 'headphones', iconColor: 'text-primary', iconBg: 'bg-primary/10', title: 'Bài nghe mới: Tin tức buổi sáng B2', body: 'Bài học mới trong chủ đề Tin tức vừa được thêm vào. Thử ngay nhé!', time: '3 giờ trước', isRead: false },
  { id: 'n4', category: 'Hệ thống', icon: 'update', iconColor: 'text-secondary', iconBg: 'bg-secondary/10', title: 'Cập nhật tính năng mới', body: 'Chép chính tả nay có tính năng kiểm tra từng từ chi tiết hơn. Hãy thử trải nghiệm!', time: 'Hôm qua', isRead: true },
  { id: 'n5', category: 'Bài học', icon: 'quiz', iconColor: 'text-secondary', iconBg: 'bg-secondary/10', title: 'Nhắc nhở: Ôn tập từ vựng', body: 'Bạn có 14 từ vựng cần ôn lại theo lịch Spaced Repetition hôm nay.', time: 'Hôm qua', isRead: true },
  { id: 'n6', category: 'Khuyến mãi', icon: 'redeem', iconColor: 'text-tertiary', iconBg: 'bg-tertiary/10', title: '🎁 Ưu đãi đặc biệt: Nâng cấp Premium', body: 'Giảm 40% gói Premium trong 48 giờ. Mở khóa toàn bộ bài học và không giới hạn bài kiểm tra.', time: '2 ngày trước', isRead: true },
];

const NotificationsPage = () => {
  const [selected, setSelected] = useState('Tất cả');
  const [notifs, setNotifs] = useState(NOTIFS);

  const filtered = notifs.filter((notif) => selected === 'Tất cả' || notif.category === selected);
  const unreadCount = notifs.filter((notif) => !notif.isRead).length;

  const markAllRead = () => {
    setNotifs(notifs.map((notif) => ({ ...notif, isRead: true })));
  };

  const markRead = (id: string) => {
    setNotifs(notifs.map((notif) => (notif.id === id ? { ...notif, isRead: true } : notif)));
  };

  const deleteNotif = (id: string) => {
    setNotifs(notifs.filter((notif) => notif.id !== id));
  };

  return (
    <div className="max-w-3xl mx-auto pb-16">
      <NotificationsHeader unreadCount={unreadCount} onMarkAllRead={markAllRead} />

      <NotificationsTabs
        categories={CATEGORIES}
        selected={selected}
        unreadCount={unreadCount}
        onSelect={setSelected}
      />

      {filtered.length === 0 ? (
        <NotificationsEmptyState />
      ) : (
        <NotificationsSection items={filtered} onRead={markRead} onDelete={deleteNotif} />
      )}
    </div>
  );
};

export default NotificationsPage;
