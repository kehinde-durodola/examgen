import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { generationService } from "@/services";
import type { CreateGenerationRequest } from "@/types";

export const useGenerations = () => {
  return useQuery({
    queryKey: ["generations"],
    queryFn: () => generationService.getAll(),
  });
};

export const useCreateGeneration = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateGenerationRequest) =>
      generationService.create(data),
    onMutate: () => {
      queryClient.invalidateQueries({ queryKey: ["generations"] });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["generations"] });
    },
    onError: () => {
      queryClient.invalidateQueries({ queryKey: ["generations"] });
    },
  });
};
