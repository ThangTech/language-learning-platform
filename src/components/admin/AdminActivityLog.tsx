import { Link } from 'react-router-dom';

const AdminActivityLog = () => {
  return (
    <div className="bg-surface-container-low p-6 rounded-[1.5rem] border border-outline-variant/10">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-headline text-xl font-bold text-on-surface">Hoạt động gần đây</h3>
        <div className="flex items-center gap-3 text-sm">
          <Link to="/dashboard/admin/users" className="text-primary hover:underline">Người dùng</Link>
          <Link to="/progress" className="text-secondary hover:underline">Tiến độ</Link>
        </div>
      </div>

      <div className="rounded-2xl border border-dashed border-outline-variant/20 bg-surface-container p-6 text-center">
        <span className="material-symbols-outlined text-3xl text-on-surface-variant">update</span>
        <p className="mt-3 font-headline font-semibold text-on-surface">Chưa có dữ liệu hoạt động</p>
        <p className="mt-1 text-sm text-on-surface-variant">
          Khi có log thật từ backend, phần này sẽ hiển thị lịch sử hoạt động gần đây.
        </p>
      </div>
    </div>
  );
};

export default AdminActivityLog;
