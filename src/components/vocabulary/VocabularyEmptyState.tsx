interface VocabularyEmptyStateProps {
  title: string;
  hint: string;
  onResetCategory: () => void;
  onResetDifficulty: () => void;
}

const VocabularyEmptyState = ({
  title,
  hint,
  onResetCategory,
  onResetDifficulty,
}: VocabularyEmptyStateProps) => {
  return (
    <div className="rounded-[1.5rem] border border-dashed border-outline-variant/20 bg-surface-container-low p-8 text-center">
      <p className="font-headline font-semibold text-on-surface">{title}</p>
      <p className="mt-2 text-sm text-on-surface-variant">{hint}</p>
      <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
        <button
          onClick={onResetCategory}
          className="px-4 py-2 rounded-full bg-primary text-on-primary font-headline font-bold text-sm hover:opacity-90 transition-all"
        >
          Bỏ lọc danh mục
        </button>
        <button
          onClick={onResetDifficulty}
          className="px-4 py-2 rounded-full border border-primary text-primary font-headline font-bold text-sm hover:bg-primary/5 transition-all"
        >
          Xóa độ khó
        </button>
      </div>
    </div>
  );
};

export default VocabularyEmptyState;
