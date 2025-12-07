import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { generationService } from "@/services";
import { ResultCard, AnswerReview } from "@/components/test";
import type { Question, AnswerKey } from "@/types";

interface StoredResult {
  score: number;
  answers: Record<string, AnswerKey>;
  correctCount: number;
  totalQuestions: number;
}

export const Results = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [results, setResults] = useState<StoredResult | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem(`result-${id}`);

    const fetchQuestions = async () => {
      try {
        const data = await generationService.getById(id!);
        if (data.questions) {
          setQuestions(data.questions);
        }

        if (stored) {
          setResults(JSON.parse(stored));
        } else {
          navigate(`/generations/${id}`);
        }
      } catch (error) {
        console.error("Failed to load results data", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchQuestions();
  }, [id, navigate]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loader2 className="animate-spin text-blue-600" />
      </div>
    );
  }

  if (!results || !questions.length) return null;

  return (
    <div className="container max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <ResultCard
        generationId={id!}
        score={results.score}
        correctCount={results.correctCount}
        totalQuestions={results.totalQuestions}
      />

      <div className="space-y-6">
        <h2 className="text-xl font-bold text-slate-900">Detailed Breakdown</h2>

        {questions.map((q, index) => (
          <AnswerReview
            key={q.id}
            question={q}
            index={index}
            userAnswer={results.answers[q.id]}
          />
        ))}
      </div>
    </div>
  );
};
