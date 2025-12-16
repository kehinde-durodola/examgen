import {
  create,
  findById,
  updateStatus,
  findProcessingByUserId,
} from "../repositories/generation.repository.js";
import { createMany } from "../repositories/question.repository.js";
import {
  findById as findUserById,
  decrementTokens,
  incrementTokens,
} from "../repositories/user.repository.js";
import { generateQuestions } from "./openai.service.js";
import { extractTextFromPDF } from "../utils/pdf.util.js";
import { validateTextLength } from "../utils/validation.util.js";
import { IPDFFile } from "../types/generation.types.js";

export const createGenerationService = async (
  userId: string,
  file: IPDFFile | undefined,
  textInput: string | undefined,
  questionCount: number,
  difficulty: string
) => {
  if (!file && !textInput) {
    throw new Error("Provide either file or text input");
  }

  if (file && textInput) {
    throw new Error("Provide either file or text input, not both");
  }

  let finalText = "";
  let sourceType = "";
  let sourceName = "";

  if (file) {
    finalText = await extractTextFromPDF(file.buffer);
    sourceType = "PDF";
    sourceName = file.originalname;
  } else {
    finalText = textInput!;
    sourceType = "TEXT";
    sourceName = `Pasted: ${textInput!.substring(0, 50)}...`;
  }

  validateTextLength(finalText, questionCount);
  console.log("✅ Validation passed:", {
    textLength: finalText.length,
    questionCount,
    minRequired: questionCount * 50,
  });

  const user = await findUserById(userId);

  if (!user) {
    throw new Error("User not found");
  }

  if (user.tokensRemaining < 1) {
    throw new Error(
      "No tokens remaining. Tokens refresh daily at midnight UTC."
    );
  }

  const existingProcessing = await findProcessingByUserId(userId);

  if (existingProcessing) {
    throw new Error(
      "You already have a generation in progress. Please wait for it to complete or check your dashboard."
    );
  }

  await decrementTokens(userId);

  const generation = await create({
    userId,
    sourceType,
    sourceName,
    questionCount,
    difficulty,
  });

  try {
    const questions = await generateQuestions(
      finalText,
      questionCount,
      difficulty
    );

    await createMany(
      generation.id,
      questions.map((q) => ({
        questionText: q.questionText,
        options: q.options,
        correctAnswer: q.correctAnswer,
        explanation: q.explanation,
      }))
    );

    await updateStatus(generation.id, "completed");

    const updatedGeneration = await findById(generation.id);

    return updatedGeneration;
  } catch (error) {
    await incrementTokens(userId);

    await updateStatus(generation.id, "failed");

    const originalError =
      error instanceof Error ? error.message : "Unknown error";

    const userFriendlyError = new Error("Generation failed, please try again");
    (userFriendlyError as any).code = "GENERATION_FAILED";
    (userFriendlyError as any).details = originalError;

    throw userFriendlyError;
  }
};

export const getGeneration = async (id: string, userId: string) => {
  const generation = await findById(id);

  if (!generation) {
    throw new Error("Generation not found");
  }

  if (generation.userId !== userId) {
    throw new Error("Unauthorized");
  }

  return generation;
};

export const getUserGenerations = async (userId: string) => {
  const { findByUserId } = await import(
    "../repositories/generation.repository.js"
  );
  return await findByUserId(userId);
};
