import { openai } from "../config/openai.js";

interface GeneratedQuestion {
  index: number;
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

export const generateQuestions = async (
  textInput: string,
  questionCount: number,
  difficulty: string
): Promise<GeneratedQuestion[]> => {
  const systemPrompt = `You are an expert exam question generator.

CRITICAL REQUIREMENT: You MUST generate EXACTLY ${questionCount} questions numbered from 1 to ${questionCount}.

Rules:
1. Generate EXACTLY ${questionCount} multiple-choice questions
2. Each question MUST have an "index" field starting from 1 and ending at ${questionCount}
3. Each question must have exactly 4 options (A, B, C, D)
4. Each question must have exactly one correct answer
5. Each question must have a detailed explanation
6. Base all questions on the provided text
7. Difficulty level: ${difficulty}
8. Make questions diverse - cover different aspects of the text
9. Count carefully - you need questions indexed 1, 2, 3, ..., ${questionCount}

Output format (STRICT JSON):
{
  "questions": [
    {
      "index": 1,
      "questionText": "string",
      "options": {
        "A": "string",
        "B": "string",
        "C": "string",
        "D": "string"
      },
      "correctAnswer": "A" | "B" | "C" | "D",
      "explanation": "string"
    },
    {
      "index": 2,
      ...
    },
    ...
    {
      "index": ${questionCount},
      ...
    }
  ]
}

REMINDER: The last question MUST have index: ${questionCount}. Do not stop at ${
    questionCount - 1
  } or ${questionCount - 2}.`;

  const userPrompt = `Based on the following text, generate EXACTLY ${questionCount} numbered multiple-choice questions (index 1 through ${questionCount}):

${textInput}

Remember: The last question must have index: ${questionCount}`;

  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: userPrompt },
    ],
    response_format: { type: "json_object" },
    temperature: 0.15,
    max_tokens: 8000,
  });

  const content = response.choices[0].message.content;

  if (!content) {
    throw new Error("OpenAI returned empty response");
  }

  let parsed;
  try {
    parsed = JSON.parse(content);
  } catch (error) {
    throw new Error("Failed to parse OpenAI response as JSON");
  }

  const questions = parsed.questions;

  if (!Array.isArray(questions)) {
    throw new Error("OpenAI response missing questions array");
  }

  if (questions.length === 0) {
    throw new Error("OpenAI returned zero questions");
  }

  if (questions.length !== questionCount) {
    throw new Error(
      `OpenAI generated ${
        questions.length
      } questions instead of ${questionCount}. The last index was ${
        questions[questions.length - 1]?.index || "unknown"
      }. Try using shorter text or fewer questions.`
    );
  }

  const validatedQuestions = questions.map((q, arrayIndex) => {
    const expectedIndex = arrayIndex + 1;

    if (q.index !== expectedIndex) {
      throw new Error(
        `Question at position ${arrayIndex + 1} has wrong index: ${
          q.index
        } (expected ${expectedIndex})`
      );
    }

    if (!q.questionText || !q.options || !q.correctAnswer || !q.explanation) {
      throw new Error(`Question ${q.index} is missing required fields`);
    }

    if (!q.options.A || !q.options.B || !q.options.C || !q.options.D) {
      throw new Error(`Question ${q.index} is missing one or more options`);
    }

    if (!["A", "B", "C", "D"].includes(q.correctAnswer)) {
      throw new Error(
        `Question ${q.index} has invalid correct answer: ${q.correctAnswer}`
      );
    }

    return q as GeneratedQuestion;
  });

  return validatedQuestions;
};
