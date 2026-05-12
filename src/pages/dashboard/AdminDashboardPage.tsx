import AdminStatsCard from '../../components/admin/AdminStatsCard';
import AdminUsersTable from '../../components/admin/AdminUsersTable';
import AdminActivityLog from '../../components/admin/AdminActivityLog';

const AdminDashboardPage = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="font-headline text-3xl font-bold text-on-surface mb-2">Dashboard Quản trị</h1>
        <p className="font-body text-on-surface-variant">Xin chào, quản trị viên. Đây là tổng quan hệ thống.</p>
      </div>

      {/* Stats */}
      <section className="mb-8">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 sm:col-span-6 lg:col-span-3">
            <AdminStatsCard
              title="Tổng người dùng"
              value="1,234"
              change="+12% so với tháng trước"
              changeType="positive"
              icon="groups"
              color="primary"
            />
          </div>
          <div className="col-span-12 sm:col-span-6 lg:col-span-3">
            <AdminStatsCard
              title="Bài học hoàn thành"
              value="5,678"
              change="+8% so với tháng trước"
              changeType="positive"
              icon="school"
              color="secondary"
            />
          </div>
          <div className="col-span-12 sm:col-span-6 lg:col-span-3">
            <AdminStatsCard
              title="Bài viết blog"
              value="89"
              change="+5 bài tuần này"
              changeType="positive"
              icon="article"
              color="tertiary"
            />
          </div>
          <div className="col-span-12 sm:col-span-6 lg:col-span-3">
            <AdminStatsCard
              title="Yêu cầu hỗ trợ"
              value="23"
              change="3 đang chờ xử lý"
              changeType="neutral"
              icon="support_agent"
              color="primary"
            />
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="mb-8">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 lg:col-span-8">
            <AdminUsersTable />
          </div>
          <div className="col-span-12 lg:col-span-4">
            <AdminActivityLog />
          </div>
        </div>
      </section>
    </div>
  );
};

export default AdminDashboardPage;