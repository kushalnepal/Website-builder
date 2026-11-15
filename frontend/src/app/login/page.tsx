"use client";

import { useAuth } from "@/components/AuthProvider";
import DarkModeToggle from "@/components/DarkModeToggle";
import { useTheme } from "@/components/ThemeProvider";
import { ArrowRight, Lock, Mail, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const { login, user } = useAuth();
  const { darkMode } = useTheme();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, [user, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await login(email, password);
      router.push("/");
    } catch (err: any) {
      setError(err.response?.data?.error || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <button
                onClick={() => router.push("/")}
                className="flex items-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-8 h-8 text-primary-600" />
                <span className="text-xl font-bold text-gray-900 dark:text-white">
                  BuildMySite
                </span>
              </button>
            </div>
            <DarkModeToggle />
          </div>
        </div>
      </header>

      {/* Balen City Below Navbar */}
      <div className="bg-gray-50 dark:bg-gray-900 py-2 text-center">
        <span className="text-sm font-medium text-gray-500">Powered by </span>
        <img
          src={darkMode ? "https://images.mykhel.com/webp/common_dynamic/images/olympics/country_flag/NEP.svg" : "https://static.vecteezy.com/system/resources/thumbnails/034/800/655/small_2x/the-national-flag-of-nepal-with-official-color-and-proportion-transparent-free-png.png"}
          alt="Balen City"
          className="h-6 w-auto inline mx-1"
        />
        <span className="text-sm font-medium text-gray-500">Balen City</span>
      </div>

      <div className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="max-w-md w-full">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Welcome Back</h1>
            <p className="text-gray-600 dark:text-gray-300 mt-2">Sign in to continue building</p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="p-3 bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-lg text-sm">
                  {error}
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl focus:border-primary-500 focus:outline-none transition bg-white dark:bg-gray-700 dark:text-white"
                    placeholder="you@example.com"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl focus:border-primary-500 focus:outline-none transition bg-white dark:bg-gray-700 dark:text-white"
                    placeholder="••••••••"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-primary-600 text-white rounded-xl font-medium hover:bg-primary-700 disabled:opacity-50 transition flex items-center justify-center gap-2"
              >
                {loading ? "Signing in..." : "Sign In"}
                <ArrowRight className="w-5 h-5" />
              </button>
            </form>

            <p className="mt-6 text-center text-gray-600 dark:text-gray-300">
              Don't have an account?{" "}
              <button
                onClick={() => router.push("/register")}
                className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium"
              >
                Sign up
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
