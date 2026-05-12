import { Link } from 'react-router-dom';

export interface LessonData {
  id: string;
  title: string;
  description: string;
  level: string;
  levelColor: string;
  duration: string;
  totalQuestions: number;
  topic: string;
  topicIcon: string;
  isCompleted?: boolean;
  score?: number;
}

interface LessonCardProps {
  lesson: LessonData;
}

const LessonCard = ({ lesson }: LessonCardProps) => {
  return (
    <Link
      to={`/listening/${lesson.id}`}
      className="no-underline block group"
    >
      <div className="bg-surface-container-low rounded-[1.5rem] p-6 flex flex-col gap-4 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border border-outline-variant/10 relative overflow-hidden">

        {/* Completed badge */}
        {lesson.isCompleted && (
          <div className="absolute top-4 right-4 bg-secondary text-on-secondary text-[10px] font-headline font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
            <span className="material-symbols-outlined text-[0.9rem]" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
            Hoàn thành
          </div>
        )}

        {/* Topic icon banner */}
        <div className="w-full h-36 bg-gradient-to-br from-primary/10 to-primary-fixed/40 rounded-xl flex items-center justify-center relative overflow-hidden">
          <span className="material-symbols-outlined text-[5rem] text-primary/20 absolute -bottom-2 -right-2 select-none">
            {lesson.topicIcon}
          </span>
          <span className="material-symbols-outlined text-[3.5rem] text-primary relative z-10" style={{ fontVariationSettings: "'FILL' 1" }}>
            {lesson.topicIcon}
          </span>
        </div>

        {/* Meta */}
        <div className="flex items-center gap-2">
          <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-headline font-bold ${lesson.levelColor}`}>
            {lesson.level}
          </span>
          <span className="text-on-surface-variant text-xs">•</span>
          <span className="text-on-surface-variant text-xs flex items-center gap-1">
            <span className="material-symbols-outlined text-[0.9rem]">schedule</span>
            {lesson.duration}
          </span>
          <span className="text-on-surface-variant text-xs">•</span>
          <span className="text-on-surface-variant text-xs flex items-center gap-1">
            <span className="material-symbols-outlined text-[0.9rem]">quiz</span>
            {lesson.totalQuestions} câu
          </span>
        </div>

        <div>
          <h3 className="font-headline font-bold text-lg text-on-surface group-hover:text-primary transition-colors leading-snug">
            {lesson.title}
          </h3>
          <p className="text-on-surface-variant text-sm mt-1 line-clamp-2 leading-relaxed">
            {lesson.description}
          </p>
        </div>

        {/* Score if completed */}
        {lesson.isCompleted && lesson.score !== undefined && (
          <div className="flex items-center gap-2 pt-1 border-t border-outline-variant/20">
            <span className="text-xs text-on-surface-variant">Điểm của bạn:</span>
            <span className="font-headline font-bold text-secondary text-sm">{lesson.score}%</span>
          </div>
        )}

        {/* CTA */}
        <button className="mt-auto w-full py-2.5 rounded-full bg-primary text-on-primary font-headline font-bold text-sm hover:opacity-90 active:scale-95 transition-all">
          {lesson.isCompleted ? 'Học lại' : 'Bắt đầu học'}
        </button>
      </div>
    </Link>
  );
};

export default LessonCard;
