import AdminUsersTable from '../../components/admin/AdminUsersTable';

const AdminUsersPage = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="font-headline text-3xl font-bold text-on-surface mb-2">Quản lý người học</h1>
        <p className="font-body text-on-surface-variant">Danh sách tài khoản, vai trò và trạng thái trong hệ thống VSTEPS.</p>
      </div>
      <AdminUsersTable />
    </div>
  );
};

export default AdminUsersPage;
