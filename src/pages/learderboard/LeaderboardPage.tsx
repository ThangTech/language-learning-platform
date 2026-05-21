import { useEffect, useState } from 'react';
import { message } from 'antd';
import { getLeaderboard } from '../../services/progress';
import { getUser } from '../../services/auth';
import type { LeaderboardEntryDto } from '../../interfaces/progress';

const avatarColors = ['bg-primary', 'bg-secondary', 'bg-tertiary', 'bg-primary-container', 'bg-secondary-container'];

interface LeaderboardRow {
  rank: number;
  name: string;
  avatar: string;
  level: string;
  score: number;
  streak: number;
  change: number;
  badge: string;
  isMe: boolean;
}

const getBadge = (rank: number) => {
  if (rank === 1) return '👑';
  if (rank === 2) return '🥈';
  if (rank === 3) return '🥉';
  return '';
};

const getLevel = (score: number) => {
  if (score >= 9000) return 'C1';
  if (score >= 7500) return 'B2';
  if (score >= 5000) return 'B1';
  if (score >= 2500) return 'A2';
  return 'A1';
};

const mapEntry = (entry: LeaderboardEntryDto, meId: string | null): LeaderboardRow => {
  const isMe = Boolean(meId && entry.userId === meId);
  const avatar = entry.fullName?.trim()?.charAt(0)?.toUpperCase() || 'U';

  return {
    rank: entry.rank,
    name: isMe ? `${entry.fullName} (Bạn)` : entry.fullName,
    avatar: avatar === 'B' && isMe ? '🎓' : avatar,
    level: getLevel(entry.totalScore),
    score: entry.totalScore,
    streak: entry.currentStreak,
    change: 0,
    badge: getBadge(entry.rank),
    isMe,
  };
};

