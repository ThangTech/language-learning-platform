import GrammarCard from './GrammarCard';
import type { GrammarTopicDto } from '../../interfaces/grammar';

interface GrammarGridProps {
  topics: GrammarTopicDto[];
  isAdmin: boolean;
  onEditTopic?: (topic: GrammarTopicDto) => void;
  onDeleteTopic?: (id: string) => void;
}

const GrammarGrid = ({
  topics,
  isAdmin,
  onEditTopic,
  onDeleteTopic,
}: GrammarGridProps) => {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {topics.map((topic) => (
        <GrammarCard
          key={topic.id}
          topic={topic}
          isAdmin={isAdmin}
          isCompleted={topic.isCompleted}
          onEdit={onEditTopic}
          onDelete={onDeleteTopic}
        />
      ))}
    </section>
  );
};

export default GrammarGrid;
