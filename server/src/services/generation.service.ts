import {
  create as createGeneration,
  findById as findGenerationById,
  findByUserId,
  updateStatus,
} from "../repositories/generation.repository.js";
import { createMany as createManyQuestions } from "../repositories/question.repository.js";
import { extractTextFromPDF } from "../utils/pdf.util.js";
import { validateTextLength } from "../utils/validation.util.js";
import { consumeToken } from "./token.service.js";
import { openai } from "../config/openai.js";
import { IPDFFile } from "../types/generation.types.js";

const buildPrompt = (
  content: string,
  questionCount: number,
  difficulty: string
): string => {
  return `You are an expert educator creating exam questions. Generate exactly ${questionCount} multiple-choice questions based on the content below.

Difficulty Level: ${difficulty}

Requirements:
- Create exactly ${questionCount} questions
- Each question must have 4 options (A, B, C, D)
- Only one correct answer per question
- Provide a clear explanation for the correct answer
- Questions should test understanding, not just memorization
- Difficulty should match: ${difficulty}

Content:
${content}

Response format (JSON only):
{
  "questions": [
    {
      "questionText": "Question here?",
      "options": {
        "A": "Option A",
        "B": "Option B",
        "C": "Option C",
        "D": "Option D"
      },
      "correctAnswer": "A",
      "explanation": "Explanation here"
    }
  ]
}`;
};

const parseAIResponse = (response: string): any[] => {
  try {
    const cleaned = response
      .replace(/```json\n?/g, "")
      .replace(/```\n?/g, "")
      .trim();
    const parsed = JSON.parse(cleaned);
    return parsed.questions || [];
  } catch (error) {
    throw new Error("Failed to parse AI response");
  }
};

export const createGenerationService = async (
  userId: string,
  file: IPDFFile | undefined,
  textInput: string | undefined,
  questionCount: number,
  difficulty: string
) => {
  let content: string;
  let sourceType: "PDF" | "TEXT";
  let sourceName: string;

  if (file && textInput) {
    throw new Error("Provide either file or text input, not both");
  }

  if (!file && !textInput) {
    throw new Error("Provide either file or text input");
  }

  if (file) {
    content = await extractTextFromPDF(file.buffer);
    sourceType = "PDF";
    sourceName = file.originalname;
  } else {
    content = textInput!;
    sourceType = "TEXT";
    const snippet = content.substring(0, 50);
    sourceName = `Pasted: ${snippet}${content.length > 50 ? "..." : ""}`;
  }

  const validation = validateTextLength(content, questionCount);
  if (!validation.valid) {
    throw new Error(validation.error);
  }

  await consumeToken(userId);

  const generation = await createGeneration({
    userId,
    sourceType,
    sourceName,
    questionCount,
    difficulty,
  });

  try {
    const prompt = buildPrompt(content, questionCount, difficulty);

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
    });

    const aiResponse = completion.choices[0]?.message?.content || "";
    const questions = parseAIResponse(aiResponse);

    if (questions.length !== questionCount) {
      throw new Error(
        `Expected ${questionCount} questions, got ${questions.length}`
      );
    }

    await createManyQuestions(generation.id, questions);

    await updateStatus(generation.id, "completed");

    const result = await findGenerationById(generation.id);

    return result;
  } catch (error) {
    await updateStatus(generation.id, "failed");
    throw error;
  }
};

export const getGeneration = async (generationId: string, userId: string) => {
  const generation = await findGenerationById(generationId);

  if (!generation) {
    throw new Error("Generation not found");
  }

  if (generation.userId !== userId) {
    throw new Error("Unauthorized");
  }

  return generation;
};

export const getUserGenerations = async (userId: string) => {
  return await findByUserId(userId);
};
