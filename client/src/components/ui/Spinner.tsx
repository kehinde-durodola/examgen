import { GraduationCap } from "lucide-react";
import { cn } from "@/lib";

interface SpinnerProps {
  size?: "sm" | "md" | "lg";
  withLogo?: boolean;
  className?: string;
}

export const Spinner = ({
  size = "md",
  withLogo = true,
  className,
}: SpinnerProps) => {
  const sizes = {
    sm: {
      container: "w-10 h-10",
      logo: "w-4 h-4",
      ring: "w-10 h-10",
      border: "border-2",
    },
    md: {
      container: "w-16 h-16",
      logo: "w-6 h-6",
      ring: "w-16 h-16",
      border: "border-3",
    },
    lg: {
      container: "w-24 h-24",
      logo: "w-10 h-10",
      ring: "w-24 h-24",
      border: "border-4",
    },
  };

  const currentSize = sizes[size];

  return (
    <div
      className={cn(
        "relative flex items-center justify-center",
        currentSize.container,
        className
      )}
    >
      <div
        className={cn(
          "absolute rounded-full",
          "animate-spin",
          currentSize.ring,
          currentSize.border,
          "border-transparent border-t-blue-600 border-r-blue-600/30 border-b-blue-600/10 border-l-blue-600/50"
        )}
        style={{ animationDuration: "1.2s" }}
      />

      {withLogo && (
        <div className="relative z-10 text-blue-600 animate-pulse">
          <GraduationCap className={currentSize.logo} />
        </div>
      )}
    </div>
  );
};
