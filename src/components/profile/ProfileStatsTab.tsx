const ProfileStatsTab = () => {
  return (
    <div className="bg-surface-container-low rounded-[1.5rem] p-8 border border-outline-variant/10 flex flex-col items-center text-center gap-4">
      <span className="material-symbols-outlined text-[4rem] text-on-surface-variant/30">bar_chart</span>
      <h3 className="font-headline font-bold text-xl text-on-surface">Biểu đồ thống kê</h3>
      <p className="text-on-surface-variant text-sm max-w-sm">Thống kê chi tiết theo tuần/tháng sẽ được cập nhật khi kết nối API backend.</p>
    </div>
  );
};

export default ProfileStatsTab;
