import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/context";
import { MainLayout, TestLayout } from "@/components/layout";
import { ProtectedRoute, PublicOnlyRoute } from "@/components/shared";
import {
  Landing,
  Login,
  Register,
  Dashboard,
  Generate,
  GenerationDetail,
  Test,
  Results,
  Settings,
} from "@/pages";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Landing />} />

            <Route element={<PublicOnlyRoute />}>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Route>

            <Route element={<ProtectedRoute />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/generate" element={<Generate />} />
              <Route path="/generations/:id" element={<GenerationDetail />} />
              <Route path="/results/:id" element={<Results />} />
              <Route path="/settings" element={<Settings />} />
            </Route>
          </Route>

          <Route element={<ProtectedRoute />}>
            <Route element={<TestLayout />}>
              <Route path="/test/:id" element={<Test />} />
            </Route>
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
