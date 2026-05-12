import ListeningCard from './ListeningCard';
import type { ListeningLessonDto } from '../../interfaces/listening';

interface ListeningGridProps {
  lessons: ListeningLessonDto[];
  isAdmin: boolean;
  onEditLesson?: (lesson: ListeningLessonDto) => void;
  onDeleteLesson?: (id: string) => void;
  onPlayLesson?: (id: string) => void;
}

const ListeningGrid = ({
  lessons,
  isAdmin,
  onEditLesson,
  onDeleteLesson,
  onPlayLesson,
}: ListeningGridProps) => {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {lessons.map((lesson) => (
        <ListeningCard
          key={lesson.id}
          lesson={lesson}
          isAdmin={isAdmin}
          onEdit={onEditLesson}
          onDelete={onDeleteLesson}
          onPlay={onPlayLesson}
        />
      ))}
    </section>
  );
};

export default ListeningGrid;
