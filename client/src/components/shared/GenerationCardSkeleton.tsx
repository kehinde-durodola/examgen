import { Card, CardContent, Skeleton } from "@/components/ui";

export const GenerationCardSkeleton = () => {
  return (
    <Card className="hover:border-blue-300 transition-colors">
      <CardContent className="p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-start gap-4">
          <Skeleton className="h-10 w-10 rounded" />
          <div className="space-y-2">
            <Skeleton className="h-5 w-48 sm:w-64" />
            <Skeleton className="h-4 w-36 sm:w-48" />
          </div>
        </div>
        <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
          <Skeleton className="h-6 w-20 rounded-full" />
          <Skeleton className="h-8 w-16" />
        </div>
      </CardContent>
    </Card>
  );
};
