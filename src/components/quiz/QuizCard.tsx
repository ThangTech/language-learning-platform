import { Button, Popconfirm } from 'antd';
import type { QuizDto } from '../../interfaces/quiz';

interface QuizCardProps {
  quiz: QuizDto;
  isAdmin: boolean;
  onEdit?: (quiz: QuizDto) => void;
  onDelete?: (id: string) => void;
  onStart?: (id: string) => void;
  onPreview?: (id: string) => void;
}

const getDifficultyColor = (difficulty: string) => {
  if (difficulty === 'Easy' || difficulty === 'Dễ') return 'bg-secondary/10 text-secondary';
  if (difficulty === 'Hard' || difficulty === 'Khó') return 'bg-error/10 text-error';
  return 'bg-tertiary/10 text-tertiary';
};

const getDifficultyText = (difficulty: string) => {
  if (difficulty === 'Easy') return 'Dễ';
  if (difficulty === 'Hard') return 'Khó';
  if (difficulty === 'Medium') return 'Trung bình';
  return difficulty;
};

const QuizCard = ({
  quiz,
  isAdmin,
  onEdit,
  onDelete,
  onStart,
  onPreview,
}: QuizCardProps) => {
  const durationText = `${quiz.durationMinutes} phút`;
  const totalQuestions = quiz.totalQuestions;

  return (
    <div className="bg-surface-container-low rounded-[1.5rem] p-6 flex flex-col gap-4 hover:shadow-lg hover:-translate-y-1 transition-all border border-outline-variant/10 relative">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          <div className="w-13 h-13 w-14 h-14 rounded-2xl bg-secondary/10 flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-[1.8rem] text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>
              quiz
            </span>
          </div>
          <div>
            <h3 className="font-headline font-bold text-on-surface leading-snug">{quiz.title}</h3>
            <p className="text-on-surface-variant text-xs mt-1">Quiz</p>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 flex-wrap">
        <span className={`px-2.5 py-1 rounded-full text-[11px] font-headline font-bold ${getDifficultyColor(quiz.difficulty)}`}>
          {getDifficultyText(quiz.difficulty)}
        </span>
        <span className="text-on-surface-variant text-xs flex items-center gap-1">
          <span className="material-symbols-outlined text-[0.9rem]">help</span>
          {totalQuestions} câu
        </span>
        <span className="text-on-surface-variant text-xs flex items-center gap-1">
          <span className="material-symbols-outlined text-[0.9rem]">schedule</span>
          {durationText}
        </span>
      </div>

      <div className="flex gap-3 mt-auto">
        {isAdmin ? (
          <>
            <Button size="small" className="flex-1" onClick={() => onEdit?.(quiz)}>
              Sửa
            </Button>
            <Popconfirm
              title="Xóa quiz?"
              description="Hành động không thể hoàn tác."
              onConfirm={() => onDelete?.(quiz.id)}
              okText="Xóa"
              cancelText="Hủy"
            >
              <Button size="small" danger className="flex-1">
                Xóa
              </Button>
            </Popconfirm>
          </>
        ) : (
          <>
            <button
              onClick={() => onStart?.(quiz.id)}
              className="flex-1 bg-secondary text-on-secondary py-2.5 rounded-full font-headline font-bold text-sm hover:opacity-90 active:scale-95 transition-all"
            >
              Bắt đầu
            </button>
            <button
              onClick={() => onPreview?.(quiz.id)}
              className="px-4 py-2.5 rounded-full border border-outline-variant text-on-surface-variant text-sm hover:bg-surface-container transition-colors"
            >
              Xem trước
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default QuizCard;
