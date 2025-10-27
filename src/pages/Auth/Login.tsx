import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm, type SubmitHandler } from "react-hook-form";
import { Badge } from "@/components/ui/badge";
import { loginUser } from "@/services/authapi";
import { loginUserAction } from "@/slice/authSlice";
import type { AppDispatch } from "@/store";
import { useMutation } from "@tanstack/react-query";
import { Lock, Mail } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import SwipeToVerify from "./SwipeToVerify";

interface IFormInputLogin {
  emailAddress: string;
  password: string;
}

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInputLogin>();

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { isAuthenticated, isLoading } = useSelector(
    (state: { auth: { isAuthenticated: boolean; isLoading: boolean } }) =>
      state.auth
  );

  const [showSwipeToVerify, setShowSwipeToVerify] = useState(false);

  // Redirect if already logged in
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const mutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      if (!data?.token) {
        toast.error("Login failed. No token returned.");
        return;
      }

      dispatch(loginUserAction(data));
      toast.success("Logged in successfully!");
      navigate("/");
    },
    onError: (error: unknown) => {
      const errorMessage =
        error && typeof error === "object" && "message" in error
          ? (error as { message?: string }).message
          : "Something went wrong";
      toast.error(errorMessage || "Something went wrong");
    },
  });

  const onSubmit: SubmitHandler<IFormInputLogin> = (data) => {
    mutation.mutate(data);
  };

  if (isLoading) {
    return <div className="text-center p-4">Loading...</div>;
  }

  const handleVerify = () => {
    //console.log("✅ User Verified!");
    setShowSwipeToVerify(true);
  };

  return (
    <div className="mt-5  flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-3xl font-bold tracking-tight">
            <div className="flex items-center justify-center">
              DevMeld
              <Badge className="mr-2 mx-2">Welcome Back</Badge>
            </div>
          </CardTitle>
          <CardDescription>Sign in to your account to continue</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Email Field */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium">
                Email Address
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  className="pl-10 h-11"
                  {...register("emailAddress", {
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address",
                    },
                  })}
                />
              </div>
              {errors.emailAddress && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.emailAddress.message}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium">
                Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  className="pl-10 h-11"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  })}
                />
              </div>
              {errors.password && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {
              showSwipeToVerify ? 
                <>
              {/* Submit Button */}
            <Button
              type="submit"
              className="w-full"
              disabled={mutation.isPending}
            >
              {mutation.isPending ? "Loading..." : "Sign In"}
            </Button>
            </>:

               <SwipeToVerify onVerified={handleVerify} />
            }

            
          </form>

          {/* Sign Up Link */}
          <div className="text-center">
            <p className="text-sm">
              Don't have an account?{" "}
              <Link to="/signup">
                <button className="text-blue-600 hover:text-blue-800 hover:underline font-medium transition-colors">
                  Sign up here
                </button>
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
