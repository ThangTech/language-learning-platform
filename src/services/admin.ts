import api from "./api";
import type { ApiResponse, PagedResult } from "../interfaces/common";
import type { UserDto } from "../interfaces/common";

export const getUsers = async (page: number = 1, pageSize: number = 20, search?: string) => {
  const response = await api.get<ApiResponse<PagedResult<UserDto>>>("/api/admin/users", {
    params: { page, pageSize, search },
  });
  return response.data;
};

export const getUserById = async (id: string) => {
  const response = await api.get<ApiResponse<UserDto>>(`/api/admin/users/${id}`);
  return response.data;
};

export const lockUser = async (id: string) => {
  const response = await api.put<ApiResponse<boolean>>(`/api/admin/users/${id}/lock`, {});
  return response.data;
};

export const unlockUser = async (id: string) => {
  const response = await api.put<ApiResponse<boolean>>(`/api/admin/users/${id}/unlock`, {});
  return response.data;
};

export const deleteUser = async (id: string) => {
  const response = await api.delete<ApiResponse<boolean>>(`/api/admin/users/${id}`);
  return response.data;
};

export const changeUserRole = async (id: string, role: string) => {
  const response = await api.put<ApiResponse<boolean>>(`/api/admin/users/${id}/role`, { role });
  return response.data;
};
