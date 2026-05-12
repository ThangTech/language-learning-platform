import QuizCard from './QuizCard';
import type { QuizDto } from '../../interfaces/quiz';

interface QuizGridProps {
  quizzes: QuizDto[];
  isAdmin: boolean;
  onEditQuiz?: (quiz: QuizDto) => void;
  onDeleteQuiz?: (id: string) => void;
  onStartQuiz?: (id: string) => void;
  onPreviewQuiz?: (id: string) => void;
}

const QuizGrid = ({
  quizzes,
  isAdmin,
  onEditQuiz,
  onDeleteQuiz,
  onStartQuiz,
  onPreviewQuiz,
}: QuizGridProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {quizzes.map((quiz) => (
        <QuizCard
          key={quiz.id}
          quiz={quiz}
          isAdmin={isAdmin}
          onEdit={onEditQuiz}
          onDelete={onDeleteQuiz}
          onStart={onStartQuiz}
          onPreview={onPreviewQuiz}
        />
      ))}
    </div>
  );
};

export default QuizGrid;
