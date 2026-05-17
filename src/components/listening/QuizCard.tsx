import { Link } from 'react-router-dom';

export interface QuizData {
  id: string;
  title: string;
  description: string;
  totalQuestions: number;
  difficulty: 'Dễ' | 'Trung bình' | 'Khó';
  difficultyColor: string;
  type: 'Trắc nghiệm' | 'Điền vào chỗ trống' | 'Chép chính tả';
  typeIcon: string;
  duration: string;
  isNew?: boolean;
}

interface QuizCardProps {
  quiz: QuizData;
}

const QuizCard = ({ quiz }: QuizCardProps) => {
  const typeColors = {
    'Trắc nghiệm': 'bg-primary/10 text-primary',
    'Điền vào chỗ trống': 'bg-secondary/10 text-secondary',
    'Chép chính tả': 'bg-tertiary/10 text-tertiary',
  };

  return (
    <div className="bg-surface-container-low rounded-[1.5rem] p-6 flex flex-col gap-4 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border border-outline-variant/10 relative overflow-hidden">

      {/* New badge */}
      {quiz.isNew && (
        <div className="absolute top-4 right-4 bg-primary text-on-primary text-[10px] font-headline font-bold px-2.5 py-1 rounded-full">
          MỚI
        </div>
      )}

      <div className="flex items-start gap-4">
        {/* Icon */}
        <div className={`w-14 h-14 rounded-2xl ${typeColors[quiz.type] || 'bg-primary/10 text-primary'} flex items-center justify-center shrink-0`}>
          <span className="material-symbols-outlined text-[1.8rem]" style={{ fontVariationSettings: "'FILL' 1" }}>
            {quiz.typeIcon}
          </span>
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="font-headline font-bold text-lg text-on-surface leading-snug">
            {quiz.title}
          </h3>
          <p className="text-on-surface-variant text-sm mt-1 line-clamp-2 leading-relaxed">
            {quiz.description}
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="flex items-center gap-3 flex-wrap">
        <span className={`px-2.5 py-1 rounded-full text-[11px] font-headline font-bold ${quiz.difficultyColor}`}>
          {quiz.difficulty}
        </span>
        <span className="text-on-surface-variant text-xs flex items-center gap-1">
          <span className="material-symbols-outlined text-[0.9rem]">help</span>
          {quiz.totalQuestions} câu hỏi
        </span>
        <span className="text-on-surface-variant text-xs flex items-center gap-1">
          <span className="material-symbols-outlined text-[0.9rem]">schedule</span>
          {quiz.duration}
        </span>
      </div>

      {/* Type tag */}
      <div className="flex items-center gap-2">
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${typeColors[quiz.type]}`}>
          {quiz.type}
        </span>
      </div>

      {/* Actions */}
      <div className="flex gap-3 mt-auto pt-2">
        <Link
          to={quiz.type === 'Chép chính tả' ? `/listening/dictation/${quiz.id}` : `/listening/quiz/${quiz.id}`}
          className="no-underline flex-1"
        >
          <button className="w-full bg-primary text-on-primary py-2.5 rounded-full font-headline font-bold text-sm hover:opacity-90 active:scale-95 transition-all">
            Làm bài
          </button>
        </Link>
        <button className="px-4 py-2.5 rounded-full border border-outline-variant text-on-surface-variant text-sm hover:bg-surface-container transition-colors">
          Xem trước
        </button>
      </div>
    </div>
  );
};

export default QuizCard;
