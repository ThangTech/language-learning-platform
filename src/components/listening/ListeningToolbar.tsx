import { Input } from 'antd';
import ListeningFilters from './ListeningFilters';

interface ListeningToolbarProps {
  searchText: string;
  onSearchTextChange: (value: string) => void;
  onClearSearch: () => void;
  levels: string[];
  selectedLevel: string;
  onSelectLevel: (level: string) => void;
}

const ListeningToolbar = ({
  searchText,
  onSearchTextChange,
  onClearSearch,
  levels,
  selectedLevel,
  onSelectLevel,
}: ListeningToolbarProps) => {
  return (
    <div className="my-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <Input
        value={searchText}
        onChange={(e) => onSearchTextChange(e.target.value)}
        allowClear
        onClear={onClearSearch}
        placeholder="Tìm bài nghe theo tiêu đề hoặc chủ đề"
        className="max-w-xl"
      />

      <div className="flex flex-col gap-2 md:items-end">
        <span className="font-headline text-sm font-semibold text-on-surface-variant">
          Lọc theo cấp độ:
        </span>
        <ListeningFilters
          levels={levels}
          selectedLevel={selectedLevel}
          onSelectLevel={onSelectLevel}
        />
      </div>
    </div>
  );
};

export default ListeningToolbar;
