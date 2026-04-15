import { Outlet } from 'react-router-dom';
import DashboardSidebar from '../../components/dashboard/DashboardSidebar';
import DashboardTopbar from '../../components/dashboard/DashboardTopbar';

/**
 * DashboardLayout — shell dành riêng cho người dùng đã đăng nhập.
 * Tách biệt khỏi App.tsx (layout trang chủ công khai) để không hiển thị
 * Header/Footer thông thường bên trong dashboard.
 */
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
