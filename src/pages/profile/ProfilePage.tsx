import { useEffect, useState } from 'react';
import { Form, message } from 'antd';
import type { UploadChangeParam } from 'antd/es/upload';
import type { UploadFile } from 'antd/es/upload/interface';
import ProfileHero from '../../components/profile/ProfileHero';
import ProfileStats from '../../components/profile/ProfileStats';
import ProfileTabs from '../../components/profile/ProfileTabs';
import ProfileOverview from '../../components/profile/ProfileOverview';
import ProfileStatsTab from '../../components/profile/ProfileStatsTab';
import ProfileSettingsTab from '../../components/profile/ProfileSettingsTab';
import { getProfile, getUser, updateProfile } from '../../services/auth';
import { getStats, getStreak } from '../../services/progress';
import type { UserDto } from '../../interfaces/common';
import type { UserProgressDto, StreakDto } from '../../interfaces/progress';

const TABS = ['Tổng quan', 'Thống kê', 'Cài đặt'];

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState('Tổng quan');
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState<UserDto | null>(getUser());
  const [progress, setProgress] = useState<UserProgressDto | null>(null);
  const [streak, setStreak] = useState<StreakDto | null>(null);
  const [saving, setSaving] = useState(false);
  const [form] = Form.useForm();

  // Load dữ liệu thực từ API
  useEffect(() => {
    const loadAll = async () => {
      try {
        const [profileRes, statsRes, streakRes] = await Promise.all([
          getProfile(),
          getStats(),
          getStreak(),
        ]);
        if (profileRes.success && profileRes.data) setUser(profileRes.data);
        if (statsRes.success && statsRes.data) setProgress(statsRes.data);
        if (streakRes.success && streakRes.data) setStreak(streakRes.data);
      } catch {
        message.error('Không thể tải thông tin hồ sơ');
      }
    };
    void loadAll();
  }, []);

  const stats = [
    {
      label: 'Bài đã học',
      value: String(progress?.listeningCompleted ?? 0),
      icon: 'menu_book',
      color: 'text-primary',
      bg: 'bg-primary/10',
    },
    {
      label: 'Từ vựng nắm',
      value: (progress?.wordsLearned ?? 0).toLocaleString('vi-VN'),
      icon: 'style',
      color: 'text-secondary',
      bg: 'bg-secondary/10',
    },
    {
      label: 'Chuỗi hiện tại',
      value: `${streak?.currentStreak ?? progress?.currentStreak ?? 0} ngày`,
      icon: 'local_fire_department',
      color: 'text-primary',
      bg: 'bg-primary/10',
    },
    {
      label: 'Quiz hoàn thành',
      value: String(progress?.quizzesCompleted ?? 0),
      icon: 'grade',
      color: 'text-tertiary',
      bg: 'bg-tertiary/10',
    },
  ];

  // Không dùng mock activities — để trống khi chưa có history API
  const activities: {
    icon: string;
    color: string;
    bg: string;
    title: string;
    time: string;
    score: string | null;
  }[] = [];

  const handleEdit = () => {
    form.setFieldsValue({ name: user?.fullName ?? '', bio: '' });
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleSave = async (values: { name: string; bio: string }) => {
    setSaving(true);
    try {
      const result = await updateProfile({ fullName: values.name, avatarUrl: user?.avatarUrl });
      if (result.success && result.data) {
        setUser(result.data);
        message.success('Đã cập nhật hồ sơ');
        setIsEditing(false);
      } else {
        message.error(result.message || 'Không thể cập nhật hồ sơ');
      }
    } catch {
      message.error('Lỗi kết nối');
    } finally {
      setSaving(false);
    }
  };

  // Xử lý upload ảnh đại diện — dùng base64 để preview, sau đó gửi URL lên API
  const handleAvatarChange = async (info: UploadChangeParam<UploadFile>) => {
    const file = info.file.originFileObj;
    if (!file) return;

    // Chuyển sang base64 để preview ngay lập tức
    const reader = new FileReader();
    reader.onload = async (e) => {
      const base64 = e.target?.result as string;
      if (!base64) return;

      // Cập nhật preview local
      setUser((prev) => prev ? { ...prev, avatarUrl: base64 } : prev);

      // Gửi lên API (dùng base64 làm avatarUrl hoặc URL blob)
      try {
        const result = await updateProfile({
          fullName: user?.fullName ?? '',
          avatarUrl: base64,
        });
        if (result.success && result.data) {
          setUser(result.data);
          message.success('Đã cập nhật ảnh đại diện');
        }
      } catch {
        message.error('Không thể cập nhật ảnh đại diện');
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="max-w-4xl mx-auto pb-16">
      <ProfileHero
        isEditing={isEditing}
        name={user?.fullName ?? user?.displayName ?? 'Học Viên'}
        avatarUrl={user?.avatarUrl}
        initials={user?.initials ?? '?'}
        streakDays={streak?.currentStreak ?? progress?.currentStreak ?? 0}
        joinedAt={undefined}
        saving={saving}
        onEdit={handleEdit}
        onCancel={handleCancel}
        onSave={handleSave}
        onAvatarChange={handleAvatarChange}
        form={form}
      />

      <ProfileStats stats={stats} />

      <ProfileTabs tabs={TABS} activeTab={activeTab} onSelectTab={setActiveTab} />

      {activeTab === 'Tổng quan' && (
        <ProfileOverview activities={activities} />
      )}
      {activeTab === 'Thống kê' && <ProfileStatsTab progress={progress} streak={streak} />}
      {activeTab === 'Cài đặt' && <ProfileSettingsTab />}
    </div>
  );
};

export default ProfilePage;
