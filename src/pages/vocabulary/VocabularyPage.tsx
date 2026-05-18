import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
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
  const [selectedDifficulty, setSelectedDifficulty] = useState('Tất cả');
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
    if (selectedDifficulty !== 'Tất cả') {
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
      <VocabularyHero wordsToday={words.length} dailyGoal={30} level={selectedDifficulty || 'Nâng cao'} />

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

      <div className="mt-10 flex flex-wrap gap-3">
        <Link to="/listening" className="no-underline">
          <button className="px-5 py-3 rounded-full bg-primary text-on-primary font-headline font-bold text-sm hover:opacity-90 transition-all">
            Sang Listening
          </button>
        </Link>
        <Link to="/progress" className="no-underline">
          <button className="px-5 py-3 rounded-full border border-primary text-primary font-headline font-bold text-sm hover:bg-primary/5 transition-all">
            Xem tiến độ
          </button>
        </Link>
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
