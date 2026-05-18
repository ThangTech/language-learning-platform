import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { message } from 'antd';
import { getUser } from '../../services/auth';
import { getQuizzes, createQuiz, updateQuiz, deleteQuiz } from '../../services/quiz';
import QuizHero from '../../components/quiz/QuizHero';
import QuizGrid from '../../components/quiz/QuizGrid';
import AddQuizModal from '../../components/quiz/AddQuizModal';
import type { QuizDto } from '../../interfaces/quiz';

const DIFFICULTY_OPTIONS = ['Easy', 'Medium', 'Hard'];

const QuizPage = () => {
  const user = getUser();
  const isAdmin = user?.role?.toLowerCase() === 'admin';

  const [quizzes, setQuizzes] = useState<QuizDto[]>([]);
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingQuiz, setEditingQuiz] = useState<QuizDto | null>(null);
  const [loading, setLoading] = useState(false);

  const loadQuizzes = async () => {
    try {
      const result = await getQuizzes();
      if (result.success && result.data) {
        setQuizzes(result.data);
      } else {
        message.error(result.message || 'Không thể tải quiz');
      }
    } catch (error: any) {
      message.error(error?.response?.data?.message || 'Lỗi kết nối');
    }
  };

  useEffect(() => {
    loadQuizzes();
  }, []);

  const handleAddQuiz = () => {
    setEditingQuiz(null);
    setIsModalOpen(true);
  };

  const handleEditQuiz = (quiz: QuizDto) => {
    setEditingQuiz(quiz);
    setIsModalOpen(true);
  };

  const handleSaveQuiz = async (values: {
    title: string;
    difficulty: string;
    type: string;
    durationMinutes: number;
  }) => {
    setLoading(true);
    try {
      if (editingQuiz) {
        const result = await updateQuiz(editingQuiz.id, values);
        if (result.success) {
          message.success('Đã cập nhật quiz');
          loadQuizzes();
        } else {
          message.error(result.message || 'Không thể cập nhật');
        }
      } else {
        const result = await createQuiz({
          title: values.title,
          lessonId: undefined,
          difficulty: values.difficulty,
          type: values.type,
          durationMinutes: values.durationMinutes,
          questions: [],
        });
        if (result.success) {
          message.success('Đã thêm quiz');
          loadQuizzes();
        } else {
          message.error(result.message || 'Không thể thêm quiz');
        }
      }
      setIsModalOpen(false);
      setEditingQuiz(null);
    } catch (error: any) {
      message.error(error?.response?.data?.message || 'Không thể lưu quiz');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteQuiz = async (id: string) => {
    try {
      const result = await deleteQuiz(id);
      if (result.success) {
        message.success('Đã xóa quiz');
        setQuizzes(quizzes.filter(q => q.id !== id));
      } else {
        message.error(result.message || 'Không thể xóa');
      }
    } catch (error: any) {
      message.error(error?.response?.data?.message || 'Lỗi xóa');
    }
  };

  const handleStartQuiz = () => {
    message.info('Hãy bắt đầu từ Listening để luyện nghe hiểu trước.');
  };

  const handlePreviewQuiz = () => {
    message.info('Tính năng xem trước quiz sẽ sớm được phát triển.');
  };

  const getDifficultyText = (difficulty: string) => {
    if (difficulty === 'Easy') return 'Dễ';
    if (difficulty === 'Medium') return 'Trung bình';
    if (difficulty === 'Hard') return 'Khó';
    return difficulty;
  };

  const filteredQuizzes = quizzes.filter(q => {
    if (selectedDifficulty === 'All') return true;
    return q.difficulty === selectedDifficulty;
  });

  return (
    <div className="max-w-6xl mx-auto pb-16">
      <QuizHero totalQuizzes={quizzes.length} />

      <div className="mb-8 flex flex-wrap items-center gap-3">
        <span className="font-headline text-sm font-semibold text-on-surface-variant">Lọc theo độ khó:</span>
        {['All', ...DIFFICULTY_OPTIONS].map(level => (
          <button
            key={level}
            onClick={() => setSelectedDifficulty(level)}
            className={`px-4 py-2 rounded-full text-sm font-headline font-semibold transition-colors
              ${selectedDifficulty === level
                ? 'bg-secondary text-on-secondary'
                : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container'
              }`}
          >
            {level === 'All' ? 'Tất cả' : getDifficultyText(level)}
          </button>
        ))}
      </div>

      {filteredQuizzes.length > 0 ? (
        <QuizGrid
          quizzes={filteredQuizzes}
          isAdmin={isAdmin}
          onEditQuiz={handleEditQuiz}
          onDeleteQuiz={handleDeleteQuiz}
          onStartQuiz={handleStartQuiz}
          onPreviewQuiz={handlePreviewQuiz}
        />
      ) : (
        <div className="rounded-[1.5rem] border border-dashed border-outline-variant/20 bg-surface-container-low p-8 text-center">
          <p className="font-headline font-semibold text-on-surface">Không có quiz phù hợp</p>
          <p className="mt-2 text-sm text-on-surface-variant">
            Thử đổi bộ lọc độ khó hoặc quay lại Listening để chọn bài khác.
          </p>
          <div className="mt-5 flex items-center justify-center gap-3 flex-wrap">
            <Link to="/listening" className="no-underline">
              <button className="px-4 py-2 rounded-full bg-secondary text-on-secondary font-headline font-bold text-sm hover:opacity-90 transition-all">
                Về Listening
              </button>
            </Link>
            <button
              onClick={() => setSelectedDifficulty('All')}
              className="px-4 py-2 rounded-full border border-secondary text-secondary font-headline font-bold text-sm hover:bg-secondary/5 transition-all"
            >
              Xóa bộ lọc
            </button>
          </div>
        </div>
      )}

      {isAdmin && (
        <div className="fixed bottom-10 right-10 z-50">
          <button
            onClick={handleAddQuiz}
            className="w-16 h-16 rounded-full bg-secondary text-on-secondary flex items-center justify-center shadow-lg hover:scale-105 transition-transform"
          >
            <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>add</span>
          </button>
        </div>
      )}

      <div className="mt-10 flex flex-wrap gap-3">
        <Link to="/listening" className="no-underline">
          <button className="px-5 py-3 rounded-full bg-secondary text-on-secondary font-headline font-bold text-sm hover:opacity-90 transition-all">
            Sang Listening
          </button>
        </Link>
        <Link to="/progress" className="no-underline">
          <button className="px-5 py-3 rounded-full border border-secondary text-secondary font-headline font-bold text-sm hover:bg-secondary/5 transition-all">
            Xem tiến độ
          </button>
        </Link>
      </div>

      <AddQuizModal
        isOpen={isModalOpen}
        editingQuiz={editingQuiz}
        loading={loading}
        onClose={() => {
          setIsModalOpen(false);
          setEditingQuiz(null);
        }}
        onSave={handleSaveQuiz}
      />
    </div>
  );
};

export default QuizPage;
