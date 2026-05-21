import NotifCard from './NotifCard';

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

interface NotificationsSectionProps {
  items: NotifItem[];
  onRead: (id: string) => void;
  onDelete: (id: string) => void;
}

const NotificationsSection = ({ items, onRead, onDelete }: NotificationsSectionProps) => {
  const unreadItems = items.filter((item) => !item.isRead);
  const readItems = items.filter((item) => item.isRead);

  return (
    <div className="flex flex-col gap-3">
      {unreadItems.length > 0 && (
        <>
          <p className="text-xs font-headline font-bold text-on-surface-variant uppercase tracking-widest px-1 mt-2">
            Chưa đọc
          </p>
          {unreadItems.map((notif) => (
            <NotifCard key={notif.id} notif={notif} onRead={onRead} onDelete={onDelete} />
          ))}
        </>
      )}

      {readItems.length > 0 && (
        <>
          <p className="text-xs font-headline font-bold text-on-surface-variant uppercase tracking-widest px-1 mt-4">
            Đã đọc
          </p>
          {readItems.map((notif) => (
            <NotifCard key={notif.id} notif={notif} onRead={onRead} onDelete={onDelete} />
          ))}
        </>
      )}
    </div>
  );
};

export default NotificationsSection;
