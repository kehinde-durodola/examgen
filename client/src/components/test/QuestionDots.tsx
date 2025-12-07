import { cn } from "@/lib";
import type { AnswerKey } from "@/types";

interface QuestionDotsProps {
  total: number;
  currentIndex: number;
  answers: Record<string, AnswerKey>;
  questionIds: string[];
}

export const QuestionDots = ({
  total,
  currentIndex,
  answers,
  questionIds,
}: QuestionDotsProps) => {
  return (
    <div className="mt-8 flex justify-center gap-2">
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          className={cn(
            "w-2.5 h-2.5 rounded-full transition-colors",
            i === currentIndex
              ? "bg-blue-600 ring-2 ring-blue-200"
              : answers[questionIds[i]]
              ? "bg-blue-400"
              : "bg-slate-300"
          )}
        />
      ))}
    </div>
  );
};
