interface GrammarFiltersProps {
  levels: string[];
  selectedLevel: string;
  onSelectLevel: (level: string) => void;
}

const GrammarFilters = ({ levels, selectedLevel, onSelectLevel }: GrammarFiltersProps) => {
  return (
    <div className="flex items-center gap-4 mb-6">
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
          {level === 'Beginner' ? 'Cơ bản' : level === 'Intermediate' ? 'Trung cấp' : level === 'Advanced' ? 'Nâng cao' : level}
        </button>
      ))}
    </div>
  );
};

export default GrammarFilters;
