interface GrammarEmptyStateProps {
  title: string;
  hint: string;
  onResetLevel: () => void;
}

const GrammarEmptyState = ({ title, hint, onResetLevel }: GrammarEmptyStateProps) => {
  return (
    <div className="rounded-[1.5rem] border border-dashed border-outline-variant/20 bg-surface-container-low p-8 text-center">
      <p className="font-headline font-semibold text-on-surface">{title}</p>
      <p className="mt-2 text-sm text-on-surface-variant">{hint}</p>
      <div className="mt-5 flex items-center justify-center gap-3">
        <button
          onClick={onResetLevel}
          className="px-4 py-2 rounded-full bg-primary text-on-primary font-headline font-bold text-sm hover:opacity-90 transition-all"
        >
          Bỏ lọc cấp độ
        </button>
      </div>
    </div>
  );
};

export default GrammarEmptyState;
