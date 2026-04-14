import { Link } from 'react-router-dom';

const FOOTER_LINKS = {
  platform: [
    { label: 'Khóa học', href: '/courses' },
    { label: 'Bảng giá', href: '/pricing' },
    { label: 'Phương pháp học', href: '/methodology' },
  ],
  company: [
    { label: 'Tuyển dụng', href: '/careers' },
    { label: 'Báo chí', href: '/press' },
    { label: 'Hỗ trợ', href: '/support' },
  ],
  legal: [
    { label: 'Chính sách bảo mật', href: '/privacy' },
    { label: 'Điều khoản dịch vụ', href: '/terms' },
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
            Nâng cao giáo dục ngôn ngữ lên thành nghệ thuật.
          </p>
        </div>

        <div>
          <h4 className="font-headline text-sm font-bold text-on-surface mb-4">Nền tảng</h4>
          <ul className="flex flex-col gap-3">
            {FOOTER_LINKS.platform.map((link) => (
              <li key={link.href}>
                <Link to={link.href} className="font-body text-sm text-on-surface-variant hover:text-on-surface">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-headline text-sm font-bold text-on-surface mb-4">Công ty</h4>
          <ul className="flex flex-col gap-3">
            {FOOTER_LINKS.company.map((link) => (
              <li key={link.href}>
                <Link to={link.href} className="font-body text-sm text-on-surface-variant hover:text-on-surface">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-headline text-sm font-bold text-on-surface mb-4">Pháp lý</h4>
          <ul className="flex flex-col gap-3">
            {FOOTER_LINKS.legal.map((link) => (
              <li key={link.href}>
                <Link to={link.href} className="font-body text-sm text-on-surface-variant hover:text-on-surface">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-8 py-5 border-t border-outline/30 flex justify-between items-center">
        <p className="font-body text-xs text-outline">© 2024 WinLex</p>
        <div className="flex gap-4">
          <button className="text-outline hover:text-primary">
            <span className="material-symbols-outlined">facebook</span>
          </button>
          <button className="text-outline hover:text-primary">
            <span className="material-symbols-outlined">public</span>
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;