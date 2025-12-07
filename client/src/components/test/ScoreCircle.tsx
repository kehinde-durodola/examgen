interface ScoreCircleProps {
  score: number;
}

export const ScoreCircle = ({ score }: ScoreCircleProps) => {
  return (
    <div className="relative flex items-center justify-center w-40 h-40 rounded-full border-8 border-slate-100 mb-4">
      <svg className="w-full h-full transform -rotate-90">
        <circle
          cx="80"
          cy="80"
          r="70"
          stroke="currentColor"
          strokeWidth="10"
          fill="transparent"
          className="text-slate-100"
        />
        <circle
          cx="80"
          cy="80"
          r="70"
          stroke="currentColor"
          strokeWidth="10"
          fill="transparent"
          strokeDasharray={440}
          strokeDashoffset={440 - (440 * score) / 100}
          className="text-blue-600 transition-all duration-1000 ease-out"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center text-4xl font-bold text-blue-600">
        {score}%
      </div>
    </div>
  );
};
