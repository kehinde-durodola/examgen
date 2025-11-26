export interface User {
  id: string;
  email: string;
  name: string | null;
  tokensRemaining: number;
  tokensLastRefreshed: string;
  createdAt: string;
  updatedAt: string;
}

export interface UpdateUserRequest {
  name?: string;
  email?: string;
}
