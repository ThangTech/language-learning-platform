const HeroSection = () => {
  return (
    <section className="relative px-8 py-20 md:py-32 max-w-7xl mx-auto">
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 lg:col-span-7 flex flex-col justify-center">
          <span className="text-primary font-headline font-bold tracking-widest text-xs uppercase mb-4 block">
            Giáo dục được tái thiết kế
          </span>
          <h1 className="font-headline text-5xl md:text-7xl font-extrabold tracking-tight text-on-surface leading-[1.1] mb-8">
            Chinh phục <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
              Thành thạo ngoại ngữ.
            </span>
          </h1>
          <p className="font-body text-lg md:text-xl text-on-surface-variant max-w-xl mb-10 leading-relaxed">
            Trải nghiệm chương trình học được thiết kế chu đáo dành cho người học tinh tiến. Vượt xa những điều cơ bản để bước vào thế giới ngoại ngữ chuyên nghiệp.
          </p>
          <div className="flex flex-wrap gap-4">
            <button className="bg-gradient-to-r from-primary to-primary-container text-on-primary px-8 py-4 rounded-full font-headline font-bold text-base ambient-shadow hover:scale-105 active:scale-95 transition-all">
              Bắt đầu hành trình
            </button>
            <button className="flex items-center gap-2 text-primary font-headline font-bold px-8 py-4 rounded-full hover:bg-surface-container-low transition-colors">
              <span className="material-symbols-outlined">play_circle</span>
              Xem phương pháp
            </button>
          </div>
        </div>

        <div className="col-span-12 lg:col-span-5 relative mt-12 lg:mt-0">
          <div className="relative w-full aspect-square rounded-[3rem] overflow-hidden ambient-shadow">
            <img
              className="w-full h-full object-cover"
              alt="Không gian học tập tối giản"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBfA6c9nToUCskZLmidS7MLeTIgWACFC16sd-AEm0SqI1D-eCvA1PjIF2G9ik0HitLGqMpRCZxMKTRHUYZavfX0HcKcWTpyGQLgjGgN6JG8AZsvhk_WfqwyJFAOTtHfqgvftOyXa-XFjYyrOyH4L-q1Cy6SO-UjBkC0XypivIpymRxeGozQoIxXVQgF8etHmaIkRUZzoA4vjKSHHdwlgvFd9Y1wEOB7jB74h7dIE5gx3kEbSDSROERDeEGyW8H-XUfftPL--Q6OAgUA"
            />
          </div>
          <div className="absolute -bottom-6 -left-6 bg-surface-container-lowest p-6 rounded-xl ambient-shadow max-w-[200px] border border-outline-variant/20">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 rounded-full bg-secondary-container flex items-center justify-center">
                <span className="material-symbols-outlined text-on-secondary-container text-sm">verified</span>
              </div>
              <span className="font-headline font-bold text-sm">Cấp độ chuyên gia</span>
            </div>
            <div className="h-1.5 w-full bg-surface-container-highest rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-secondary to-secondary-fixed-dim w-[85%]" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;