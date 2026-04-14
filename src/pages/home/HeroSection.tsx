import { useNavigate } from 'react-router-dom';

// Hero image — a curated Unsplash photo of a minimalist study desk
const HERO_IMAGE =
  'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800&auto=format&fit=crop&q=80';

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section
      style={{
        position: 'relative',
        paddingTop: '5rem',
        paddingBottom: '6rem',
        overflow: 'hidden',
      }}
    >
      {/* Subtle background blobs */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 0,
          pointerEvents: 'none',
          background:
            'radial-gradient(circle at 15% 40%, rgba(0,74,198,0.07) 0%, transparent 55%), ' +
            'radial-gradient(circle at 85% 20%, rgba(0,108,73,0.06) 0%, transparent 50%)',
        }}
      />

      <div className="container-page" style={{ position: 'relative', zIndex: 1 }}>
        <div className="editorial-grid" style={{ alignItems: 'center' }}>
          {/* Left: Copy */}
          <div
            style={{
              gridColumn: 'span 12',
            }}
            className="lg:col-span-7"
          >
            {/* Badge */}
            <span
              className="animate-fade-in-up"
              style={{
                display: 'inline-block',
                fontFamily: 'var(--font-headline)',
                fontWeight: 700,
                fontSize: '0.7rem',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: 'var(--color-primary)',
                marginBottom: '1.25rem',
                backgroundColor: 'rgba(0,74,198,0.08)',
                padding: '0.3rem 0.85rem',
                borderRadius: '9999px',
              }}
            >
              🎓 Giáo dục được tái tưởng tượng
            </span>

            {/* Headline */}
            <h1
              className="animate-fade-in-up delay-100 font-headline"
              style={{
                fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
                fontWeight: 800,
                lineHeight: 1.08,
                letterSpacing: '-0.03em',
                color: 'var(--color-on-surface)',
                marginBottom: '1.5rem',
              }}
            >
              Thành Thạo Nghệ Thuật
              <br />
              <span className="text-gradient-primary">Ngôn Ngữ Chuyên Nghiệp.</span>
            </h1>

            {/* Sub-copy */}
            <p
              className="animate-fade-in-up delay-200 font-body"
              style={{
                fontSize: '1.125rem',
                lineHeight: 1.75,
                color: 'var(--color-on-surface-variant)',
                maxWidth: '30rem',
                marginBottom: '2.5rem',
              }}
            >
              Trải nghiệm chương trình giảng dạy cấp biên tập được thiết kế cho người học
              tinh tế. Vượt ra ngoài những điều cơ bản vào thế giới lưu loát, tinh tế và
              chuyên nghiệp.
            </p>

            {/* CTA buttons */}
            <div
              className="animate-fade-in-up delay-300"
              style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center' }}
            >
              <button
                className="btn-primary ambient-shadow"
                onClick={() => navigate('/register')}
                style={{ padding: '1rem 2rem', fontSize: '1rem' }}
              >
                Bắt Đầu Hành Trình
              </button>
              <button
                className="btn-ghost"
                onClick={() => navigate('/courses')}
                style={{ padding: '1rem 1.5rem', fontSize: '1rem' }}
              >
                <span className="material-symbols-outlined">play_circle</span>
                Xem Phương Pháp
              </button>
            </div>

            {/* Mini social proof */}
            <div
              className="animate-fade-in-up delay-400"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.875rem',
                marginTop: '2.5rem',
              }}
            >
              {/* Avatar stack */}
              <div style={{ display: 'flex' }}>
                {[
                  'https://i.pravatar.cc/40?img=1',
                  'https://i.pravatar.cc/40?img=5',
                  'https://i.pravatar.cc/40?img=9',
                  'https://i.pravatar.cc/40?img=12',
                ].map((src, i) => (
                  <img
                    key={i}
                    src={src}
                    alt="Học viên"
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: '50%',
                      border: '2px solid var(--color-surface)',
                      marginLeft: i > 0 ? -10 : 0,
                      objectFit: 'cover',
                    }}
                  />
                ))}
              </div>
              <p style={{ fontSize: '0.8125rem', color: 'var(--color-on-surface-variant)' }}>
                <strong style={{ color: 'var(--color-on-surface)' }}>500.000+</strong> học viên
                đang học cùng bạn
              </p>
            </div>
          </div>

          {/* Right: Image + floating badges */}
          <div
            style={{
              gridColumn: 'span 12',
              position: 'relative',
              marginTop: '3rem',
            }}
            className="lg:col-span-5 lg:mt-0"
          >
            {/* Main image */}
            <div
              style={{
                position: 'relative',
                width: '100%',
                aspectRatio: '1 / 1',
                borderRadius: '3rem',
                overflow: 'hidden',
                boxShadow: '0 32px 64px rgba(25,27,35,0.12)',
              }}
            >
              <img
                src={HERO_IMAGE}
                alt="Bàn học tối giản với cuốn sách mở và ánh sáng ban mai"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              {/* Color overlay for brand feel */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background:
                    'linear-gradient(135deg, rgba(0,74,198,0.08) 0%, transparent 60%)',
                }}
              />
            </div>

            {/* Floating badge: Progress */}
            <div
              className="float-slow ambient-shadow"
              style={{
                position: 'absolute',
                bottom: '-1.5rem',
                left: '-1.5rem',
                backgroundColor: 'var(--color-surface-container-lowest)',
                border: '1px solid rgba(195,198,215,0.3)',
                borderRadius: '1rem',
                padding: '1.25rem',
                minWidth: 180,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', marginBottom: '0.625rem' }}>
                <div
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: '50%',
                    backgroundColor: 'var(--color-secondary-container)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <span
                    className="material-symbols-outlined"
                    style={{ fontSize: '1rem', color: 'var(--color-on-secondary-container)' }}
                  >
                    verified
                  </span>
                </div>
                <span
                  style={{
                    fontFamily: 'var(--font-headline)',
                    fontWeight: 700,
                    fontSize: '0.8125rem',
                    color: 'var(--color-on-surface)',
                  }}
                >
                  Trình độ Biên Tập
                </span>
              </div>
              <div
                style={{
                  height: 6,
                  background: 'var(--color-surface-container-highest)',
                  borderRadius: 9999,
                  overflow: 'hidden',
                }}
              >
                <div className="progress-fill" style={{ width: '85%' }} />
              </div>
              <p style={{ fontSize: '0.7rem', color: 'var(--color-outline)', marginTop: '0.375rem' }}>
                85% — Hoàn thành xuất sắc
              </p>
            </div>

            {/* Floating badge: Streak */}
            <div
              className="float-slow ambient-shadow"
              style={{
                position: 'absolute',
                top: '2rem',
                right: '-1.25rem',
                backgroundColor: 'var(--color-surface-container-lowest)',
                border: '1px solid rgba(195,198,215,0.3)',
                borderRadius: '1rem',
                padding: '0.875rem 1.125rem',
                animationDelay: '1.5s',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ fontSize: '1.25rem' }}>🔥</span>
                <div>
                  <p
                    style={{
                      fontFamily: 'var(--font-headline)',
                      fontWeight: 800,
                      fontSize: '1.125rem',
                      color: 'var(--color-on-surface)',
                      lineHeight: 1,
                    }}
                  >
                    21 ngày
                  </p>
                  <p style={{ fontSize: '0.7rem', color: 'var(--color-outline)' }}>
                    Chuỗi học liên tiếp
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
