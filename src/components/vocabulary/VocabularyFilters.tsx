interface VocabularyFiltersProps {
  categories: string[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  difficulties: string[];
  selectedDifficulty: string;
  onSelectDifficulty: (difficulty: string) => void;
}

const VocabularyFilters = ({
  categories,
  selectedCategory,
  onSelectCategory,
  difficulties,
  selectedDifficulty,
  onSelectDifficulty,
}: VocabularyFiltersProps) => {
  return (
    <section className="mb-10 flex flex-wrap items-center justify-between gap-4">
      {/* Category Pills */}
      <div className="flex items-center gap-3 overflow-x-auto no-scrollbar pb-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => onSelectCategory(category)}
            className={`px-6 py-2.5 rounded-full text-sm font-medium transition-colors whitespace-nowrap
              ${
                selectedCategory === category
                  ? 'bg-primary text-on-primary font-bold shadow-md'
                  : 'bg-surface-container-low text-on-surface-variant hover:bg-primary-fixed/30'
              }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Difficulty Dropdown */}
      <div className="flex items-center gap-3 shrink-0">
        <div className="relative">
          <select
            value={selectedDifficulty}
            onChange={(e) => onSelectDifficulty(e.target.value)}
            className="appearance-none bg-surface-container-lowest border border-outline-variant/30 
                       rounded-full pl-6 pr-10 py-2.5 text-sm font-medium text-on-surface
                       focus:ring-2 focus:ring-primary/20 focus:border-primary focus:outline-none
                       transition-all shadow-sm cursor-pointer"
          >
            <option value="All">Độ khó: Tất cả</option>
            {difficulties.map((diff) => (
              <option key={diff} value={diff}>
                {diff}
              </option>
            ))}
          </select>
          <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-outline text-[1.2rem]">
            expand_more
          </span>
        </div>
      </div>
    </section>
  );
};

export default VocabularyFilters;
