import { Card, CardContent } from "@/components/ui";
import type { Question } from "@/types";

interface QuestionPreviewProps {
  question: Question;
  index: number;
}

export const QuestionPreview = ({ question, index }: QuestionPreviewProps) => {
  return (
    <Card className="border-slate-200">
      <CardContent className="pt-6">
        <div className="flex gap-4">
          <span className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-slate-100 text-slate-600 font-medium text-sm">
            {index + 1}
          </span>
          <div className="space-y-4 w-full">
            <p className="text-slate-900 font-medium">
              {question.questionText}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {Object.entries(question.options).map(([key, text]) => (
                <div
                  key={key}
                  className="flex items-center gap-3 p-3 rounded-md border border-slate-200 text-sm text-slate-600 bg-slate-50/50"
                >
                  <span className="w-6 h-6 rounded-full border border-slate-300 flex items-center justify-center text-xs font-medium bg-white">
                    {key}
                  </span>
                  {text}
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
