import { Link } from 'react-router-dom';

interface ListeningEmptyStateProps {
  title: string;
  hint: string;
  searchActive: boolean;
  selectedLevel: string;
  onClearSearch: () => void;
  onClearLevel: () => void;
  onResetAll: () => void;
}

const ListeningEmptyState = ({
  title,
  hint,
  searchActive,
  selectedLevel,
  onClearSearch,
  onClearLevel,
  onResetAll,
}: ListeningEmptyStateProps) => {
  return (
    <div className="rounded-[1.5rem] border border-dashed border-outline-variant/20 bg-surface-container-low p-8 text-center">
      <p className="font-headline font-semibold text-on-surface">{title}</p>
      <p className="mt-2 text-sm text-on-surface-variant">{hint}</p>
      <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
        {searchActive && (
          <button
            onClick={onClearSearch}
            className="px-4 py-2 rounded-full bg-secondary text-on-secondary font-headline font-bold text-sm hover:opacity-90 transition-all"
          >
            Xóa tìm kiếm
          </button>
        )}
        {selectedLevel !== 'Tất cả' && (
          <button
            onClick={onClearLevel}
            className="px-4 py-2 rounded-full border border-primary text-primary font-headline font-bold text-sm hover:bg-primary/5 transition-all"
          >
            Bỏ lọc cấp độ
          </button>
        )}
        {!searchActive && selectedLevel === 'Tất cả' && (
          <button
            onClick={onResetAll}
            className="px-4 py-2 rounded-full border border-outline-variant text-on-surface-variant font-headline font-bold text-sm hover:bg-surface-container transition-all"
          >
            Làm mới danh sách
          </button>
        )}
      </div>
      <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
        <Link to="/progress" className="no-underline">
          <button className="px-4 py-2 rounded-full bg-primary text-on-primary font-headline font-bold text-sm hover:opacity-90 transition-all">
            Xem tiến độ
          </button>
        </Link>
        <Link to="/quiz" className="no-underline">
          <button className="px-4 py-2 rounded-full border border-primary text-primary font-headline font-bold text-sm hover:bg-primary/5 transition-all">
            Làm quiz
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ListeningEmptyState;
