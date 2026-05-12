import api from "./api";
import type { ApiResponse, PagedResult } from "../interfaces/common";
import type { GrammarTopicDto, UserGrammarDto } from "../interfaces/grammar";

export const getGrammarTopics = async (page: number = 1, pageSize: number = 20, level?: string, search?: string) => {
  const response = await api.get<ApiResponse<PagedResult<GrammarTopicDto>>>("/api/grammar", {
    params: { page, pageSize, level, search },
  });
  return response.data;
};

export const getGrammarTopicById = async (id: string) => {
  const response = await api.get<ApiResponse<GrammarTopicDto>>(`/api/grammar/${id}`);
  return response.data;
};

export const getUserGrammarProgress = async (userId: string) => {
  const response = await api.get<ApiResponse<UserGrammarDto[]>>(`/api/grammar/user/${userId}/progress`);
  return response.data;
};

export const markTopicCompleted = async (userId: string, topicId: string) => {
  const response = await api.post<ApiResponse<boolean>>(`/api/grammar/user/${userId}/topics/${topicId}/complete`);
  return response.data;
};
