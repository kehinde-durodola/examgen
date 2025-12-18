import { useQuery } from "@tanstack/react-query";
import { authService } from "@/services";
import { getAuthToken } from "@/services/api";

export const useUser = () => {
  return useQuery({
    queryKey: ["user"],
    queryFn: () => authService.getCurrentUser(),
    enabled: !!getAuthToken(),
    refetchOnWindowFocus: false,
    retry: false,
  });
};
