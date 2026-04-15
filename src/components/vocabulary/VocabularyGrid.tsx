import WordCard from './WordCard';
import type { WordData } from './WordCard';

interface VocabularyGridProps {
  words: WordData[];
  onToggleFavorite: (id: string) => void;
  onPlayAudio: (id: string) => void;
  onAddNewWord: () => void;
}

const VocabularyGrid = ({
  words,
  onToggleFavorite,
  onPlayAudio,
  onAddNewWord,
}: VocabularyGridProps) => {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
      {words.map((word) => (
        <WordCard
          key={word.id}
          word={word}
          onToggleFavorite={onToggleFavorite}
          onPlayAudio={onPlayAudio}
        />
      ))}

      {/* Add New Word Slot */}
      <button
        onClick={onAddNewWord}
        className="border-2 border-dashed border-outline-variant/50 rounded-[1.5rem] p-8 
                   flex flex-col items-center justify-center gap-4 min-h-[250px]
                   hover:bg-surface-container-low hover:border-primary transition-all group focus:outline-none focus:ring-2 focus:ring-primary/20"
      >
        <div className="w-16 h-16 rounded-full bg-surface-container-highest flex items-center justify-center 
                        group-hover:bg-primary group-hover:text-white transition-all shadow-sm">
          <span className="material-symbols-outlined text-3xl">add</span>
        </div>
        <p className="font-headline font-bold text-on-surface-variant group-hover:text-primary transition-colors">
          Thêm từ mới
        </p>
      </button>
    </section>
  );
};

export default VocabularyGrid;
