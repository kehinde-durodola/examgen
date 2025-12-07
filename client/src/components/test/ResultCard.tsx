import { useNavigate } from "react-router-dom";
import { RotateCcw, LayoutDashboard } from "lucide-react";
import { Button, Card, CardContent } from "@/components/ui";
import { ScoreCircle } from "./ScoreCircle";

interface ResultCardProps {
  generationId: string;
  score: number;
  correctCount: number;
  totalQuestions: number;
}

export const ResultCard = ({
  generationId,
  score,
  correctCount,
  totalQuestions,
}: ResultCardProps) => {
  const navigate = useNavigate();

  return (
    <Card className="bg-white border-slate-200 shadow-sm text-center py-10">
      <CardContent>
        <h1 className="text-2xl font-bold text-slate-900 mb-2">
          Assessment Complete
        </h1>
        <p className="text-slate-500 mb-8">
          Here is how you performed on this practice test
        </p>

        <div className="flex flex-col items-center justify-center mb-8">
          <ScoreCircle score={score} />
          <p className="text-lg font-medium text-slate-700">
            You answered {correctCount} out of {totalQuestions} questions
            correctly
          </p>
        </div>

        <div className="flex justify-center gap-4">
          <Button
            variant="outline"
            onClick={() => navigate(`/test/${generationId}`)}
          >
            <RotateCcw className="mr-2 h-4 w-4" /> Retake Test
          </Button>
          <Button onClick={() => navigate("/dashboard")}>
            <LayoutDashboard className="mr-2 h-4 w-4" /> Back to Dashboard
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
