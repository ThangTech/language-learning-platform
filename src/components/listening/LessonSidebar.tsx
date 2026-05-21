import { Link } from 'react-router-dom';

interface LessonSidebarProps {
  lessonLevel: string;
  lessonDuration: string;
  lessonTopic: string;
  totalQuestions: number;
  dictationSetId?: string;
  hasDictationSet: boolean;
  onOpenQuiz: () => void;
}

const LessonSidebar = ({
  lessonLevel,
  lessonDuration,
  lessonTopic,
  totalQuestions,
  dictationSetId,
  hasDictationSet,
  onOpenQuiz,
}: LessonSidebarProps) => {
  return (
    <div className="col-span-12 lg:col-span-4 flex flex-col gap-6">
      <div className="bg-surface-container-low rounded-[1.5rem] p-6 border border-outline-variant/10 flex flex-col gap-4 sticky top-28">
        <h3 className="font-headline font-bold text-lg text-on-surface">Bắt đầu học</h3>

        <div className="flex flex-col gap-3">
          {hasDictationSet && dictationSetId ? (
            <Link to={`/listening/dictation/${dictationSetId}`} className="no-underline">
              <button className="w-full bg-primary text-on-primary py-3 rounded-full font-headline font-bold text-sm hover:opacity-90 active:scale-95 transition-all flex items-center justify-center gap-2">
                <span className="material-symbols-outlined text-[1.1rem]" style={{ fontVariationSettings: "'FILL' 1" }}>keyboard</span>
                Chép chính tả
              </button>
            </Link>
          ) : (
            <button className="w-full bg-primary text-on-primary py-3 rounded-full font-headline font-bold text-sm opacity-60 flex items-center justify-center gap-2" disabled>
              <span className="material-symbols-outlined text-[1.1rem]" style={{ fontVariationSettings: "'FILL' 1" }}>keyboard</span>
              Chép chính tả
            </button>
          )}
          <button
            onClick={onOpenQuiz}
            className="w-full border border-primary text-primary py-3 rounded-full font-headline font-bold text-sm hover:bg-primary/5 active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            <span className="material-symbols-outlined text-[1.1rem]" style={{ fontVariationSettings: "'FILL' 1" }}>fact_check</span>
            Làm bài trắc nghiệm
          </button>
          <button className="w-full border border-outline-variant text-on-surface-variant py-3 rounded-full font-headline font-bold text-sm hover:bg-surface-container transition-all flex items-center justify-center gap-2">
            <span className="material-symbols-outlined text-[1.1rem]">bookmark</span>
            Lưu bài học
          </button>
        </div>

        <div className="border-t border-outline-variant/20 pt-4">
          <h4 className="font-headline font-semibold text-sm text-on-surface-variant mb-3 uppercase tracking-wide">Thông tin bài học</h4>
          <div className="flex flex-col gap-2">
            {[
              { icon: 'signal_cellular_alt', label: 'Cấp độ', value: lessonLevel },
              { icon: 'schedule', label: 'Thời lượng', value: lessonDuration },
              { icon: 'quiz', label: 'Số câu hỏi', value: `${totalQuestions} câu` },
              { icon: 'category', label: 'Chủ đề', value: lessonTopic },
            ].map((info) => (
              <div key={info.label} className="flex items-center justify-between text-sm">
                <span className="text-on-surface-variant flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[1rem]">{info.icon}</span>
                  {info.label}
                </span>
                <span className="font-medium text-on-surface">{info.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <Link
          to="/listening"
          className="w-full flex items-center gap-3 p-4 bg-surface-container-low rounded-2xl border border-outline-variant/10 hover:bg-surface-container transition-colors text-left no-underline"
        >
          <span className="material-symbols-outlined text-primary">arrow_back</span>
          <div>
            <p className="text-xs text-on-surface-variant">Quay lại</p>
            <p className="font-headline font-bold text-sm text-on-surface">Danh sách bài học</p>
          </div>
        </Link>
        <Link
          to="/listening"
          className="w-full flex items-center justify-between gap-3 p-4 bg-surface-container-low rounded-2xl border border-outline-variant/10 hover:bg-surface-container transition-colors text-left no-underline"
        >
          <div>
            <p className="text-xs text-on-surface-variant">Bài tiếp theo</p>
            <p className="font-headline font-bold text-sm text-on-surface">Xem danh sách bài nghe</p>
          </div>
          <span className="material-symbols-outlined text-primary">arrow_forward</span>
        </Link>
      </div>
    </div>
  );
};

export default LessonSidebar;
