import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { GraduationCap } from "lucide-react";
import {
  Button,
  Input,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui";
import { useAuth } from "@/hooks";

const registerSchema = z.object({
  name: z.string().optional(),
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

type RegisterValues = z.infer<typeof registerSchema>;

export const Register = () => {
  const { register: registerUser } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterValues>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterValues) => {
    setLoading(true);
    setError(null);
    try {
      await registerUser(data.email, data.password, data.name);
      navigate("/dashboard");
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Failed to create account";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-slate-50">
      <Card className="w-full max-w-md shadow-lg border-slate-200">
        <CardHeader className="space-y-1 items-center text-center">
          <div className="bg-blue-600 p-2 rounded-lg text-white mb-4">
            <GraduationCap size={32} />
          </div>
          <CardTitle className="text-2xl">Create your account</CardTitle>
          <CardDescription>
            Start generating exam questions in seconds
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input
              id="name"
              type="text"
              placeholder="John Doe"
              label="Name (Optional)"
              {...register("name")}
            />
            <Input
              id="email"
              type="email"
              placeholder="name@example.com"
              label="Email"
              error={errors.email?.message}
              {...register("email")}
            />
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              label="Password"
              error={errors.password?.message}
              {...register("password")}
            />
            <p className="text-xs text-slate-500">Minimum 8 characters</p>
            {error && (
              <p className="text-sm font-medium text-red-600 text-center">
                {error}
              </p>
            )}
            <Button type="submit" className="w-full mt-4" isLoading={loading}>
              Create Account
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2 text-center text-sm text-slate-600">
          <div>
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              Log in
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};
