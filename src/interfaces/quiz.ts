export interface QuizQuestionDto {
  id: string;
  questionText: string;
  type: string;
  options: string[];
  correctAnswer: string;
  explanation?: string;
  audioUrl?: string;
}

export interface QuizDto {
  id: string;
  title: string;
  description?: string;
  lessonId?: string;
  grammarTopicId?: string;
  difficulty: string;
  difficultyColor: string;
  type: string;
  typeIcon: string;
  duration: string;
  durationMinutes: number;
  totalQuestions: number;
  questions: QuizQuestionDto[];
}

export interface CreateQuizRequest {
  title: string;
  lessonId?: string;
  grammarTopicId?: string;
  difficulty: string;
  type: string;
  durationMinutes: number;
  questions: CreateQuizQuestionRequest[];
}

export interface CreateQuizQuestionRequest {
  questionText: string;
  type: string;
  options: string[];
  correctAnswer: string;
  explanation?: string;
  audioUrl?: string;
}

export interface UpdateQuizRequest {
  title: string;
  lessonId?: string;
  grammarTopicId?: string;
  difficulty: string;
  type: string;
  durationMinutes: number;
}

export interface QuizAnswerResultDto {
  questionId: string;
  isCorrect: boolean;
  correctAnswer: string;
  explanation?: string;
}

export interface QuizResultDto {
  quizId: string;
  totalQuestions: number;
  correctAnswers: number;
  score: number;
  answers: QuizAnswerResultDto[];
}

export interface QuizHistoryDto {
  id: string;
  quizId: string;
  quizTitle: string;
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  completedAt: string;
}
