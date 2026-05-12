import { useState } from 'react';
import ContactHero from '../../components/contact/ContactHero';
import { message } from 'antd';

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
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    message.success('Gửi tin nhắn thành công! Chúng tôi sẽ phản hồi trong 24 giờ.');
    setFormData({ name: '', email: '', subject: '', message: '' });
    setIsSubmitting(false);
  };

  return (
    <div className="max-w-6xl mx-auto">
      <ContactHero responseTime="< 24 giờ" supportHours="8:00 - 22:00" channels={3} />

      <div className="grid grid-cols-12 gap-8">
        {/* Contact Form */}
        <div className="col-span-12 lg:col-span-8">
          <div className="bg-surface-container-low p-8 rounded-[2rem] border border-outline-variant/10">
            <h3 className="font-headline text-2xl font-bold text-on-surface mb-6">Gửi tin nhắn</h3>
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div className="grid grid-cols-12 gap-5">
                <div className="col-span-12 md:col-span-6">
                  <label className="font-headline text-sm font-semibold text-on-surface block mb-2">Họ và tên</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Nguyễn Văn A"
                    className="w-full px-4 py-3.5 bg-surface-container-highest rounded-xl border border-outline-variant/30 font-body text-sm text-on-surface placeholder:text-outline focus:outline-none focus:border-primary transition-colors"
                  />
                </div>
                <div className="col-span-12 md:col-span-6">
                  <label className="font-headline text-sm font-semibold text-on-surface block mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="email@example.com"
                    className="w-full px-4 py-3.5 bg-surface-container-highest rounded-xl border border-outline-variant/30 font-body text-sm text-on-surface placeholder:text-outline focus:outline-none focus:border-primary transition-colors"
                  />
                </div>
              </div>
              <div>
                <label className="font-headline text-sm font-semibold text-on-surface block mb-2">Chủ đề</label>
                <select
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3.5 bg-surface-container-highest rounded-xl border border-outline-variant/30 font-body text-sm text-on-surface focus:outline-none focus:border-primary transition-colors appearance-none cursor-pointer"
                >
                  <option value="">Chọn chủ đề</option>
                  {SUBJECTS.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="font-headline text-sm font-semibold text-on-surface block mb-2">Tin nhắn</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  placeholder="Mô tả chi tiết câu hỏi hoặc vấn đề của bạn..."
                  className="w-full px-4 py-3.5 bg-surface-container-highest rounded-xl border border-outline-variant/30 font-body text-sm text-on-surface placeholder:text-outline focus:outline-none focus:border-primary transition-colors resize-none"
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-primary text-on-primary px-8 py-4 rounded-full font-headline font-bold text-base hover:opacity-90 transition-all disabled:opacity-50 self-start"
              >
                {isSubmitting ? 'Đang gửi...' : 'Gửi tin nhắn'}
              </button>
            </form>
          </div>
        </div>

        {/* Contact Methods */}
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
    </div>
  );
};

export default ContactPage;