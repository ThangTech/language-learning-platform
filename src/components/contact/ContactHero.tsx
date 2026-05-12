interface ContactHeroProps {
  responseTime?: string;
  supportHours?: string;
  channels?: number;
}

const ContactHero = ({
  responseTime = '< 24 giờ',
  supportHours = '8:00 - 22:00',
  channels = 3,
}: ContactHeroProps) => {
  return (
    <section className="mb-10 grid grid-cols-12 gap-6">
      {/* Left — gradient hero card */}
      <div
        className="col-span-12 lg:col-span-8 bg-gradient-to-br from-tertiary to-tertiary-container
                   p-10 rounded-[2rem] text-on-tertiary relative overflow-hidden
                   flex flex-col justify-end min-h-[280px]"
      >
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 translate-x-1/4 -translate-y-1/4 pointer-events-none select-none">
          <span className="material-symbols-outlined text-[18rem] text-white">contact_mail</span>
        </div>

        <div className="relative z-10">
          <h2 className="font-headline text-4xl font-extrabold tracking-tight mb-3 max-w-lg leading-tight">
            Liên hệ với chúng tôi.
          </h2>
          <p className="text-tertiary-fixed text-base font-body max-w-md mb-8 leading-relaxed">
            Bạn có câu hỏi hoặc cần hỗ trợ? Đội ngũ của chúng tôi luôn sẵn sàng lắng nghe và giúp đỡ bạn.
          </p>
          <button
            className="bg-white text-tertiary px-7 py-3.5 rounded-full font-headline font-bold
                       flex items-center gap-2 hover:opacity-90 active:scale-95
                       transition-all w-fit shadow-lg"
          >
            <span
              className="material-symbols-outlined"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              mail
            </span>
            Gửi tin nhắn
          </button>
        </div>
      </div>

      {/* Right — stat cards */}
      <div className="col-span-12 lg:col-span-4 flex flex-col gap-5">
        {/* Response Time */}
        <div className="bg-surface-container-low/30 p-6 rounded-[2rem] flex-1 flex flex-col justify-between border border-tertiary-fixed-dim/20">
          <div>
            <span className="bg-tertiary text-on-tertiary text-[10px] uppercase font-headline font-bold tracking-widest px-2.5 py-1 rounded-full">
              Phản hồi nhanh
            </span>
            <h3 className="font-headline text-2xl font-bold mt-4 text-on-tertiary-container">
              {responseTime}
            </h3>
          </div>
          <div className="h-10 w-10 bg-tertiary-fixed rounded-2xl flex items-center justify-center text-tertiary shrink-0">
            <span className="material-symbols-outlined text-2xl">schedule</span>
          </div>
        </div>

        {/* Support Hours & Channels */}
        <div className="bg-surface-container-lowest p-6 rounded-[2rem] flex-1 shadow-sm border border-outline-variant/10 flex items-center justify-between">
          <div>
            <p className="text-on-surface-variant font-body text-sm">Giờ hỗ trợ</p>
            <h3 className="font-headline text-2xl font-extrabold text-tertiary mt-1">{supportHours}</h3>
            <p className="text-on-surface-variant font-body text-sm mt-2">Kênh liên hệ</p>
            <h3 className="font-headline text-2xl font-extrabold text-tertiary mt-1">{channels} Kênh</h3>
          </div>
          <div className="h-16 w-16 bg-tertiary-fixed rounded-2xl flex items-center justify-center text-tertiary shrink-0">
            <span className="material-symbols-outlined text-4xl">forum</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactHero;