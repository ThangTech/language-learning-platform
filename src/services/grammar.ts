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

export const createGrammarTopic = async (data: {
  title: string;
  content: string;
  explanation?: string;
  examples?: string;
  level: string;
}) => {
  const response = await api.post<ApiResponse<GrammarTopicDto>>("/api/grammar", data);
  return response.data;
};

export const updateGrammarTopic = async (id: string, data: Partial<{
  title: string;
  content: string;
  explanation?: string;
  examples?: string;
  level: string;
}>) => {
  const response = await api.put<ApiResponse<GrammarTopicDto>>(`/api/grammar/${id}`, data);
  return response.data;
};

export const deleteGrammarTopic = async (id: string) => {
  const response = await api.delete<ApiResponse<boolean>>(`/api/grammar/${id}`);
  return response.data;
};

export const getUserGrammarProgress = async () => {
  const response = await api.get<ApiResponse<UserGrammarDto[]>>("/api/user-grammar");
  return response.data;
};

export const markTopicCompleted = async (topicId: string) => {
  const response = await api.post<ApiResponse<boolean>>(`/api/user-grammar/${topicId}/complete`, {});
  return response.data;
};
