interface QuizFiltersProps {
  difficultyOptions: string[];
  selectedDifficulty: string;
  onSelectDifficulty: (difficulty: string) => void;
}

const QuizFilters = ({
  difficultyOptions,
  selectedDifficulty,
  onSelectDifficulty,
}: QuizFiltersProps) => {
  return (
    <div className="mb-8 flex flex-wrap items-center gap-3">
      <span className="font-headline text-sm font-semibold text-on-surface-variant">
        Lọc theo độ khó:
      </span>
      {difficultyOptions.map((level) => (
        <button
          key={level}
          onClick={() => onSelectDifficulty(level)}
          className={`px-4 py-2 rounded-full text-sm font-headline font-semibold transition-colors ${
            selectedDifficulty === level
              ? 'bg-secondary text-on-secondary'
              : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container'
          }`}
        >
          {level === 'All' ? 'Tất cả' : level === 'Easy' ? 'Dễ' : level === 'Medium' ? 'Trung bình' : 'Khó'}
        </button>
      ))}
    </div>
  );
};

export default QuizFilters;
