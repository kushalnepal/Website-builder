"use client";

import { useAuth } from "@/components/AuthProvider";
import DarkModeToggle from "@/components/DarkModeToggle";
import { useTheme } from "@/components/ThemeProvider";
import { websitesAPI } from "@/lib/api";
import {
  ArrowRight,
  Globe,
  Palette,
  Shield,
  Sparkles,
  Zap,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function HomePage() {
  const router = useRouter();
  const { user } = useAuth();
  const { darkMode } = useTheme();
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;

    if (!user) {
      router.push("/login");
      return;
    }

    setLoading(true);
    try {
      const res = await websitesAPI.generate({ prompt });
      router.push(`/builder/${res.data.website.id}`);
    } catch (error) {
      console.error("Failed to generate website:", error);
      alert("Failed to generate website. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const features = [
    {
      icon: Sparkles,
      title: "AI-Powered",
      description:
        "Describe your business and let AI build your website instantly",
    },
    {
      icon: Zap,
      title: "Fast & Easy",
      description: "Get a complete website in seconds, not hours",
    },
    {
      icon: Palette,
      title: "Beautiful Designs",
      description: "Modern, responsive designs that look great on all devices",
    },
    {
      icon: Globe,
      title: "Publish Online",
      description: "Share your website with the world instantly",
    },
    {
      icon: Shield,
      title: "Secure & Reliable",
      description: "Your data is safe with enterprise-grade security",
    },
  ];

  const categories = [
    {
      name: "Restaurant",
      image:
        "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400",
      count: "120+ templates",
    },
    {
      name: "Trekking",
      image:
        "https://images.unsplash.com/photo-1486911278844-a81c5267e227?w=400",
      count: "80+ templates",
    },
    {
      name: "Shop",
      image:
        "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400",
      count: "200+ templates",
    },
    {
      name: "Portfolio",
      image:
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400",
      count: "150+ templates",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <Sparkles className="w-8 h-8 text-primary-600" />
              <span className="text-xl font-bold text-gray-900 dark:text-white">
                BuildMySite
              </span>
            </div>
            <nav className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
                Features
              </a>
              <a
                href="#templates"
                className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
              >
                Templates
              </a>
              <a href="#pricing" className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
                Pricing
              </a>
              <DarkModeToggle />
              {user ? (
                <button
                  onClick={() => router.push("/dashboard")}
                  className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition"
                >
                  Dashboard
                </button>
              ) : (
                <>
                  <button
                    onClick={() => router.push("/login")}
                    className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => router.push("/register")}
                    className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition"
                  >
                    Get Started
                  </button>
                </>
              )}
            </nav>
          </div>
        </div>
      </header>

      {/* Balen City Below Navbar */}
      <div className="pt-16 text-center">
        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Powered by </span>
        <img
          src={darkMode ? "https://images.mykhel.com/webp/common_dynamic/images/olympics/country_flag/NEP.svg" : "https://static.vecteezy.com/system/resources/thumbnails/034/800/655/small_2x/the-national-flag-of-nepal-with-official-color-and-proportion-transparent-free-png.png"}
          alt="Balen City"
          className="h-6 w-auto inline mx-1"
        />
        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Balen City</span>
      </div>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6 animate-fade-in">
            Create Beautiful Websites
            <span className="text-primary-600"> with AI</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-10 max-w-2xl mx-auto">
            Describe your business, and our AI will generate a stunning website
            in seconds. No coding required - just tell us what you need.
          </p>

          {/* Prompt Input */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Describe your website... (e.g., A Nepali restaurant in Kathmandu called Himalayan Kitchen serving traditional momos and thali)"
                className="w-full h-32 p-4 pr-4 text-lg border-2 border-gray-200 dark:border-gray-700 rounded-2xl resize-none focus:border-primary-500 focus:outline-none transition bg-white dark:bg-gray-800 dark:text-white dark:placeholder-gray-400"
              />
              <button
                onClick={handleGenerate}
                disabled={loading || !prompt.trim()}
                className="absolute bottom-4 right-4 px-6 py-2 bg-primary-600 text-white rounded-xl font-medium hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition flex items-center gap-2"
              >
                {loading ? (
                  <>
                    <Sparkles className="w-5 h-5 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    Generate <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Quick Suggestions */}
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            {[
              "Restaurant in Kathmandu",
              "Trekking agency",
              "E-commerce shop",
              "Portfolio",
            ].map((tag) => (
              <button
                key={tag}
                onClick={() => setPrompt(tag)}
                className="px-4 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 text-sm transition"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
            Why Choose BuildMySite?
          </h2>
          <div className="grid md:grid-cols-5 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-700 p-6 rounded-2xl shadow-sm hover:shadow-md transition"
              >
                <feature.icon className="w-10 h-10 text-primary-600 mb-4" />
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Templates Section */}
      <section id="templates" className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-4">
            Popular Categories
          </h2>
          <p className="text-center text-gray-600 dark:text-gray-300 mb-12">
            Start with a template and customize it to your needs
          </p>
          <div className="grid md:grid-cols-4 gap-6">
            {categories.map((cat, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-2xl cursor-pointer"
              >
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-64 object-cover group-hover:scale-105 transition duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-xl font-semibold">{cat.name}</h3>
                  <p className="text-sm text-gray-300">{cat.count}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary-600">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Build Your Website?
          </h2>
          <p className="text-primary-100 mb-8 text-lg">
            Join thousands of businesses already using BuildMySite
          </p>
          <button
            onClick={() =>
              user ? router.push("/dashboard") : router.push("/register")
            }
            className="px-8 py-3 bg-white text-primary-600 rounded-xl font-semibold hover:bg-gray-100 transition"
          >
            Get Started for Free
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-gray-900 text-gray-400">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-1 mb-4 md:mb-0">
              <a
                href="https://balencity.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="https://images.mykhel.com/webp/common_dynamic/images/olympics/country_flag/NEP.svg"
                  alt="Balen City"
                  className="h-10 w-auto"
                />
              </a>
              <span className="text-red-500 font-bold text-xl tracking-wide">
                Balen City
              </span>
            </div>
            <div className="flex gap-6 text-sm">
              <a href="#" className="hover:text-white transition">
                Privacy
              </a>
              <a href="#" className="hover:text-white transition">
                Terms
              </a>
              <a href="#" className="hover:text-white transition">
                Contact
              </a>
            </div>
          </div>
          <p className="mt-4 text-sm text-center">
            © 2024 BuildMySite. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
