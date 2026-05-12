import { useState } from 'react';
import SupportHero from '../../components/support/SupportHero';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

const SUPPORT_FAQS: FAQItem[] = [
  {
    id: 's1',
    question: 'Làm thế nào để bắt đầu học trên WinLex?',
    answer: 'Để bắt đầu, bạn chỉ cần đăng ký tài khoản miễn phí và đăng nhập. Sau đó, chọn mục tiêu học tập của bạn và khám phá các bài học phù hợp với trình độ.',
  },
  {
    id: 's2',
    question: 'WinLex có hoàn toàn miễn phí không?',
    answer: 'Có, WinLex cung cấp nền tảng học tiếng Anh miễn phí. Chúng tôi tin rằng giáo dục nên được tiếp cận rộng rãi với tất cả mọi người.',
  },
  {
    id: 's3',
    question: 'Tôi có thể học trên thiết bị di động không?',
    answer: 'Có, WinLex được thiết kế responsive hoàn toàn tương thích với cả máy tính và thiết bị di động. Bạn có thể học mọi lúc mọi nơi.',
  },
  {
    id: 's4',
    question: 'Làm sao để theo dõi tiến độ học tập?',
    answer: 'Bạn có thể xem tiến độ học tập trong mục "Tiến độ" trên thanh điều hướng. Tại đây hiển thị các thống kê chi tiết về thời gian học, từ vựng đã học và sự cải thiện của bạn.',
  },
];

const SUPPORT_OPTIONS = [
  {
    icon: 'chat',
    title: 'Trò chuyện trực tiếp',
    description: 'Kết nối với đội ngũ hỗ trợ qua chat',
    action: 'Bắt đầu chat',
  },
  {
    icon: 'mail',
    title: 'Email hỗ trợ',
    description: 'Gửi email đến support@winlex.com',
    action: 'Gửi email',
  },
  {
    icon: 'forum',
    title: 'Diễn đàn cộng đồng',
    description: 'Tham gia thảo luận với người học khác',
    action: 'Tham gia',
  },
];

const SupportPage = () => {
  const [openId, setOpenId] = useState<string | null>(null);

  const toggleFAQ = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div className="max-w-6xl mx-auto">
      <SupportHero ticketsOpen={3} responseTime="< 24 giờ" successRate="98%" />

      {/* Support Options */}
      <section className="mb-10">
        <h3 className="font-headline text-2xl font-bold text-on-surface mb-6">Các kênh hỗ trợ</h3>
        <div className="grid grid-cols-12 gap-6">
          {SUPPORT_OPTIONS.map((option) => (
            <div
              key={option.title}
              className="col-span-12 md:col-span-4 bg-surface-container-low p-6 rounded-[1.5rem] border border-outline-variant/10 hover:shadow-lg transition-all cursor-pointer"
            >
              <div className="h-14 w-14 bg-primary-fixed rounded-2xl flex items-center justify-center text-primary mb-4">
                <span className="material-symbols-outlined text-3xl">{option.icon}</span>
              </div>
              <h4 className="font-headline text-lg font-bold text-on-surface mb-2">{option.title}</h4>
              <p className="font-body text-sm text-on-surface-variant mb-4">{option.description}</p>
              <button className="bg-primary text-on-primary px-5 py-2 rounded-full font-headline font-bold text-sm hover:opacity-90 transition-all">
                {option.action}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="mb-10">
        <h3 className="font-headline text-2xl font-bold text-on-surface mb-6">Câu hỏi thường gặp</h3>
        <div className="flex flex-col gap-3">
          {SUPPORT_FAQS.map((faq) => (
            <div
              key={faq.id}
              className="bg-surface-container-low rounded-2xl border border-outline-variant/10 overflow-hidden"
            >
              <button
                onClick={() => toggleFAQ(faq.id)}
                className="w-full px-6 py-5 flex items-center justify-between text-left"
              >
                <span className="font-headline text-base font-semibold text-on-surface pr-4">{faq.question}</span>
                <span
                  className="material-symbols-outlined text-on-surface-variant transition-transform duration-300"
                  style={{ transform: openId === faq.id ? 'rotate(180deg)' : 'rotate(0deg)' }}
                >
                  expand_more
                </span>
              </button>
              {openId === faq.id && (
                <div className="px-6 pb-5">
                  <p className="font-body text-sm text-on-surface-variant leading-relaxed border-t border-outline-variant/10 pt-4">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default SupportPage;