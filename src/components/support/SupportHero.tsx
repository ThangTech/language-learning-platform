interface SupportHeroProps {
  ticketsOpen?: number;
  responseTime?: string;
  successRate?: string;
}

const SupportHero = ({
  ticketsOpen = 12,
  responseTime = '< 24 giờ',
  successRate = '98%',
}: SupportHeroProps) => {
  return (
    <section className="mb-10 grid grid-cols-12 gap-6">
      {/* Left — gradient hero card */}
      <div
        className="col-span-12 lg:col-span-8 bg-gradient-to-br from-secondary to-secondary-container
                   p-10 rounded-[2rem] text-on-secondary relative overflow-hidden
                   flex flex-col justify-end min-h-[280px]"
      >
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 translate-x-1/4 -translate-y-1/4 pointer-events-none select-none">
          <span className="material-symbols-outlined text-[18rem] text-white">support_agent</span>
        </div>

        <div className="relative z-10">
          <h2 className="font-headline text-4xl font-extrabold tracking-tight mb-3 max-w-lg leading-tight">
            Hỗ trợ học tập cá nhân hóa.
          </h2>
          <p className="text-on-secondary text-base font-body max-w-md mb-8 leading-relaxed">
            Đội ngũ hỗ trợ của chúng tôi luôn sẵn sàng giúp bạn giải đáp thắc mắc và hướng dẫn học tập hiệu quả.
          </p>
          <button
            className="bg-white text-secondary px-7 py-3.5 rounded-full font-headline font-bold
                       flex items-center gap-2 hover:opacity-90 active:scale-95
                       transition-all w-fit shadow-lg"
          >
            <span
              className="material-symbols-outlined"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              chat
            </span>
            Bắt đầu trò chuyện
          </button>
        </div>
      </div>

      {/* Right — stat cards */}
      <div className="col-span-12 lg:col-span-4 flex flex-col gap-5">
        {/* Open Tickets */}
        <div className="bg-surface-container-low/30 p-6 rounded-[2rem] flex-1 flex flex-col justify-between border border-secondary-fixed-dim/20">
          <div>
            <span className="bg-secondary text-on-secondary text-[10px] uppercase font-headline font-bold tracking-widest px-2.5 py-1 rounded-full">
              Yêu cầu đang mở
            </span>
            <h3 className="font-headline text-2xl font-bold mt-4 text-on-secondary-container">
              {ticketsOpen} Phiếu
            </h3>
          </div>
          <div>
            <div className="w-full h-3 bg-surface-container-highest rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-secondary to-secondary-fixed-dim rounded-full
                           shadow-[0_0_8px_rgba(0,108,73,0.25)] transition-all duration-700"
                style={{ width: `${Math.min(100, ticketsOpen * 8)}%` }}
              />
            </div>
            <p className="text-xs text-on-surface-variant mt-1.5 font-medium">Theo dõi yêu cầu của bạn</p>
          </div>
        </div>

        {/* Response Time & Success Rate */}
        <div className="bg-surface-container-lowest p-6 rounded-[2rem] flex-1 shadow-sm border border-outline-variant/10 flex items-center justify-between">
          <div>
            <p className="text-on-surface-variant font-body text-sm">Thời gian phản hồi</p>
            <h3 className="font-headline text-3xl font-extrabold text-secondary mt-1">{responseTime}</h3>
            <p className="text-on-surface-variant font-body text-sm mt-2">Tỷ lệ giải quyết thành công</p>
            <h3 className="font-headline text-2xl font-extrabold text-secondary mt-1">{successRate}</h3>
          </div>
          <div className="h-16 w-16 bg-secondary-fixed rounded-2xl flex items-center justify-center text-secondary shrink-0">
            <span className="material-symbols-outlined text-4xl">verified</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SupportHero;