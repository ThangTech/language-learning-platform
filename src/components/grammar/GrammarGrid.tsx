import GrammarCard from './GrammarCard';
import type { GrammarTopicDto } from '../../interfaces/grammar';

interface GrammarGridProps {
  topics: GrammarTopicDto[];
  isAdmin: boolean;
  onEditTopic?: (topic: GrammarTopicDto) => void;
  onDeleteTopic?: (id: string) => void;
  onCompleteTopic?: (id: string) => void;
}

const GrammarGrid = ({
  topics,
  isAdmin,
  onEditTopic,
  onDeleteTopic,
  onCompleteTopic,
}: GrammarGridProps) => {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {topics.map((topic) => (
        <GrammarCard
          key={topic.id}
          topic={topic}
          isAdmin={isAdmin}
          isCompleted={topic.isCompleted}
          onEdit={onEditTopic}
          onDelete={onDeleteTopic}
          onComplete={onCompleteTopic}
        />
      ))}
    </section>
  );
};

export default GrammarGrid;
