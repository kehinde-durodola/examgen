import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useGeneration } from "@/hooks";
import { Spinner } from "@/components/ui";
import { ResultCard, AnswerReview } from "@/components/test";
import type { AnswerKey } from "@/types";

interface StoredResult {
  score: number;
  answers: Record<string, AnswerKey>;
  correctCount: number;
  totalQuestions: number;
}

export const Results = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: generation, isLoading } = useGeneration(id);
  const [results, setResults] = useState<StoredResult | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem(`result-${id}`);
    if (stored) {
      setResults(JSON.parse(stored));
    } else if (!isLoading) {
      navigate(`/generations/${id}`);
    }
  }, [id, isLoading, navigate]);

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  const questions = generation?.questions ?? [];

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
