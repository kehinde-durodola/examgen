export interface ApiResponse<T> {
  success: true;
  message?: string;
  data: T;
}

export interface ApiError {
  success: false;
  error: {
    message: string;
    code?: string;
    details?: Record<string, string[]>;
  };
}
