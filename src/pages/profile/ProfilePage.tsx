import { useState } from 'react';
import { Form } from 'antd';
import ProfileHero from '../../components/profile/ProfileHero';
import ProfileStats from '../../components/profile/ProfileStats';
import ProfileTabs from '../../components/profile/ProfileTabs';
import ProfileOverview from '../../components/profile/ProfileOverview';
import ProfileStatsTab from '../../components/profile/ProfileStatsTab';
import ProfileSettingsTab from '../../components/profile/ProfileSettingsTab';

const TABS = ['Tổng quan', 'Thống kê', 'Cài đặt'];

const STATS = [
  { label: 'Bài đã học', value: '84', icon: 'menu_book', color: 'text-primary', bg: 'bg-primary/10' },
  { label: 'Từ vựng nắm', value: '1.240', icon: 'style', color: 'text-secondary', bg: 'bg-secondary/10' },
  { label: 'Chuỗi hiện tại', value: '7 ngày', icon: 'local_fire_department', color: 'text-primary', bg: 'bg-primary/10' },
  { label: 'Điểm TB', value: '81%', icon: 'grade', color: 'text-tertiary', bg: 'bg-tertiary/10' },
];

const ACTIVITIES = [
  { icon: 'headphones', color: 'text-primary', bg: 'bg-primary/10', title: 'Hoàn thành bài nghe: Hội thoại sân bay', time: '2 giờ trước', score: '92%' },
  { icon: 'quiz', color: 'text-secondary', bg: 'bg-secondary/10', title: 'Làm quiz: Từ vựng Du lịch', time: 'Hôm qua', score: '88%' },
  { icon: 'keyboard', color: 'text-tertiary', bg: 'bg-tertiary/10', title: 'Chép chính tả: 5 câu', time: 'Hôm qua', score: '76%' },
  { icon: 'menu_book', color: 'text-primary', bg: 'bg-primary/10', title: 'Học từ vựng: 12 từ mới', time: '2 ngày trước', score: null },
];

interface ProfileFormValues {
  name: string;
  bio: string;
}

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState('Tổng quan');
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState('Học Viên');
  const [bio, setBio] = useState('Đang học tiếng Anh để chinh phục thế giới 🌍');
  const [form] = Form.useForm();

  const handleSubmit = (values: ProfileFormValues) => {
    setName(values.name);
    setBio(values.bio);
    setIsEditing(false);
  };

  const handleEdit = () => {
    form.setFieldsValue({ name, bio });
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    form.setFieldsValue({ name, bio });
  };

  return (
    <div className="max-w-4xl mx-auto pb-16">
      <ProfileHero
        isEditing={isEditing}
        name={name}
        bio={bio}
        onEdit={handleEdit}
        onCancel={handleCancel}
        onSave={handleSubmit}
        form={form}
      />

      <ProfileStats stats={STATS} />

      <ProfileTabs tabs={TABS} activeTab={activeTab} onSelectTab={setActiveTab} />

      {activeTab === 'Tổng quan' && <ProfileOverview activities={ACTIVITIES} />}
      {activeTab === 'Thống kê' && <ProfileStatsTab />}
      {activeTab === 'Cài đặt' && <ProfileSettingsTab />}
    </div>
  );
};

export default ProfilePage;
