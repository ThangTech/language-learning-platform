const USERS = [
  { rank: 1, name: 'Minh Anh', avatar: 'M', level: 'C1', score: 9840, streak: 42, badge: '👑', change: 0 },
  { rank: 2, name: 'Phương Linh', avatar: 'P', level: 'B2', score: 8720, streak: 31, badge: '🥈', change: 1 },
  { rank: 3, name: 'Tuấn Khoa', avatar: 'T', level: 'B2', score: 8510, streak: 28, badge: '🥉', change: -1 },
  { rank: 4, name: 'Hà Thu', avatar: 'H', level: 'B1', score: 7650, streak: 19, badge: '', change: 2 },
  { rank: 5, name: 'Việt Hoàng', avatar: 'V', level: 'B1', score: 7200, streak: 15, badge: '', change: -1 },
  { rank: 6, name: 'Ngọc Mai', avatar: 'N', level: 'A2', score: 6800, streak: 12, badge: '', change: 3 },
  { rank: 7, name: 'Quang Hùng', avatar: 'Q', level: 'A2', score: 6400, streak: 9, badge: '', change: -2 },
  { rank: 8, name: 'Học Viên (Bạn)', avatar: '🎓', level: 'A2', score: 5900, streak: 7, badge: '', change: 4, isMe: true },
  { rank: 9, name: 'Thảo Vy', avatar: 'T', level: 'A1', score: 4300, streak: 5, badge: '', change: 0 },
  { rank: 10, name: 'Bảo Long', avatar: 'B', level: 'A1', score: 3800, streak: 3, badge: '', change: -1 },
];

const PERIODS = ['Tuần này', 'Tháng này', 'Mọi thời gian'];
const avatarColors = ['bg-primary', 'bg-secondary', 'bg-tertiary', 'bg-primary-container', 'bg-secondary-container'];

import { useState } from 'react';

const LeaderboardPage = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('Tuần này');
  const top3 = USERS.slice(0, 3);
  const rest = USERS.slice(3);

  return (
    <div className="max-w-4xl mx-auto pb-16">

      {/* Header */}
      <div className="mb-10 text-center">
        <h1 className="font-headline text-4xl font-extrabold text-on-surface mb-2">🏆 Bảng xếp hạng</h1>
        <p className="text-on-surface-variant">So sánh tiến độ với những người học khác. Cố gắng leo lên top!</p>
      </div>

      {/* Period tabs */}
      <div className="flex justify-center mb-10">
        <div className="inline-flex bg-surface-container rounded-full p-1 gap-1">
          {PERIODS.map((p) => (
            <button key={p} onClick={() => setSelectedPeriod(p)}
              className={`px-5 py-2 rounded-full text-sm font-headline font-bold transition-all ${
                selectedPeriod === p
                  ? 'bg-primary text-on-primary shadow'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}>
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* Podium top 3 */}
      <section className="mb-10">
        <div className="flex items-end justify-center gap-4 mb-8">
          {/* 2nd */}
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

          {/* 1st */}
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

          {/* 3rd */}
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
        </div>
      </section>

      {/* Full list */}
      <div className="flex flex-col gap-3">
        {rest.map((user, i) => (
          <div key={user.rank}
            className={`flex items-center gap-4 p-4 rounded-2xl border transition-all ${
              user.isMe
                ? 'bg-primary/5 border-primary/30 ring-2 ring-primary/20'
                : 'bg-surface-container-low border-outline-variant/10 hover:border-outline-variant/30'
            }`}>
            {/* Rank */}
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-headline font-extrabold text-sm shrink-0 ${
              user.isMe ? 'bg-primary text-on-primary' : 'bg-surface-container text-on-surface-variant'
            }`}>
              {user.rank}
            </div>

            {/* Avatar */}
            <div className={`w-10 h-10 rounded-full ${avatarColors[i % avatarColors.length]} flex items-center justify-center text-white font-headline font-bold text-sm shrink-0`}>
              {user.avatar}
            </div>

            {/* Info */}
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

            {/* Change */}
            <div className="shrink-0">
              {user.change > 0
                ? <span className="text-secondary text-xs font-bold flex items-center gap-0.5"><span className="material-symbols-outlined text-[0.9rem]">arrow_drop_up</span>+{user.change}</span>
                : user.change < 0
                ? <span className="text-error text-xs font-bold flex items-center gap-0.5"><span className="material-symbols-outlined text-[0.9rem]">arrow_drop_down</span>{user.change}</span>
                : <span className="text-on-surface-variant text-xs">—</span>
              }
            </div>

            {/* Score */}
            <div className="text-right shrink-0">
              <p className={`font-headline font-bold text-sm ${user.isMe ? 'text-primary' : 'text-on-surface'}`}>
                {user.score.toLocaleString()}
              </p>
              <p className="text-xs text-on-surface-variant">điểm</p>
            </div>
          </div>
        ))}
      </div>

      {/* Motivation banner */}
      <div className="mt-10 bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/15 rounded-[1.5rem] p-6 flex items-center gap-5">
        <div className="w-14 h-14 rounded-2xl bg-primary/15 flex items-center justify-center shrink-0">
          <span className="material-symbols-outlined text-primary text-[1.8rem]" style={{ fontVariationSettings: "'FILL' 1" }}>rocket_launch</span>
        </div>
        <div>
          <h3 className="font-headline font-bold text-on-surface mb-1">Bạn đang xếp hạng #8!</h3>
          <p className="text-on-surface-variant text-sm">Cần thêm <strong className="text-primary">1.300 điểm</strong> để vượt lên hạng #7. Hãy học thêm 2 bài ngày hôm nay!</p>
        </div>
      </div>
    </div>
  );
};

export default LeaderboardPage;
