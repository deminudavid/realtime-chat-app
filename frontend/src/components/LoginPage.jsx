import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Eye, EyeClosed, EyeOff, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import AuthImagePattern from "./AuthImagePattern";
import toast from "react-hot-toast";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { login, isLoggingIn } = useAuthStore();

  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validateForm = () => {
    const { email, password } = formData;

    if (!email.trim()) {
      toast.error("Email is required");
      return false;
    }

    if (!isValidEmail(email)) {
      toast.error("Please enter a valid email address");
      return false;
    }

    if (!password) {
      toast.error("Password is required");
      return false;
    }

    if (password.length < 8) {
      toast.error("Password must be at least 8 characters");
      return false;
    }

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const success = validateForm();

    if (success === true) login(formData);
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left: Form */}
      <div className="flex items-center justify-center relative z-10">
        {/* Overlay card */}
        <div className="w-full max-w-md p-8 bg-base-100/90 backdrop-blur-lg shadow-xl rounded-xl">
          <h2 className="text-3xl font-bold text-center mb-6">Welcome back</h2>

          <form
            onSubmit={handleSubmit}
            className="space-y-4"
          >
            <div>
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                className="input input-bordered w-full"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </div>

            <div>
              <label className="label">
                <span className="label-text">Password</span>
              </label>

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="input input-bordered w-full pr-12"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-3 flex items-center text-sm text-gray-500"
                >
                  {showPassword ? (
                    <EyeOff className="size-4" />
                  ) : (
                    <Eye className="size-4" />
                  )}
                </button>
              </div>
            </div>

            <button
              className="btn btn-primary w-full mt-4"
              disabled={isLoggingIn}
            >
              {isLoggingIn ? (
                <>
                  <Loader2 className="size-5 animate-spin" />
                  Loading...
                </>
              ) : (
                "Login"
              )}
            </button>

            <p className="text-center text-sm mt-4">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="link link-primary"
              >
                Sign up
              </Link>
            </p>
          </form>
        </div>
      </div>

      {/* Right: Background Image */}
      <AuthImagePattern
        title="Welcome back!"
        subtitle="Sign in to continue your conversations and catch up with your messages"
      />

      {/* Background image for small screens */}
      <div
        className="
          lg:hidden
          absolute inset-0 -z-10
          bg-cover bg-center
        "
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f')",
        }}
      />
    </div>
  );
};

export default LoginPage;
