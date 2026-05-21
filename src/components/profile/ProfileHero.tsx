import { Form, Input, Button } from 'antd';

interface ProfileHeroProps {
  isEditing: boolean;
  name: string;
  bio: string;
  onEdit: () => void;
  onCancel: () => void;
  onSave: (values: { name: string; bio: string }) => void;
  form: any;
}

const ProfileHero = ({
  isEditing,
  name,
  bio,
  onEdit,
  onCancel,
  onSave,
  form,
}: ProfileHeroProps) => {
  return (
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
              <Form
                form={form}
                layout="vertical"
                requiredMark={false}
                initialValues={{ name, bio }}
                onFinish={onSave}
                className="flex flex-col gap-3 max-w-sm"
              >
                <Form.Item
                  name="name"
                  className="mb-0"
                  rules={[{ required: true, message: 'Vui lòng nhập tên' }]}
                >
                  <Input className="px-4 py-2 rounded-xl border-2 border-primary bg-surface-container-lowest font-headline font-bold text-xl outline-none" />
                </Form.Item>
                <Form.Item
                  name="bio"
                  className="mb-0"
                  rules={[{ required: true, message: 'Vui lòng nhập giới thiệu' }]}
                >
                  <Input.TextArea rows={2} className="px-4 py-2 rounded-xl border-2 border-outline bg-surface-container-lowest text-sm outline-none resize-none focus:border-primary transition-colors" />
                </Form.Item>
                <div className="flex gap-2">
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="px-5 py-2 bg-primary text-on-primary rounded-full font-headline font-bold text-sm hover:opacity-90 transition-all"
                  >
                    Lưu
                  </Button>
                  <Button
                    onClick={onCancel}
                    className="px-5 py-2 border border-outline-variant text-on-surface-variant rounded-full text-sm hover:bg-surface-container transition-all"
                  >
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
