import { MIN_TEXT_CHARS } from "@/lib/constants";

interface TextInputProps {
  value: string;
  onChange: (value: string) => void;
}

export const TextInput = ({ value, onChange }: TextInputProps) => {
  const charCount = value.length;
  const isUnderMinimum = charCount > 0 && charCount < MIN_TEXT_CHARS;

  return (
    <div className="space-y-2">
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Paste your study notes, article content, or summary here..."
        className="w-full min-h-[250px] p-4 text-sm rounded-md border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600 resize-y"
      />
      <div className="flex justify-between text-xs">
        <span className="text-red-500">
          {isUnderMinimum && `Minimum ${MIN_TEXT_CHARS} characters required`}
        </span>
        <span className="text-slate-400">{charCount} characters</span>
      </div>
    </div>
  );
};
