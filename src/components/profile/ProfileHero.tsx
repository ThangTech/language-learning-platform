import { useState } from 'react';
import { Form, Input, Button, Upload } from 'antd';
import { CameraOutlined } from '@ant-design/icons';
import type { UploadChangeParam } from 'antd/es/upload';
import type { UploadFile } from 'antd/es/upload/interface';

interface ProfileHeroProps {
  isEditing: boolean;
  name: string;
  avatarUrl?: string;
  bio?: string;
  initials?: string;
  streakDays?: number;
  saving?: boolean;
  onEdit: () => void;
  onCancel: () => void;
  onSave: (values: { name: string; bio: string }) => void;
  onAvatarChange?: (info: UploadChangeParam<UploadFile>, previewUrl: string) => void;
  form: any;
}

const ProfileHero = ({
  isEditing,
  name,
  avatarUrl,
  bio,
  initials = '?',
  streakDays = 0,
  saving = false,
  onEdit,
  onCancel,
  onSave,
  onAvatarChange,
  form,
}: ProfileHeroProps) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleUploadChange = (info: UploadChangeParam<UploadFile>) => {
    const file = info.file.originFileObj;
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const base64 = e.target?.result as string;
      if (!base64) return;
      setPreviewUrl(base64);
      onAvatarChange?.(info, base64);
    };
    reader.readAsDataURL(file);
  };

  const handleCancel = () => {
    setPreviewUrl(null);
    onCancel();
  };

  const displayAvatar = previewUrl ?? avatarUrl;

  return (
    <section className="mb-8">
      <div className="bg-gradient-to-br from-primary/10 to-secondary/5 rounded-[2rem] p-8 border border-outline-variant/10">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">

          <div className="relative shrink-0">
            {displayAvatar ? (
              <img
                src={displayAvatar}
                alt="Avatar"
                className="w-24 h-24 rounded-full object-cover shadow-xl border-2 border-primary/20"
              />
            ) : (
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-primary-container flex items-center justify-center text-on-primary font-headline font-extrabold text-4xl shadow-xl select-none">
                {initials}
              </div>
            )}

            {previewUrl && isEditing && (
              <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-[10px] text-primary font-bold whitespace-nowrap">
                Ảnh mới
              </span>
            )}

            {isEditing && onAvatarChange && (
              <Upload
                accept="image/*"
                showUploadList={false}
                beforeUpload={() => false}
                onChange={handleUploadChange}
              >
                <button
                  type="button"
                  className="absolute -bottom-1 -right-1 w-8 h-8 bg-primary rounded-full flex items-center justify-center shadow-lg hover:opacity-90 transition-all border-2 border-white"
                  title="Thay ảnh đại diện"
                >
                  <CameraOutlined className="text-white text-sm" />
                </button>
              </Upload>
            )}
          </div>

          <div className="flex-1 text-center md:text-left">
            {isEditing ? (
              <Form
                form={form}
                layout="vertical"
                requiredMark={false}
                onFinish={onSave}
                className="flex flex-col gap-3 max-w-sm"
              >
                <Form.Item
                  name="name"
                  label="Họ và tên"
                  className="mb-0"
                  rules={[{ required: true, message: 'Vui lòng nhập tên' }]}
                >
                  <Input className="px-4 py-2 rounded-xl border-2 border-primary bg-surface-container-lowest font-headline font-bold text-xl outline-none" />
                </Form.Item>

                <Form.Item name="bio" label="Giới thiệu bản thân" className="mb-0">
                  <Input.TextArea
                    rows={2}
                    className="px-4 py-2 rounded-xl border-2 border-outline bg-surface-container-lowest text-sm outline-none resize-none"
                    placeholder="Nói gì đó về bản thân..."
                    maxLength={200}
                    showCount
                  />
                </Form.Item>

                <div className="flex gap-2">
                  <Button
                    type="primary"
                    htmlType="submit"
                    loading={saving}
                    className="px-5 py-2 bg-primary text-on-primary rounded-full font-headline font-bold text-sm"
                  >
                    Lưu
                  </Button>
                  <Button
                    onClick={handleCancel}
                    className="px-5 py-2 border border-outline-variant text-on-surface-variant rounded-full text-sm"
                  >
                    Huỷ
                  </Button>
                </div>
              </Form>
            ) : (
              <>
                <h1 className="font-headline text-2xl font-extrabold text-on-surface">{name}</h1>

                <p className="text-on-surface-variant text-sm mt-1">
                  {bio || 'Đang luyện tập tiếng Anh chuẩn VSTEP 🎓'}
                </p>

                <div className="flex items-center gap-3 mt-3 justify-center md:justify-start flex-wrap">
                  {streakDays > 0 ? (
                    <span className="text-xs text-primary flex items-center gap-1">
                      <span
                        className="material-symbols-outlined text-[0.9rem]"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        local_fire_department
                      </span>
                      {streakDays} ngày liên tiếp
                    </span>
                  ) : (
                    <span className="text-xs text-outline flex items-center gap-1">
                      <span className="material-symbols-outlined text-[0.9rem]">
                        local_fire_department
                      </span>
                      Chưa có chuỗi học
                    </span>
                  )}
                </div>
              </>
            )}
          </div>

          {!isEditing && (
            <button
              onClick={onEdit}
              className="shrink-0 flex items-center gap-2 px-5 py-2.5 border border-outline-variant text-on-surface-variant rounded-full text-sm font-medium hover:bg-surface-container transition-all"
            >
              <span className="material-symbols-outlined text-[1rem]">edit</span>
              Chỉnh sửa
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default ProfileHero;
