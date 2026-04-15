import WelcomeHero from '../../components/dashboard/WelcomeHero';
import RecommendedLesson from '../../components/dashboard/RecommendedLesson';
import UpdatesPanel from '../../components/dashboard/UpdatesPanel';
import StatsCards from '../../components/dashboard/StatsCards';
import FluencyChart from '../../components/dashboard/FluencyChart';

/**
 * UserDashboardPage
 * Assembles all dashboard sections in a responsive 12-column bento grid.
 * Route: /dashboard/user
 */
const UserDashboardPage = () => {
  return (
    <div className="max-w-6xl mx-auto">
      {/* Hero — Welcome + Streak */}
      <WelcomeHero
        username="Scholar"
        improvementPercent={12}
        streakDays={15}
      />

      {/* Bento Grid */}
      <div className="grid grid-cols-12 gap-6">
        {/* Row 1: Recommended lesson (8) + Updates (4) */}
        <RecommendedLesson />
        <UpdatesPanel />

        {/* Row 2: Stats cards */}
        <StatsCards />

        {/* Row 3: Chart */}
        <FluencyChart />
      </div>
    </div>
  );
};

export default UserDashboardPage;
