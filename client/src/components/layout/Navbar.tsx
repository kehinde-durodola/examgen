import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { GraduationCap, Settings, LogOut } from "lucide-react";
import { useAuth } from "@/hooks";
import { Button } from "@/components/ui";
import { cn } from "@/lib";

export const Navbar = () => {
  const { isAuthenticated, logout, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const navLinkClass =
    "text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors";

  const getLinkClass = (path: string) => {
    return cn(
      "text-sm font-medium transition-colors",
      location.pathname === path
        ? "text-blue-600"
        : "text-slate-600 hover:text-blue-600"
    );
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => navigate(isAuthenticated ? "/dashboard" : "/")}
          >
            <div className="bg-blue-600 p-1.5 rounded-lg text-white">
              <GraduationCap size={24} />
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-900">
              ExamGen
            </span>
          </div>

          <div className="hidden md:flex items-center gap-6">
            {!isAuthenticated ? (
              <>
                <a className={navLinkClass} href="#how-it-works">
                  How It Works
                </a>
                <a className={navLinkClass} href="#features">
                  Features
                </a>
              </>
            ) : (
              <>
                <Link to="/dashboard" className={getLinkClass("/dashboard")}>
                  Dashboard
                </Link>
                <Link to="/generate" className={getLinkClass("/generate")}>
                  Generate
                </Link>
              </>
            )}
          </div>

          <div className="flex items-center gap-4">
            {!isAuthenticated ? (
              <>
                <Button variant="ghost" onClick={() => navigate("/login")}>
                  Log In
                </Button>
                <Button onClick={() => navigate("/register")}>
                  Get Started
                </Button>
              </>
            ) : (
              <div className="relative">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center gap-2 hover:bg-slate-100 p-2 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-600"
                >
                  <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-medium">
                    {user?.name?.charAt(0) || "U"}
                  </div>
                </button>

                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-56 rounded-md border border-slate-200 bg-white shadow-lg py-1 z-50">
                    <div className="px-4 py-2 border-b border-slate-100">
                      <p className="text-sm font-medium text-slate-900">
                        {user?.name}
                      </p>
                      <p className="text-xs text-slate-500 truncate">
                        {user?.email}
                      </p>
                    </div>
                    <Link
                      to="/settings"
                      className="flex w-full items-center px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
                      onClick={() => setIsProfileOpen(false)}
                    >
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Settings</span>
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="flex w-full items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
