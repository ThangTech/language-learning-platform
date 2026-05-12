export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  errors?: string[];
}

export interface PagedResult<T> {
  items: T[];
  totalCount: number;
  page: number;
  pageSize: number;
}

export interface UserDto {
  id: string;
  email: string;
  fullName: string;
  avatarUrl?: string;
  role: string;
  status: string;
  displayName: string;
  initials: string;
  roleLabel: string;
  statusLabel: string;
  statusColor: string;
}
