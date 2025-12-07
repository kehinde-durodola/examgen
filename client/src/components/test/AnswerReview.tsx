import { useState } from "react";
import { CheckCircle, XCircle, ChevronDown, ChevronUp } from "lucide-react";
import { Badge } from "@/components/ui";
import { cn } from "@/lib";
import type { Question, AnswerKey } from "@/types";

interface AnswerReviewProps {
  question: Question;
  index: number;
  userAnswer: AnswerKey;
}

export const AnswerReview = ({
  question,
  index,
  userAnswer,
}: AnswerReviewProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const isCorrect = userAnswer === question.correctAnswer;

  return (
    <div
      className={cn(
        "bg-white rounded-lg border transition-all overflow-hidden",
        isCorrect ? "border-slate-200" : "border-red-200"
      )}
    >
      <div
        className="p-6 cursor-pointer flex items-start gap-4 hover:bg-slate-50"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="mt-1">
          {isCorrect ? (
            <CheckCircle className="text-green-600 h-6 w-6" />
          ) : (
            <XCircle className="text-red-600 h-6 w-6" />
          )}
        </div>
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <h3 className="font-medium text-slate-900 pr-8">
              <span className="text-slate-500 mr-2">{index + 1}.</span>
              {question.questionText}
            </h3>
            {isExpanded ? (
              <ChevronUp className="h-5 w-5 text-slate-400" />
            ) : (
              <ChevronDown className="h-5 w-5 text-slate-400" />
            )}
          </div>
          {!isExpanded && (
            <p className="text-sm text-slate-500 mt-2">
              Your answer:{" "}
              <span
                className={
                  isCorrect
                    ? "font-medium text-green-700"
                    : "font-medium text-red-700"
                }
              >
                {question.options[userAnswer]}
              </span>
            </p>
          )}
        </div>
      </div>

      {isExpanded && (
        <div className="px-6 pb-6 pt-0 border-t border-slate-100 bg-slate-50/50">
          <div className="mt-4 space-y-3">
            <div className="grid grid-cols-1 gap-2">
              {(Object.entries(question.options) as [AnswerKey, string][]).map(
                ([key, text]) => {
                  const isSelected = userAnswer === key;
                  const isTheCorrect = question.correctAnswer === key;

                  let styleClass = "border-slate-200 bg-white text-slate-600";
                  if (isTheCorrect)
                    styleClass = "border-green-200 bg-green-50 text-green-800";
                  else if (isSelected && !isTheCorrect)
                    styleClass = "border-red-200 bg-red-50 text-red-800";

                  return (
                    <div
                      key={key}
                      className={cn(
                        "p-3 rounded-md border text-sm flex items-center justify-between",
                        styleClass
                      )}
                    >
                      <span>
                        <span className="font-semibold mr-2">{key})</span>{" "}
                        {text}
                      </span>
                      {isTheCorrect && (
                        <Badge variant="success" className="ml-2">
                          Correct Answer
                        </Badge>
                      )}
                      {isSelected && !isTheCorrect && (
                        <Badge variant="destructive" className="ml-2">
                          Your Answer
                        </Badge>
                      )}
                    </div>
                  );
                }
              )}
            </div>
            <div className="mt-4 p-4 bg-blue-50 rounded-md border border-blue-100">
              <p className="text-sm font-semibold text-blue-900 mb-1">
                Explanation:
              </p>
              <p className="text-sm text-blue-800 leading-relaxed">
                {question.explanation}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
