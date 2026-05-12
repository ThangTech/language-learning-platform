export interface GrammarTopicDto {
  id: string;
  title: string;
  description: string;
  level: string;
  topic: string;
  examples: string[];
  levelLabel: string;
  levelColor: string;
  isCompleted?: boolean;
  completedAt?: string;
}

export interface UserGrammarDto {
  topicId: string;
  topicTitle: string;
  isCompleted: boolean;
  completedAt?: string;
}
