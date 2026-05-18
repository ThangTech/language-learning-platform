import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Form, Input, Select, message } from 'antd';
import ContactHero from '../../components/contact/ContactHero';

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const CONTACT_METHODS = [
  {
    icon: 'mail',
    title: 'Email',
    value: 'support@winlex.com',
    description: 'Phản hồi trong 24 giờ',
  },
  {
    icon: 'phone',
    title: 'Điện thoại',
    value: '1900 xxxx',
    description: '8:00 - 22:00 (Thứ 2 - Thứ 6)',
  },
  {
    icon: 'forum',
    title: 'Chat trực tuyến',
    value: 'Messenger',
    description: 'Hỗ trợ 24/7',
  },
];

const SUBJECTS = [
  'Câu hỏi chung',
  'Báo cáo lỗi',
  'Góp ý sản phẩm',
  'Hợp tác kinh doanh',
  'Khác',
];

const ContactPage = () => {
  const [form] = Form.useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (_values: ContactFormData) => {
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    message.success('Gửi tin nhắn thành công! Chúng tôi sẽ phản hồi trong 24 giờ.');
    form.resetFields();
    setIsSubmitting(false);
  };

  return (
    <div className="max-w-6xl mx-auto">
      <ContactHero responseTime="< 24 giờ" supportHours="8:00 - 22:00" channels={3} />

      <div className="grid grid-cols-12 gap-8">
        <div className="col-span-12 lg:col-span-8">
          <div className="bg-surface-container-low p-8 rounded-[2rem] border border-outline-variant/10">
            <h3 className="font-headline text-2xl font-bold text-on-surface mb-6">Gửi tin nhắn</h3>
            <Form form={form} layout="vertical" requiredMark={false} onFinish={handleSubmit} className="flex flex-col gap-5">
              <div className="grid grid-cols-12 gap-5">
                <Form.Item
                  className="col-span-12 md:col-span-6 mb-0"
                  name="name"
                  label="Họ và tên"
                  rules={[{ required: true, message: 'Vui lòng nhập họ và tên' }]}
                >
                  <Input placeholder="Nguyễn Văn A" />
                </Form.Item>
                <Form.Item
                  className="col-span-12 md:col-span-6 mb-0"
                  name="email"
                  label="Email"
                  rules={[
                    { required: true, message: 'Vui lòng nhập email' },
                    { type: 'email', message: 'Email không hợp lệ' },
                  ]}
                >
                  <Input placeholder="email@example.com" />
                </Form.Item>
              </div>

              <Form.Item
                name="subject"
                label="Chủ đề"
                rules={[{ required: true, message: 'Vui lòng chọn chủ đề' }]}
              >
                <Select placeholder="Chọn chủ đề" options={SUBJECTS.map((s) => ({ value: s, label: s }))} />
              </Form.Item>

              <Form.Item
                name="message"
                label="Tin nhắn"
                rules={[{ required: true, message: 'Vui lòng nhập nội dung tin nhắn' }]}
              >
                <Input.TextArea rows={5} placeholder="Mô tả chi tiết câu hỏi hoặc vấn đề của bạn..." />
              </Form.Item>

              <Button type="primary" htmlType="submit" loading={isSubmitting} className="self-start">
                {isSubmitting ? 'Đang gửi...' : 'Gửi tin nhắn'}
              </Button>
            </Form>
          </div>
        </div>

        <div className="col-span-12 lg:col-span-4 flex flex-col gap-5">
          <h3 className="font-headline text-xl font-bold text-on-surface">Liên hệ trực tiếp</h3>
          {CONTACT_METHODS.map((method) => (
            <div
              key={method.title}
              className="bg-surface-container-low p-6 rounded-[1.5rem] border border-outline-variant/10"
            >
              <div className="h-12 w-12 bg-tertiary-fixed rounded-xl flex items-center justify-center text-tertiary mb-3">
                <span className="material-symbols-outlined text-2xl">{method.icon}</span>
              </div>
              <h4 className="font-headline text-base font-bold text-on-surface mb-1">{method.title}</h4>
              <p className="font-body text-sm font-semibold text-primary mb-1">{method.value}</p>
              <p className="font-body text-xs text-on-surface-variant">{method.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-10 flex flex-wrap gap-3">
        <Link to="/listening" className="no-underline">
          <button className="px-5 py-3 rounded-full bg-primary text-on-primary font-headline font-bold text-sm hover:opacity-90 transition-all">
            Sang Listening
          </button>
        </Link>
        <Link to="/progress" className="no-underline">
          <button className="px-5 py-3 rounded-full border border-primary text-primary font-headline font-bold text-sm hover:bg-primary/5 transition-all">
            Xem tiến độ
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ContactPage;
