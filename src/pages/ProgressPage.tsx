import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { message } from 'antd';
import { getStats, getStreak } from '../services/progress';
import { getLessons, getUserListeningResults } from '../services/listening';
import type { ListeningLessonDto, ListeningResultDto } from '../interfaces/listening';
import type { UserProgressDto, StreakDto } from '../interfaces/progress';

const ProgressPage = () => {
  const [stats, setStats] = useState<UserProgressDto | null>(null);
  const [streak, setStreak] = useState<StreakDto | null>(null);
  const [recentListening, setRecentListening] = useState<ListeningResultDto[]>([]);
  const [lessons, setLessons] = useState<ListeningLessonDto[]>([]);

  useEffect(() => {
    const load = async () => {
      try {
        const [statsRes, streakRes, listeningRes, lessonRes] = await Promise.all([
          getStats(),
          getStreak(),
          getUserListeningResults(),
          getLessons(1, 100),
        ]);
        if (statsRes.success && statsRes.data) setStats(statsRes.data);
        if (streakRes.success && streakRes.data) setStreak(streakRes.data);
        if (listeningRes.success && listeningRes.data) setRecentListening(listeningRes.data as ListeningResultDto[]);
        if (lessonRes.success && lessonRes.data) setLessons(lessonRes.data.items);
      } catch (error: any) {
        message.error(error?.response?.data?.message || 'Không thể tải tiến độ');
      }
    };

    load();
  }, []);

  const getLessonTitle = (lessonId: string) => lessons.find((lesson) => lesson.id === lessonId)?.title || 'Bài nghe';

  const recentResults = [...recentListening].sort((a, b) => new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime());
  const topResults = recentResults.slice(0, 3);

  const formatDateTime = (value: string) => {
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return value;
    return date.toLocaleString('vi-VN', {
      hour: '2-digit',
      minute: '2-digit',
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  return (
    <div className="min-h-screen pt-20">
      <div className="max-w-7xl mx-auto px-8 py-16">
        <h1 className="font-headline text-4xl font-bold mb-4">Tiến độ luyện nghe</h1>
        <p className="text-on-surface-variant max-w-2xl mb-8">
          Theo dõi số bài nghe đã hoàn thành, mức độ đang học và nhịp tiến bộ của bạn trong lộ trình VSTEPS.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-surface-container-low rounded-2xl p-5 border border-outline-variant/10">
            <p className="text-xs text-on-surface-variant mb-1">Bài nghe đã học</p>
            <p className="font-headline text-3xl font-bold text-primary">{stats?.listeningCompleted ?? 0}</p>
          </div>
          <div className="bg-surface-container-low rounded-2xl p-5 border border-outline-variant/10">
            <p className="text-xs text-on-surface-variant mb-1">Chuỗi hiện tại</p>
            <p className="font-headline text-3xl font-bold text-tertiary">{streak?.currentStreak ?? 0}</p>
          </div>
          <div className="bg-surface-container-low rounded-2xl p-5 border border-outline-variant/10">
            <p className="text-xs text-on-surface-variant mb-1">Tổng điểm</p>
            <p className="font-headline text-3xl font-bold text-secondary">{stats?.totalScore ?? 0}</p>
          </div>
        </div>

        <div className="bg-surface-container-low rounded-[1.5rem] p-6 border border-outline-variant/10 mb-8">
          <h2 className="font-headline text-xl font-bold mb-4">Tóm tắt học tập</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <p className="text-xs text-on-surface-variant">Từ đã học</p>
              <p className="font-headline text-xl font-bold">{stats?.wordsLearned ?? 0}</p>
            </div>
            <div>
              <p className="text-xs text-on-surface-variant">Ngữ pháp xong</p>
              <p className="font-headline text-xl font-bold">{stats?.grammarCompleted ?? 0}</p>
            </div>
            <div>
              <p className="text-xs text-on-surface-variant">Quiz xong</p>
              <p className="font-headline text-xl font-bold">{stats?.quizzesCompleted ?? 0}</p>
            </div>
            <div>
              <p className="text-xs text-on-surface-variant">Chuỗi dài nhất</p>
              <p className="font-headline text-xl font-bold">{streak?.longestStreak ?? 0}</p>
            </div>
          </div>
        </div>

        <div className="bg-surface-container-low rounded-[1.5rem] p-6 border border-outline-variant/10 mb-8">
          <h2 className="font-headline text-xl font-bold mb-4">Bài nghe gần đây</h2>
          <div className="flex flex-col gap-3">
            {topResults.length > 0 ? topResults.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between gap-4 rounded-xl bg-surface-container-lowest px-4 py-3"
              >
                <div>
                  <p className="font-headline font-bold text-on-surface">{getLessonTitle(item.lessonId)}</p>
                  <p className="text-xs text-on-surface-variant">Hoàn thành lúc {formatDateTime(item.completedAt)}</p>
                </div>
                <span className="font-headline font-bold text-secondary">{item.score}%</span>
              </div>
            )) : (
              <p className="text-sm text-on-surface-variant">Chưa có bài nghe gần đây.</p>
            )}
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          <Link to="/listening" className="no-underline">
            <button className="px-5 py-3 rounded-full bg-primary text-on-primary font-headline font-bold text-sm hover:opacity-90 transition-all">
              Đi tới Listening
            </button>
          </Link>
          <Link to="/vocabulary" className="no-underline">
            <button className="px-5 py-3 rounded-full border border-primary text-primary font-headline font-bold text-sm hover:bg-primary/5 transition-all">
              Ôn từ vựng
            </button>
          </Link>
          <Link to="/grammar" className="no-underline">
            <button className="px-5 py-3 rounded-full border border-outline-variant text-on-surface font-headline font-bold text-sm hover:bg-surface-container-low transition-all">
              Ôn ngữ pháp
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProgressPage;
