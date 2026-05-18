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
  difficulty: string;
  type: string;
  durationMinutes: number;
}
