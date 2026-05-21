import { useEffect, useState } from 'react';
import { message } from 'antd';
import { addFlashcard, getFlashcards, getReviewFlashcards, markFlashcardLearned, markFlashcardReviewed, removeFlashcard } from '../../services/vocabulary';
import type { FlashcardDto } from '../../interfaces/vocabulary';

const FlashcardsPage = () => {
  const [cards, setCards] = useState<FlashcardDto[]>([]);
  const [loading, setLoading] = useState(false);
  const [reviewOnly, setReviewOnly] = useState(false);

  const loadCards = async (onlyReview: boolean) => {
    setLoading(true);
    try {
      const result = onlyReview ? await getReviewFlashcards() : await getFlashcards();
      if (result.success && result.data) {
        setCards(result.data);
      } else {
        message.error(result.message || 'Không thể tải flashcards');
      }
    } catch (error: any) {
      message.error(error?.response?.data?.message || 'Lỗi kết nối');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadCards(reviewOnly);
  }, [reviewOnly]);

  const handleReviewOnly = () => {
    setReviewOnly(true);
  };

  const handleShowAll = () => {
    setReviewOnly(false);
  };

  const handleAddCard = async (wordId: string) => {
    try {
      const result = await addFlashcard(wordId);
      if (result.success) {
        message.success('Đã thêm flashcard');
        await loadCards(reviewOnly);
      } else {
        message.error(result.message || 'Không thể thêm flashcard');
      }
    } catch (error: any) {
      message.error(error?.response?.data?.message || 'Lỗi kết nối');
    }
  };

  const handleLearned = async (wordId: string) => {
    try {
      const result = await markFlashcardLearned(wordId);
      if (result.success) {
        message.success('Đã đánh dấu đã học');
        await loadCards(reviewOnly);
      } else {
        message.error(result.message || 'Không thể cập nhật');
      }
    } catch (error: any) {
      message.error(error?.response?.data?.message || 'Lỗi kết nối');
    }
  };

  const handleReviewed = async (wordId: string) => {
    try {
      const result = await markFlashcardReviewed(wordId);
      if (result.success) {
        message.success('Đã cập nhật ôn tập');
        await loadCards(reviewOnly);
      } else {
        message.error(result.message || 'Không thể cập nhật');
      }
    } catch (error: any) {
      message.error(error?.response?.data?.message || 'Lỗi kết nối');
    }
  };

  const handleRemove = async (wordId: string) => {
    try {
      const result = await removeFlashcard(wordId);
      if (result.success) {
        message.success('Đã xóa flashcard');
        await loadCards(reviewOnly);
      } else {
        message.error(result.message || 'Không thể xóa');
      }
    } catch (error: any) {
      message.error(error?.response?.data?.message || 'Lỗi kết nối');
    }
  };

  return (
    <div className="max-w-5xl mx-auto pb-16">
      <div className="mb-8">
        <h1 className="font-headline text-4xl font-bold text-on-surface mb-3">Flashcards</h1>
        <p className="text-on-surface-variant">Ôn từ vựng theo thẻ. Dữ liệu lấy từ API thật.</p>
      </div>

      <div className="mb-6 flex flex-wrap gap-3">
        <button
          onClick={handleShowAll}
          className={`px-4 py-2 rounded-full text-sm font-headline font-bold transition-all ${
            !reviewOnly ? 'bg-primary text-on-primary' : 'border border-outline-variant text-on-surface-variant'
          }`}
        >
          Tất cả
        </button>
        <button
          onClick={handleReviewOnly}
          className={`px-4 py-2 rounded-full text-sm font-headline font-bold transition-all ${
            reviewOnly ? 'bg-primary text-on-primary' : 'border border-outline-variant text-on-surface-variant'
          }`}
        >
          Cần ôn
        </button>
      </div>

      {loading ? (
        <div className="rounded-[1.5rem] border border-outline-variant/10 bg-surface-container-low p-8 text-center text-on-surface-variant">
          Đang tải flashcards...
        </div>
      ) : cards.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {cards.map((card) => (
            <div key={card.id} className="rounded-[1.5rem] border border-outline-variant/10 bg-surface-container-low p-6 flex flex-col gap-3">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-headline text-xl font-bold text-on-surface">{card.word.term}</p>
                  <p className="text-sm text-on-surface-variant">{card.word.pronunciation}</p>
                </div>
                <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${card.isLearned ? 'bg-secondary/10 text-secondary' : 'bg-primary/10 text-primary'}`}>
                  {card.isLearned ? 'Đã học' : 'Chưa học'}
                </span>
              </div>

              <p className="text-sm text-on-surface-variant">{card.word.definition}</p>

              <div className="flex flex-wrap gap-2 text-xs text-on-surface-variant">
                <span>Ôn: {card.reviewCount}</span>
                {card.nextReviewAt && <span>Hẹn: {card.nextReviewAt}</span>}
              </div>

              <div className="flex flex-wrap gap-2 pt-2">
                <button onClick={() => handleAddCard(card.wordId)} className="px-3 py-2 rounded-full border border-outline-variant text-sm">Thêm lại</button>
                <button onClick={() => handleLearned(card.wordId)} className="px-3 py-2 rounded-full border border-secondary text-secondary text-sm">Đã học</button>
                <button onClick={() => handleReviewed(card.wordId)} className="px-3 py-2 rounded-full border border-primary text-primary text-sm">Đã ôn</button>
                <button onClick={() => handleRemove(card.wordId)} className="px-3 py-2 rounded-full border border-error text-error text-sm">Xóa</button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-[1.5rem] border border-dashed border-outline-variant/20 bg-surface-container-low p-8 text-center text-on-surface-variant">
          Chưa có flashcard nào.
        </div>
      )}
    </div>
  );
};

export default FlashcardsPage;
