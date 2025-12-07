import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { generationService } from "@/services";
import {
  TestHeader,
  TestProgress,
  QuestionCard,
  QuestionDots,
} from "@/components/test";
import { calculateScore } from "@/lib";
import type { Question, AnswerKey } from "@/types";

export const Test = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, AnswerKey>>({});
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const data = await generationService.getById(id!);
        if (data.questions) {
          setQuestions(data.questions);
        }
      } catch (error) {
        console.error("Failed to fetch test", error);
        navigate("/dashboard");
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchQuestions();
  }, [id, navigate]);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Loader2 className="animate-spin text-blue-600" />
      </div>
    );
  }

  if (!questions.length) return null;

  const question = questions[currentQuestionIndex];
  const totalQuestions = questions.length;

  const handleSelectOption = (optionKey: AnswerKey) => {
    setAnswers((prev) => ({
      ...prev,
      [question.id]: optionKey,
    }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      handleSubmit();
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  const handleSubmit = async () => {
    setSubmitting(true);

    let correctCount = 0;
    questions.forEach((q) => {
      if (answers[q.id] === q.correctAnswer) {
        correctCount++;
      }
    });
    const score = calculateScore(correctCount, totalQuestions);

    try {
      await generationService.submitScore(id!, { score });

      const resultData = {
        score,
        answers,
        correctCount,
        totalQuestions,
      };
      localStorage.setItem(`result-${id}`, JSON.stringify(resultData));
      navigate(`/results/${id}`);
    } catch (error) {
      console.error("Failed to submit score", error);
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <TestHeader
        currentQuestion={currentQuestionIndex + 1}
        totalQuestions={totalQuestions}
      />

      <TestProgress
        answered={Object.keys(answers).length}
        total={totalQuestions}
      />

      <main className="flex-1 flex flex-col items-center justify-center p-4 sm:p-8">
        <div className="w-full max-w-2xl">
          <QuestionCard
            question={question}
            selectedAnswer={answers[question.id]}
            onSelectAnswer={handleSelectOption}
            onPrevious={handlePrevious}
            onNext={handleNext}
            isFirst={currentQuestionIndex === 0}
            isLast={currentQuestionIndex === totalQuestions - 1}
            isSubmitting={submitting}
          />

          <QuestionDots
            total={totalQuestions}
            currentIndex={currentQuestionIndex}
            answers={answers}
            questionIds={questions.map((q) => q.id)}
          />
        </div>
      </main>
    </div>
  );
};
