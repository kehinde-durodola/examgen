export interface User {
  id: string;
  email: string;
  name: string;
  tokensRemaining: number;
  tokensLastRefreshed: string;
  createdAt: string;
  updatedAt: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  name?: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface UpdateProfileRequest {
  name?: string;
  email?: string;
}
