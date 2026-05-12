interface ActivityItem {
  id: string;
  user: string;
  action: string;
  target: string;
  time: string;
  icon: string;
  iconColor: 'primary' | 'secondary' | 'tertiary';
}

const mockActivities: ActivityItem[] = [
  {
    id: '1',
    user: 'Nguyễn Văn Minh',
    action: 'Hoàn thành bài học',
    target: 'Ngữ pháp cơ bản - Thì hiện tại',
    time: '5 phút trước',
    icon: 'check_circle',
    iconColor: 'secondary',
  },
  {
    id: '2',
    user: 'Trần Thị Lan',
    action: 'Đăng ký tài khoản mới',
    target: 'Tài khoản: lantt@yahoo.com',
    time: '15 phút trước',
    icon: 'person_add',
    iconColor: 'primary',
  },
  {
    id: '3',
    user: 'Phạm Quốc Huy',
    action: 'Bắt đầu luyện tập',
    target: 'Từ vựng chủ đề Kinh doanh',
    time: '30 phút trước',
    icon: 'school',
    iconColor: 'tertiary',
  },
  {
    id: '4',
    user: 'Lê Hoàng Nam',
    action: 'Đạt streak mới',
    target: 'Streak 15 ngày liên tiếp',
    time: '1 giờ trước',
    icon: 'local_fire_department',
    iconColor: 'tertiary',
  },
  {
    id: '5',
    user: 'Admin',
    action: 'Cập nhật nội dung',
    target: 'Bài học Listening cấp độ B1',
    time: '2 giờ trước',
    icon: 'edit',
    iconColor: 'primary',
  },
];

const iconColorClasses = {
  primary: 'bg-primary-fixed text-primary',
  secondary: 'bg-secondary-fixed text-secondary',
  tertiary: 'bg-tertiary-fixed text-tertiary',
};

const AdminActivityLog = () => {
  return (
    <div className="bg-surface-container-low p-6 rounded-[1.5rem] border border-outline-variant/10">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-headline text-xl font-bold text-on-surface">Hoạt động gần đây</h3>
        <button className="font-body text-sm text-primary hover:underline">Xem tất cả</button>
      </div>
      <div className="flex flex-col gap-4">
        {mockActivities.map((activity) => (
          <div key={activity.id} className="flex items-start gap-4 p-3 rounded-xl hover:bg-surface-container-high transition-colors">
            <div className={`h-10 w-10 ${iconColorClasses[activity.iconColor]} rounded-xl flex items-center justify-center shrink-0`}>
              <span className="material-symbols-outlined text-lg">{activity.icon}</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-headline text-sm font-semibold text-on-surface">{activity.user}</p>
              <p className="font-body text-sm text-on-surface">{activity.action}</p>
              <p className="font-body text-xs text-primary truncate">{activity.target}</p>
            </div>
            <p className="font-body text-xs text-on-surface-variant shrink-0">{activity.time}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminActivityLog;