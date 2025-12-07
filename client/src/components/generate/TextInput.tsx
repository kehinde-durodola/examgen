interface TextInputProps {
  value: string;
  onChange: (value: string) => void;
}

export const TextInput = ({ value, onChange }: TextInputProps) => {
  return (
    <div className="space-y-2">
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Paste your study notes, article content, or summary here..."
        className="w-full min-h-[250px] p-4 text-sm rounded-md border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600 resize-y"
      />
      <div className="text-right text-xs text-slate-400">
        {value.length} characters
      </div>
    </div>
  );
};
