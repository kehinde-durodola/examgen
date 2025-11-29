export interface ApiResponse<T = any> {
  success: true;
  data: T;
  message?: string;
}

export interface ApiError {
  success: false;
  error: {
    message: string;
    code?: string;
    details?: any;
  };
}
