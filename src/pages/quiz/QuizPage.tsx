import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Input, message } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { getUser } from '../../services/auth';
import { createQuiz, deleteQuiz, getQuizzes, updateQuiz } from '../../services/quiz';
import QuizHero from '../../components/quiz/QuizHero';
import QuizGrid from '../../components/quiz/QuizGrid';
import QuizFilters from '../../components/quiz/QuizFilters';
import QuizEmptyState from '../../components/quiz/QuizEmptyState';
import QuizJourneyCta from '../../components/quiz/QuizJourneyCta';
import AddQuizModal from '../../components/quiz/AddQuizModal';
import type { QuizDto } from '../../interfaces/quiz';

const DIFFICULTY_OPTIONS = ['All', 'Easy', 'Medium', 'Hard'];

const QuizPage = () => {
  const [searchParams] = useSearchParams();
  const user = getUser();
  const isAdmin = user?.role?.toLowerCase() === 'admin';
  const lessonId = searchParams.get('lessonId');

  const [quizzes, setQuizzes] = useState<QuizDto[]>([]);
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('All');
  const [searchText, setSearchText] = useState('');
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

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingQuiz(null);
  };

  const handleSearchChange = (value: string) => {
    setSearchText(value);
  };

  const handleClearSearch = () => {
    setSearchText('');
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
          lessonId: lessonId || undefined,
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
        setQuizzes(quizzes.filter((quiz) => quiz.id !== id));
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

  const lessonQuizzes = lessonId ? quizzes.filter((quiz) => quiz.lessonId === lessonId) : quizzes;

  const filteredQuizzes = lessonQuizzes.filter((quiz) => {
    const matchDifficulty = selectedDifficulty === 'All' || quiz.difficulty === selectedDifficulty;
    const matchSearch =
      searchText.trim().length === 0 ||
      quiz.title.toLowerCase().includes(searchText.trim().toLowerCase()) ||
      quiz.type.toLowerCase().includes(searchText.trim().toLowerCase());

    return matchDifficulty && matchSearch;
  });

  const isFilteredByLesson = Boolean(lessonId);

  return (
    <div className="max-w-6xl mx-auto pb-16">
      <QuizHero totalQuizzes={quizzes.length} />

      <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <Input
          value={searchText}
          onChange={(e) => handleSearchChange(e.target.value)}
          allowClear
          onClear={handleClearSearch}
          placeholder="Tìm quiz theo tiêu đề hoặc loại"
          prefix={<SearchOutlined />}
          className="max-w-xl"
        />
      </div>

      <QuizFilters
        difficultyOptions={DIFFICULTY_OPTIONS}
        selectedDifficulty={selectedDifficulty}
        onSelectDifficulty={setSelectedDifficulty}
      />

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
        <QuizEmptyState
          lessonId={isFilteredByLesson ? lessonId : null}
          onResetDifficulty={() => setSelectedDifficulty('All')}
        />
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

      <QuizJourneyCta />

      <AddQuizModal
        isOpen={isModalOpen}
        editingQuiz={editingQuiz}
        loading={loading}
        onClose={handleCloseModal}
        onSave={handleSaveQuiz}
      />
    </div>
  );
};

export default QuizPage;
