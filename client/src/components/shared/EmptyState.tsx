import { type LucideIcon } from "lucide-react";
import { Button, Card, CardContent } from "@/components/ui";

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
}

export const EmptyState = ({
  icon: Icon,
  title,
  description,
  actionLabel,
  onAction,
}: EmptyStateProps) => {
  return (
    <Card className="border-dashed border-2 border-slate-200 bg-slate-50/50">
      <CardContent className="flex flex-col items-center justify-center py-16 text-center">
        <div className="bg-white p-4 rounded-full shadow-sm mb-4">
          <Icon className="h-8 w-8 text-blue-600" />
        </div>
        <h3 className="text-lg font-medium text-slate-900 mb-2">{title}</h3>
        <p className="text-slate-500 max-w-md mb-6">{description}</p>
        {actionLabel && onAction && (
          <Button onClick={onAction}>{actionLabel}</Button>
        )}
      </CardContent>
    </Card>
  );
};
