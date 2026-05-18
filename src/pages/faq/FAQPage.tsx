import { useState } from 'react';
import { Link } from 'react-router-dom';
import FAQHero from '../../components/faq/FAQHero';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

const FAQ_DATA: FAQItem[] = [
  {
    id: 'f1',
    category: 'Tài khoản',
    question: 'Làm thế nào để đăng ký tài khoản mới?',
    answer: 'Để đăng ký, click vào nút "Đăng ký" trên trang chủ, điền thông tin cần thiết và xác nhận email của bạn. Quá trình đăng ký chỉ mất vài phút.',
  },
  {
    id: 'f2',
    category: 'Tài khoản',
    question: 'Tôi quên mật khẩu, phải làm sao?',
    answer: 'Click vào "Quên mật khẩu" trên trang đăng nhập, nhập email đã đăng ký và chúng tôi sẽ gửi link đặt lại mật khẩu cho bạn.',
  },
  {
    id: 'f3',
    category: 'Học tập',
    question: 'WinLex có những cấp độ học tập nào?',
    answer: 'Chúng tôi cung cấp đầy đủ các cấp độ từ A1 (sơ cấp) đến C2 (thành thạo) theo khung tham chiếu CEFR châu Âu.',
  },
  {
    id: 'f4',
    category: 'Học tập',
    question: 'Tôi có thể học nhiều kỹ năng cùng lúc không?',
    answer: 'Có, WinLex cung cấp đầy đủ 4 kỹ năng: từ vựng, ngữ pháp, nghe và quiz. Bạn có thể chuyển đổi linh hoạt giữa các mục.',
  },
  {
    id: 'f5',
    category: 'Thanh toán',
    question: 'WinLex có miễn phí hoàn toàn không?',
    answer: 'Có, tất cả tính năng cơ bản trên WinLex đều miễn phí. Chúng tôi cam kết mang đến trải nghiệm học tập chất lượng cao miễn phí.',
  },
  {
    id: 'f6',
    category: 'Kỹ thuật',
    question: 'App có hoạt động trên điện thoại không?',
    answer: 'WinLex được thiết kế responsive, hoạt động tốt trên mọi thiết bị từ máy tính đến điện thoại thông qua trình duyệt web.',
  },
];

const CATEGORIES = ['Tất cả', 'Tài khoản', 'Học tập', 'Thanh toán', 'Kỹ thuật'];

const FAQPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('Tất cả');
  const [openId, setOpenId] = useState<string | null>(null);

  const toggleFAQ = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  const filteredFAQs = selectedCategory === 'Tất cả'
    ? FAQ_DATA
    : FAQ_DATA.filter(faq => faq.category === selectedCategory);

  return (
    <div className="max-w-6xl mx-auto">
      <FAQHero totalQuestions={50} categories="8 danh mục" satisfactionRate="95%" />

      {/* Category Filter */}
      <section className="mb-8">
        <div className="flex flex-wrap gap-3">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2.5 rounded-full font-headline font-semibold text-sm transition-all ${
                selectedCategory === cat
                  ? 'bg-primary text-on-primary'
                  : 'bg-surface-container-high text-on-surface-variant hover:bg-surface-container-highest'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* FAQ Accordion */}
      <section className="mb-10">
        <div className="flex flex-col gap-3">
          {filteredFAQs.map((faq) => (
            <div
              key={faq.id}
              className="bg-surface-container-low rounded-2xl border border-outline-variant/10 overflow-hidden"
            >
              <button
                onClick={() => toggleFAQ(faq.id)}
                className="w-full px-6 py-5 flex items-center justify-between text-left"
              >
                <div className="flex items-center gap-3 pr-4">
                  <span className="bg-primary-fixed/50 text-primary text-xs font-headline font-bold px-2.5 py-1 rounded-full uppercase">
                    {faq.category}
                  </span>
                  <span className="font-headline text-base font-semibold text-on-surface">{faq.question}</span>
                </div>
                <span
                  className="material-symbols-outlined text-on-surface-variant transition-transform duration-300 shrink-0"
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

export default FAQPage;