import { Table, Tag, Button } from 'antd';
import type { ColumnsType } from 'antd/es/table';

interface UserData {
  key: string;
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
  status: 'active' | 'inactive' | 'banned';
  joinDate: string;
  progress: number;
}

const mockUsers: UserData[] = [
  {
    key: '1',
    id: 'USR001',
    name: 'Nguyễn Văn Minh',
    email: 'minhnv@gmail.com',
    role: 'user',
    status: 'active',
    joinDate: '2024-01-15',
    progress: 85,
  },
  {
    key: '2',
    id: 'USR002',
    name: 'Trần Thị Lan',
    email: 'lantt@yahoo.com',
    role: 'user',
    status: 'active',
    joinDate: '2024-02-20',
    progress: 72,
  },
  {
    key: '3',
    id: 'USR003',
    name: 'Lê Hoàng Nam',
    email: 'namlh@gmail.com',
    role: 'admin',
    status: 'active',
    joinDate: '2023-11-01',
    progress: 100,
  },
  {
    key: '4',
    id: 'USR004',
    name: 'Phạm Quốc Huy',
    email: 'huy.pq@gmail.com',
    role: 'user',
    status: 'inactive',
    joinDate: '2024-03-10',
    progress: 45,
  },
  {
    key: '5',
    id: 'USR005',
    name: 'Đỗ Minh Tuấn',
    email: 'tuan.dm@gmail.com',
    role: 'user',
    status: 'banned',
    joinDate: '2024-01-25',
    progress: 30,
  },
];

const statusColors = {
  active: 'green',
  inactive: 'default',
  banned: 'red',
};

const roleColors = {
  admin: 'purple',
  user: 'blue',
};

const AdminUsersTable = () => {
  const columns: ColumnsType<UserData> = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 100,
    },
    {
      title: 'Người dùng',
      key: 'user',
      render: (_, record) => (
        <div>
          <p className="font-headline text-sm font-semibold text-on-surface">{record.name}</p>
          <p className="font-body text-xs text-on-surface-variant">{record.email}</p>
        </div>
      ),
    },
    {
      title: 'Vai trò',
      dataIndex: 'role',
      key: 'role',
      width: 100,
      render: (role: 'admin' | 'user') => (
        <Tag color={roleColors[role]} className="font-headline text-xs">
          {role === 'admin' ? 'Quản trị' : 'Người dùng'}
        </Tag>
      ),
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      width: 120,
      render: (status: 'active' | 'inactive' | 'banned') => (
        <Tag color={statusColors[status]} className="font-headline text-xs">
          {status === 'active' ? 'Hoạt động' : status === 'inactive' ? 'Không hoạt động' : 'Bị khóa'}
        </Tag>
      ),
    },
    {
      title: 'Ngày tham gia',
      dataIndex: 'joinDate',
      key: 'joinDate',
      width: 130,
    },
    {
      title: 'Tiến độ',
      dataIndex: 'progress',
      key: 'progress',
      width: 140,
      render: (progress) => (
        <div className="w-full">
          <div className="w-full h-2 bg-surface-container-highest rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-primary to-primary-container rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="font-body text-xs text-on-surface-variant mt-1">{progress}%</p>
        </div>
      ),
    },
    {
      title: 'Hành động',
      key: 'actions',
      width: 120,
      render: () => (
        <div className="flex gap-2">
          <Button size="small" type="primary" className="!bg-primary">
            Sửa
          </Button>
          <Button size="small" danger>
            Xóa
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="bg-surface-container-low p-6 rounded-[1.5rem] border border-outline-variant/10">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-headline text-xl font-bold text-on-surface">Người dùng</h3>
        <Button type="primary" className="!bg-primary">
          <span className="material-symbols-outlined text-sm mr-1">add</span>
          Thêm người dùng
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={mockUsers}
        pagination={{ pageSize: 5 }}
        className="admin-table"
      />
    </div>
  );
};

export default AdminUsersTable;