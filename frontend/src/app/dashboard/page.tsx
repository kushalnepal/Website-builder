"use client";

import { useAuth } from "@/components/AuthProvider";
import DarkModeToggle from "@/components/DarkModeToggle";
import { useTheme } from "@/components/ThemeProvider";
import { websitesAPI } from "@/lib/api";
import {
  Edit,
  Globe,
  Layout,
  LogOut,
  Plus,
  Sparkles,
  Trash2,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Website {
  id: string;
  name: string;
  slug: string;
  status: string;
  createdAt: string;
}

export default function DashboardPage() {
  const router = useRouter();
  const { user, logout } = useAuth();
  const { darkMode } = useTheme();
  const [websites, setWebsites] = useState<Website[]>([]);
  const [loading, setLoading] = useState(true);
  const [showNewPrompt, setShowNewPrompt] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [generating, setGenerating] = useState(false);

  useEffect(() => {
    if (!user) {
      router.push("/login");
      return;
    }
    fetchWebsites();
  }, [user]);

  const fetchWebsites = async () => {
    try {
      const res = await websitesAPI.list();
      setWebsites(res.data.websites);
    } catch (error) {
      console.error("Failed to fetch websites:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setGenerating(true);
    try {
      const res = await websitesAPI.generate({ prompt });
      router.push(`/builder/${res.data.website.id}`);
    } catch (error) {
      console.error("Failed to generate website:", error);
      alert("Failed to generate website");
    } finally {
      setGenerating(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this website?")) return;
    try {
      await websitesAPI.delete(id);
      setWebsites(websites.filter((w) => w.id !== id));
    } catch (error) {
      console.error("Failed to delete website:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <Sparkles className="w-8 h-8 text-primary-600" />
              <span className="text-xl font-bold text-gray-900 dark:text-white">
                BuildMySite
              </span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-gray-600 dark:text-gray-300">{user?.name}</span>
              <DarkModeToggle />
              <button
                onClick={() => {
                  logout();
                  router.push("/");
                }}
                className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
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

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* New Website Section */}
        <div className="mb-8">
          <button
            onClick={() => setShowNewPrompt(!showNewPrompt)}
            className="flex items-center gap-2 px-6 py-3 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition"
          >
            <Plus className="w-5 h-5" />
            Create New Website
          </button>

          {showNewPrompt && (
            <div className="mt-4 bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
                Describe your website
              </h3>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="A Nepali restaurant in Kathmandu..."
                className="w-full h-24 p-4 border border-gray-200 dark:border-gray-600 rounded-xl focus:border-primary-500 focus:outline-none resize-none bg-white dark:bg-gray-700 dark:text-white"
              />
              <button
                onClick={handleGenerate}
                disabled={generating || !prompt.trim()}
                className="mt-4 px-6 py-2 bg-primary-600 text-white rounded-xl hover:bg-primary-700 disabled:opacity-50"
              >
                {generating ? "Generating..." : "Generate Website"}
              </button>
            </div>
          )}
        </div>

        {/* Websites Grid */}
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Your Websites</h2>

        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          </div>
        ) : websites.length === 0 ? (
          <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-2xl">
            <Layout className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              No websites yet
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Create your first website to get started
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            {websites.map((site) => (
              <div
                key={site.id}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm overflow-hidden"
              >
                <div className="h-32 bg-gradient-to-br from-primary-100 to-primary-200 dark:from-primary-900 dark:to-primary-800 flex items-center justify-center">
                  <Layout className="w-12 h-12 text-primary-400" />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                    {site.name}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                    Created {new Date(site.createdAt).toLocaleDateString()}
                  </p>
                  <div className="flex items-center justify-between">
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        site.status === "published"
                          ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                          : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
                      }`}
                    >
                      {site.status}
                    </span>
                    <div className="flex gap-2">
                      <button
                        onClick={() => router.push(`/builder/${site.id}`)}
                        className="p-2 text-gray-400 hover:text-primary-600"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      {site.status === "published" && (
                        <button className="p-2 text-gray-400 hover:text-green-600">
                          <Globe className="w-4 h-4" />
                        </button>
                      )}
                      <button
                        onClick={() => handleDelete(site.id)}
                        className="p-2 text-gray-400 hover:text-red-600"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
