import { Button, Popconfirm } from 'antd';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { InteractiveText, TtsPlayer, speakText } from '../common/TtsPlayer';

export interface LevelInfo {
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
  isAdmin?: boolean;
  onToggleFavorite: (id: string) => void;
  onPlayAudio: (id: string) => void;
  onEdit?: (word: WordData) => void;
  onDelete?: (id: string) => void;
}

const WordCard = ({
  word,
  isAdmin = false,
  onToggleFavorite,
  onPlayAudio: _onPlayAudio,
  onEdit,
  onDelete,
}: WordCardProps) => {
  const [showTrainer, setShowTrainer] = useState(false);

  const handlePronounceWord = (e: React.MouseEvent) => {
    e.stopPropagation();
    speakText(word.word, 1.0);
  };

  return (
    <div
      className={`bg-surface-container-lowest rounded-[1.5rem] p-8 shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col justify-between
                  ${word.isActive ? 'border-l-4 border-primary' : ''}`}
    >
      <div>
        <div className="flex justify-between items-start mb-4">
          <div>
            <span className="px-3 py-1 bg-secondary-container/50 text-on-secondary-container text-xs font-bold rounded-full uppercase tracking-wider">
              {word.category}
            </span>
            <div className="flex items-center gap-2 mt-3">
              <h4 className="text-2xl font-headline font-bold text-on-surface">{word.word}</h4>
              <button
                onClick={handlePronounceWord}
                className="w-8 h-8 rounded-full bg-primary/5 hover:bg-primary/15 text-primary flex items-center justify-center transition-all focus:outline-none"
                title="Nghe phát âm từ này"
              >
                <span className="material-symbols-outlined text-[1.1rem]">volume_up</span>
              </button>
            </div>
            <p className="text-on-surface-variant/70 font-body text-sm italic mt-1">
              {word.pronunciation}
            </p>
          </div>
          {!isAdmin && (
            <button
              onClick={() => onToggleFavorite(word.id)}
              className={`transition-colors focus:outline-none
                         ${word.isFavorite ? 'text-error' : 'text-outline hover:text-error'}`}
              aria-label={word.isFavorite ? 'Bỏ yêu thích' : 'Yêu thích'}
            >
              <span
                className="material-symbols-outlined text-[1.5rem]"
                style={{ fontVariationSettings: `'FILL' ${word.isFavorite ? 1 : 0}` }}
              >
                favorite
              </span>
            </button>
          )}
        </div>

        <div className="text-on-surface font-body mb-6 text-sm leading-relaxed whitespace-normal break-words">
          <InteractiveText text={word.definition} />
        </div>

        <div className="bg-surface-container-low p-4 rounded-xl mb-6">
          <div className="flex justify-between items-center mb-1.5">
            <span className="text-xs font-bold text-primary uppercase tracking-wider">Câu ví dụ</span>
            <button
              onClick={() => setShowTrainer(!showTrainer)}
              className={`font-headline text-[11px] font-extrabold px-2.5 py-1 rounded-full border transition-all flex items-center gap-1 focus:outline-none
                ${showTrainer 
                  ? 'bg-primary text-on-primary border-primary' 
                  : 'bg-surface text-primary border-primary/20 hover:bg-primary/5'}`}
            >
              <span className="material-symbols-outlined text-[10px]">mic</span>
              Luyện nói (Shadowing)
            </button>
          </div>
          
          <div className="text-sm italic text-on-surface-variant leading-relaxed">
            <InteractiveText text={`"${word.example}"`} />
          </div>

          {showTrainer && (
            <div className="mt-4 pt-3 border-t border-outline-variant/20 animate-fade-in">
              <TtsPlayer text={word.example} size="small" />
            </div>
          )}
        </div>
      </div>

      <div className="mt-auto flex items-center justify-between gap-3 pt-2">
        <button
          onClick={() => _onPlayAudio(word.id)}
          className="text-primary font-headline text-sm font-bold flex items-center gap-1.5 no-underline group-hover:gap-2.5 transition-all focus:outline-none"
        >
          Nghe bài liên quan <span className="material-symbols-outlined text-lg">headphones</span>
        </button>
        <Link to="/progress" className="text-secondary font-headline text-sm font-bold flex items-center gap-1.5 no-underline transition-all focus:outline-none">
          Xem tiến độ <span className="material-symbols-outlined text-lg">insights</span>
        </Link>

        <div className="flex items-center gap-2">
          {isAdmin && (
            <>
              <Button size="small" onClick={() => onEdit?.(word)}>
                Sửa
              </Button>
              <Popconfirm
                title="Xóa từ vựng?"
                description="Hành động này không thể hoàn tác."
                onConfirm={() => onDelete?.(word.id)}
                okText="Xóa"
                cancelText="Hủy"
              >
                <Button size="small" danger>
                  Xóa
                </Button>
              </Popconfirm>
            </>
          )}

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
    </div>
  );
};

export default WordCard;
