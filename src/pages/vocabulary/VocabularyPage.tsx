import { useEffect, useState } from 'react';
import { Input, message } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import VocabularyHero from '../../components/vocabulary/VocabularyHero';
import VocabularyFilters from '../../components/vocabulary/VocabularyFilters';
import VocabularyGrid from '../../components/vocabulary/VocabularyGrid';
import VocabularyEmptyState from '../../components/vocabulary/VocabularyEmptyState';
import VocabularyJourneyCta from '../../components/vocabulary/VocabularyJourneyCta';
import AddWordModal from '../../components/vocabulary/AddWordModal';
import type { WordData } from '../../components/vocabulary/WordCard';
import { getUser } from '../../services/auth';
import { addFavorite, createWord, deleteWord, getFavorites, getWords, removeFavorite, updateWord } from '../../services/vocabulary';

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
const DIFFICULTIES = ['Tất cả', 'Sơ cấp', 'Trung cấp', 'Nâng cao'];

const VocabularyPage = () => {
  const user = getUser();
  const isAdmin = user?.role?.toLowerCase() === 'admin';

  const [words, setWords] = useState<WordData[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('Tất cả');
  const [selectedDifficulty, setSelectedDifficulty] = useState('Tất cả');
  const [searchText, setSearchText] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingWord, setEditingWord] = useState<WordData | null>(null);
  const [loading, setLoading] = useState(false);

  const loadWords = async (search?: string) => {
    try {
      const result = await getWords(1, 100, undefined, search);
      if (!result.success || !result.data) {
        message.error(result.message || 'Lỗi tải từ vựng');
        return;
      }

      const apiWords = result.data.items as ApiWord[];
      const favIds = new Set<string>();
      const token = localStorage.getItem('token');

      if (token) {
        try {
          const favResult = await getFavorites();
          if (favResult.success && favResult.data) {
            favResult.data.forEach((item: any) => favIds.add(item.id));
          }
        } catch {
          // bỏ qua lỗi riêng của favorites
        }
      }

      const mapped = apiWords.map((item) => ({
        id: item.id,
        category: item.topic,
        word: item.term,
        pronunciation: item.pronunciation,
        definition: item.definition,
        example: item.exampleSentence || '',
        levels: item.levels,
        isFavorite: favIds.has(item.id),
      }));

      setWords(mapped);
    } catch (error: any) {
      message.error(error?.response?.data?.message || error.message || 'Lỗi kết nối');
    }
  };

  useEffect(() => {
    loadWords();
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      void loadWords(searchText.trim() || undefined);
    }, 300);

    return () => window.clearTimeout(timer);
  }, [searchText]);

  const handleSearchChange = (value: string) => {
    setSearchText(value);
  };

  const handleClearSearch = () => {
    setSearchText('');
  };

  const handleAddNewWord = () => {
    setEditingWord(null);
    setIsModalOpen(true);
  };

  const handleEditWord = (word: WordData) => {
    setEditingWord(word);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingWord(null);
  };

  const handleToggleFavorite = async (id: string) => {
    const current = words.find((word) => word.id === id);
    if (!current) return;

    try {
      if (current.isFavorite) {
        await removeFavorite(id);
      } else {
        await addFavorite(id);
      }

      setWords((prev) => prev.map((word) => (word.id === id ? { ...word, isFavorite: !word.isFavorite } : word)));
    } catch (error: any) {
      message.error(error?.response?.data?.message || 'Không thể cập nhật yêu thích');
    }
  };

  const handlePlayAudio = (id: string) => {
    console.log(`Play audio for word ID: ${id}`);
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
          await loadWords(searchText.trim() || undefined);
        } else {
          message.error(result.message || 'Không thể cập nhật từ vựng');
        }
      } else {
        const result = await createWord(payload);
        if (result.success) {
          message.success('Đã thêm từ vựng');
          await loadWords(searchText.trim() || undefined);
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
        setWords((prev) => prev.filter((word) => word.id !== id));
      } else {
        message.error(result.message || 'Không thể xóa từ vựng');
      }
    } catch (error: any) {
      message.error(error?.response?.data?.message || 'Không thể xóa từ vựng');
    }
  };

  const filteredWords = words.filter((word) => {
    const matchCategory = selectedCategory === 'Tất cả' || word.category === selectedCategory;
    let matchDifficulty = true;

    if (selectedDifficulty !== 'Tất cả') {
      const hasAdvanced = word.levels.some((level) => level.label.includes('C'));
      const hasIntermediate = word.levels.some((level) => level.label.includes('B'));

      if (selectedDifficulty === 'Nâng cao' && !hasAdvanced) matchDifficulty = false;
      if (selectedDifficulty === 'Trung cấp' && !hasIntermediate) matchDifficulty = false;
      if (selectedDifficulty === 'Sơ cấp' && (hasAdvanced || hasIntermediate)) matchDifficulty = false;
    }

    return matchCategory && matchDifficulty;
  });

  const totalVisible = filteredWords.length;
  const isFiltered = selectedCategory !== 'Tất cả' || selectedDifficulty !== 'Tất cả' || searchText.trim().length > 0;
  let emptyTitle = 'Chưa có từ phù hợp';
  let emptyHint = 'Thử đổi danh mục, độ khó hoặc từ khóa tìm kiếm.';

  if (isFiltered) {
    emptyTitle = 'Không có từ vựng phù hợp';
    emptyHint = 'Thử bỏ bớt bộ lọc hoặc đổi từ khóa để xem thêm từ vựng.';
  }

  const clearCategory = () => setSelectedCategory('Tất cả');
  const clearDifficulty = () => setSelectedDifficulty('Tất cả');
  const currentLevel = selectedDifficulty === 'Tất cả' ? 'Nâng cao C1' : selectedDifficulty;

  return (
    <div className="max-w-6xl mx-auto">
      <VocabularyHero wordsToday={words.length} dailyGoal={30} level={currentLevel} />

      <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <Input
          value={searchText}
          onChange={(e) => handleSearchChange(e.target.value)}
          allowClear
          onClear={handleClearSearch}
          placeholder="Tìm từ theo tên, nghĩa hoặc ví dụ"
          prefix={<SearchOutlined />}
          className="max-w-xl"
        />
      </div>

      <VocabularyFilters
        categories={CATEGORIES}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        difficulties={DIFFICULTIES}
        selectedDifficulty={selectedDifficulty}
        onSelectDifficulty={setSelectedDifficulty}
      />

      {totalVisible > 0 ? (
        <VocabularyGrid
          words={filteredWords}
          isAdmin={isAdmin}
          onToggleFavorite={handleToggleFavorite}
          onPlayAudio={handlePlayAudio}
          onAddNewWord={handleAddNewWord}
          onEditWord={handleEditWord}
          onDeleteWord={handleDeleteWord}
        />
      ) : (
        <VocabularyEmptyState
          title={emptyTitle}
          hint={emptyHint}
          onResetCategory={clearCategory}
          onResetDifficulty={clearDifficulty}
        />
      )}

      <VocabularyJourneyCta />

      <AddWordModal
        isOpen={isModalOpen}
        editingWord={editingWord}
        loading={loading}
        onClose={handleCloseModal}
        onSave={handleSaveWord}
      />
    </div>
  );
};

export default VocabularyPage;
