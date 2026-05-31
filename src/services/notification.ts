import api from "./api";
import type { ApiResponse } from "../interfaces/common";

export interface NotificationDto {
  id: string;
  title: string;
  message: string;
  isRead: boolean;
  type: string;
  createdAt: string;
  timeAgo: string;
}

export const getNotifications = async () => {
  const response = await api.get<ApiResponse<NotificationDto[]>>("/api/notifications");
  return response.data;
};

export const markNotificationRead = async (id: string) => {
  const response = await api.put<ApiResponse<boolean>>(`/api/notifications/${id}/read`);
  return response.data;
};

export const markAllNotificationsRead = async () => {
  const response = await api.put<ApiResponse<boolean>>("/api/notifications/read-all");
  return response.data;
};

export const deleteNotification = async (id: string) => {
  const response = await api.delete<ApiResponse<boolean>>(`/api/notifications/${id}`);
  return response.data;
};
