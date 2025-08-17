import { Badge } from "@/components/ui/badge";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { registerUser } from "@/services/authapi";
import { useMutation } from "@tanstack/react-query";
import { Plus, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router";
import { toast } from "sonner";

type ExperienceLevel = "Beginner" | "Intermediate" | "Advanced" | "Expert";

interface IFormInput {
  fullName: string;
  emailAddress: string;
  password: string;
  skills: string[];
  experienceLevel: ExperienceLevel;
}

export default function Register() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<IFormInput>({
    defaultValues: {
      skills: [],
    },
  });

  const [skills, setSkills] = useState<string[]>([]);
  const [currentSkill, setCurrentSkill] = useState("");
  const [experienceLevel, setExperienceLevel] = useState<ExperienceLevel | "">(
    ""
  );
  const { isAuthenticated } = useSelector(
    (state: { auth: { isAuthenticated: boolean } }) => state.auth
  );

  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: registerUser,
    onSuccess: () => {
      navigate("/signin");
      toast.success("Registered successfully! Please log in.");
    },
    onError: (error: unknown) => {
      const errorMessage =
        error && typeof error === "object" && "message" in error
          ? (error as { message?: string }).message
          : "Something went wrong";
      toast.error(errorMessage || "Something went wrong");
    },
  });

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    const formData = {
      ...data,
      skills: skills,
      experienceLevel: experienceLevel as ExperienceLevel,
    };
    mutation.mutate(formData);
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const addSkill = () => {
    if (currentSkill.trim() && !skills.includes(currentSkill.trim())) {
      const newSkills = [...skills, currentSkill.trim()];
      setSkills(newSkills);
      setValue("skills", newSkills);
      setCurrentSkill("");
    }
  };

  const removeSkill = (skillToRemove: string) => {
    const newSkills = skills.filter((skill) => skill !== skillToRemove);
    setSkills(newSkills);
    setValue("skills", newSkills);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addSkill();
    }
  };

  return (
    <div className="flex mt-5 items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            <div className="flex items-center justify-center">
              DevMeld
              <Badge className="mr-2 mx-2">Create Account</Badge>
            </div>
          </CardTitle>
          <CardDescription className="text-center">
            Enter your information to create your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                placeholder="Enter your full name"
                {...register("fullName", { required: "Full name is required" })}
              />
              {errors.fullName && (
                <p className="text-sm text-red-500">
                  {errors.fullName.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="emailAddress">Email Address</Label>
              <Input
                id="emailAddress"
                type="email"
                placeholder="Enter your email"
                {...register("emailAddress", {
                  required: "Email is required",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Invalid email address",
                  },
                })}
              />
              {errors.emailAddress && (
                <p className="text-sm text-red-500">
                  {errors.emailAddress.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Create a password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
              />
              {errors.password && (
                <p className="text-sm text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="experienceLevel">Experience Level</Label>
              <Select
                onValueChange={(value) =>
                  setExperienceLevel(value as ExperienceLevel)
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select your experience level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Beginner">Beginner</SelectItem>
                  <SelectItem value="Intermediate">Intermediate</SelectItem>
                  <SelectItem value="Advanced">Advanced</SelectItem>
                  <SelectItem value="Expert">Expert</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="skills">Skills</Label>
              <div className="flex gap-2">
                <Input
                  id="skills"
                  placeholder="e.g. JavaScript"
                  value={currentSkill}
                  onChange={(e) => setCurrentSkill(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="flex-1"
                />
                <Button
                  type="button"
                  onClick={addSkill}
                  size="sm"
                  variant="outline"
                  className="px-3 bg-transparent"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>

              {skills.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {skills.map((skill, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="flex items-center gap-1"
                    >
                      {skill}
                      <button
                        type="button"
                        onClick={() => removeSkill(skill)}
                        className="ml-1 hover:bg-gray-300 rounded-full p-0.5"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              )}
              <p className="text-xs text-gray-500">
                Press Enter or click + to add a skill
              </p>
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={mutation.isPending}
            >
              {mutation.isPending ? "Creating..." : "Create Account"}
            </Button>
          </form>
          <div className="text-center mt-4">
            <p className="text-sm">
              {"Already have an account? "}
              <Link to="/signin">
                <button className="text-blue-600 hover:text-blue-800 hover:underline font-medium transition-colors">
                  Sign in here
                </button>
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
