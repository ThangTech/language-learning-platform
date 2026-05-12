import api from "./api";
import type { ApiResponse, UserDto } from "../interfaces/common";
import type { ChangePasswordRequest, LoginRequest, RegisterRequest, UpdateProfileRequest } from "../interfaces/auth";

export const login = async (request: LoginRequest) => {
  const response = await api.post<ApiResponse<string>>("/api/auth/login", request);

  if (response.data?.success) {
    localStorage.setItem("token", response.data.data);
  }

  return response.data;
};

export const register = async (request: RegisterRequest) => {
  const response = await api.post<ApiResponse<string>>("/api/auth/register", request);

  return response.data;
};

export const getProfile = async () => {
  const response = await api.get<ApiResponse<UserDto>>("/api/auth/profile");

  return response.data;
};

export const updateProfile = async (request: UpdateProfileRequest) => {
  const response = await api.put<ApiResponse<UserDto>>("/api/auth/profile", request);

  return response.data;
};

export const changePassword = async (request: ChangePasswordRequest) => {
  const response = await api.put<ApiResponse<boolean>>("/api/auth/change-password", request);

  return response.data;
};

export const logout = () => {
  localStorage.removeItem("token");
};

export const getToken = () => {
  return localStorage.getItem("token");
};
