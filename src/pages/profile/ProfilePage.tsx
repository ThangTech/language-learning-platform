import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Form, Input } from 'antd';

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

  return (
    <div className="max-w-4xl mx-auto pb-16">
      <section className="mb-8">
        <div className="bg-gradient-to-br from-primary/10 to-secondary/5 rounded-[2rem] p-8 border border-outline-variant/10">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            <div className="relative shrink-0">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-primary-container flex items-center justify-center text-on-primary font-headline font-extrabold text-4xl shadow-xl">
                🎓
              </div>
            </div>

            <div className="flex-1 text-center md:text-left">
              {isEditing ? (
                <Form form={form} layout="vertical" requiredMark={false} initialValues={{ name, bio }} onFinish={handleSubmit} className="flex flex-col gap-3 max-w-sm">
                  <Form.Item name="name" className="mb-0" rules={[{ required: true, message: 'Vui lòng nhập tên' }]}>
                    <Input className="px-4 py-2 rounded-xl border-2 border-primary bg-surface-container-lowest font-headline font-bold text-xl outline-none" />
                  </Form.Item>
                  <Form.Item name="bio" className="mb-0" rules={[{ required: true, message: 'Vui lòng nhập giới thiệu' }]}>
                    <Input.TextArea rows={2} className="px-4 py-2 rounded-xl border-2 border-outline bg-surface-container-lowest text-sm outline-none resize-none focus:border-primary transition-colors" />
                  </Form.Item>
                  <div className="flex gap-2">
                    <Button type="primary" htmlType="submit" className="px-5 py-2 bg-primary text-on-primary rounded-full font-headline font-bold text-sm hover:opacity-90 transition-all">
                      Lưu
                    </Button>
                    <Button onClick={() => setIsEditing(false)} className="px-5 py-2 border border-outline-variant text-on-surface-variant rounded-full text-sm hover:bg-surface-container transition-all">
                      Huỷ
                    </Button>
                  </div>
                </Form>
              ) : (
                <>
                  <h1 className="font-headline text-2xl font-extrabold text-on-surface">{name}</h1>
                  <p className="text-on-surface-variant text-sm mt-1">{bio}</p>
                  <div className="flex items-center gap-3 mt-3 justify-center md:justify-start flex-wrap">
                    <span className="px-3 py-1 bg-primary-fixed text-on-primary-fixed rounded-full text-xs font-headline font-bold">A2 → B1</span>
                    <span className="text-xs text-on-surface-variant flex items-center gap-1">
                      <span className="material-symbols-outlined text-[0.9rem]">calendar_today</span>
                      Tham gia từ tháng 1/2025
                    </span>
                    <span className="text-xs text-primary flex items-center gap-1">
                      <span className="material-symbols-outlined text-[0.9rem]" style={{ fontVariationSettings: "'FILL' 1" }}>local_fire_department</span>
                      7 ngày liên tiếp
                    </span>
                  </div>
                </>
              )}
            </div>

            {!isEditing && (
              <button onClick={() => setIsEditing(true)} className="shrink-0 flex items-center gap-2 px-5 py-2.5 border border-outline-variant text-on-surface-variant rounded-full text-sm font-medium hover:bg-surface-container transition-all">
                <span className="material-symbols-outlined text-[1rem]">edit</span>
                Chỉnh sửa
              </button>
            )}
          </div>
        </div>
      </section>

      <section className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {STATS.map((s) => (
          <div key={s.label} className="bg-surface-container-low rounded-2xl p-4 flex flex-col gap-2 border border-outline-variant/10">
            <div className={`w-10 h-10 rounded-xl ${s.bg} flex items-center justify-center`}>
              <span className={`material-symbols-outlined text-[1.3rem] ${s.color}`} style={{ fontVariationSettings: "'FILL' 1" }}>{s.icon}</span>
            </div>
            <p className={`font-headline font-extrabold text-xl ${s.color}`}>{s.value}</p>
            <p className="text-on-surface-variant text-xs">{s.label}</p>
          </div>
        ))}
      </section>

      <div className="flex items-center gap-2 mb-6 border-b border-outline-variant/30">
        {TABS.map((tab) => (
          <button key={tab} onClick={() => setActiveTab(tab)} className={`px-5 py-3 font-headline font-bold text-sm border-b-2 -mb-px transition-all ${activeTab === tab ? 'border-primary text-primary' : 'border-transparent text-on-surface-variant hover:text-on-surface'}`}>
            {tab}
          </button>
        ))}
      </div>

      {activeTab === 'Tổng quan' && (
        <div className="flex flex-col gap-6">
          <div className="bg-surface-container-low rounded-[1.5rem] p-6 border border-outline-variant/10">
            <h3 className="font-headline font-bold text-on-surface mb-5 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>history</span>
              Hoạt động gần đây
            </h3>
            <div className="flex flex-col gap-3">
              {ACTIVITIES.map((a, i) => (
                <div key={i} className="flex items-center gap-4 p-3 rounded-xl hover:bg-surface-container transition-colors">
                  <div className={`w-10 h-10 rounded-xl ${a.bg} flex items-center justify-center shrink-0`}>
                    <span className={`material-symbols-outlined text-[1.2rem] ${a.color}`} style={{ fontVariationSettings: "'FILL' 1" }}>{a.icon}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-on-surface truncate">{a.title}</p>
                    <p className="text-xs text-on-surface-variant">{a.time}</p>
                  </div>
                  {a.score && (
                    <span className="font-headline font-bold text-sm text-secondary shrink-0">{a.score}</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link to="/streaks" className="no-underline">
              <div className="bg-primary/5 border border-primary/15 rounded-2xl p-5 flex items-center gap-4 hover:bg-primary/10 transition-colors cursor-pointer">
                <span className="material-symbols-outlined text-primary text-[2rem]" style={{ fontVariationSettings: "'FILL' 1" }}>local_fire_department</span>
                <div>
                  <p className="font-headline font-bold text-on-surface">Chuỗi ngày học</p>
                  <p className="text-xs text-on-surface-variant">Xem lịch sử và thành tích</p>
                </div>
              </div>
            </Link>
            <Link to="/leaderboard" className="no-underline">
              <div className="bg-tertiary/5 border border-tertiary/15 rounded-2xl p-5 flex items-center gap-4 hover:bg-tertiary/10 transition-colors cursor-pointer">
                <span className="material-symbols-outlined text-tertiary text-[2rem]" style={{ fontVariationSettings: "'FILL' 1" }}>leaderboard</span>
                <div>
                  <p className="font-headline font-bold text-on-surface">Bảng xếp hạng</p>
                  <p className="text-xs text-on-surface-variant">Đang xếp hạng #8</p>
                </div>
              </div>
            </Link>
            <Link to="/listening" className="no-underline">
              <div className="bg-primary/5 border border-primary/15 rounded-2xl p-5 flex items-center gap-4 hover:bg-primary/10 transition-colors cursor-pointer">
                <span className="material-symbols-outlined text-primary text-[2rem]" style={{ fontVariationSettings: "'FILL' 1" }}>headphones</span>
                <div>
                  <p className="font-headline font-bold text-on-surface">Quay lại Listening</p>
                  <p className="text-xs text-on-surface-variant">Tiếp tục bài đang học</p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      )}

      {activeTab === 'Thống kê' && (
        <div className="bg-surface-container-low rounded-[1.5rem] p-8 border border-outline-variant/10 flex flex-col items-center text-center gap-4">
          <span className="material-symbols-outlined text-[4rem] text-on-surface-variant/30">bar_chart</span>
          <h3 className="font-headline font-bold text-xl text-on-surface">Biểu đồ thống kê</h3>
          <p className="text-on-surface-variant text-sm max-w-sm">Thống kê chi tiết theo tuần/tháng sẽ được cập nhật khi kết nối API backend.</p>
        </div>
      )}

      {activeTab === 'Cài đặt' && (
        <div className="flex flex-col gap-4">
          {[
            { icon: 'notifications', label: 'Thông báo nhắc nhở', desc: 'Nhận thông báo học mỗi ngày lúc 8:00 AM', toggle: true },
            { icon: 'language', label: 'Ngôn ngữ giao diện', desc: 'Tiếng Việt', toggle: false },
            { icon: 'dark_mode', label: 'Chế độ tối', desc: 'Đang tắt', toggle: true },
            { icon: 'lock', label: 'Đổi mật khẩu', desc: 'Lần cuối thay đổi: 3 tháng trước', toggle: false },
          ].map((s, i) => (
            <div key={i} className="flex items-center gap-4 p-5 bg-surface-container-low rounded-2xl border border-outline-variant/10">
              <div className="w-10 h-10 rounded-xl bg-surface-container flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-on-surface-variant">{s.icon}</span>
              </div>
              <div className="flex-1">
                <p className="font-headline font-bold text-sm text-on-surface">{s.label}</p>
                <p className="text-xs text-on-surface-variant">{s.desc}</p>
              </div>
              {s.toggle ? (
                <div className="w-11 h-6 rounded-full bg-primary cursor-pointer relative shrink-0">
                  <div className="w-5 h-5 bg-white rounded-full absolute right-0.5 top-0.5 shadow transition-all" />
                </div>
              ) : (
                <span className="material-symbols-outlined text-outline">chevron_right</span>
              )}
            </div>
          ))}

          <button className="mt-4 flex items-center gap-3 px-6 py-3 rounded-full border border-error/30 text-error hover:bg-error/5 transition-all font-headline font-bold text-sm">
            <span className="material-symbols-outlined text-[1.1rem]">logout</span>
            Đăng xuất
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
