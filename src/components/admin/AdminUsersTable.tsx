import { useEffect, useState } from 'react';
import { Table, Tag, Button, Popconfirm, Select, message } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import type { UserDto } from '../../interfaces/common';
import { changeUserRole, deleteUser, getUsers, lockUser, unlockUser } from '../../services/admin';

const getStatusColor = (status: string) => {
  if (status.toLowerCase() === 'active') return 'green';
  if (status.toLowerCase() === 'locked') return 'red';
  return 'default';
};

const getStatusText = (status: string) => {
  if (status.toLowerCase() === 'active') return 'Hoạt động';
  if (status.toLowerCase() === 'locked') return 'Bị khóa';
  return status;
};

const AdminUsersTable = () => {
  const [users, setUsers] = useState<UserDto[]>([]);
  const [loading, setLoading] = useState(false);

  const loadUsers = async () => {
    setLoading(true);
    try {
      const result = await getUsers(1, 50);
      if (result.success && result.data) {
        setUsers(result.data.items);
      } else {
        message.error(result.message || 'Không thể tải danh sách người dùng');
      }
    } catch (error: any) {
      message.error(error?.response?.data?.message || 'Không thể tải danh sách người dùng');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleChangeRole = async (id: string, role: string) => {
    try {
      const result = await changeUserRole(id, role);
      if (result.success) {
        message.success('Đã đổi vai trò người dùng');
        loadUsers();
      } else {
        message.error(result.message || 'Không thể đổi vai trò');
      }
    } catch (error: any) {
      message.error(error?.response?.data?.message || 'Không thể đổi vai trò');
    }
  };

  const handleToggleLock = async (user: UserDto) => {
    try {
      const isLocked = user.status.toLowerCase() === 'locked';
      const result = isLocked ? await unlockUser(user.id) : await lockUser(user.id);
      if (result.success) {
        message.success(isLocked ? 'Đã mở khóa tài khoản' : 'Đã khóa tài khoản');
        loadUsers();
      } else {
        message.error(result.message || 'Không thể cập nhật trạng thái');
      }
    } catch (error: any) {
      message.error(error?.response?.data?.message || 'Không thể cập nhật trạng thái');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const result = await deleteUser(id);
      if (result.success) {
        message.success('Đã xóa người dùng');
        loadUsers();
      } else {
        message.error(result.message || 'Không thể xóa người dùng');
      }
    } catch (error: any) {
      message.error(error?.response?.data?.message || 'Không thể xóa người dùng');
    }
  };

  const columns: ColumnsType<UserDto> = [
    {
      title: 'Người dùng',
      key: 'user',
      render: (_, record) => (
        <div>
          <p className="font-headline text-sm font-semibold text-on-surface">{record.fullName}</p>
          <p className="font-body text-xs text-on-surface-variant">{record.email}</p>
        </div>
      ),
    },
    {
      title: 'Vai trò',
      dataIndex: 'role',
      key: 'role',
      width: 160,
      render: (role: string, record) => (
        <Select
          size="small"
          value={role}
          style={{ width: 120 }}
          onChange={(value) => handleChangeRole(record.id, value)}
          options={[
            { value: 'User', label: 'Người dùng' },
            { value: 'Admin', label: 'Quản trị' },
          ]}
        />
      ),
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      width: 130,
      render: (status: string) => (
        <Tag color={getStatusColor(status)} className="font-headline text-xs">
          {getStatusText(status)}
        </Tag>
      ),
    },
    {
      title: 'Hành động',
      key: 'actions',
      width: 220,
      render: (_, record) => (
        <div className="flex gap-2">
          <Button size="small" onClick={() => handleToggleLock(record)}>
            {record.status.toLowerCase() === 'locked' ? 'Mở khóa' : 'Khóa'}
          </Button>
          <Popconfirm
            title="Xóa người dùng?"
            description="Hành động này không thể hoàn tác."
            onConfirm={() => handleDelete(record.id)}
            okText="Xóa"
            cancelText="Hủy"
          >
            <Button size="small" danger>
              Xóa
            </Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <div className="bg-surface-container-low p-6 rounded-[1.5rem] border border-outline-variant/10">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-headline text-xl font-bold text-on-surface">Quản lý người dùng</h3>
        <Button onClick={loadUsers}>Tải lại</Button>
      </div>
      <Table
        rowKey="id"
        columns={columns}
        dataSource={users}
        loading={loading}
        pagination={{ pageSize: 10 }}
        className="admin-table"
      />
    </div>
  );
};

export default AdminUsersTable;
