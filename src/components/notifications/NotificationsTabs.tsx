interface NotificationsTabsProps {
  categories: string[];
  selected: string;
  unreadCount: number;
  onSelect: (value: string) => void;
}

const NotificationsTabs = ({
  categories,
  selected,
  unreadCount,
  onSelect,
}: NotificationsTabsProps) => {
  return (
    <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2 mb-6">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onSelect(category)}
          className={`px-5 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
            selected === category
              ? 'bg-primary text-on-primary font-bold shadow'
              : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container'
          }`}
        >
          {category}
          {category === 'Tất cả' && unreadCount > 0 && (
            <span className="ml-1.5 bg-error text-on-error text-[10px] font-bold px-1.5 py-0.5 rounded-full">
              {unreadCount}
            </span>
          )}
        </button>
      ))}
    </div>
  );
};

export default NotificationsTabs;
