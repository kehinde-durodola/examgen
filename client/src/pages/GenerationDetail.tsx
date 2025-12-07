import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Clock,
  BarChart2,
  FileText,
  PlayCircle,
  Loader2,
  Download,
} from "lucide-react";
import { Button, Card, CardContent } from "@/components/ui";
import { Breadcrumb, QuestionPreview } from "@/components/shared";
import { generationService } from "@/services";
import { formatDate } from "@/lib";
import { generatePdf } from "@/lib/generatePdf";
import type { GenerationWithQuestions } from "@/types";

export const GenerationDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [generation, setGeneration] = useState<GenerationWithQuestions | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isDownloading, setIsDownloading] = useState(false);

  useEffect(() => {
    const fetchGeneration = async () => {
      try {
        const data = await generationService.getById(id!);
        setGeneration(data);
      } catch (err: unknown) {
        const message =
          err instanceof Error ? err.message : "Failed to load generation";
        setError(message);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchGeneration();
  }, [id]);

  const handleDownload = async () => {
    if (!generation) return;
    setIsDownloading(true);
    try {
      await generatePdf(generation);
    } catch (err) {
      console.error("Failed to generate PDF:", err);
    } finally {
      setIsDownloading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (error || !generation) {
    return (
      <div className="p-10 text-center text-red-600">
        {error || "Generation not found"}
      </div>
    );
  }

  const breadcrumbItems = [
    { label: "Dashboard", href: "/dashboard" },
    { label: generation.sourceName },
  ];

  return (
    <div className="container max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Breadcrumb items={breadcrumbItems} />

      <div className="grid grid-cols-1 md:grid-cols-[1fr,320px] gap-8">
        <div className="min-w-0">
          <div className="mb-8">
            <h1
              className="text-3xl font-bold text-slate-900 mb-2 truncate"
              title={generation.sourceName}
            >
              {generation.sourceName}
            </h1>
            <div className="flex flex-wrap gap-4 text-slate-500 text-sm">
              <span className="flex items-center gap-1">
                <FileText size={16} /> {generation.questionCount} questions
              </span>
              <span className="flex items-center gap-1">
                <BarChart2 size={16} /> {generation.difficulty}
              </span>
              <span className="flex items-center gap-1">
                <Clock size={16} /> Generated {formatDate(generation.createdAt)}
              </span>
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-slate-900">
                Preview Questions
              </h2>
            </div>

            {generation.questions?.map((q, i) => (
              <QuestionPreview key={q.id} question={q} index={i} />
            ))}
          </div>
        </div>

        <div className="md:w-80">
          <Card className="sticky top-24">
            <CardContent className="pt-6 text-center space-y-6">
              <div className="space-y-2">
                <p className="text-sm font-medium text-slate-500">
                  Your Last Score
                </p>
                {generation.score !== null ? (
                  <div className="text-4xl font-bold text-blue-600">
                    {generation.score}%
                  </div>
                ) : (
                  <div className="text-xl font-medium text-slate-400">
                    Not Attempted
                  </div>
                )}
              </div>

              <div className="pt-4 border-t border-slate-100 space-y-3">
                <Button
                  className="w-full"
                  size="lg"
                  onClick={() => navigate(`/test/${generation.id}`)}
                >
                  <PlayCircle className="w-4 h-4 mr-2" />
                  {generation.score !== null
                    ? "Retake Test"
                    : "Start Practice Test"}
                </Button>

                <Button
                  variant="outline"
                  className="w-full"
                  size="lg"
                  onClick={handleDownload}
                  isLoading={isDownloading}
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download PDF
                </Button>

                <p className="text-xs text-slate-500 px-4">
                  Take the test to assess your knowledge. Results are saved
                  automatically.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