const LeaderboardPage = () => {
  const [rows, setRows] = useState<LeaderboardRow[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const result = await getLeaderboard(10);
        if (result.success && result.data) {
          const user = getUser();
          const mapped = result.data.map((entry) => mapEntry(entry, user?.id ?? null));
          setRows(mapped);
        } else {
          message.error(result.message || 'Không thể tải bảng xếp hạng');
        }
      } catch (error: any) {
        message.error(error?.response?.data?.message || 'Lỗi kết nối');
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  const top3 = rows.slice(0, 3);
  const rest = rows.slice(3);
  const me = rows.find((row) => row.isMe);

  return (
    <div className="max-w-4xl mx-auto pb-16">
      <div className="mb-10 text-center">
        <h1 className="font-headline text-4xl font-extrabold text-on-surface mb-2">🏆 Bảng xếp hạng</h1>
        <p className="text-on-surface-variant">Xem top người học có điểm cao nhất hiện tại.</p>
      </div>

      {loading ? (
        <div className="rounded-[1.5rem] border border-outline-variant/10 bg-surface-container-low p-8 text-center text-on-surface-variant">
          Đang tải bảng xếp hạng...
        </div>
      ) : rows.length === 0 ? (
        <div className="rounded-[1.5rem] border border-outline-variant/10 bg-surface-container-low p-8 text-center text-on-surface-variant">
          Chưa có dữ liệu bảng xếp hạng.
        </div>
      ) : (
        <>
          <section className="mb-10">
            <div className="flex items-end justify-center gap-4 mb-8">
              {top3[1] && (
                <div className="flex flex-col items-center gap-3">
                  <div className="relative">
                    <div className="w-16 h-16 rounded-full bg-surface-container-high border-4 border-surface-container-highest flex items-center justify-center font-headline font-bold text-xl text-on-surface">
                      {top3[1].avatar}
                    </div>
                    <span className="absolute -bottom-1 -right-1 text-xl">{top3[1].badge}</span>
                  </div>
                  <div className="text-center">
                    <p className="font-headline font-bold text-sm text-on-surface">{top3[1].name}</p>
                    <p className="text-xs text-on-surface-variant">{top3[1].score.toLocaleString()} điểm</p>
                  </div>
                  <div className="w-24 h-24 bg-surface-container-high rounded-t-2xl flex items-end justify-center pb-3">
                    <span className="font-headline text-3xl font-extrabold text-on-surface-variant">2</span>
                  </div>
                </div>
              )}

              {top3[0] && (
                <div className="flex flex-col items-center gap-3 -mt-6">
                  <div className="relative">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-primary-container border-4 border-primary-fixed flex items-center justify-center font-headline font-bold text-2xl text-on-primary shadow-xl">
                      {top3[0].avatar}
                    </div>
                    <span className="absolute -bottom-1 -right-1 text-2xl">{top3[0].badge}</span>
                  </div>
                  <div className="text-center">
                    <p className="font-headline font-bold text-base text-primary">{top3[0].name}</p>
                    <p className="text-xs text-on-surface-variant">{top3[0].score.toLocaleString()} điểm</p>
                  </div>
                  <div className="w-28 h-32 bg-gradient-to-t from-primary to-primary-container rounded-t-2xl flex items-end justify-center pb-3">
                    <span className="font-headline text-4xl font-extrabold text-on-primary">1</span>
                  </div>
                </div>
              )}

              {top3[2] && (
                <div className="flex flex-col items-center gap-3">
                  <div className="relative">
                    <div className="w-16 h-16 rounded-full bg-surface-container-high border-4 border-surface-container-highest flex items-center justify-center font-headline font-bold text-xl text-on-surface">
                      {top3[2].avatar}
                    </div>
                    <span className="absolute -bottom-1 -right-1 text-xl">{top3[2].badge}</span>
                  </div>
                  <div className="text-center">
                    <p className="font-headline font-bold text-sm text-on-surface">{top3[2].name}</p>
                    <p className="text-xs text-on-surface-variant">{top3[2].score.toLocaleString()} điểm</p>
                  </div>
                  <div className="w-24 h-16 bg-surface-container-high rounded-t-2xl flex items-end justify-center pb-3">
                    <span className="font-headline text-3xl font-extrabold text-on-surface-variant">3</span>
                  </div>
                </div>
              )}
            </div>
          </section>

          <div className="flex flex-col gap-3">
            {rest.map((user, index) => (
              <div
                key={user.rank}
                className={`flex items-center gap-4 p-4 rounded-2xl border transition-all ${
                  user.isMe
                    ? 'bg-primary/5 border-primary/30 ring-2 ring-primary/20'
                    : 'bg-surface-container-low border-outline-variant/10 hover:border-outline-variant/30'
                }`}
              >
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center font-headline font-extrabold text-sm shrink-0 ${
                    user.isMe ? 'bg-primary text-on-primary' : 'bg-surface-container text-on-surface-variant'
                  }`}
                >
                  {user.rank}
                </div>

                <div className={`w-10 h-10 rounded-full ${avatarColors[index % avatarColors.length]} flex items-center justify-center text-white font-headline font-bold text-sm shrink-0`}>
                  {user.avatar}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className={`font-headline font-bold text-sm truncate ${user.isMe ? 'text-primary' : 'text-on-surface'}`}>
                      {user.name}
                    </p>
                    {user.isMe && <span className="text-[10px] bg-primary text-on-primary px-2 py-0.5 rounded-full font-bold">Bạn</span>}
                  </div>
                  <div className="flex items-center gap-3 mt-0.5">
                    <span className="text-xs text-on-surface-variant">{user.level}</span>
                    <span className="text-xs text-primary flex items-center gap-0.5">
                      <span className="material-symbols-outlined text-[0.8rem]" style={{ fontVariationSettings: "'FILL' 1" }}>local_fire_department</span>
                      {user.streak} ngày
                    </span>
                  </div>
                </div>

                <div className="shrink-0">
                  {user.change > 0
                    ? <span className="text-secondary text-xs font-bold flex items-center gap-0.5"><span className="material-symbols-outlined text-[0.9rem]">arrow_drop_up</span>+{user.change}</span>
                    : user.change < 0
                    ? <span className="text-error text-xs font-bold flex items-center gap-0.5"><span className="material-symbols-outlined text-[0.9rem]">arrow_drop_down</span>{user.change}</span>
                    : <span className="text-on-surface-variant text-xs">—</span>
                  }
                </div>

                <div className="text-right shrink-0">
                  <p className={`font-headline font-bold text-sm ${user.isMe ? 'text-primary' : 'text-on-surface'}`}>
                    {user.score.toLocaleString()}
                  </p>
                  <p className="text-xs text-on-surface-variant">điểm</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/15 rounded-[1.5rem] p-6 flex items-center gap-5">
            <div className="w-14 h-14 rounded-2xl bg-primary/15 flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-primary text-[1.8rem]" style={{ fontVariationSettings: "'FILL' 1" }}>rocket_launch</span>
            </div>
            <div>
              <h3 className="font-headline font-bold text-on-surface mb-1">
                {me ? `Bạn đang xếp hạng #${me.rank}!` : 'Tiếp tục học để leo hạng!'}
              </h3>
              <p className="text-on-surface-variant text-sm">
                {me
                  ? `Cần thêm ${Math.max((rows[5]?.score ?? me.score) - me.score, 0).toLocaleString()} điểm để vượt lên hạng #${Math.max(me.rank - 1, 1)}.`
                  : 'Bắt đầu học để xuất hiện trên bảng xếp hạng.'}
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default LeaderboardPage;
