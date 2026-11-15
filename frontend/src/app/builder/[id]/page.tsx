"use client";

import { useAuth } from "@/components/AuthProvider";
import DarkModeToggle from "@/components/DarkModeToggle";
import { useTheme } from "@/components/ThemeProvider";
import WebsiteRenderer from "@/components/WebsiteRenderer";
import { websitesAPI } from "@/lib/api";
import { ArrowLeft, Edit2, Eye, Globe, LogOut, Sparkles } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface WebsiteData {
  id: string;
  name: string;
  slug: string;
  websiteJson: any;
  theme: any;
  status: string;
  publishedUrl?: string;
}

export default function BuilderPage() {
  const router = useRouter();
  const params = useParams();
  const { user, logout } = useAuth();
  const { darkMode } = useTheme();
  const [website, setWebsite] = useState<WebsiteData | null>(null);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState<"editor" | "preview">("editor");
  const [editPrompt, setEditPrompt] = useState("");
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    if (!user) {
      router.push("/login");
      return;
    }
    fetchWebsite();
  }, [user]);

  const fetchWebsite = async () => {
    try {
      const res = await websitesAPI.get(params.id as string);
      setWebsite(res.data.website);
    } catch (error) {
      console.error("Failed to fetch website:", error);
      router.push("/dashboard");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = async () => {
    if (!editPrompt.trim() || !website) return;
    setEditing(true);
    try {
      const res = await websitesAPI.edit(website.id, {
        instruction: editPrompt,
      });
      setWebsite(res.data.website);
      setEditPrompt("");
    } catch (error) {
      console.error("Failed to edit website:", error);
      alert("Failed to edit website");
    } finally {
      setEditing(false);
    }
  };

  const handlePublish = async () => {
    if (!website) return;
    try {
      const res = await websitesAPI.publish(website.id);
      setWebsite(res.data.website);
      alert("Website published successfully!");
    } catch (error) {
      console.error("Failed to publish website:", error);
      alert("Failed to publish website");
    }
  };

  if (loading || !website) {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <Sparkles className="w-12 h-12 text-primary-600 mx-auto animate-pulse" />
          <p className="mt-4 text-gray-600 dark:text-gray-300">Loading website...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-4">
              <button
                onClick={() => router.push("/dashboard")}
                className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => router.push("/dashboard")}
                  className="flex items-center gap-2 hover:opacity-80"
                >
                  <Sparkles className="w-8 h-8 text-primary-600" />
                  <span className="text-xl font-bold text-gray-900 dark:text-white">
                    BuildMySite
                  </span>
                </button>
              </div>
              <span className="text-gray-400">/</span>
              <span className="text-gray-600 dark:text-gray-300">{website.name}</span>
            </div>
            <div className="flex items-center gap-2">
              <DarkModeToggle />
              <span
                className={`px-2 py-1 text-xs rounded-full ${
                  website.status === "published"
                    ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                    : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
                }`}
              >
                {website.status}
              </span>
              <button
                onClick={() => setView("editor")}
                className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                title="Edit Website"
              >
                <Edit2 className="w-5 h-5" />
              </button>
              <button
                onClick={() => setView("preview")}
                className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                title="Preview Mode"
              >
                <Eye className="w-5 h-5" />
              </button>
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

      <div className="flex">
        {/* Editor Sidebar */}
        {view === "editor" && (
          <div className="w-80 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 h-[calc(100vh-120px)] overflow-y-auto">
            <div className="p-4">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Edit Website</h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    What would you like to change?
                  </label>
                  <textarea
                    value={editPrompt}
                    onChange={(e) => setEditPrompt(e.target.value)}
                    placeholder="e.g., Change the hero title to 'Best Pizza in Town'"
                    className="w-full h-24 p-3 border border-gray-200 dark:border-gray-600 rounded-lg focus:border-primary-500 focus:outline-none resize-none bg-white dark:bg-gray-700 dark:text-white"
                  />
                  <button
                    onClick={handleEdit}
                    disabled={editing || !editPrompt.trim()}
                    className="mt-2 w-full py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 transition"
                  >
                    {editing ? "Applying..." : "Apply Changes"}
                  </button>
                </div>

                <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                  <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                    Quick Actions
                  </h4>
                  <div className="space-y-2">
                    <button
                      onClick={() =>
                        setEditPrompt(
                          "Change the hero section title to something more catchy",
                        )
                      }
                      className="w-full text-left px-3 py-2 text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg"
                    >
                      Update Hero Title
                    </button>
                    <button
                      onClick={() =>
                        setEditPrompt(
                          "Add a new service section with 3 services",
                        )
                      }
                      className="w-full text-left px-3 py-2 text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg"
                    >
                      Add Services
                    </button>
                    <button
                      onClick={() =>
                        setEditPrompt(
                          "Update the color theme to blue and white",
                        )
                      }
                      className="w-full text-left px-3 py-2 text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg"
                    >
                      Change Colors
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Preview Area */}
        <div
          className={`flex-1 ${view === "editor" ? "w-[calc(100%-320px)]" : ""}`}
        >
          <div className="p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-semibold text-gray-900 dark:text-white">Preview</h2>
              <div className="flex gap-2">
                {website.publishedUrl ? (
                  <a
                    href={website.publishedUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition flex items-center gap-2"
                  >
                    <Globe className="w-4 h-4" />
                    View Live
                  </a>
                ) : (
                  <button
                    onClick={handlePublish}
                    className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition flex items-center gap-2"
                  >
                    <Globe className="w-4 h-4" />
                    Publish
                  </button>
                )}
              </div>
            </div>
            <div
              className="bg-gray-200 dark:bg-gray-700 rounded-xl overflow-hidden"
              style={{ height: "calc(100vh - 200px)" }}
            >
              <WebsiteRenderer data={website.websiteJson} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
