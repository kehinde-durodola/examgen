import { api, setAuthToken } from "./api";
import type {
  AuthResponse,
  LoginRequest,
  RegisterRequest,
  UpdateProfileRequest,
  User,
} from "@/types";

export const authService = {
  async login(data: LoginRequest): Promise<AuthResponse> {
    const response = await api.post<never, AuthResponse>("/auth/login", data);
    setAuthToken(response.token);
    return response;
  },

  async register(data: RegisterRequest): Promise<AuthResponse> {
    const response = await api.post<never, AuthResponse>(
      "/auth/register",
      data
    );
    setAuthToken(response.token);
    return response;
  },

  async getCurrentUser(): Promise<User> {
    return api.get<never, User>("/auth/me");
  },

  async updateProfile(data: UpdateProfileRequest): Promise<User> {
    return api.patch<never, User>("/users/me", data);
  },
};
