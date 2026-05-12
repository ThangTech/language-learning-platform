import { Button, Popconfirm, Tag } from 'antd';
import type { GrammarTopicDto } from '../../interfaces/grammar';

interface GrammarCardProps {
  topic: GrammarTopicDto;
  isAdmin: boolean;
  isCompleted?: boolean;
  onEdit?: (topic: GrammarTopicDto) => void;
  onDelete?: (id: string) => void;
  onComplete?: (id: string) => void;
}

const getLevelColor = (level: string) => {
  if (level === 'Beginner') return 'green';
  if (level === 'Intermediate') return 'blue';
  if (level === 'Advanced') return 'red';
  return 'default';
};

const getLevelText = (level: string) => {
  if (level === 'Beginner') return 'Cơ bản';
  if (level === 'Intermediate') return 'Trung cấp';
  if (level === 'Advanced') return 'Nâng cao';
  return level;
};

const GrammarCard = ({
  topic,
  isAdmin,
  isCompleted = false,
  onEdit,
  onDelete,
  onComplete,
}: GrammarCardProps) => {
  return (
    <div className="bg-surface-container-lowest rounded-[1.5rem] p-6 border border-outline-variant/10 shadow-sm hover:shadow-lg transition-all">
      <div className="flex items-start justify-between gap-4 mb-4">
        <div>
          <Tag color={getLevelColor(topic.level)} className="font-headline text-xs mb-3">
            {getLevelText(topic.level)}
          </Tag>
          <h3 className="font-headline text-xl font-bold text-on-surface mb-2">
            {topic.title}
          </h3>
        </div>

        {!isAdmin && isCompleted && (
          <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>
            check_circle
          </span>
        )}
      </div>

      <p className="font-body text-sm text-on-surface-variant leading-relaxed mb-4 line-clamp-3">
        {topic.content}
      </p>

      {topic.explanation && (
        <div className="bg-surface-container-low p-4 rounded-xl mb-4">
          <p className="font-headline text-xs font-bold text-primary uppercase mb-1">
            Giải thích
          </p>
          <p className="font-body text-sm text-on-surface-variant line-clamp-3">
            {topic.explanation}
          </p>
        </div>
      )}

      {topic.examples && (
        <div className="bg-surface-container-low p-4 rounded-xl mb-5">
          <p className="font-headline text-xs font-bold text-tertiary uppercase mb-1">
            Ví dụ
          </p>
          <p className="font-body text-sm italic text-on-surface-variant line-clamp-3">
            {topic.examples}
          </p>
        </div>
      )}

      <div className="flex items-center justify-end gap-2 pt-2">
        {isAdmin ? (
          <>
            <Button size="small" onClick={() => onEdit?.(topic)}>
              Sửa
            </Button>
            <Popconfirm
              title="Xóa chủ đề ngữ pháp?"
              description="Hành động này không thể hoàn tác."
              onConfirm={() => onDelete?.(topic.id)}
              okText="Xóa"
              cancelText="Hủy"
            >
              <Button size="small" danger>
                Xóa
              </Button>
            </Popconfirm>
          </>
        ) : (
          <Button
            type={isCompleted ? 'default' : 'primary'}
            disabled={isCompleted}
            onClick={() => onComplete?.(topic.id)}
          >
            {isCompleted ? 'Đã hoàn thành' : 'Đánh dấu hoàn thành'}
          </Button>
        )}
      </div>
    </div>
  );
};

export default GrammarCard;
