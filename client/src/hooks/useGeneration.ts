import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { generationService } from "@/services";
import type { SubmitScoreRequest } from "@/types";

export const useGeneration = (id: string | undefined) => {
  return useQuery({
    queryKey: ["generations", id],
    queryFn: () => generationService.getById(id!),
    enabled: !!id,
  });
};

export const useSubmitScore = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: SubmitScoreRequest }) =>
      generationService.submitScore(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["generations"] });
      queryClient.invalidateQueries({
        queryKey: ["generations", variables.id],
      });
    },
  });
};
