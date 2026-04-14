import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const NAV_LINKS = [
  { label: 'Từ vựng', href: '/vocabulary' },
  { label: 'Ngữ pháp', href: '/grammar' },
  { label: 'Luyện tập', href: '/quiz' },
  { label: 'Bảng xếp hạng', href: '/leaderboard' },
];

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 glass-nav transition-all duration-300 ${
        scrolled ? 'bg-surface/85 border-b border-outline/30' : 'bg-surface/70'
      }`}
    >
      <div className="max-w-7xl mx-auto px-8 py-4 flex items-center justify-between">
        <Link
          to="/"
          className="font-headline text-xl font-extrabold tracking-tight text-on-surface no-underline"
        >
          WinLex
        </Link>

        <div className="hidden md:flex gap-8 items-center">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className="font-headline text-sm font-medium text-on-surface-variant no-underline hover:text-primary transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/login')}
            className="hidden md:block font-headline text-sm font-semibold text-primary bg-transparent border-none cursor-pointer px-4 py-2"
          >
            Đăng nhập
          </button>

          <button
            className="btn-primary px-6 py-2.5 text-sm font-headline font-semibold"
            onClick={() => navigate('/register')}
          >
            Bắt đầu miễn phí
          </button>

          <button
            className="md:hidden bg-transparent border-none cursor-pointer text-on-surface p-2"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span className="material-symbols-outlined">
              {menuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-surface-container-lowest border-t border-outline-variant px-8 py-4 flex flex-col gap-4">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              onClick={() => setMenuOpen(false)}
              className="font-headline text-base font-medium text-on-surface no-underline"
            >
              {link.label}
            </Link>
          ))}
          <Link
            to="/login"
            onClick={() => setMenuOpen(false)}
            className="font-headline text-base font-medium text-primary no-underline"
          >
            Đăng nhập
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Header;