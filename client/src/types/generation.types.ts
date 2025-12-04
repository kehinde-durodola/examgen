export type GenerationStatus = "processing" | "completed" | "failed";

export type Difficulty = "Easy" | "Medium" | "Hard";

export type QuestionCount = 5 | 10 | 15 | 20;

export type AnswerKey = "A" | "B" | "C" | "D";

export interface Generation {
  id: string;
  userId: string;
  sourceType: "PDF" | "TEXT";
  sourceName: string;
  questionCount: number;
  difficulty: Difficulty;
  status: GenerationStatus;
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
  correctAnswer: AnswerKey;
  explanation: string;
}

export interface GenerationWithQuestions extends Generation {
  questions: Question[];
}

export interface CreateGenerationRequest {
  file?: File;
  textInput?: string;
  questionCount: QuestionCount;
  difficulty: Difficulty;
}

export interface SubmitScoreRequest {
  score: number;
}

export interface UserAnswer {
  questionId: string;
  selectedAnswer: AnswerKey;
}

export interface TestResult {
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  answers: UserAnswer[];
}
