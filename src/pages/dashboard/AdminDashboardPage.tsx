import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminStatsCard from '../../components/admin/AdminStatsCard';
import AdminUsersTable from '../../components/admin/AdminUsersTable';
import AdminActivityLog from '../../components/admin/AdminActivityLog';
import { getUser } from '../../services/auth';
import { getUsers } from '../../services/admin';

const AdminDashboardPage = () => {
  const navigate = useNavigate();
  const user = getUser();
  const isAdmin = user?.role?.toLowerCase() === 'admin';
  const [totalUsers, setTotalUsers] = useState(0);

  const loadStats = async () => {
    try {
      const result = await getUsers(1, 1);
      if (result.success && result.data) {
        setTotalUsers(result.data.totalCount);
      }
    } catch {
      setTotalUsers(0);
    }
  };

  useEffect(() => {
    if (!isAdmin) {
      navigate('/dashboard/user');
      return;
    }
    loadStats();
  }, []);

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="font-headline text-3xl font-bold text-on-surface mb-2">Dashboard Quản trị</h1>
        <p className="font-body text-on-surface-variant">
          Xin chào, {user?.fullName || user?.email || 'quản trị viên'}.
        </p>
      </div>

      <section className="mb-8">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 sm:col-span-6 lg:col-span-3">
            <AdminStatsCard
              title="Tổng người dùng"
              value={totalUsers}
              change="Dữ liệu từ hệ thống"
              changeType="neutral"
              icon="groups"
              color="primary"
            />
          </div>
          <div className="col-span-12 sm:col-span-6 lg:col-span-3">
            <AdminStatsCard
              title="Quản lý từ vựng"
              value="CRUD"
              change="Admin có thể thêm/sửa/xóa"
              changeType="neutral"
              icon="menu_book"
              color="secondary"
            />
          </div>
          <div className="col-span-12 sm:col-span-6 lg:col-span-3">
            <AdminStatsCard
              title="Quản lý bài nghe"
              value="VSTEP"
              change="A1 đến B2"
              changeType="neutral"
              icon="headphones"
              color="tertiary"
            />
          </div>
          <div className="col-span-12 sm:col-span-6 lg:col-span-3">
            <AdminStatsCard
              title="Quản lý quiz"
              value="Quiz"
              change="Theo bài nghe và bài học"
              changeType="neutral"
              icon="quiz"
              color="primary"
            />
          </div>
        </div>
      </section>

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
