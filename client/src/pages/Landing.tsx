import { useNavigate } from "react-router-dom";
import {
  Upload,
  Sparkles,
  BookOpen,
  Clock,
  BarChart2,
  Download,
  FileText,
  CheckCircle,
} from "lucide-react";
import { Button, Card, CardContent } from "@/components/ui";

const steps = [
  {
    icon: Upload,
    title: "Upload Content",
    description:
      "Upload a PDF or paste your notes directly into our secure platform.",
  },
  {
    icon: Sparkles,
    title: "AI Generates",
    description:
      "Our advanced AI analyzes your content and creates targeted practice questions.",
  },
  {
    icon: BookOpen,
    title: "Practice & Learn",
    description:
      "Take practice tests and review detailed explanations for every answer.",
  },
];

const features = [
  {
    icon: CheckCircle,
    title: "Smart Questions",
    desc: "AI generates questions that test real understanding, not just memorization.",
  },
  {
    icon: Clock,
    title: "Instant Results",
    desc: "Get immediate feedback with detailed explanations for every option.",
  },
  {
    icon: FileText,
    title: "Multiple Formats",
    desc: "Upload PDFs, documents, or paste text directly from your clipboard.",
  },
  {
    icon: BarChart2,
    title: "Difficulty Levels",
    desc: "Choose Easy, Medium, or Hard questions to match your study goals.",
  },
  {
    icon: Sparkles,
    title: "Free Daily Tokens",
    desc: "Get 3 free generations every single day to keep practicing.",
  },
  {
    icon: Download,
    title: "Download & Print",
    desc: "Export your questions as PDF to study offline or print for later.",
  },
];

export const Landing = () => {
  const navigate = useNavigate();

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="bg-white">
      <div className="relative isolate pt-14 pb-20 sm:pt-20 sm:pb-28">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <div className="mb-8 flex justify-center">
              <div className="rounded-full px-3 py-1 text-sm font-semibold leading-6 text-blue-600 ring-1 ring-inset ring-blue-100 bg-blue-50">
                AI-Powered Study Tool
              </div>
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-6xl mb-6">
              Transform Your Study Materials Into{" "}
              <span className="text-blue-600">Practice Exams</span>
            </h1>
            <p className="text-lg leading-8 text-slate-600 mb-10">
              Upload any PDF or paste your notes. Get intelligent
              multiple-choice questions instantly. Study smarter, not harder.
            </p>
            <div className="flex items-center justify-center gap-x-6">
              <Button
                size="lg"
                onClick={() => navigate("/register")}
                className="px-8"
              >
                Get Started Free
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => scrollToSection("how-it-works")}
              >
                See How It Works
              </Button>
            </div>
            <p className="mt-6 text-sm leading-5 text-slate-500">
              No credit card required • 3 free generations daily
            </p>
          </div>
        </div>
      </div>

      <div id="how-it-works" className="py-24 bg-slate-50">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              How It Works
            </h2>
            <p className="mt-4 text-lg text-slate-600">
              Three simple steps to better exam preparation
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {steps.map((step, index) => (
              <div
                key={index}
                className="flex flex-col items-center text-center"
              >
                <div className="h-16 w-16 bg-white rounded-2xl shadow-sm border border-slate-200 flex items-center justify-center mb-6 text-blue-600">
                  <step.icon size={32} />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-3">
                  {step.title}
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div id="features" className="py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Everything You Need to Study Effectively
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, idx) => (
              <Card
                key={idx}
                className="border-slate-100 shadow-sm hover:shadow-md transition-shadow"
              >
                <CardContent className="pt-6">
                  <div className="h-10 w-10 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 mb-4">
                    <feature.icon size={20} />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-slate-500">{feature.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-slate-50 border-t border-slate-200">
        <div className="mx-auto max-w-6xl px-4 py-24 sm:px-6 lg:px-8">
          <div className="relative isolate overflow-hidden bg-white px-6 py-24 shadow-sm sm:rounded-3xl sm:px-16 lg:flex lg:gap-x-20 lg:px-24 border border-slate-200">
            <div className="mx-auto max-w-md text-center lg:mx-0 lg:flex-auto lg:py-8 lg:text-left">
              <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                Ready to Study Smarter?
              </h2>
              <p className="mt-6 text-lg leading-8 text-slate-600">
                Join thousands of students using AI to prepare for exams
                efficiently and effectively.
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6 lg:justify-start">
                <Button size="lg" onClick={() => navigate("/register")}>
                  Create Free Account
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
