import { useNavigate } from "react-router-dom";
import { X } from "lucide-react";
import { Button } from "@/components/ui";

interface TestHeaderProps {
  currentQuestion: number;
  totalQuestions: number;
}

export const TestHeader = ({
  currentQuestion,
  totalQuestions,
}: TestHeaderProps) => {
  const navigate = useNavigate();

  return (
    <header className="h-16 bg-white border-b border-slate-200 px-4 sm:px-8 flex items-center justify-between sticky top-0 z-10">
      <div className="font-semibold text-slate-900">Practice Test</div>
      <div className="text-sm text-slate-500">
        Question{" "}
        <span className="font-medium text-slate-900">{currentQuestion}</span> of{" "}
        {totalQuestions}
      </div>
      <Button variant="ghost" size="sm" onClick={() => navigate(-1)}>
        <X className="mr-2 h-4 w-4" /> Exit Test
      </Button>
    </header>
  );
};
