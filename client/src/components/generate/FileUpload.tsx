import { useState } from "react";
import { Upload, FileText, X } from "lucide-react";
import { Button } from "@/components/ui";
import { MAX_FILE_SIZE, MAX_FILE_SIZE_MB } from "@/lib/constants";

interface FileUploadProps {
  file: File | null;
  onFileChange: (file: File | null) => void;
}

export const FileUpload = ({ file, onFileChange }: FileUploadProps) => {
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);

    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];

      if (selectedFile.size > MAX_FILE_SIZE) {
        const fileSizeMB = (selectedFile.size / (1024 * 1024)).toFixed(2);
        setError(
          `File size (${fileSizeMB}MB) exceeds the ${MAX_FILE_SIZE_MB}MB limit`
        );
        e.target.value = "";
        return;
      }

      if (selectedFile.type !== "application/pdf") {
        setError("Please upload a PDF file");
        e.target.value = "";
        return;
      }

      onFileChange(selectedFile);
    }
  };

  const handleRemove = () => {
    setError(null);
    onFileChange(null);
  };

  if (file) {
    return (
      <div className="flex items-center justify-between p-4 bg-blue-50 border border-blue-100 rounded-lg overflow-hidden">
        <div className="flex items-center gap-3 min-w-0 flex-1">
          <FileText className="text-blue-600 h-8 w-8 flex-shrink-0" />
          <div className="min-w-0 flex-1">
            <p className="text-sm font-medium text-slate-900 truncate">
              {file.name}
            </p>
            <p className="text-xs text-slate-500">
              {(file.size / 1024 / 1024).toFixed(2)} MB
            </p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleRemove}
          className="text-slate-500 hover:text-red-600 flex-shrink-0 ml-2"
        >
          <X size={18} />
        </Button>
      </div>
    );
  }

  return (
    <div>
      <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-slate-300 border-dashed rounded-lg cursor-pointer bg-slate-50 hover:bg-slate-100 transition-colors">
        <div className="flex flex-col items-center justify-center pt-5 pb-6 px-4 text-center">
          <Upload className="w-10 h-10 mb-3 text-slate-400" />
          <p className="mb-2 text-sm text-slate-500">
            <span className="font-semibold">Click to upload</span> or drag and
            drop
          </p>
          <p className="text-xs text-slate-500">
            PDF (MAX. {MAX_FILE_SIZE_MB}MB)
          </p>
        </div>
        <input
          type="file"
          className="hidden"
          accept=".pdf"
          onChange={handleChange}
        />
      </label>
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
    </div>
  );
};
