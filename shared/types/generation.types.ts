export interface CreateGenerationRequest {
  questionCount: number;
  difficulty: "Easy" | "Medium" | "Hard";
  textInput?: string;
}

export interface IPDFFile {
  originalname: string;
  mimetype: string;
  buffer: Buffer;
  size: number;
}

export interface GenerationResponse {
  id: string;
  userId: string;
  sourceType: "PDF" | "TEXT";
  sourceName: string;
  questionCount: number;
  difficulty: string;
  status: "processing" | "completed" | "failed";
  score: number | null;
  createdAt: string;
}

export interface Question {
  id: string;
  questionText: string;
  options: {
    A: string;
    B: string;
    C: string;
    D: string;
  };
  correctAnswer: "A" | "B" | "C" | "D";
  explanation: string;
}

export interface GenerationWithQuestions {
  generation: GenerationResponse;
  questions: Question[];
}
