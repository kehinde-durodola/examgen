interface TestProgressProps {
  answered: number;
  total: number;
}

export const TestProgress = ({ answered, total }: TestProgressProps) => {
  const percentage = (answered / total) * 100;

  return (
    <div className="w-full h-1.5 bg-slate-200">
      <div
        className="h-full bg-blue-600 transition-all duration-300 ease-out"
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
};
