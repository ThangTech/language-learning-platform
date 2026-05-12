import api from "./api";
import type { ApiResponse, PagedResult } from "../interfaces/common";
import type { FlashcardDto, WordDto } from "../interfaces/vocabulary";

export const getWords = async (page: number = 1, pageSize: number = 20, level?: string, search?: string) => {
  const response = await api.get<ApiResponse<PagedResult<WordDto>>>("/api/words", {
    params: { page, pageSize, level, search },
  });
  return response.data;
};

export const getWordById = async (id: string) => {
  const response = await api.get<ApiResponse<WordDto>>(`/api/words/${id}`);
  return response.data;
};

export const createWord = async (data: {
  term: string;
  pronunciation?: string;
  definition: string;
  exampleSentence?: string;
  topic: string;
  levels: string[];
}) => {
  const response = await api.post<ApiResponse<WordDto>>("/api/words", data);
  return response.data;
};

export const updateWord = async (id: string, data: Partial<{
  term: string;
  pronunciation: string;
  definition: string;
  exampleSentence: string;
  topic: string;
  levels: string[];
}>) => {
  const response = await api.put<ApiResponse<WordDto>>(`/api/words/${id}`, data);
  return response.data;
};

export const deleteWord = async (id: string) => {
  const response = await api.delete<ApiResponse<boolean>>(`/api/words/${id}`);
  return response.data;
};

export const getFavorites = async () => {
  const response = await api.get<ApiResponse<WordDto[]>>("/api/favorites");
  return response.data;
};

export const addFavorite = async (wordId: string) => {
  const response = await api.post<ApiResponse<boolean>>(`/api/favorites/${wordId}`);
  return response.data;
};

export const removeFavorite = async (wordId: string) => {
  const response = await api.delete<ApiResponse<boolean>>(`/api/favorites/${wordId}`);
  return response.data;
};

export const getFlashcards = async () => {
  const response = await api.get<ApiResponse<FlashcardDto[]>>("/api/flashcards");
  return response.data;
};

export const getReviewFlashcards = async () => {
  const response = await api.get<ApiResponse<FlashcardDto[]>>("/api/flashcards/review");
  return response.data;
};

export const addFlashcard = async (wordId: string) => {
  const response = await api.post<ApiResponse<FlashcardDto>>(`/api/flashcards/${wordId}`);
  return response.data;
};

export const markFlashcardLearned = async (wordId: string) => {
  const response = await api.put<ApiResponse<boolean>>(`/api/flashcards/${wordId}/learned`);
  return response.data;
};

export const markFlashcardReviewed = async (wordId: string) => {
  const response = await api.put<ApiResponse<FlashcardDto>>(`/api/flashcards/${wordId}/reviewed`);
  return response.data;
};

export const removeFlashcard = async (wordId: string) => {
  const response = await api.delete<ApiResponse<boolean>>(`/api/flashcards/${wordId}`);
  return response.data;
};
