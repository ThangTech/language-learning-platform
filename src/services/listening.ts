import api from "./api";
import type { ApiResponse, PagedResult } from "../interfaces/common";
import type { ListeningLessonDto, DictationSetDto } from "../interfaces/listening";

export const getLessons = async (page: number = 1, pageSize: number = 20, level?: string, search?: string) => {
  const response = await api.get<ApiResponse<PagedResult<ListeningLessonDto>>>("/api/listening", {
    params: { page, pageSize, level, search },
  });
  return response.data;
};

export const getLessonById = async (id: string) => {
  const response = await api.get<ApiResponse<ListeningLessonDto>>(`/api/listening/${id}`);
  return response.data;
};

export const createLesson = async (data: {
  title: string;
  description: string;
  audioUrl: string;
  level: string;
  topic: string;
  duration: number;
  transcriptJson?: string;
}) => {
  const response = await api.post<ApiResponse<ListeningLessonDto>>("/api/listening", data);
  return response.data;
};

export const updateLesson = async (id: string, data: Partial<{
  title: string;
  description: string;
  audioUrl: string;
  level: string;
  topic: string;
  duration: number;
  transcriptJson?: string;
}>) => {
  const response = await api.put<ApiResponse<ListeningLessonDto>>(`/api/listening/${id}`, data);
  return response.data;
};

export const deleteLesson = async (id: string) => {
  const response = await api.delete<ApiResponse<boolean>>(`/api/listening/${id}`);
  return response.data;
};

export const submitListeningResult = async (lessonId: string, score: number) => {
  const response = await api.post<ApiResponse<any>>("/api/listening/results", { lessonId, score });
  return response.data;
};

export const getUserListeningResults = async () => {
  const response = await api.get<ApiResponse<any[]>>("/api/listening/results/my");
  return response.data;
};

export const getDictationSets = async () => {
  const response = await api.get<ApiResponse<DictationSetDto[]>>("/api/dictation");
  return response.data;
};

export const getDictationSetById = async (id: string) => {
  const response = await api.get<ApiResponse<DictationSetDto>>(`/api/dictation/${id}`);
  return response.data;
};
