import { Outlet } from "react-router-dom";

export const TestLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <main className="flex-1 w-full">
        <Outlet />
      </main>
    </div>
  );
};
