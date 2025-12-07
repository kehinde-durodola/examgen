import { Upload, FileText, X } from "lucide-react";
import { Button } from "@/components/ui";

interface FileUploadProps {
  file: File | null;
  onFileChange: (file: File | null) => void;
}

export const FileUpload = ({ file, onFileChange }: FileUploadProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onFileChange(e.target.files[0]);
    }
  };

  if (file) {
    return (
      <div className="flex items-center justify-between p-4 bg-blue-50 border border-blue-100 rounded-lg">
        <div className="flex items-center gap-3">
          <FileText className="text-blue-600 h-8 w-8" />
          <div>
            <p className="text-sm font-medium text-slate-900">{file.name}</p>
            <p className="text-xs text-slate-500">
              {(file.size / 1024 / 1024).toFixed(2)} MB
            </p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onFileChange(null)}
          className="text-slate-500 hover:text-red-600"
        >
          <X size={18} />
        </Button>
      </div>
    );
  }

  return (
    <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-slate-300 border-dashed rounded-lg cursor-pointer bg-slate-50 hover:bg-slate-100 transition-colors">
      <div className="flex flex-col items-center justify-center pt-5 pb-6">
        <Upload className="w-10 h-10 mb-3 text-slate-400" />
        <p className="mb-2 text-sm text-slate-500">
          <span className="font-semibold">Click to upload</span> or drag and
          drop
        </p>
        <p className="text-xs text-slate-500">PDF (MAX. 5MB)</p>
      </div>
      <input
        type="file"
        className="hidden"
        accept=".pdf"
        onChange={handleChange}
      />
    </label>
  );
};
