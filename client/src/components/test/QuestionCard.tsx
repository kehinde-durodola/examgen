import { ChevronLeft, ChevronRight, CheckCircle } from "lucide-react";
import { Button, Card, CardContent } from "@/components/ui";
import { cn } from "@/lib";
import type { Question, AnswerKey } from "@/types";

interface QuestionCardProps {
  question: Question;
  selectedAnswer: AnswerKey | undefined;
  onSelectAnswer: (key: AnswerKey) => void;
  onPrevious: () => void;
  onNext: () => void;
  isFirst: boolean;
  isLast: boolean;
  isSubmitting: boolean;
}

export const QuestionCard = ({
  question,
  selectedAnswer,
  onSelectAnswer,
  onPrevious,
  onNext,
  isFirst,
  isLast,
  isSubmitting,
}: QuestionCardProps) => {
  return (
    <Card className="shadow-lg border-0 sm:border sm:border-slate-200">
      <CardContent className="p-6 sm:p-10">
        <h2 className="text-xl sm:text-2xl font-semibold text-slate-900 mb-8 leading-relaxed">
          {question.questionText}
        </h2>

        <div className="space-y-3">
          {(Object.entries(question.options) as [AnswerKey, string][]).map(
            ([key, text]) => {
              const isSelected = selectedAnswer === key;
              return (
                <button
                  key={key}
                  onClick={() => onSelectAnswer(key)}
                  className={cn(
                    "w-full text-left p-4 rounded-lg border-2 transition-all flex items-center gap-4 group",
                    isSelected
                      ? "border-blue-600 bg-blue-50/50"
                      : "border-slate-200 hover:border-blue-300 hover:bg-slate-50"
                  )}
                >
                  <div
                    className={cn(
                      "w-6 h-6 rounded-full border-2 flex items-center justify-center text-xs font-bold transition-colors",
                      isSelected
                        ? "border-blue-600 bg-blue-600 text-white"
                        : "border-slate-300 text-slate-500 group-hover:border-blue-400"
                    )}
                  >
                    {isSelected && (
                      <div className="w-2 h-2 bg-white rounded-full" />
                    )}
                    {!isSelected && key}
                  </div>
                  <span
                    className={cn(
                      "text-base",
                      isSelected
                        ? "text-slate-900 font-medium"
                        : "text-slate-600"
                    )}
                  >
                    {text}
                  </span>
                </button>
              );
            }
          )}
        </div>

        <div className="mt-10 flex items-center justify-between">
          <Button
            variant="outline"
            onClick={onPrevious}
            disabled={isFirst}
            className="w-32"
          >
            <ChevronLeft className="mr-2 h-4 w-4" /> Previous
          </Button>

          <Button
            onClick={onNext}
            className="w-32"
            disabled={!selectedAnswer}
            isLoading={isSubmitting && isLast}
          >
            {isLast ? (
              <>
                Submit <CheckCircle className="ml-2 h-4 w-4" />
              </>
            ) : (
              <>
                Next <ChevronRight className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
