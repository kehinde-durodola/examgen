import { useNavigate } from "react-router-dom";
import { Zap, Plus } from "lucide-react";
import { Button, Card, CardContent } from "@/components/ui";
import type { User } from "@/types";

interface TokenCardProps {
  user: User | null;
}

export const TokenCard = ({ user }: TokenCardProps) => {
  const navigate = useNavigate();

  return (
    <Card className="bg-white border-slate-200 shadow-sm relative overflow-hidden">
      <div className="absolute top-0 right-0 p-4 opacity-10">
        <Zap size={120} />
      </div>
      <CardContent className="p-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
          <div>
            <h2 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
              <Zap className="text-yellow-500 h-5 w-5 fill-yellow-500" /> Daily
              Tokens
            </h2>
            <div className="mt-4 flex items-center gap-2">
              {Array.from({ length: 3 }).map((_, i) => (
                <div
                  key={i}
                  className={`h-4 w-4 rounded-full ${
                    i < (user?.tokensRemaining || 0)
                      ? "bg-blue-600"
                      : "bg-slate-200"
                  }`}
                />
              ))}
              <span className="ml-2 text-2xl font-bold text-slate-900">
                {user?.tokensRemaining}{" "}
                <span className="text-base font-normal text-slate-500">
                  of 3 remaining
                </span>
              </span>
            </div>
            <p className="mt-2 text-sm text-slate-500">Refreshes in 8 hours</p>
          </div>
          <div>
            <Button
              onClick={() => navigate("/generate")}
              size="lg"
              disabled={user?.tokensRemaining === 0}
            >
              <Plus className="mr-2 h-4 w-4" /> Generate Questions
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
