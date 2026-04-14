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
    <footer
      style={{
        backgroundColor: '#f8fafc',
        borderTop: '1px solid rgba(195,198,215,0.3)',
      }}
    >
      {/* Main footer grid */}
      <div
        className="container-page"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
          gap: '2rem',
          paddingTop: '3rem',
          paddingBottom: '3rem',
        }}
      >
        {/* Brand */}
        <div style={{ gridColumn: 'span 1' }}>
          <Link
            to="/"
            style={{
              fontFamily: 'var(--font-headline)',
              fontWeight: 800,
              fontSize: '1.125rem',
              color: 'var(--color-on-surface)',
              textDecoration: 'none',
              display: 'block',
              marginBottom: '0.75rem',
            }}
          >
            Fluency
          </Link>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.875rem',
              color: 'var(--color-on-surface-variant)',
              lineHeight: 1.7,
              maxWidth: '220px',
            }}
          >
            Nâng giáo dục ngôn ngữ lên thành nghệ thuật. Công cụ tinh tế cho người học hiện đại.
          </p>
        </div>

        {/* Platform */}
        <FooterColumn title="Nền tảng" links={FOOTER_LINKS.platform} />

        {/* Company */}
        <FooterColumn title="Công ty" links={FOOTER_LINKS.company} />

        {/* Legal */}
        <FooterColumn title="Pháp lý" links={FOOTER_LINKS.legal} />
      </div>

      {/* Bottom bar */}
      <div
        className="container-page"
        style={{
          paddingTop: '1.25rem',
          paddingBottom: '1.25rem',
          borderTop: '1px solid rgba(195,198,215,0.3)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '0.75rem',
        }}
      >
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.75rem',
            color: 'var(--color-outline)',
          }}
        >
          © 2024 Fluency. Bản quyền thuộc về chúng tôi.
        </p>

        <div style={{ display: 'flex', gap: '1rem' }}>
          {[
            { icon: 'facebook', label: 'Facebook' },
            { icon: 'public', label: 'Website' },
          ].map(({ icon, label }) => (
            <button
              key={label}
              aria-label={label}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: 'var(--color-outline)',
                transition: 'color 0.2s',
                display: 'flex',
                alignItems: 'center',
              }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLButtonElement).style.color =
                  'var(--color-primary)')
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLButtonElement).style.color =
                  'var(--color-outline)')
              }
            >
              <span className="material-symbols-outlined" style={{ fontSize: '1.2rem' }}>
                {icon}
              </span>
            </button>
          ))}
        </div>
      </div>
    </footer>
  );
};

// Helper sub-component
interface FooterColumnProps {
  title: string;
  links: { label: string; href: string }[];
}

const FooterColumn = ({ title, links }: FooterColumnProps) => (
  <div>
    <h4
      style={{
        fontFamily: 'var(--font-headline)',
        fontWeight: 700,
        fontSize: '0.875rem',
        color: 'var(--color-on-surface)',
        marginBottom: '1rem',
      }}
    >
      {title}
    </h4>
    <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
      {links.map((link) => (
        <li key={link.href}>
          <Link
            to={link.href}
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.875rem',
              color: 'var(--color-on-surface-variant)',
              textDecoration: 'none',
              transition: 'color 0.2s',
            }}
            onMouseEnter={(e) =>
              ((e.target as HTMLAnchorElement).style.color = 'var(--color-on-surface)')
            }
            onMouseLeave={(e) =>
              ((e.target as HTMLAnchorElement).style.color =
                'var(--color-on-surface-variant)')
            }
          >
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

export default Footer;