import { createContext, useCallback } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { authService } from "@/services";
import { getAuthToken, removeAuthToken } from "@/services/api";
import { useUser } from "@/hooks/useUser";
import type { User } from "@/types";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
  refreshUser: () => void;
  updateProfile: (data: { name?: string; email?: string }) => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

const clearResultsFromStorage = () => {
  const keysToRemove: string[] = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && key.startsWith("result-")) {
      keysToRemove.push(key);
    }
  }
  keysToRemove.forEach((key) => localStorage.removeItem(key));
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const queryClient = useQueryClient();
  const { data: user = null, isLoading: isUserLoading } = useUser();

  const hasToken = !!getAuthToken();
  const isLoading = hasToken && isUserLoading;
  const isAuthenticated = !!user;

  const login = useCallback(
    async (email: string, password: string) => {
      const response = await authService.login({ email, password });
      queryClient.setQueryData(["user"], response.user);
    },
    [queryClient]
  );

  const register = useCallback(
    async (email: string, password: string, name: string) => {
      const response = await authService.register({ email, password, name });
      queryClient.setQueryData(["user"], response.user);
    },
    [queryClient]
  );

  const logout = useCallback(() => {
    removeAuthToken();
    clearResultsFromStorage();
    queryClient.setQueryData(["user"], null);
    queryClient.clear();
  }, [queryClient]);

  const refreshUser = useCallback(() => {
    queryClient.invalidateQueries({ queryKey: ["user"] });
  }, [queryClient]);

  const updateProfile = useCallback(
    async (data: { name?: string; email?: string }) => {
      const updatedUser = await authService.updateProfile(data);
      queryClient.setQueryData(["user"], updatedUser);
    },
    [queryClient]
  );

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isLoading,
        login,
        register,
        logout,
        refreshUser,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
