import { useState } from 'react';
import type { WordData, LevelInfo } from './WordCard';

interface AddWordModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (word: WordData) => void;
}

const LEVEL_OPTIONS = [
  { label: 'A1', bgColor: 'bg-primary-fixed', textColor: 'text-on-primary-fixed' },
  { label: 'A2', bgColor: 'bg-primary-fixed', textColor: 'text-on-primary-fixed' },
  { label: 'B1', bgColor: 'bg-primary-fixed', textColor: 'text-on-primary-fixed' },
  { label: 'B2', bgColor: 'bg-secondary-fixed', textColor: 'text-on-secondary-fixed' },
  { label: 'C1', bgColor: 'bg-secondary-fixed', textColor: 'text-on-secondary-fixed' },
  { label: 'C2', bgColor: 'bg-secondary-fixed', textColor: 'text-on-secondary-fixed' },
];

const CATEGORIES = ['Văn học', 'Triết học', 'Kinh doanh', 'Công nghệ', 'Học thuật'];

const AddWordModal = ({ isOpen, onClose, onAdd }: AddWordModalProps) => {
  const [word, setWord] = useState('');
  const [pronunciation, setPronunciation] = useState('');
  const [definition, setDefinition] = useState('');
  const [example, setExample] = useState('');
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [level, setLevel] = useState('A1');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!word.trim() || !definition.trim()) return;

    const levelInfo: LevelInfo = LEVEL_OPTIONS.find(l => l.label === level) || LEVEL_OPTIONS[0];

    const newWord: WordData = {
      id: `w${Date.now()}`,
      category,
      word: word.trim(),
      pronunciation: pronunciation.trim() || '/.../',
      definition: definition.trim(),
      example: example.trim() || '-',
      levels: [levelInfo],
      isFavorite: false,
    };

    onAdd(newWord);
    onClose();

    // Reset form
    setWord('');
    setPronunciation('');
    setDefinition('');
    setExample('');
    setCategory(CATEGORIES[0]);
    setLevel('A1');
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-surface-container-lowest rounded-3xl shadow-2xl w-full max-w-lg mx-4 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-primary-fixed px-6 py-4 flex items-center justify-between">
          <h2 className="font-headline text-xl font-bold text-on-primary-fixed">Thêm từ mới</h2>
          <button
            onClick={onClose}
            className="text-on-primary-fixed/70 hover:text-on-primary-fixed transition-colors"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-bold text-on-surface-variant mb-1.5 uppercase tracking-wider">
              Từ vựng
            </label>
            <input
              type="text"
              value={word}
              onChange={(e) => setWord(e.target.value)}
              className="w-full bg-surface-container-high border border-outline-variant rounded-xl px-4 py-3 text-on-surface
                         focus:outline-none focus:ring-2 focus:ring-primary transition-all"
              placeholder="Nhập từ mới..."
              required
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-on-surface-variant mb-1.5 uppercase tracking-wider">
              Phiên âm
            </label>
            <input
              type="text"
              value={pronunciation}
              onChange={(e) => setPronunciation(e.target.value)}
              className="w-full bg-surface-container-high border border-outline-variant rounded-xl px-4 py-3 text-on-surface
                         focus:outline-none focus:ring-2 focus:ring-primary transition-all"
              placeholder="Ví dụ: /ˈwɜːrd/"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-on-surface-variant mb-1.5 uppercase tracking-wider">
              Nghĩa
            </label>
            <textarea
              value={definition}
              onChange={(e) => setDefinition(e.target.value)}
              className="w-full bg-surface-container-high border border-outline-variant rounded-xl px-4 py-3 text-on-surface
                         focus:outline-none focus:ring-2 focus:ring-primary transition-all resize-none"
              rows={2}
              placeholder="Nhập nghĩa của từ..."
              required
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-on-surface-variant mb-1.5 uppercase tracking-wider">
              Ví dụ
            </label>
            <textarea
              value={example}
              onChange={(e) => setExample(e.target.value)}
              className="w-full bg-surface-container-high border border-outline-variant rounded-xl px-4 py-3 text-on-surface
                         focus:outline-none focus:ring-2 focus:ring-primary transition-all resize-none"
              rows={2}
              placeholder="Nhập câu ví dụ..."
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-on-surface-variant mb-1.5 uppercase tracking-wider">
                Danh mục
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-surface-container-high border border-outline-variant rounded-xl px-4 py-3 text-on-surface
                           focus:outline-none focus:ring-2 focus:ring-primary transition-all cursor-pointer"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-bold text-on-surface-variant mb-1.5 uppercase tracking-wider">
                Cấp độ
              </label>
              <select
                value={level}
                onChange={(e) => setLevel(e.target.value)}
                className="w-full bg-surface-container-high border border-outline-variant rounded-xl px-4 py-3 text-on-surface
                           focus:outline-none focus:ring-2 focus:ring-primary transition-all cursor-pointer"
              >
                {LEVEL_OPTIONS.map((lvl) => (
                  <option key={lvl.label} value={lvl.label}>{lvl.label}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 bg-surface-container-high text-on-surface font-bold rounded-xl
                         hover:bg-surface-container-low transition-colors focus:outline-none"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="flex-1 px-6 py-3 bg-primary-fixed text-on-primary-fixed font-bold rounded-xl
                         hover:bg-primary-fixed/90 transition-colors focus:outline-none focus:ring-2 focus:ring-tertiary"
            >
              Thêm từ
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddWordModal;