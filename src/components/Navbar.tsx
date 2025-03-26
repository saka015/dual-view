"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Moon, Sun, Share2, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTheme } from "@/components/CustomThemeProvider";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle theme mounting
  useEffect(() => {
    setMounted(true);
  }, []);

  // Share functionality
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Website Comparison Tool",
          text: "Compare websites side by side with this amazing tool!",
          url: window.location.href,
        });
      } catch (error) {
        console.log("Error sharing:", error);
      }
    } else {
      // Fallback for browsers that don't support the Web Share API
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  // Add the scoring page to the navigation items
  const navItems = [
    { name: "Home", href: "/" },
    { name: "Features", href: "/features" },
    { name: "Compare", href: "/compare" },
    { name: "Score", href: "/score" },
    { name: "About", href: "/about" },
  ];

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? theme === "dark"
            ? "bg-black/80 backdrop-blur-md border-b border-white/10"
            : "bg-white/80 backdrop-blur-md border-b border-black/10"
          : "bg-transparent"
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-600 to-blue-500 flex items-center justify-center">
              <span className="text-white font-bold text-lg">D</span>
            </div>
            <span
              className={cn(
                "font-bold hidden sm:inline-block",
                theme === "dark" ? "text-white" : "text-gray-900"
              )}
            >
              DualView
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "transition-colors",
                  theme === "dark"
                    ? "text-gray-300 hover:text-white"
                    : "text-gray-700 hover:text-black"
                )}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center space-x-3">
            {/* Dark/Light mode toggle */}
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className={cn(
                "p-2 rounded-full transition-colors",
                theme === "dark"
                  ? "bg-gray-800 text-gray-200 hover:bg-gray-700"
                  : "bg-gray-200 text-gray-800 hover:bg-gray-300"
              )}
              aria-label="Toggle theme"
            >
              {mounted && theme === "dark" ? (
                <Sun size={18} />
              ) : (
                <Moon size={18} />
              )}
            </button>

            {/* Share button */}
            <button
              onClick={handleShare}
              className={cn(
                "p-2 rounded-full transition-colors",
                theme === "dark"
                  ? "bg-gray-800 text-gray-200 hover:bg-gray-700"
                  : "bg-gray-200 text-gray-800 hover:bg-gray-300"
              )}
              aria-label="Share"
            >
              <Share2 size={18} />
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={cn(
                "p-2 rounded-full transition-colors md:hidden",
                theme === "dark"
                  ? "bg-gray-800 text-gray-200 hover:bg-gray-700"
                  : "bg-gray-200 text-gray-800 hover:bg-gray-300"
              )}
              aria-label="Menu"
            >
              {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div
          className={cn(
            "md:hidden border-t",
            theme === "dark"
              ? "bg-gray-900 border-gray-800"
              : "bg-gray-100 border-gray-200"
          )}
        >
          <div className="container mx-auto px-4 py-3">
            <nav className="flex flex-col space-y-3">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "transition-colors py-2",
                    theme === "dark"
                      ? "text-gray-300 hover:text-white"
                      : "text-gray-700 hover:text-black"
                  )}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
