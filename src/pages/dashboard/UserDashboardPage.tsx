import { useEffect, useState } from 'react';
import { message } from 'antd';
import WelcomeHero from '../../components/dashboard/WelcomeHero';
import RecommendedLesson from '../../components/dashboard/RecommendedLesson';
import UpdatesPanel from '../../components/dashboard/UpdatesPanel';
import StatsCards from '../../components/dashboard/StatsCards';
import FluencyChart from '../../components/dashboard/FluencyChart';
import { getUser } from '../../services/auth';
import { getStats, getStreak } from '../../services/progress';
import type { UserProgressDto, StreakDto } from '../../interfaces/progress';

/**
 * UserDashboardPage
 * Gọi API thật để lấy stats và streak của user hiện tại.
 * Route: /dashboard/user
 */
const UserDashboardPage = () => {
  const user = getUser();

  const [progress, setProgress] = useState<UserProgressDto | null>(null);
  const [streak, setStreak] = useState<StreakDto | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [statsRes, streakRes] = await Promise.all([getStats(), getStreak()]);
        if (statsRes.success && statsRes.data) {
          setProgress(statsRes.data);
        }
        if (streakRes.success && streakRes.data) {
          setStreak(streakRes.data);
        }
      } catch {
        message.error('Không thể tải dữ liệu thống kê');
      }
    };

    void loadData();
  }, []);

  const streakDays = streak?.currentStreak ?? progress?.currentStreak ?? 0;
  const username = user?.fullName || user?.displayName || 'Học Viên';

  return (
    <div className="max-w-6xl mx-auto">
      {/* Hero — Welcome + Streak thật */}
      <WelcomeHero
        username={username}
        streakDays={streakDays}
        hasStudiedToday={progress?.hasStudiedToday ?? false}
      />

      {/* Bento Grid */}
      <div className="grid grid-cols-12 gap-6">
        {/* Row 1: Recommended lesson (8) + Updates (4) */}
        <RecommendedLesson />
        <UpdatesPanel />

        {/* Row 2: Stats cards với dữ liệu thật */}
        <StatsCards
          wordsLearned={progress?.wordsLearned ?? 0}
          quizzesCompleted={progress?.quizzesCompleted ?? 0}
          listeningCompleted={progress?.listeningCompleted ?? 0}
        />

        {/* Row 3: Chart tiến trình 7 ngày */}
        <FluencyChart progress={progress} />
      </div>
    </div>
  );
};

export default UserDashboardPage;
