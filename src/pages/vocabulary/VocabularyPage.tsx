import { useState } from 'react';
import VocabularyHero from '../../components/vocabulary/VocabularyHero';
import VocabularyFilters from '../../components/vocabulary/VocabularyFilters';
import VocabularyGrid from '../../components/vocabulary/VocabularyGrid';
import type { WordData } from '../../components/vocabulary/WordCard';

// Initial Mock Data based on HTML
const INITIAL_WORDS: WordData[] = [
  {
    id: 'w1',
    category: 'Văn học',
    word: 'Ephemeral',
    pronunciation: '/ɪˈfɛm(ə)rəl/',
    definition: 'Tồn tại trong thời gian rất ngắn; phù du hoặc thoáng qua.',
    example: 'The sunset provided an ephemeral moment of beauty that disappeared as quickly as it came.',
    levels: [
      { label: 'A1', bgColor: 'bg-primary-fixed', textColor: 'text-on-primary-fixed' },
      { label: 'C1', bgColor: 'bg-secondary-fixed', textColor: 'text-on-secondary-fixed' },
    ],
    isFavorite: false,
  },
  {
    id: 'w2',
    category: 'Triết học',
    word: 'Pragmatic',
    pronunciation: '/praɡˈmatɪk/',
    definition: 'Giải quyết vấn đề một cách thực tế và hợp lý thay vì dựa trên lý thuyết.',
    example: 'In business, a pragmatic approach is often more effective than a purely theoretical one.',
    levels: [
      { label: 'B2', bgColor: 'bg-secondary-fixed', textColor: 'text-on-secondary-fixed' },
    ],
    isFavorite: true,
  },
  {
    id: 'w3',
    category: 'Kinh doanh',
    word: 'Synergy',
    pronunciation: '/ˈsɪnədʒi/',
    definition: 'Sự tương tác hoặc hợp tác của hai hay nhiều tổ chức để tạo ra một hiệu ứng kết hợp mạnh mẽ hơn.',
    example: 'The merger was expected to create a synergy that would boost the company\'s market share.',
    levels: [
      { label: 'B1', bgColor: 'bg-primary-fixed', textColor: 'text-on-primary-fixed' },
    ],
    isFavorite: false,
    isActive: true,
  },
  {
    id: 'w4',
    category: 'Công nghệ',
    word: 'Algorithm',
    pronunciation: '/ˈalɡərɪð(ə)m/',
    definition: 'Một quy trình hoặc bộ quy tắc cần tuân theo trong tính toán hoặc các hoạt động giải quyết vấn đề.',
    example: 'Social media platforms use an algorithm to determine which posts you see first.',
    levels: [
      { label: 'A2', bgColor: 'bg-primary-fixed', textColor: 'text-on-primary-fixed' },
    ],
    isFavorite: false,
  },
  {
    id: 'w5',
    category: 'Học thuật',
    word: 'Quintessential',
    pronunciation: '/ˌkwɪntɪˈsɛnʃ(ə)l/',
    definition: 'Đại diện cho ví dụ hoàn hảo nhất hoặc điển hình nhất của một phẩm chất hoặc tầng lớp.',
    example: 'He was the quintessential gentleman, always polite and helpful to everyone he met.',
    levels: [
      { label: 'C2', bgColor: 'bg-secondary-fixed', textColor: 'text-on-secondary-fixed' },
    ],
    isFavorite: false,
  },
];

const CATEGORIES = ['Tất cả', 'Kinh doanh', 'Văn học', 'Công nghệ', 'Triết học', 'Học thuật'];
const DIFFICULTIES = ['Sơ cấp', 'Trung cấp', 'Nâng cao'];

const VocabularyPage = () => {
  const [words, setWords] = useState<WordData[]>(INITIAL_WORDS);
  const [selectedCategory, setSelectedCategory] = useState('Tất cả');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');

  const handleToggleFavorite = (id: string) => {
    setWords(words.map(w => w.id === id ? { ...w, isFavorite: !w.isFavorite } : w));
  };

  const handlePlayAudio = (id: string) => {
    // Implement audio playback logic here
    console.log(`Play audio for word ID: ${id}`);
  };

  const handleAddNewWord = () => {
    // Implement add new word logic (e.g., open a modal)
    console.log('Add new word clicked');
  };

  // Filter words based on local state (for demonstration)
  const filteredWords = words.filter(w => {
    const matchCategory = selectedCategory === 'Tất cả' || w.category === selectedCategory;
    // Basic difficulty filtering mock logic based on selected text - adapt as needed 
    let matchDifficulty = true;
    if (selectedDifficulty !== 'All') {
        const hasAdvancedLevel = w.levels.some(l => l.label.includes('C'));
        const hasIntermediateLevel = w.levels.some(l => l.label.includes('B'));
        if (selectedDifficulty === 'Nâng cao' && !hasAdvancedLevel) matchDifficulty = false;
        if (selectedDifficulty === 'Trung cấp' && !hasIntermediateLevel) matchDifficulty = false;
        if (selectedDifficulty === 'Sơ cấp' && (hasAdvancedLevel || hasIntermediateLevel)) matchDifficulty = false;
    }
    return matchCategory && matchDifficulty;
  });

  return (
    <div className="max-w-6xl mx-auto">
      <VocabularyHero wordsToday={24} dailyGoal={30} level="Nâng cao C1" />
      
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
        onToggleFavorite={handleToggleFavorite}
        onPlayAudio={handlePlayAudio}
        onAddNewWord={handleAddNewWord}
      />
      
      {/* Floating Progress Jewel - Now in DashboardLayout or localized if needed. 
          As requested by HTML context, it exists on this page but since we have a global
          layout, this might be page specific. Let's add it here. */}
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
    </div>
  );
};

export default VocabularyPage;