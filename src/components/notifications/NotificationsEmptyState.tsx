const NotificationsEmptyState = () => {
  return (
    <div className="flex flex-col items-center py-20 text-center">
      <span className="material-symbols-outlined text-[4rem] text-on-surface-variant/30 mb-4">notifications_off</span>
      <h3 className="font-headline font-bold text-xl text-on-surface mb-2">Không có thông báo</h3>
      <p className="text-on-surface-variant text-sm">Chưa có thông báo nào trong danh mục này.</p>
    </div>
  );
};

export default NotificationsEmptyState;
