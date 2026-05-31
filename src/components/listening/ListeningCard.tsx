import { Button, Popconfirm, Tag } from 'antd';
import { Link } from 'react-router-dom';
import type { ListeningLessonDto } from '../../interfaces/listening';

interface ListeningCardProps {
  lesson: ListeningLessonDto;
  isAdmin: boolean;
  onEdit?: (lesson: ListeningLessonDto) => void;
  onDelete?: (id: string) => void;
  onPlay?: (id: string) => void;
}

const ListeningCard = ({ lesson, isAdmin, onEdit, onDelete, onPlay }: ListeningCardProps) => {
  const getLevelColor = (level: string) => {
    if (['A1', 'A2'].includes(level)) return 'green';
    if (['B1', 'B2'].includes(level)) return 'blue';
    return 'purple';
  };

  return (
    <div className="bg-surface-container-lowest rounded-[1.5rem] p-6 border border-outline-variant/10 shadow-sm hover:shadow-lg transition-all flex flex-col h-full">
      <div className="flex justify-between items-start mb-4">
        <Tag color={getLevelColor(lesson.level)} className="font-headline text-xs">
          {lesson.level}
        </Tag>
        <span className="material-symbols-outlined text-outline">{lesson.topicIcon || 'headphones'}</span>
      </div>

      <h3 className="font-headline text-xl font-bold text-on-surface mb-2 line-clamp-2">
        {lesson.title}
      </h3>

      <p className="font-body text-sm text-on-surface-variant mb-4 line-clamp-3">
        {lesson.description}
      </p>

      <div className="mb-5 flex items-center gap-3 text-xs text-on-surface-variant">
        <span className="flex items-center gap-1">
          <span className="material-symbols-outlined text-sm">schedule</span>
          {lesson.durationText}
        </span>
        <span className="flex items-center gap-1">
          <span className="material-symbols-outlined text-sm">quiz</span>
          {lesson.totalExercises} bài tập
        </span>
      </div>

      <div className="mt-auto flex items-center justify-between gap-2 pt-2">
        <button
          onClick={() => onPlay?.(lesson.id)}
          className="no-underline text-primary text-sm font-headline font-bold"
        >
          Bắt đầu học
        </button>
        <Link to={`/listening/${lesson.id}`} className="no-underline text-primary text-sm font-headline font-bold">
          Chi tiết
        </Link>
        {isAdmin && (
          <div className="flex items-center gap-2">
            <Button size="small" onClick={() => onEdit?.(lesson)}>
              Sửa
            </Button>
            <Popconfirm
              title="Xóa bài nghe?"
              description="Hành động này không thể hoàn tác."
              onConfirm={() => onDelete?.(lesson.id)}
              okText="Xóa"
              cancelText="Hủy"
            >
              <Button size="small" danger>
                Xóa
              </Button>
            </Popconfirm>
          </div>
        )}
      </div>
    </div>
  );
};

export default ListeningCard;
