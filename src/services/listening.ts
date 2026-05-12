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

export const submitListeningResult = async (lessonId: string, score: number) => {
  const response = await api.post<ApiResponse<any>>("/api/listening/result", { lessonId, score });
  return response.data;
};

export const getUserListeningResults = async () => {
  const response = await api.get<ApiResponse<any[]>>("/api/listening/results");
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
