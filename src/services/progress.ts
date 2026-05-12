import api from "./api";
import type { ApiResponse } from "../interfaces/common";
import type { UserProgressDto, StreakDto, LeaderboardEntryDto } from "../interfaces/progress";

export const getStats = async () => {
  const response = await api.get<ApiResponse<UserProgressDto>>("/api/stats");
  return response.data;
};

export const getStreak = async () => {
  const response = await api.get<ApiResponse<StreakDto>>("/api/streaks");
  return response.data;
};

export const updateStreak = async () => {
  const response = await api.post<ApiResponse<boolean>>("/api/streaks/update");
  return response.data;
};

export const getLeaderboard = async (top: number = 10) => {
  const response = await api.get<ApiResponse<LeaderboardEntryDto[]>>("/api/leaderboard", { params: { top } });
  return response.data;
};
