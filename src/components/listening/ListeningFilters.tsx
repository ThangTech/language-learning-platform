interface ListeningFiltersProps {
  levels: string[];
  selectedLevel: string;
  onSelectLevel: (level: string) => void;
}

const ListeningFilters = ({ levels, selectedLevel, onSelectLevel }: ListeningFiltersProps) => {
  return (
    <div className="flex items-center gap-3 mb-6">
      {levels.map(level => (
        <button
          key={level}
          onClick={() => onSelectLevel(level)}
          className={`px-4 py-2 rounded-full text-sm font-headline transition-colors ${
            selectedLevel === level
              ? 'bg-primary text-on-primary'
              : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container'
          }`}
        >
          {level}
        </button>
      ))}
    </div>
  );
};

export default ListeningFilters;
