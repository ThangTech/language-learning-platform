export interface WordLevelDto {
  label: string;
  bgColor: string;
  textColor: string;
}

export interface WordDto {
  id: string;
  term: string;
  pronunciation: string;
  definition: string;
  exampleSentence?: string;
  topic: string;
  level: string;
  word: string;
  example: string;
  category: string;
  levels: WordLevelDto[];
  levelLabel: string;
  levelColor: string;
}

export interface FlashcardDto {
  id: string;
  wordId: string;
  word: WordDto;
  isLearned: boolean;
  reviewCount: number;
  nextReviewAt?: string;
  learnedAt?: string;
}
