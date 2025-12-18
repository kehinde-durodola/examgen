import { GraduationCap, Github, Mail, Linkedin } from "lucide-react";

export const Footer = () => {
  const iconClass =
    "p-2 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors";
  const iconSize = "h-5 w-5";

  return (
    <footer className="bg-white border-t border-slate-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-8 flex flex-col sm:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <GraduationCap className="h-5 w-5 text-slate-400" />
            <span className="text-slate-500 font-semibold">ExamGen</span>
          </div>

          <div className="flex items-center gap-2">
            <a
              href="https://github.com/kehinde-durodola"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className={iconClass}
            >
              <Github className={iconSize} />
            </a>
            <a
              href="mailto:devkehinde2020@gmail.com"
              aria-label="Email"
              className={iconClass}
            >
              <Mail className={iconSize} />
            </a>
            <a
              href="https://www.linkedin.com/in/kehinde-durodola"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className={iconClass}
            >
              <Linkedin className={iconSize} />
            </a>
          </div>
        </div>

        <div className="border-t border-slate-200">
          <p className="py-6 text-center text-slate-500 text-sm">
            © 2025 ExamGen
          </p>
        </div>
      </div>
    </footer>
  );
};
