import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { message } from 'antd';
import { getStreak } from '../../services/progress';
import type { StreakDto } from '../../interfaces/progress';

interface CalendarDay {
  date: number;
  status: 'today' | 'done' | 'missed';
}

const ACHIEVEMENTS = [
  { icon: 'local_fire_department', label: '7 Ngày liên tiếp', desc: 'Học 7 ngày không nghỉ', unlocked: true, color: 'text-primary' },
  { icon: 'workspace_premium', label: 'Học giả tháng', desc: 'Học đủ 20 ngày trong tháng', unlocked: true, color: 'text-tertiary' },
  { icon: 'bolt', label: 'Bứt phá', desc: '5 bài trong 1 ngày', unlocked: true, color: 'text-secondary' },
  { icon: 'emoji_events', label: '30 Ngày vàng', desc: 'Học đủ 30 ngày liên tiếp', unlocked: false, color: 'text-on-surface-variant' },
  { icon: 'auto_awesome', label: 'Hoàn hảo', desc: 'Đạt 100% trong 5 bài liên tiếp', unlocked: false, color: 'text-on-surface-variant' },
  { icon: 'psychology', label: 'Bậc thầy', desc: 'Đạt level C1', unlocked: false, color: 'text-on-surface-variant' },
];

const StreaksPage = () => {
  const [streak, setStreak] = useState<StreakDto | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const result = await getStreak();
        if (result.success && result.data) {
          setStreak(result.data);
        }
      } catch (error: any) {
        message.error(error?.response?.data?.message || 'Không thể tải chuỗi học');
      }
    };

    load();
  }, []);

  const currentStreak = streak?.currentStreak ?? 0;
  const longestStreak = streak?.longestStreak ?? 0;
  const doneCount = Math.min(currentStreak, 30);
  const generateCalendar = (): CalendarDay[] => {
    const days: CalendarDay[] = [];
    for (let i = 29; i >= 0; i--) {
      const status: CalendarDay['status'] = i === 0
        ? 'today'
        : i < currentStreak
          ? 'done'
          : 'missed';
      const date = new Date();
      date.setDate(date.getDate() - i);
      days.push({ date: date.getDate(), status });
    }
    return days;
  };

  const calendar = generateCalendar();

  return (
    <div className="max-w-4xl mx-auto pb-16">

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="mb-10">
        <div className="bg-gradient-to-br from-primary to-primary-container rounded-[2rem] p-10 text-on-primary relative overflow-hidden flex flex-col md:flex-row items-center gap-8">
          {/* Decorative */}
          <div className="absolute right-0 top-0 opacity-10 translate-x-4 -translate-y-4 select-none pointer-events-none">
            <span className="material-symbols-outlined text-[16rem] text-white">local_fire_department</span>
          </div>

          {/* Streak counter */}
          <div className="relative z-10 flex flex-col items-center text-center shrink-0">
            <div className="w-28 h-28 rounded-full bg-white/20 border-4 border-white/40 flex items-center justify-center mb-2">
              <span className="font-headline text-5xl font-extrabold">{currentStreak}</span>
            </div>
            <p className="font-headline font-bold text-lg">ngày liên tiếp 🔥</p>
          </div>

          {/* Info */}
          <div className="relative z-10 flex-1 text-center md:text-left">
            <h1 className="font-headline text-3xl font-extrabold mb-3">Giữ ngọn lửa học tập!</h1>
            <p className="text-primary-fixed leading-relaxed max-w-md mb-6">
              Bạn đang có chuỗi <strong>{currentStreak} ngày</strong> học liên tiếp. Kỷ lục cao nhất của bạn là <strong>{longestStreak} ngày</strong>. Hôm nay đừng để tắt lửa nhé!
            </p>
            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
              <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                <Link to="/listening">
                  <button className="bg-white text-primary px-6 py-3 rounded-full font-headline font-bold text-sm hover:opacity-90 transition-all flex items-center gap-2 shadow-lg">
                    <span className="material-symbols-outlined text-[1.1rem]" style={{ fontVariationSettings: "'FILL' 1" }}>headphones</span>
                    Học ngay hôm nay
                  </button>
                </Link>
                <Link to="/progress">
                  <button className="bg-white/20 text-white px-6 py-3 rounded-full font-headline font-bold text-sm hover:bg-white/30 transition-all flex items-center gap-2 border border-white/20">
                    <span className="material-symbols-outlined text-[1.1rem]" style={{ fontVariationSettings: "'FILL' 1" }}>insights</span>
                    Xem tiến độ
                  </button>
                </Link>
              </div>
              <div className="bg-white/20 px-6 py-3 rounded-full flex items-center gap-2">
                <span className="material-symbols-outlined text-[1.1rem]" style={{ fontVariationSettings: "'FILL' 1" }}>emoji_events</span>
                <span className="font-headline font-bold text-sm">Kỷ lục: {longestStreak} ngày</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Quick Stats ──────────────────────────────────────────────────── */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        {[
          { label: 'Chuỗi hiện tại', value: `${currentStreak} ngày`, icon: 'local_fire_department', color: 'text-primary' },
          { label: 'Kỷ lục cá nhân', value: `${longestStreak} ngày`, icon: 'emoji_events', color: 'text-tertiary' },
          { label: 'Ngày học tháng này', value: `${doneCount} ngày`, icon: 'calendar_month', color: 'text-secondary' },
          { label: 'Tỷ lệ chuyên cần', value: `${Math.round((doneCount / 30) * 100)}%`, icon: 'insights', color: 'text-primary' },
        ].map((s) => (
          <div key={s.label} className="bg-surface-container-low rounded-2xl p-5 flex items-center gap-3 border border-outline-variant/10">
            <div className={`w-10 h-10 rounded-xl bg-surface-container-high flex items-center justify-center ${s.color}`}>
              <span className="material-symbols-outlined text-[1.3rem]" style={{ fontVariationSettings: "'FILL' 1" }}>{s.icon}</span>
            </div>
            <div>
              <p className={`font-headline font-extrabold text-lg ${s.color}`}>{s.value}</p>
              <p className="text-on-surface-variant text-xs leading-tight">{s.label}</p>
            </div>
          </div>
        ))}
      </section>

      {/* ── Calendar ─────────────────────────────────────────────────────── */}
      <section className="mb-10 bg-surface-container-low rounded-[1.5rem] p-6 border border-outline-variant/10">
        <h2 className="font-headline font-bold text-xl text-on-surface mb-6 flex items-center gap-2">
          <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>calendar_month</span>
          30 ngày gần nhất
        </h2>
        <div className="grid grid-cols-10 gap-2">
          {calendar.map((day, i) => (
            <div key={i} title={`Ngày ${day.date}`}
              className={`aspect-square rounded-lg flex items-center justify-center text-xs font-headline font-bold transition-all ${
                day.status === 'today'
                  ? 'bg-primary text-on-primary ring-2 ring-primary/50 scale-110'
                  : day.status === 'done'
                  ? 'bg-secondary/20 text-secondary border border-secondary/20'
                  : 'bg-surface-container text-on-surface-variant/40'
              }`}>
              {day.status === 'today'
                ? <span className="material-symbols-outlined text-[0.9rem]" style={{ fontVariationSettings: "'FILL' 1" }}>local_fire_department</span>
                : day.status === 'done'
                ? <span className="material-symbols-outlined text-[0.9rem]" style={{ fontVariationSettings: "'FILL' 1" }}>check</span>
                : day.date}
            </div>
          ))}
        </div>
        <div className="flex items-center gap-4 mt-4 text-xs text-on-surface-variant">
          <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-primary inline-block" /> Hôm nay</span>
          <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-secondary/30 inline-block" /> Đã học</span>
          <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-surface-container inline-block" /> Bỏ lỡ</span>
        </div>
      </section>

      {/* ── Achievements ─────────────────────────────────────────────────── */}
      <section>
        <h2 className="font-headline font-bold text-xl text-on-surface mb-6 flex items-center gap-2">
          <span className="material-symbols-outlined text-tertiary" style={{ fontVariationSettings: "'FILL' 1" }}>workspace_premium</span>
          Thành tích
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {ACHIEVEMENTS.map((a, i) => (
            <div key={i}
              className={`p-5 rounded-2xl border flex flex-col items-center text-center gap-3 transition-all ${
                a.unlocked
                  ? 'bg-surface-container-low border-outline-variant/20 hover:shadow-md'
                  : 'bg-surface-container border-outline-variant/10 opacity-50 grayscale'
              }`}>
              <div className={`w-14 h-14 rounded-2xl ${a.unlocked ? 'bg-primary/10' : 'bg-surface-container-high'} flex items-center justify-center`}>
                <span className={`material-symbols-outlined text-[2rem] ${a.unlocked ? a.color : 'text-on-surface-variant'}`}
                  style={{ fontVariationSettings: a.unlocked ? "'FILL' 1" : "'FILL' 0" }}>
                  {a.icon}
                </span>
              </div>
              <div>
                <p className="font-headline font-bold text-sm text-on-surface">{a.label}</p>
                <p className="text-on-surface-variant text-xs mt-1">{a.desc}</p>
              </div>
              {a.unlocked && (
                <span className="text-[10px] bg-secondary text-on-secondary px-2 py-0.5 rounded-full font-headline font-bold">Đã đạt</span>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default StreaksPage;
