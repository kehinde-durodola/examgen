import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth, useCreateGeneration } from "@/hooks";
import { Card, CardContent } from "@/components/ui";
import {
  SourceTabs,
  FileUpload,
  TextInput,
  GenerationOptions,
} from "@/components/generate";
import type { Difficulty, QuestionCount } from "@/types";

export const Generate = () => {
  const { user, refreshUser } = useAuth();
  const navigate = useNavigate();
  const createGeneration = useCreateGeneration();

  const [activeTab, setActiveTab] = useState<"pdf" | "text">("pdf");
  const [file, setFile] = useState<File | null>(null);
  const [text, setText] = useState("");
  const [questionCount, setQuestionCount] = useState<QuestionCount>(10);
  const [difficulty, setDifficulty] = useState<Difficulty>("Medium");
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (
      (activeTab === "pdf" && !file) ||
      (activeTab === "text" && !text.trim())
    )
      return;

    setError(null);

    try {
      const response = await createGeneration.mutateAsync({
        file: activeTab === "pdf" ? file ?? undefined : undefined,
        textInput: activeTab === "text" ? text : undefined,
        questionCount,
        difficulty,
      });

      refreshUser();
      navigate(`/generations/${response.id}`);
    } catch (err: unknown) {
      const message =
        err instanceof Error
          ? err.message
          : "Failed to generate questions. Please try again.";
      setError(message);
    }
  };

  const isDisabled =
    user?.tokensRemaining === 0 ||
    (activeTab === "pdf" && !file) ||
    (activeTab === "text" && !text.trim());

  return (
    <div className="container max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">
          Generate Questions
        </h1>
        <p className="text-slate-500 mt-2">
          Upload study material or paste your notes to create a custom practice
          test.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <SourceTabs activeTab={activeTab} onTabChange={setActiveTab} />

          <Card className="min-h-[300px] flex flex-col justify-center">
            <CardContent className="pt-6">
              {activeTab === "pdf" ? (
                <FileUpload file={file} onFileChange={setFile} />
              ) : (
                <TextInput value={text} onChange={setText} />
              )}
            </CardContent>
          </Card>

          {error && (
            <div className="p-4 bg-red-50 text-red-700 rounded-md text-sm">
              {error}
            </div>
          )}
        </div>

        <div className="space-y-6">
          <GenerationOptions
            tokensRemaining={user?.tokensRemaining ?? 0}
            questionCount={questionCount}
            difficulty={difficulty}
            onQuestionCountChange={setQuestionCount}
            onDifficultyChange={setDifficulty}
            onGenerate={handleGenerate}
            isGenerating={createGeneration.isPending}
            isDisabled={isDisabled}
          />
        </div>
      </div>
    </div>
  );
};
