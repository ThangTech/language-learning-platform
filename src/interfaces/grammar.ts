export interface GrammarTopicDto {
  id: string;
  title: string;
  content: string;
  explanation?: string;
  examples?: string;
  level: string;
  levelLabel: string;
  levelColor: string;
  createdAt: string;
  isCompleted?: boolean;
}

export interface UserGrammarDto {
  id: string;
  topicId: string;
  topic: GrammarTopicDto;
  isCompleted: boolean;
  completedAt?: string;
}
