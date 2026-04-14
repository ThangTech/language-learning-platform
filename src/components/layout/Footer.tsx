import { Link } from 'react-router-dom';

const FOOTER_LINKS = {
  learn: [
    { label: 'Từ vựng', href: '/vocabulary' },
    { label: 'Ngữ pháp', href: '/grammar' },
    { label: 'Luyện tập', href: '/quiz' },
  ],
  progress: [
    { label: 'Tiến độ học tập', href: '/progress' },
    { label: 'Streaks', href: '/streaks' },
    { label: 'Bảng xếp hạng', href: '/leaderboard' },
  ],
  support: [
    { label: 'Hỗ trợ', href: '/support' },
    { label: 'Liên hệ', href: '/contact' },
    { label: 'Câu hỏi thường gặp', href: '/faq' },
  ],
};

const Footer = () => {
  return (
    <footer className="bg-slate-50 border-t border-outline/30">
      <div className="max-w-7xl mx-auto px-8 py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
        <div className="col-span-2 md:col-span-1">
          <Link to="/" className="font-headline text-lg font-extrabold text-on-surface no-underline block mb-3">
            WinLex
          </Link>
          <p className="font-body text-sm text-on-surface-variant max-w-[220px]">
            Nền tảng học tiếng Anh miễn phí. Chinh phục nghệ thuật ngôn ngữ cùng WinLex.
          </p>
        </div>

        <div>
          <h4 className="font-headline text-sm font-bold text-on-surface mb-4">Học tập</h4>
          <ul className="flex flex-col gap-3">
            {FOOTER_LINKS.learn.map((link) => (
              <li key={link.href}>
                <Link to={link.href} className="font-body text-sm text-on-surface-variant hover:text-on-surface">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-headline text-sm font-bold text-on-surface mb-4">Tiến độ</h4>
          <ul className="flex flex-col gap-3">
            {FOOTER_LINKS.progress.map((link) => (
              <li key={link.href}>
                <Link to={link.href} className="font-body text-sm text-on-surface-variant hover:text-on-surface">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-headline text-sm font-bold text-on-surface mb-4">Hỗ trợ</h4>
          <ul className="flex flex-col gap-3">
            {FOOTER_LINKS.support.map((link) => (
              <li key={link.href}>
                <Link to={link.href} className="font-body text-sm text-on-surface-variant hover:text-on-surface">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-8 py-5 border-t border-outline/30 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="font-body text-xs text-outline">© 2024 WinLex. Học tiếng Anh miễn phí.</p>
        <div className="flex gap-4">
          <Link to="/privacy" className="font-body text-xs text-outline hover:text-primary">Chính sách bảo mật</Link>
          <Link to="/terms" className="font-body text-xs text-outline hover:text-primary">Điều khoản dịch vụ</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;