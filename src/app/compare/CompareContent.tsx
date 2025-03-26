"use client";

import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { ArrowLeft, Maximize, RefreshCw } from "lucide-react";
import Link from "next/link";

export default function CompareContent() {
  const searchParams = useSearchParams();
  const url1 = searchParams.get("url1") || "";
  const url2 = searchParams.get("url2") || "";

  const [isLoading, setIsLoading] = useState(true);
  const [fullscreenFrame, setFullscreenFrame] = useState<string | null>(null);
  const [viewportSize, setViewportSize] = useState("desktop");

  useEffect(() => {
    // Set loading to false after a short delay to simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  // Handle viewport size changes
  const getViewportClass = () => {
    switch (viewportSize) {
      case "mobile":
        return "w-[375px]";
      case "tablet":
        return "w-[768px]";
      case "desktop":
      default:
        return "w-full";
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 dark:bg-gray-900 text-white flex flex-col">
      {/* Header - now a secondary header below the navbar */}
      <header className="bg-black/30 backdrop-blur-sm border-b border-white/10 p-4 mt-16">
        <div className="container mx-auto flex justify-between items-center">
          <Link
            href="/"
            className="flex items-center gap-2 text-white hover:text-purple-400 transition-colors"
          >
            <ArrowLeft size={18} />
            <span>Back to Home</span>
          </Link>

          <div className="flex items-center gap-4">
            <div className="flex bg-gray-800 rounded-lg p-1">
              <button
                onClick={() => setViewportSize("mobile")}
                className={`px-3 py-1 rounded-md text-sm ${
                  viewportSize === "mobile"
                    ? "bg-purple-600 text-white"
                    : "text-gray-400"
                }`}
              >
                Mobile
              </button>
              <button
                onClick={() => setViewportSize("tablet")}
                className={`px-3 py-1 rounded-md text-sm ${
                  viewportSize === "tablet"
                    ? "bg-purple-600 text-white"
                    : "text-gray-400"
                }`}
              >
                Tablet
              </button>
              <button
                onClick={() => setViewportSize("desktop")}
                className={`px-3 py-1 rounded-md text-sm ${
                  viewportSize === "desktop"
                    ? "bg-purple-600 text-white"
                    : "text-gray-400"
                }`}
              >
                Desktop
              </button>
            </div>

            <button
              onClick={() => {
                setIsLoading(true);
                setTimeout(() => setIsLoading(false), 1000);
              }}
              className="flex items-center gap-1 bg-gray-800 hover:bg-gray-700 rounded-lg px-3 py-1.5 text-sm transition-colors"
            >
              <RefreshCw size={14} />
              <span>Refresh</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 container mx-auto p-4">
        {fullscreenFrame ? (
          <div className="relative h-[calc(100vh-8rem)] bg-white/5 rounded-lg overflow-hidden">
            <div className="absolute top-4 right-4 z-10">
              <button
                onClick={() => setFullscreenFrame(null)}
                className="bg-black/70 hover:bg-black text-white p-2 rounded-full transition-colors"
              >
                <Maximize size={18} />
              </button>
            </div>
            <iframe
              src={
                fullscreenFrame === "url1"
                  ? decodeURIComponent(url1)
                  : decodeURIComponent(url2)
              }
              className="w-full h-full border-0"
              title={fullscreenFrame === "url1" ? "Website 1" : "Website 2"}
              sandbox="allow-same-origin allow-scripts"
              loading="lazy"
            />
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 h-[calc(100vh-8rem)]">
            {/* First website */}
            <div className="relative bg-white/5 rounded-lg overflow-hidden flex flex-col">
              <div className="bg-black/50 p-3 flex justify-between items-center border-b border-white/10">
                <h2 className="font-medium truncate">
                  {decodeURIComponent(url1)}
                </h2>
                <button
                  onClick={() => setFullscreenFrame("url1")}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <Maximize size={18} />
                </button>
              </div>

              <div className="flex-1 overflow-hidden flex justify-center bg-gray-800/50">
                {isLoading ? (
                  <div className="flex items-center justify-center h-full">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
                  </div>
                ) : (
                  <div
                    className={`h-full ${getViewportClass()} transition-all duration-300`}
                  >
                    <iframe
                      src={decodeURIComponent(url1)}
                      className="w-full h-full border-0"
                      title="Website 1"
                      sandbox="allow-same-origin allow-scripts"
                      loading="lazy"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Second website */}
            <div className="relative bg-white/5 rounded-lg overflow-hidden flex flex-col">
              <div className="bg-black/50 p-3 flex justify-between items-center border-b border-white/10">
                <h2 className="font-medium truncate">
                  {decodeURIComponent(url2)}
                </h2>
                <button
                  onClick={() => setFullscreenFrame("url2")}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <Maximize size={18} />
                </button>
              </div>

              <div className="flex-1 overflow-hidden flex justify-center bg-gray-800/50">
                {isLoading ? (
                  <div className="flex items-center justify-center h-full">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
                  </div>
                ) : (
                  <div
                    className={`h-full ${getViewportClass()} transition-all duration-300`}
                  >
                    <iframe
                      src={decodeURIComponent(url2)}
                      className="w-full h-full border-0"
                      title="Website 2"
                      sandbox="allow-same-origin allow-scripts"
                      loading="lazy"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-black/30 backdrop-blur-sm border-t border-white/10 p-4 text-center text-sm text-gray-400">
        Website Comparison Tool &copy; {new Date().getFullYear()} • Built with
        Next.js and Tailwind CSS
      </footer>
    </div>
  );
} 