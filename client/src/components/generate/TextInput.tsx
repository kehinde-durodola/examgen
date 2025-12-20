import { MIN_TEXT_CHARS, MAX_TEXT_CHARS } from "@/lib/constants";

interface TextInputProps {
  value: string;
  onChange: (value: string) => void;
}

export const TextInput = ({ value, onChange }: TextInputProps) => {
  const charCount = value.length;
  const isUnderMinimum = charCount > 0 && charCount < MIN_TEXT_CHARS;
  const isOverMaximum = charCount > MAX_TEXT_CHARS;

  return (
    <div className="space-y-2">
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Paste your study notes, article content, or summary here..."
        className="w-full min-h-[250px] p-4 text-sm rounded-md border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600 resize-y"
      />
      <div className="flex justify-between text-xs">
        <span
          className={
            isUnderMinimum || isOverMaximum ? "text-red-500" : "text-slate-400"
          }
        >
          {isUnderMinimum &&
            `Minimum ${MIN_TEXT_CHARS.toLocaleString()} characters required`}
          {isOverMaximum &&
            `Maximum ${MAX_TEXT_CHARS.toLocaleString()} characters exceeded`}
        </span>
        <span
          className={
            isUnderMinimum || isOverMaximum ? "text-red-500" : "text-slate-400"
          }
        >
          {charCount.toLocaleString()} characters
        </span>
      </div>
    </div>
  );
};
