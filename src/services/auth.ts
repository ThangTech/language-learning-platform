import api from "./api";
import type { ApiResponse, UserDto } from "../interfaces/common";
import type { AuthResponse } from "../interfaces/auth";

const USER_STORAGE_KEY = "user";

export const login = async (request: { email: string; password: string }) => {
  const response = await api.post<ApiResponse<AuthResponse>>("/api/auth/login", request);

  if (response.data.success) {
    const { token, user } = response.data.data;
    localStorage.setItem("token", token);
    if (user) {
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
    } else {
      // fallback: fetch profile separately if user not included
      try {
        const profile = await getProfile();
        if (profile.success) {
          localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(profile.data));
        }
      } catch {
        localStorage.removeItem(USER_STORAGE_KEY);
      }
    }
  }

  return response.data;
};

export const register = async (request: { email: string; password: string; fullName: string }) => {
  const response = await api.post<ApiResponse<string>>("/api/auth/register", request);
  return response.data;
};

export const getProfile = async () => {
  const response = await api.get<ApiResponse<UserDto>>("/api/auth/profile");
  return response.data;
};

export const updateProfile = async (request: { fullName: string; avatarUrl?: string }) => {
  const response = await api.put<ApiResponse<UserDto>>("/api/auth/profile", request);
  if (response.data.success && response.data.data) {
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(response.data.data));
  }
  return response.data;
};

export const changePassword = async (request: { currentPassword: string; newPassword: string }) => {
  const response = await api.put<ApiResponse<boolean>>("/api/auth/change-password", request);
  return response.data;
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem(USER_STORAGE_KEY);
};

export const getToken = () => {
  return localStorage.getItem("token");
};

export const getUser = (): UserDto | null => {
  const data = localStorage.getItem(USER_STORAGE_KEY);
  if (!data) return null;
  try {
    return JSON.parse(data);
  } catch {
    return null;
  }
};
