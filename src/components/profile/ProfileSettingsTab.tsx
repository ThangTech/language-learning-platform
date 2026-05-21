const ProfileSettingsTab = () => {
  return (
    <div className="flex flex-col gap-4">
      {[
        { icon: 'notifications', label: 'Thông báo nhắc nhở', desc: 'Nhận thông báo học mỗi ngày lúc 8:00 AM', toggle: true },
        { icon: 'language', label: 'Ngôn ngữ giao diện', desc: 'Tiếng Việt', toggle: false },
        { icon: 'dark_mode', label: 'Chế độ tối', desc: 'Đang tắt', toggle: true },
        { icon: 'lock', label: 'Đổi mật khẩu', desc: 'Lần cuối thay đổi: 3 tháng trước', toggle: false },
      ].map((setting, index) => (
        <div key={index} className="flex items-center gap-4 p-5 bg-surface-container-low rounded-2xl border border-outline-variant/10">
          <div className="w-10 h-10 rounded-xl bg-surface-container flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-on-surface-variant">{setting.icon}</span>
          </div>
          <div className="flex-1">
            <p className="font-headline font-bold text-sm text-on-surface">{setting.label}</p>
            <p className="text-xs text-on-surface-variant">{setting.desc}</p>
          </div>
          {setting.toggle ? (
            <div className="w-11 h-6 rounded-full bg-primary cursor-pointer relative shrink-0">
              <div className="w-5 h-5 bg-white rounded-full absolute right-0.5 top-0.5 shadow transition-all" />
            </div>
          ) : (
            <span className="material-symbols-outlined text-outline">chevron_right</span>
          )}
        </div>
      ))}

      <button className="mt-4 flex items-center gap-3 px-6 py-3 rounded-full border border-error/30 text-error hover:bg-error/5 transition-all font-headline font-bold text-sm">
        <span className="material-symbols-outlined text-[1.1rem]">logout</span>
        Đăng xuất
      </button>
    </div>
  );
};

export default ProfileSettingsTab;
