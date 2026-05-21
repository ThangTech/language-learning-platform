import { Link } from 'react-router-dom';

interface QuizEmptyStateProps {
  lessonId: string | null;
  onResetDifficulty: () => void;
}

const QuizEmptyState = ({ lessonId, onResetDifficulty }: QuizEmptyStateProps) => {
  const title = 'Không có quiz phù hợp';
  const hint = lessonId
    ? 'Bài nghe này chưa có quiz phù hợp. Quay lại Listening để làm dictation hoặc chọn bài khác.'
    : 'Thử đổi bộ lọc độ khó hoặc quay lại Listening để chọn bài khác.';

  return (
    <div className="rounded-[1.5rem] border border-dashed border-outline-variant/20 bg-surface-container-low p-8 text-center">
      <p className="font-headline font-semibold text-on-surface">{title}</p>
      <p className="mt-2 text-sm text-on-surface-variant">{hint}</p>
      <div className="mt-5 flex items-center justify-center gap-3 flex-wrap">
        <Link to="/listening" className="no-underline">
          <button className="px-4 py-2 rounded-full bg-secondary text-on-secondary font-headline font-bold text-sm hover:opacity-90 transition-all">
            Về Listening
          </button>
        </Link>
        <button
          onClick={onResetDifficulty}
          className="px-4 py-2 rounded-full border border-secondary text-secondary font-headline font-bold text-sm hover:bg-secondary/5 transition-all"
        >
          Xóa bộ lọc
        </button>
      </div>
    </div>
  );
};

export default QuizEmptyState;
