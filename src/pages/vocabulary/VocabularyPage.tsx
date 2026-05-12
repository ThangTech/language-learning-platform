import { useEffect, useState } from 'react';
import { message } from 'antd';
import VocabularyHero from '../../components/vocabulary/VocabularyHero';
import VocabularyFilters from '../../components/vocabulary/VocabularyFilters';
import VocabularyGrid from '../../components/vocabulary/VocabularyGrid';
import AddWordModal from '../../components/vocabulary/AddWordModal';
import type { WordData } from '../../components/vocabulary/WordCard';
import { getWords, getFavorites, addFavorite, removeFavorite, createWord, updateWord, deleteWord } from '../../services/vocabulary';
import { getUser } from '../../services/auth';

interface ApiWord {
  id: string;
  term: string;
  pronunciation: string;
  definition: string;
  exampleSentence?: string;
  topic: string;
  levels: { label: string; bgColor: string; textColor: string }[];
}

const CATEGORIES = ['Tất cả', 'Văn học', 'Triết học', 'Kinh doanh', 'Công nghệ', 'Học thuật'];
const DIFFICULTIES = ['Sơ cấp', 'Trung cấp', 'Nâng cao'];

const VocabularyPage = () => {
  const user = getUser();
  const isAdmin = user?.role?.toLowerCase() === 'admin';

  const [words, setWords] = useState<WordData[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('Tất cả');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingWord, setEditingWord] = useState<WordData | null>(null);
  const [loading, setLoading] = useState(false);

  const loadWords = async () => {
    try {
      const result = await getWords(1, 100);
      if (result.success && result.data) {
        const apiWords = result.data.items as ApiWord[];
        const favIds = new Set<string>();

        const token = localStorage.getItem('token');
        if (token) {
          try {
            const favResult = await getFavorites();
            if (favResult.success && favResult.data) {
              favResult.data.forEach((fw: any) => favIds.add(fw.id));
            }
          } catch (e) {
            console.warn('Failed to load favorites', e);
          }
        }

        const mapped = apiWords.map(w => ({
          id: w.id,
          category: w.topic,
          word: w.term,
          pronunciation: w.pronunciation,
          definition: w.definition,
          example: w.exampleSentence || '',
          levels: w.levels,
          isFavorite: favIds.has(w.id),
        }));

        setWords(mapped);
      } else {
        message.error(result.message || 'Lỗi tải từ vựng');
      }
    } catch (error: any) {
      message.error(error?.response?.data?.message || error.message || 'Lỗi kết nối');
    }
  };

  useEffect(() => {
    loadWords();
  }, []);

  const handleToggleFavorite = async (id: string) => {
    const current = words.find(w => w.id === id);
    if (!current) return;
    try {
      if (current.isFavorite) {
        await removeFavorite(id);
      } else {
        await addFavorite(id);
      }
      setWords(words.map(w => w.id === id ? { ...w, isFavorite: !w.isFavorite } : w));
    } catch (error: any) {
      message.error(error?.response?.data?.message || 'Không thể cập nhật yêu thích');
    }
  };

  const handlePlayAudio = (id: string) => {
    console.log(`Play audio for word ID: ${id}`);
  };

  const handleAddNewWord = () => {
    setEditingWord(null);
    setIsModalOpen(true);
  };

  const handleEditWord = (word: WordData) => {
    setEditingWord(word);
    setIsModalOpen(true);
  };

  const handleSaveWord = async (values: {
    word: string;
    pronunciation?: string;
    definition: string;
    example?: string;
    category: string;
    level: string;
  }) => {
    setLoading(true);
    try {
      const payload = {
        term: values.word.trim(),
        pronunciation: values.pronunciation?.trim(),
        definition: values.definition.trim(),
        exampleSentence: values.example?.trim(),
        topic: values.category,
        levels: [values.level],
      };

      if (editingWord) {
        const result = await updateWord(editingWord.id, payload);
        if (result.success) {
          message.success('Đã cập nhật từ vựng');
          loadWords();
        } else {
          message.error(result.message || 'Không thể cập nhật từ vựng');
        }
      } else {
        const result = await createWord(payload);
        if (result.success) {
          message.success('Đã thêm từ vựng');
          loadWords();
        } else {
          message.error(result.message || 'Không thể thêm từ vựng');
        }
      }

      setIsModalOpen(false);
      setEditingWord(null);
    } catch (error: any) {
      message.error(error?.response?.data?.message || 'Không thể lưu từ vựng');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteWord = async (id: string) => {
    try {
      const result = await deleteWord(id);
      if (result.success) {
        message.success('Đã xóa từ vựng');
        setWords(words.filter(w => w.id !== id));
      } else {
        message.error(result.message || 'Không thể xóa từ vựng');
      }
    } catch (error: any) {
      message.error(error?.response?.data?.message || 'Không thể xóa từ vựng');
    }
  };

  const filteredWords = words.filter(w => {
    const matchCategory = selectedCategory === 'Tất cả' || w.category === selectedCategory;
    let matchDifficulty = true;
    if (selectedDifficulty !== 'All') {
      const hasAdvanced = w.levels.some(l => l.label.includes('C'));
      const hasIntermediate = w.levels.some(l => l.label.includes('B'));
      if (selectedDifficulty === 'Nâng cao' && !hasAdvanced) matchDifficulty = false;
      if (selectedDifficulty === 'Trung cấp' && !hasIntermediate) matchDifficulty = false;
      if (selectedDifficulty === 'Sơ cấp' && (hasAdvanced || hasIntermediate)) matchDifficulty = false;
    }
    return matchCategory && matchDifficulty;
  });

  return (
    <div className="max-w-6xl mx-auto">
      <VocabularyHero wordsToday={words.length} dailyGoal={30} level={selectedDifficulty || 'Nâng cao C1'} />

      <VocabularyFilters
        categories={CATEGORIES}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        difficulties={DIFFICULTIES}
        selectedDifficulty={selectedDifficulty}
        onSelectDifficulty={setSelectedDifficulty}
      />

      <VocabularyGrid
        words={filteredWords}
        isAdmin={isAdmin}
        onToggleFavorite={handleToggleFavorite}
        onPlayAudio={handlePlayAudio}
        onAddNewWord={handleAddNewWord}
        onEditWord={handleEditWord}
        onDeleteWord={handleDeleteWord}
      />

      <div className="fixed bottom-10 right-10 z-50">
        <div className="bg-surface/60 backdrop-blur-md p-2 rounded-full shadow-2xl border border-outline-variant/20 flex items-center gap-4 pr-6">
          <div className="h-12 w-12 rounded-full bg-gradient-to-tr from-tertiary to-tertiary-fixed flex items-center justify-center text-white shadow-lg">
            <span className="material-symbols-outlined text-[1.5rem]" style={{ fontVariationSettings: "'FILL' 1" }}>
              workspace_premium
            </span>
          </div>
          <div>
            <p className="font-headline text-[10px] font-bold text-on-surface-variant uppercase tracking-tighter">
              Chuỗi học tập
            </p>
            <p className="font-headline text-sm font-bold text-on-surface">Đạt mức thông thái</p>
          </div>
        </div>
      </div>

      <AddWordModal
        isOpen={isModalOpen}
        editingWord={editingWord}
        loading={loading}
        onClose={() => {
          setIsModalOpen(false);
          setEditingWord(null);
        }}
        onSave={handleSaveWord}
      />
    </div>
  );
};

export default VocabularyPage;
