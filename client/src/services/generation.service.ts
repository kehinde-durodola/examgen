import { api } from "./api";
import type {
  Generation,
  GenerationWithQuestions,
  CreateGenerationRequest,
  SubmitScoreRequest,
} from "@/types";

export const generationService = {
  async create(data: CreateGenerationRequest): Promise<Generation> {
    const formData = new FormData();

    if (data.file) {
      formData.append("file", data.file);
    }

    if (data.textInput) {
      formData.append("textInput", data.textInput);
    }

    formData.append("questionCount", data.questionCount.toString());
    formData.append("difficulty", data.difficulty);

    return api.post<never, Generation>("/generations", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },

  async getAll(): Promise<Generation[]> {
    return api.get<never, Generation[]>("/generations");
  },

  async getById(id: string): Promise<GenerationWithQuestions> {
    return api.get<never, GenerationWithQuestions>(`/generations/${id}`);
  },

  async submitScore(id: string, data: SubmitScoreRequest): Promise<Generation> {
    return api.post<never, Generation>(`/generations/${id}/score`, data);
  },
};
