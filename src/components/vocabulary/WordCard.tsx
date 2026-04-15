interface LevelInfo {
  label: string;
  bgColor: string;
  textColor: string;
}

export interface WordData {
  id: string;
  category: string;
  word: string;
  pronunciation: string;
  definition: string;
  example: string;
  levels: LevelInfo[];
  isFavorite: boolean;
  isActive?: boolean;
}

interface WordCardProps {
  word: WordData;
  onToggleFavorite: (id: string) => void;
  onPlayAudio: (id: string) => void;
}

const WordCard = ({ word, onToggleFavorite, onPlayAudio }: WordCardProps) => {
  return (
    <div
      className={`bg-surface-container-lowest rounded-[1.5rem] p-8 shadow-sm hover:shadow-xl transition-all duration-300 group
                  ${word.isActive ? 'border-l-4 border-primary' : ''}`}
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <span className="px-3 py-1 bg-secondary-container/50 text-on-secondary-container text-xs font-bold rounded-full uppercase tracking-wider">
            {word.category}
          </span>
          <h4 className="text-2xl font-headline font-bold text-on-surface mt-3">{word.word}</h4>
          <p className="text-on-surface-variant/70 font-body text-sm italic mt-1">
            {word.pronunciation}
          </p>
        </div>
        <button
          onClick={() => onToggleFavorite(word.id)}
          className={`transition-colors focus:outline-none 
                     ${word.isFavorite ? 'text-error' : 'text-outline hover:text-error'}`}
          aria-label={word.isFavorite ? "Bỏ yêu thích" : "Yêu thích"}
        >
          <span
            className="material-symbols-outlined text-[1.5rem]"
            style={{ fontVariationSettings: `'FILL' ${word.isFavorite ? 1 : 0}` }}
          >
            favorite
          </span>
        </button>
      </div>

      <p className="text-on-surface font-body mb-6 text-sm leading-relaxed">
        {word.definition}
      </p>

      <div className="bg-surface-container-low p-4 rounded-xl mb-6">
        <p className="text-xs font-bold text-primary mb-1.5 uppercase tracking-wider">Ví dụ</p>
        <p className="text-sm italic text-on-surface-variant leading-relaxed">"{word.example}"</p>
      </div>

      <div className="mt-auto flex items-center justify-between pt-2">
        <button
          onClick={() => onPlayAudio(word.id)}
          className="text-primary font-headline text-sm font-bold flex items-center gap-1.5 group-hover:gap-2.5 transition-all focus:outline-none"
        >
          Nghe phát âm <span className="material-symbols-outlined text-lg">volume_up</span>
        </button>
        <div className="flex -space-x-2">
          {word.levels.map((level, idx) => (
            <div
              key={idx}
              className={`w-8 h-8 rounded-full border-2 border-surface-container-lowest 
                         flex items-center justify-center font-headline text-[10px] font-bold shadow-sm
                         ${level.bgColor} ${level.textColor}`}
            >
              {level.label}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WordCard;
