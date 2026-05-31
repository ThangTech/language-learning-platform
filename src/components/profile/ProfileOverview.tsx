import { Link } from 'react-router-dom';

interface ActivityItem {
  icon: string;
  color: string;
  bg: string;
  title: string;
  time: string;
  score: string | null;
}

interface ProfileOverviewProps {
  activities: ActivityItem[];
}

const ProfileOverview = ({ activities }: ProfileOverviewProps) => {
  return (
    <div className="flex flex-col gap-6">
      <div className="bg-surface-container-low rounded-[1.5rem] p-6 border border-outline-variant/10">
        <h3 className="font-headline font-bold text-on-surface mb-5 flex items-center gap-2">
          <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>history</span>
          Hoạt động gần đây
        </h3>
        <div className="flex flex-col gap-3">
          {activities.map((activity, index) => (
            <div key={index} className="flex items-center gap-4 p-3 rounded-xl hover:bg-surface-container transition-colors">
              <div className={`w-10 h-10 rounded-xl ${activity.bg} flex items-center justify-center shrink-0`}>
                <span className={`material-symbols-outlined text-[1.2rem] ${activity.color}`} style={{ fontVariationSettings: "'FILL' 1" }}>
                  {activity.icon}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-on-surface truncate">{activity.title}</p>
                <p className="text-xs text-on-surface-variant">{activity.time}</p>
              </div>
              {activity.score && (
                <span className="font-headline font-bold text-sm text-secondary shrink-0">{activity.score}</span>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Link to="/streaks" className="no-underline">
          <div className="bg-primary/5 border border-primary/15 rounded-2xl p-5 flex items-center gap-4 hover:bg-primary/10 transition-colors cursor-pointer">
            <span className="material-symbols-outlined text-primary text-[2rem]" style={{ fontVariationSettings: "'FILL' 1" }}>local_fire_department</span>
            <div>
              <p className="font-headline font-bold text-on-surface">Chuỗi ngày học</p>
              <p className="text-xs text-on-surface-variant">Xem lịch sử và thành tích</p>
            </div>
          </div>
        </Link>
        <Link to="/leaderboard" className="no-underline">
          <div className="bg-tertiary/5 border border-tertiary/15 rounded-2xl p-5 flex items-center gap-4 hover:bg-tertiary/10 transition-colors cursor-pointer">
            <span className="material-symbols-outlined text-tertiary text-[2rem]" style={{ fontVariationSettings: "'FILL' 1" }}>leaderboard</span>
            <div>
              <p className="font-headline font-bold text-on-surface">Bảng xếp hạng</p>
              <p className="text-xs text-on-surface-variant">Xem bảng xếp hạng của bạn</p>
            </div>
          </div>
        </Link>
        <Link to="/listening" className="no-underline">
          <div className="bg-primary/5 border border-primary/15 rounded-2xl p-5 flex items-center gap-4 hover:bg-primary/10 transition-colors cursor-pointer">
            <span className="material-symbols-outlined text-primary text-[2rem]" style={{ fontVariationSettings: "'FILL' 1" }}>headphones</span>
            <div>
              <p className="font-headline font-bold text-on-surface">Quay lại Listening</p>
              <p className="text-xs text-on-surface-variant">Tiếp tục bài đang học</p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default ProfileOverview;
