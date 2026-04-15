interface Update {
  id: string;
  title: string;
  body: string;
  dotColor: string;
  read?: boolean;
}

const UPDATES: Update[] = [
  {
    id: 'update-1',
    title: 'Thử thách mới đã mở khóa',
    body: 'Ngữ pháp nâng cao: Cấp độ 4 đã sẵn sàng.',
    dotColor: 'bg-secondary',
  },
  {
    id: 'update-2',
    title: 'Báo cáo hàng tuần',
    body: 'Bạn đã học thuộc 42 từ vựng học thuật mới tuần này.',
    dotColor: 'bg-primary',
  },
  {
    id: 'update-3',
    title: 'Bảo trì hệ thống',
    body: 'Nền tảng sẽ tạm ngưng 10 phút lúc 02:00 UTC.',
    dotColor: 'bg-outline-variant',
    read: true,
  },
];

const UpdatesPanel = () => {
  return (
    <div className="col-span-12 lg:col-span-4 bg-surface-container-low rounded-[2rem] p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-7">
        <h3 className="font-headline font-bold text-xl text-on-surface">Thông báo</h3>
        <button
          id="btn-mark-all-read"
          className="text-primary font-headline font-semibold text-xs
                     hover:underline cursor-pointer bg-transparent border-none"
        >
          Đánh dấu đã đọc
        </button>
      </div>

      {/* List */}
      <ul className="flex flex-col gap-6">
        {UPDATES.map((update) => (
          <li key={update.id} className="flex gap-4">
            {/* Dot */}
            <span className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${update.dotColor}`} />
            <div>
              <p
                className={`text-sm font-semibold leading-tight ${
                  update.read ? 'text-on-surface-variant' : 'text-on-surface'
                }`}
              >
                {update.title}
              </p>
              <p className="text-xs text-outline mt-1 leading-relaxed">{update.body}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UpdatesPanel;
