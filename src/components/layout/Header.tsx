import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const NAV_LINKS = [
  { label: 'Khóa học', href: '/courses' },
  { label: 'Tính năng', href: '/features' },
  { label: 'Bảng giá', href: '/pricing' },
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
      className="glass-nav"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        backgroundColor: scrolled
          ? 'rgba(250, 248, 255, 0.85)'
          : 'rgba(250, 248, 255, 0.70)',
        borderBottom: scrolled ? '1px solid rgba(195,198,215,0.3)' : 'none',
        transition: 'background-color 0.3s, border-color 0.3s',
      }}
    >
      <div
        className="container-page"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingTop: '1rem',
          paddingBottom: '1rem',
        }}
      >
        {/* Logo */}
        <Link
          to="/"
          style={{
            fontFamily: 'var(--font-headline)',
            fontWeight: 800,
            fontSize: '1.25rem',
            letterSpacing: '-0.03em',
            color: 'var(--color-on-surface)',
            textDecoration: 'none',
          }}
        >
          Fluency
        </Link>

        {/* Desktop nav */}
        <div
          style={{
            display: 'flex',
            gap: '2rem',
            alignItems: 'center',
          }}
          className="hidden md:flex"
        >
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              style={{
                fontFamily: 'var(--font-headline)',
                fontWeight: 500,
                fontSize: '0.875rem',
                letterSpacing: '-0.01em',
                color: 'var(--color-on-surface-variant)',
                textDecoration: 'none',
                transition: 'color 0.2s',
              }}
              onMouseEnter={(e) =>
                ((e.target as HTMLAnchorElement).style.color =
                  'var(--color-primary)')
              }
              onMouseLeave={(e) =>
                ((e.target as HTMLAnchorElement).style.color =
                  'var(--color-on-surface-variant)')
              }
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <button
            onClick={() => navigate('/login')}
            style={{
              fontFamily: 'var(--font-headline)',
              fontWeight: 600,
              fontSize: '0.875rem',
              color: 'var(--color-primary)',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '0.5rem 1rem',
            }}
            className="hidden md:block"
          >
            Đăng nhập
          </button>

          <button
            className="btn-primary"
            onClick={() => navigate('/register')}
            style={{ padding: '0.625rem 1.5rem', fontSize: '0.875rem' }}
          >
            Bắt đầu miễn phí
          </button>

          {/* Mobile hamburger */}
          <button
            className="md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: 'var(--color-on-surface)',
              lineHeight: 1,
            }}
          >
            <span className="material-symbols-outlined">
              {menuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          style={{
            backgroundColor: 'var(--color-surface-container-lowest)',
            borderTop: '1px solid var(--color-outline-variant)',
            padding: '1rem 2rem 1.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
          }}
          className="md:hidden"
        >
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              onClick={() => setMenuOpen(false)}
              style={{
                fontFamily: 'var(--font-headline)',
                fontWeight: 500,
                fontSize: '0.9375rem',
                color: 'var(--color-on-surface)',
                textDecoration: 'none',
              }}
            >
              {link.label}
            </Link>
          ))}
          <Link
            to="/login"
            onClick={() => setMenuOpen(false)}
            style={{
              fontFamily: 'var(--font-headline)',
              fontWeight: 500,
              fontSize: '0.9375rem',
              color: 'var(--color-primary)',
              textDecoration: 'none',
            }}
          >
            Đăng nhập
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Header;