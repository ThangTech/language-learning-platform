export interface ListeningLessonDto {
  id: string;
  title: string;
  description: string;
  audioUrl: string;
  level: string;
  levelColor: string;
  topic: string;
  topicIcon: string;
  duration: number;
  totalDuration: number;
  durationText: string;
  transcriptJson?: string;
  audioTitle: string;
  totalExercises: number;
}

export interface ListeningResultDto {
  id: string;
  lessonId: string;
  score: number;
  completedAt: string;
}

export type QuestionType =
  | 'MULTIPLE_CHOICE'
  | 'FILL_IN_BLANK'
  | 'DICTATION'
  | 'MAIN_IDEA'
  | 'INFERENCE';

export interface DictationSentenceDto {
  id: string;
  sentence: string;
  audioTitle: string;
  audioUrl?: string;
  hint: string;
  duration: number;
  orderIndex: number;
}

export interface DictationSetDto {
  id: string;
  title: string;
  description: string;
  level: string;
  topic: string;
  sentences: DictationSentenceDto[];
}
