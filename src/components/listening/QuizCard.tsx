const QuizCard = () => {
  return (
    <div className="bg-surface-container-low rounded-2xl p-6">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
          <span className="material-symbols-outlined text-primary">quiz</span>
        </div>
        <div className="flex-1">
          <h3 className="font-headline font-bold text-lg">Quiz title</h3>
          <p className="text-on-surface-variant text-sm">n câu hỏi</p>
        </div>
      </div>
      <div className="flex gap-3 mt-4">
        <button className="flex-1 bg-primary text-on-primary py-2.5 rounded-full font-headline font-bold text-sm">
          Làm bài
        </button>
        <button className="px-4 py-2.5 rounded-full border border-outline-variant text-on-surface-variant text-sm">
          Xem trước
        </button>
      </div>
    </div>
  );
};

export default QuizCard;