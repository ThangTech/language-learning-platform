import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Input, message, Modal } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { getUser } from '../../services/auth';
import { createQuiz, deleteQuiz, getQuizById, getQuizzes, updateQuiz } from '../../services/quiz';
import QuizHero from '../../components/quiz/QuizHero';
import QuizGrid from '../../components/quiz/QuizGrid';
import QuizFilters from '../../components/quiz/QuizFilters';
import QuizEmptyState from '../../components/quiz/QuizEmptyState';
import QuizJourneyCta from '../../components/quiz/QuizJourneyCta';
import AddQuizModal from '../../components/quiz/AddQuizModal';
import QuizQuestionsModal from '../../components/quiz/QuizQuestionsModal';
import type { CreateQuizQuestionRequest, QuizDto } from '../../interfaces/quiz';

const DIFFICULTY_OPTIONS = ['All', 'Easy', 'Medium', 'Hard'];

const QuizPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const user = getUser();
  const isAdmin = user?.role?.toLowerCase() === 'admin';
  const lessonId = searchParams.get('lessonId');

  const [quizzes, setQuizzes] = useState<QuizDto[]>([]);
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('All');
  const [searchText, setSearchText] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isQuestionsModalOpen, setIsQuestionsModalOpen] = useState(false);
  const [editingQuiz, setEditingQuiz] = useState<QuizDto | null>(null);
  const [pendingQuizValues, setPendingQuizValues] = useState<{
    title: string;
    difficulty: string;
    type: string;
    durationMinutes: number;
    grammarTopicId?: string;
    lessonId?: string;
  } | null>(null);
  const [loading, setLoading] = useState(false);
  const [questionsLoading, setQuestionsLoading] = useState(false);

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
    setPendingQuizValues(null);
    setIsModalOpen(true);
  };

  const handleEditQuiz = (quiz: QuizDto) => {
    setEditingQuiz(quiz);
    setPendingQuizValues(null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingQuiz(null);
    setPendingQuizValues(null);
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
    grammarTopicId?: string;
    lessonId?: string;
  }) => {
    if (editingQuiz) {
      setLoading(true);
      try {
        const result = await updateQuiz(editingQuiz.id, values);
        if (result.success) {
          message.success('Đã cập nhật quiz');
          await loadQuizzes();
          handleCloseModal();
        } else {
          message.error(result.message || 'Không thể cập nhật');
        }
      } catch (error: any) {
        message.error(error?.response?.data?.message || 'Không thể lưu quiz');
      } finally {
        setLoading(false);
      }
      return;
    }

    setPendingQuizValues(values);
    setIsModalOpen(false);
    setIsQuestionsModalOpen(true);
  };

  const handleCloseQuestionsModal = () => {
    setIsQuestionsModalOpen(false);
    setPendingQuizValues(null);
  };

  const handleSaveQuestions = async (questions: CreateQuizQuestionRequest[]) => {
    if (!pendingQuizValues) {
      return;
    }

    setQuestionsLoading(true);
    try {
      const result = await createQuiz({
        title: pendingQuizValues.title,
        lessonId: pendingQuizValues.lessonId || (lessonId || undefined),
        grammarTopicId: pendingQuizValues.grammarTopicId,
        difficulty: pendingQuizValues.difficulty,
        type: pendingQuizValues.type,
        durationMinutes: pendingQuizValues.durationMinutes,
        questions,
      });

      if (result.success) {
        message.success('Đã thêm quiz');
        await loadQuizzes();
        handleCloseQuestionsModal();
      } else {
        message.error(result.message || 'Không thể thêm quiz');
      }
    } catch (error: any) {
      message.error(error?.response?.data?.message || 'Không thể lưu quiz');
    } finally {
      setQuestionsLoading(false);
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

  const handleStartQuiz = (quiz: QuizDto) => {
    if (quiz.grammarTopicId) {
      navigate(`/grammar/${quiz.grammarTopicId}`);
    } else if (quiz.lessonId) {
      navigate(`/listening/${quiz.lessonId}`);
    } else {
      message.info('Bài quiz này chưa được gắn với bài học nào.');
    }
  };

  const handlePreviewQuiz = async (quiz: QuizDto) => {
    let quizToPreview = quiz;

    if (!quizToPreview.questions || quizToPreview.questions.length === 0) {
      try {
        const result = await getQuizById(quiz.id);
        if (result.success && result.data) {
          quizToPreview = result.data;
        }
      } catch (error: any) {
        message.error(error?.response?.data?.message || 'Không thể tải câu hỏi xem trước');
        return;
      }
    }

    Modal.info({
      title: `Xem trước: ${quizToPreview.title}`,
      width: 600,
      content: (
        <div className="flex flex-col gap-4 mt-4 max-h-[60vh] overflow-y-auto pr-2">
          {quizToPreview.questions && quizToPreview.questions.length > 0 ? (
            quizToPreview.questions.map((q, idx) => (
              <div key={q.id} className="p-4 bg-surface-container-low rounded-xl border border-outline-variant/10">
                <p className="font-bold text-sm">Câu {idx + 1}: {q.questionText}</p>
                <div className="mt-2 flex flex-col gap-1">
                  {q.options?.map((opt, oIdx) => (
                    <div key={oIdx} className={`text-xs p-2 rounded ${opt === q.correctAnswer ? 'bg-green-500/10 text-green-700 font-bold' : 'bg-white/50'}`}>
                      {opt} {opt === q.correctAnswer && ' (Đáp án đúng)'}
                    </div>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-10 italic text-outline">Chưa có câu hỏi nào.</div>
          )}
        </div>
      ),
      okText: 'Đóng',
    });
  };

  const lessonQuizzes = lessonId ? quizzes.filter((quiz) => quiz.lessonId === lessonId) : quizzes;

  const filteredQuizzes = lessonQuizzes.filter((quiz) => {
    const difficultyMap: Record<string, string> = {
      'Dễ': 'Easy',
      'Trung bình': 'Medium',
      'Khó': 'Hard',
    };
    const quizDifficulty = difficultyMap[quiz.difficulty] || quiz.difficulty;
    const matchDifficulty = selectedDifficulty === 'All' || quizDifficulty === selectedDifficulty;
    const search = searchText.trim().toLowerCase();
    const matchSearch =
      search.length === 0 ||
      quiz.title.toLowerCase().includes(search) ||
      quiz.type.toLowerCase().includes(search);

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
            className="flex h-16 w-16 items-center justify-center rounded-full bg-secondary text-on-secondary shadow-lg transition-transform hover:scale-105"
          >
            <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>
              add
            </span>
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

      <QuizQuestionsModal
        isOpen={isQuestionsModalOpen}
        loading={questionsLoading}
        onClose={handleCloseQuestionsModal}
        onSave={handleSaveQuestions}
      />
    </div>
  );
};

export default QuizPage;
