import { useNavigate } from "react-router-dom";
import { FileText, Clock, AlertCircle, ArrowRight } from "lucide-react";
import { Button, Card, CardContent, Badge } from "@/components/ui";
import { formatDate } from "@/lib";
import type { Generation } from "@/types";

interface GenerationCardProps {
  generation: Generation;
}

export const GenerationCard = ({ generation }: GenerationCardProps) => {
  const navigate = useNavigate();

  const getStatusBadge = () => {
    if (generation.status === "processing") {
      return <Badge variant="secondary">Processing</Badge>;
    }

    if (generation.status === "failed") {
      return <Badge variant="destructive">Failed</Badge>;
    }

    if (generation.score !== null && generation.score !== undefined) {
      const variant =
        generation.score >= 80
          ? "success"
          : generation.score >= 60
          ? "warning"
          : "destructive";
      return <Badge variant={variant}>Score: {generation.score}%</Badge>;
    }

    return <Badge variant="outline">Not attempted</Badge>;
  };

  return (
    <Card className="hover:border-blue-300 transition-colors group">
      <CardContent className="p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-start gap-4">
          <div className="mt-1 bg-blue-50 p-2 rounded text-blue-600">
            <FileText size={20} />
          </div>
          <div>
            <h3 className="font-semibold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-1">
              {generation.sourceName}
            </h3>
            <div className="flex items-center gap-x-4 gap-y-2 mt-1 flex-wrap text-sm text-slate-500">
              <span className="flex items-center gap-1">
                <AlertCircle size={14} /> {generation.questionCount} questions
              </span>
              <span>•</span>
              <span className="font-medium">{generation.difficulty}</span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Clock size={14} /> {formatDate(generation.createdAt)}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
          {getStatusBadge()}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate(`/generations/${generation.id}`)}
            className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
          >
            {generation.score !== null ? "Review" : "View"}{" "}
            <ArrowRight className="ml-1 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
