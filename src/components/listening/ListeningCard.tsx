import { Button, Popconfirm, Tag } from 'antd';
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
    return 'red';
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

      <p className="font-body text-sm text-on-surface-variant mb-4 line-clamp-2">
        {lesson.description}
      </p>

      <div className="mb-4">
        <div className="flex items-center gap-3 text-xs text-on-surface-variant">
          <span className="flex items-center gap-1">
            <span className="material-symbols-outlined text-sm">schedule</span>
            {lesson.durationText}
          </span>
        </div>
      </div>

      {lesson.transcriptJson && (
        <div className="bg-surface-container-low p-3 rounded-xl mb-4 text-xs text-on-surface-variant line-clamp-2">
          <strong className="text-on-surface">Transcript:</strong> {lesson.transcriptJson.substring(0, 120)}...
        </div>
      )}

      <div className="mt-auto flex items-center justify-end gap-2 pt-2">
        {isAdmin ? (
          <>
            <Button size="small" onClick={() => onEdit?.(lesson)}>
              Sửa
            </Button>
            <Popconfirm
              title="Xóa bài nghe?"
              description="Hành động không thể hoàn tác."
              onConfirm={() => onDelete?.(lesson.id)}
              okText="Xóa"
              cancelText="Hủy"
            >
              <Button size="small" danger>
                Xóa
              </Button>
            </Popconfirm>
          </>
        ) : (
          <Button type="primary" size="small" onClick={() => onPlay?.(lesson.id)}>
            Nghe bài
          </Button>
        )}
      </div>
    </div>
  );
};

export default ListeningCard;
