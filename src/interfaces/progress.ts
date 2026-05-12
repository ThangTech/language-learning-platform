export interface UserProgressDto {
  id: string;
  userId: string;
  totalScore: number;
  currentStreak: number;
  longestStreak: number;
  wordsLearned: number;
  grammarCompleted: number;
  listeningCompleted: number;
  quizzesCompleted: number;
  lastActivityDate?: string;
  streakText: string;
  scoreText: string;
  totalCompleted: number;
  hasStudiedToday: boolean;
}

export interface StreakDto {
  currentStreak: number;
  longestStreak: number;
  streakText: string;
}

export interface LeaderboardEntryDto {
  rank: number;
  userId: string;
  fullName: string;
  avatarUrl?: string;
  totalScore: number;
  currentStreak: number;
}
