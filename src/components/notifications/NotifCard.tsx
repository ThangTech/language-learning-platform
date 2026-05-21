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

interface NotifCardProps {
  notif: NotifItem;
  onRead: (id: string) => void;
  onDelete: (id: string) => void;
}

const NotifCard = ({ notif, onRead, onDelete }: NotifCardProps) => {
  return (
    <div
      className={`flex items-start gap-4 p-4 rounded-2xl border transition-all group cursor-pointer ${
        !notif.isRead
          ? 'bg-primary/5 border-primary/20 hover:bg-primary/8'
          : 'bg-surface-container-low border-outline-variant/10 hover:border-outline-variant/30'
      }`}
      onClick={() => onRead(notif.id)}
    >
      <div className={`w-11 h-11 rounded-xl ${notif.iconBg} flex items-center justify-center shrink-0 mt-0.5`}>
        <span className={`material-symbols-outlined text-[1.3rem] ${notif.iconColor}`} style={{ fontVariationSettings: "'FILL' 1" }}>
          {notif.icon}
        </span>
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-start gap-2">
          <p className={`font-headline font-bold text-sm leading-snug flex-1 ${!notif.isRead ? 'text-on-surface' : 'text-on-surface-variant'}`}>
            {notif.title}
          </p>
          {!notif.isRead && <span className="w-2.5 h-2.5 rounded-full bg-primary shrink-0 mt-1" />}
        </div>
        <p className="text-on-surface-variant text-xs mt-1 leading-relaxed line-clamp-2">{notif.body}</p>
        <div className="flex items-center gap-3 mt-2">
          <span className="text-xs text-outline">{notif.time}</span>
          <span className="text-xs text-on-surface-variant bg-surface-container px-2 py-0.5 rounded-full">{notif.category}</span>
        </div>
      </div>

      <button
        onClick={(event) => {
          event.stopPropagation();
          onDelete(notif.id);
        }}
        className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-outline hover:bg-error/10 hover:text-error transition-all opacity-0 group-hover:opacity-100"
      >
        <span className="material-symbols-outlined text-[1rem]">close</span>
      </button>
    </div>
  );
};

export default NotifCard;
