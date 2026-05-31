import { useEffect, useState } from 'react';
import { Form, message, Modal, Button } from 'antd';
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

  // Xem trước ảnh đại diện trong modal trước khi lưu
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
  const [savingAvatar, setSavingAvatar] = useState(false);

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
    form.setFieldsValue({ name: user?.fullName ?? '', bio: user?.bio ?? '' });
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleSave = async (values: { name: string; bio: string }) => {
    setSaving(true);
    try {
      const result = await updateProfile({
        fullName: values.name,
        avatarUrl: user?.avatarUrl,
        bio: values.bio,
      });
      if (result.success && result.data) {
        setUser(result.data);
        message.success('Đã cập nhật hồ sơ thành công');
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

  // Mở modal xem trước ảnh đại diện
  const handleAvatarChange = (_info: UploadChangeParam<UploadFile>, previewBase64: string) => {
    setAvatarPreview(previewBase64);
    setIsPreviewModalOpen(true);
  };

  // Lưu ảnh đại diện từ modal
  const handleSaveAvatar = async () => {
    if (!avatarPreview) return;
    setSavingAvatar(true);
    try {
      const result = await updateProfile({
        fullName: user?.fullName ?? '',
        avatarUrl: avatarPreview,
        bio: user?.bio,
      });
      if (result.success && result.data) {
        setUser(result.data);
        message.success('Đã cập nhật ảnh đại diện thành công');
        setIsPreviewModalOpen(false);
        setAvatarPreview(null);
      } else {
        message.error(result.message || 'Không thể lưu ảnh đại diện');
      }
    } catch {
      message.error('Không thể cập nhật ảnh đại diện');
    } finally {
      setSavingAvatar(false);
    }
  };

  const handleCancelAvatarPreview = () => {
    setIsPreviewModalOpen(false);
    setAvatarPreview(null);
  };

  return (
    <div className="max-w-4xl mx-auto pb-16">
      <ProfileHero
        isEditing={isEditing}
        name={user?.fullName ?? user?.displayName ?? 'Học Viên'}
        avatarUrl={user?.avatarUrl}
        bio={user?.bio}
        initials={user?.initials ?? '?'}
        streakDays={streak?.currentStreak ?? progress?.currentStreak ?? 0}
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

      {/* Modal Xem Trước Ảnh Đại Diện */}
      <Modal
        title={
          <span className="font-headline font-bold text-lg text-on-surface">
            Xem trước ảnh đại diện
          </span>
        }
        open={isPreviewModalOpen}
        onCancel={handleCancelAvatarPreview}
        footer={[
          <Button
            key="cancel"
            onClick={handleCancelAvatarPreview}
            className="rounded-full px-5 border border-outline-variant text-on-surface-variant"
          >
            Hủy
          </Button>,
          <Button
            key="submit"
            type="primary"
            loading={savingAvatar}
            onClick={handleSaveAvatar}
            className="rounded-full px-5 bg-primary text-on-primary font-bold"
          >
            Lưu ảnh đại diện
          </Button>,
        ]}
        centered
        className="max-w-sm"
      >
        <div className="flex flex-col items-center justify-center gap-4 py-6">
          {avatarPreview && (
            <img
              src={avatarPreview}
              alt="Preview"
              className="w-40 h-40 rounded-full object-cover shadow-2xl border-4 border-primary/20"
            />
          )}
          <p className="text-on-surface-variant text-sm text-center">
            Bạn có chắc chắn muốn chọn ảnh này làm ảnh đại diện của mình?
          </p>
        </div>
      </Modal>
    </div>
  );
};

export default ProfilePage;
