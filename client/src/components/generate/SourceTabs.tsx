import { cn } from "@/lib";

interface SourceTabsProps {
  activeTab: "pdf" | "text";
  onTabChange: (tab: "pdf" | "text") => void;
}

export const SourceTabs = ({ activeTab, onTabChange }: SourceTabsProps) => {
  return (
    <div className="flex p-1 bg-slate-100 rounded-lg w-fit">
      <button
        onClick={() => onTabChange("pdf")}
        className={cn(
          "px-4 py-2 text-sm font-medium rounded-md transition-all",
          activeTab === "pdf"
            ? "bg-white text-slate-900 shadow-sm"
            : "text-slate-500 hover:text-slate-700"
        )}
      >
        Upload PDF
      </button>
      <button
        onClick={() => onTabChange("text")}
        className={cn(
          "px-4 py-2 text-sm font-medium rounded-md transition-all",
          activeTab === "text"
            ? "bg-white text-slate-900 shadow-sm"
            : "text-slate-500 hover:text-slate-700"
        )}
      >
        Paste Text
      </button>
    </div>
  );
};
