import api from "./api";
import type { ApiResponse } from "../interfaces/common";
import type { CreateQuizRequest, QuizDto, UpdateQuizRequest } from "../interfaces/quiz";

export const getQuizzes = async () => {
  const response = await api.get<ApiResponse<QuizDto[]>>("/api/quizzes");
  return response.data;
};

export const getQuizById = async (id: string) => {
  const response = await api.get<ApiResponse<QuizDto>>(`/api/quizzes/${id}`);
  return response.data;
};

export const getQuizzesByLesson = async (lessonId: string) => {
  const response = await api.get<ApiResponse<QuizDto[]>>(`/api/quizzes/by-lesson/${lessonId}`);
  return response.data;
};

export const createQuiz = async (data: CreateQuizRequest) => {
  const response = await api.post<ApiResponse<QuizDto>>("/api/quizzes", data);
  return response.data;
};

export const updateQuiz = async (id: string, data: UpdateQuizRequest) => {
  const response = await api.put<ApiResponse<QuizDto>>(`/api/quizzes/${id}`, data);
  return response.data;
};

export const deleteQuiz = async (id: string) => {
  const response = await api.delete<ApiResponse<boolean>>(`/api/quizzes/${id}`);
  return response.data;
};

export const submitQuiz = async (quizId: string, answers: { questionId: string; answer: string }[]) => {
  const response = await api.post<ApiResponse<boolean>>("/api/quizzes/submit", {
    quizId,
    answers,
  });
  return response.data;
};
