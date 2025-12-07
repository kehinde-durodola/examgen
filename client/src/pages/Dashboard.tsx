import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Sparkles, Loader2 } from "lucide-react";
import { useAuth } from "@/hooks";
import { generationService } from "@/services";
import { TokenCard } from "@/components/dashboard";
import { EmptyState, GenerationCard } from "@/components/shared";
import type { Generation } from "@/types";

export const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [generations, setGenerations] = useState<Generation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGenerations = async () => {
      try {
        const data = await generationService.getAll();
        setGenerations(data);
      } catch (error) {
        console.error("Failed to fetch generations:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchGenerations();
  }, []);

  return (
    <div className="container max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            Dashboard
          </h1>
          <p className="text-slate-500 mt-1">
            Welcome back, {user?.name?.split(" ")[0]}
          </p>
        </div>
      </div>

      <TokenCard user={user} />

      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-slate-900">
          Recent Generations
        </h2>

        {loading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
          </div>
        ) : generations.length === 0 ? (
          <EmptyState
            icon={Sparkles}
            title="No generations yet"
            description="Upload a PDF or paste text to generate your first set of practice questions."
            actionLabel="Generate Questions"
            onAction={() => navigate("/generate")}
          />
        ) : (
          <div className="grid gap-4">
            {generations.map((gen) => (
              <GenerationCard key={gen.id} generation={gen} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
