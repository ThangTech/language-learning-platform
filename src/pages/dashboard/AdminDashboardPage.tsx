import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminStatsCard from '../../components/admin/AdminStatsCard';
import AdminActivityLog from '../../components/admin/AdminActivityLog';
import { getUser } from '../../services/auth';
import { getUsers } from '../../services/admin';

const AdminDashboardPage = () => {
  const navigate = useNavigate();
  const user = getUser();
  const isAdmin = user?.role?.toLowerCase() === 'admin';
  const [totalUsers, setTotalUsers] = useState(0);
  const [activeUsers, setActiveUsers] = useState(0);

  const loadStats = async () => {
    try {
      const result = await getUsers(1, 100);
      if (result.success && result.data) {
        setTotalUsers(result.data.totalCount);
        setActiveUsers(result.data.items.filter((item) => item.status.toLowerCase() === 'active').length);
      }
    } catch {
      setTotalUsers(0);
      setActiveUsers(0);
    }
  };

  useEffect(() => {
    if (!isAdmin) {
      navigate('/dashboard/user');
      return;
    }
    loadStats();
  }, [isAdmin, navigate]);

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="font-headline text-3xl font-bold text-on-surface mb-2">Tổng quan quản trị VSTEPS</h1>
        <p className="font-body text-on-surface-variant">
          Xin chào, {user?.fullName || user?.email || 'quản trị viên'}. Theo dõi người học, bài nghe và nội dung luyện tập ở một nơi.
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
              title="Người dùng hoạt động"
              value={activeUsers}
              change="Tài khoản đang hoạt động"
              changeType="positive"
              icon="person_check"
              color="secondary"
            />
          </div>
          <div className="col-span-12 sm:col-span-6 lg:col-span-3">
            <AdminStatsCard
              title="Nội dung học"
              value="4 module"
              change="Từ vựng, Ngữ pháp, Luyện nghe, Quiz"
              changeType="neutral"
              icon="menu_book"
              color="tertiary"
            />
          </div>
          <div className="col-span-12 sm:col-span-6 lg:col-span-3">
            <AdminStatsCard
              title="Hệ thống"
              value="Online"
              change="Sẵn sàng quản trị"
              changeType="positive"
              icon="monitor_heart"
              color="primary"
            />
          </div>
        </div>
      </section>

      <section className="grid grid-cols-12 gap-6">
        <div className="col-span-12 lg:col-span-8">
          <AdminActivityLog />
        </div>
        <div className="col-span-12 lg:col-span-4">
          <div className="bg-surface-container-low p-6 rounded-[1.5rem] border border-outline-variant/10 h-full">
            <h3 className="font-headline text-xl font-bold text-on-surface mb-4">Truy cập nhanh</h3>
            <div className="flex flex-col gap-3">
              <button onClick={() => navigate('/dashboard/admin/users')} className="w-full rounded-xl border border-outline-variant px-4 py-3 text-left hover:bg-surface-container transition-colors">
                Quản lý người dùng
              </button>
              <button onClick={() => navigate('/vocabulary')} className="w-full rounded-xl border border-outline-variant px-4 py-3 text-left hover:bg-surface-container transition-colors">
                Quản lý từ vựng
              </button>
              <button onClick={() => navigate('/listening')} className="w-full rounded-xl border border-outline-variant px-4 py-3 text-left hover:bg-surface-container transition-colors">
                Quản lý bài nghe
              </button>
              <button onClick={() => navigate('/quiz')} className="w-full rounded-xl border border-outline-variant px-4 py-3 text-left hover:bg-surface-container transition-colors">
                Quản lý quiz
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AdminDashboardPage;
