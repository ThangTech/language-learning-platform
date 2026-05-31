import { useState, useEffect } from 'react';
import NotificationsHeader from '../../components/notifications/NotificationsHeader';
import NotificationsTabs from '../../components/notifications/NotificationsTabs';
import NotificationsEmptyState from '../../components/notifications/NotificationsEmptyState';
import NotificationsSection from '../../components/notifications/NotificationsSection';
import {
  getNotifications,
  markNotificationRead,
  markAllNotificationsRead,
  deleteNotification,
  type NotificationDto,
} from '../../services/notification';
import { message } from 'antd';

const CATEGORIES = ['Tất cả', 'Bài học', 'Thành tích', 'Hệ thống'];

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

const NotificationsPage = () => {
  const [selected, setSelected] = useState('Tất cả');
  const [notifs, setNotifs] = useState<NotifItem[]>([]);
  const [loading, setLoading] = useState(false);

  const loadNotifications = async () => {
    setLoading(true);
    try {
      const res = await getNotifications();
      if (res.success && res.data) {
        const mapped = res.data.map((n: NotificationDto): NotifItem => {
          let icon = 'notifications';
          let iconColor = 'text-primary';
          let iconBg = 'bg-primary/10';

          if (n.type === 'Lesson' || n.type === 'Listening') {
            icon = 'headphones';
            iconColor = 'text-primary';
            iconBg = 'bg-primary/10';
          } else if (n.type === 'Streak' || n.type === 'Achievement') {
            icon = 'emoji_events';
            iconColor = 'text-tertiary';
            iconBg = 'bg-tertiary/10';
          } else if (n.type === 'System') {
            icon = 'update';
            iconColor = 'text-secondary';
            iconBg = 'bg-secondary/10';
          }

          const categoryLabel =
            n.type === 'Lesson' || n.type === 'Listening'
              ? 'Bài học'
              : n.type === 'Achievement' || n.type === 'Streak'
              ? 'Thành tích'
              : 'Hệ thống';

          return {
            id: n.id,
            category: categoryLabel,
            icon,
            iconColor,
            iconBg,
            title: n.title,
            body: n.message,
            time: n.timeAgo || 'Vừa xong',
            isRead: n.isRead,
          };
        });
        setNotifs(mapped);
      }
    } catch {
      message.error('Không thể tải thông báo');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadNotifications();
  }, []);

  const filtered = notifs.filter((notif) => selected === 'Tất cả' || notif.category === selected);
  const unreadCount = notifs.filter((notif) => !notif.isRead).length;

  const markAllRead = async () => {
    try {
      const res = await markAllNotificationsRead();
      if (res.success) {
        setNotifs(notifs.map((notif) => ({ ...notif, isRead: true })));
        message.success('Đã đánh dấu đọc tất cả thông báo');
      }
    } catch {
      message.error('Không thể đánh dấu đọc tất cả');
    }
  };

  const markRead = async (id: string) => {
    // Tìm thông báo hiện tại, nếu đã đọc thì không gọi API nữa
    const notif = notifs.find((n) => n.id === id);
    if (!notif || notif.isRead) return;

    try {
      const res = await markNotificationRead(id);
      if (res.success) {
        setNotifs(notifs.map((n) => (n.id === id ? { ...n, isRead: true } : n)));
      }
    } catch {
      // Chỉ cập nhật UI nếu bị lỗi nhẹ
      setNotifs(notifs.map((n) => (n.id === id ? { ...n, isRead: true } : n)));
    }
  };

  const deleteNotif = async (id: string) => {
    try {
      const res = await deleteNotification(id);
      if (res.success) {
        setNotifs(notifs.filter((notif) => notif.id !== id));
        message.success('Đã xóa thông báo');
      }
    } catch {
      message.error('Không thể xóa thông báo');
    }
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

      {loading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      ) : filtered.length === 0 ? (
        <NotificationsEmptyState />
      ) : (
        <NotificationsSection items={filtered} onRead={markRead} onDelete={deleteNotif} />
      )}
    </div>
  );
};

export default NotificationsPage;
