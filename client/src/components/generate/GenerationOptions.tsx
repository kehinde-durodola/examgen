import { Zap } from "lucide-react";
import { Button, Card, CardContent, Badge } from "@/components/ui";
import { cn } from "@/lib";
import type { Difficulty, QuestionCount } from "@/types";

interface GenerationOptionsProps {
  tokensRemaining: number;
  questionCount: QuestionCount;
  difficulty: Difficulty;
  onQuestionCountChange: (count: QuestionCount) => void;
  onDifficultyChange: (difficulty: Difficulty) => void;
  onGenerate: () => void;
  isGenerating: boolean;
  isDisabled: boolean;
}

const QUESTION_COUNTS: QuestionCount[] = [5, 10, 15, 20];
const DIFFICULTIES: Difficulty[] = ["Easy", "Medium", "Hard"];

export const GenerationOptions = ({
  tokensRemaining,
  questionCount,
  difficulty,
  onQuestionCountChange,
  onDifficultyChange,
  onGenerate,
  isGenerating,
  isDisabled,
}: GenerationOptionsProps) => {
  return (
    <Card>
      <CardContent className="pt-6 space-y-6">
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-slate-700">
            Available Tokens
          </span>
          <Badge
            variant="default"
            className="bg-blue-100 text-blue-800 hover:bg-blue-100"
          >
            {tokensRemaining} remaining
          </Badge>
        </div>

        <div className="space-y-3">
          <label className="text-sm font-medium text-slate-700">
            Number of Questions
          </label>
          <div className="grid grid-cols-4 gap-2">
            {QUESTION_COUNTS.map((count) => (
              <button
                key={count}
                onClick={() => onQuestionCountChange(count)}
                className={cn(
                  "py-2 text-sm border rounded-md transition-colors",
                  questionCount === count
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-white text-slate-600 border-slate-200 hover:border-blue-300"
                )}
              >
                {count}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <label className="text-sm font-medium text-slate-700">
            Difficulty Level
          </label>
          <div className="grid grid-cols-3 gap-2">
            {DIFFICULTIES.map((diff) => (
              <button
                key={diff}
                onClick={() => onDifficultyChange(diff)}
                className={cn(
                  "py-2 text-sm border rounded-md transition-colors",
                  difficulty === diff
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-white text-slate-600 border-slate-200 hover:border-blue-300"
                )}
              >
                {diff}
              </button>
            ))}
          </div>
        </div>

        <div className="pt-4 border-t border-slate-100">
          <Button
            className="w-full"
            size="lg"
            onClick={onGenerate}
            disabled={isDisabled}
            isLoading={isGenerating}
          >
            <Zap className="w-4 h-4 mr-2 fill-current" /> Generate
          </Button>
          <p className="text-xs text-center text-slate-500 mt-3">
            This will use 1 token
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
