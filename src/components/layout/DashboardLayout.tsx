import { Outlet } from 'react-router-dom';
import DashboardSidebar from '../../components/dashboard/DashboardSidebar';
import DashboardTopbar from '../../components/dashboard/DashboardTopbar';

const DashboardLayout = () => {
  return (
    <div className="min-h-screen bg-surface text-on-surface">
      <DashboardSidebar />
      <div className="ml-64 flex flex-col min-h-screen">
        <DashboardTopbar />
        <main className="flex-1 px-10 py-8 pb-16">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
