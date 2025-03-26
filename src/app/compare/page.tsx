"use client";

import { useSearchParams } from "next/navigation";
import { useState, useEffect, Suspense } from "react";
import { ArrowLeft, Maximize, RefreshCw } from "lucide-react";
import Link from "next/link";
import CompareContent from "./CompareContent";

export default function ComparePage() {
  return (
    <Suspense fallback={<ComparePageLoading />}>
      <CompareContent />
    </Suspense>
  );
}

function ComparePageLoading() {
  return (
    <div className="min-h-screen bg-gray-900 dark:bg-gray-900 text-white flex flex-col">
      <header className="bg-black/30 backdrop-blur-sm border-b border-white/10 p-4 mt-16">
        <div className="container mx-auto flex justify-between items-center">
          <div className="h-6 w-32 bg-gray-800 rounded animate-pulse"></div>
          <div className="flex items-center gap-4">
            <div className="h-8 w-48 bg-gray-800 rounded animate-pulse"></div>
            <div className="h-8 w-24 bg-gray-800 rounded animate-pulse"></div>
          </div>
        </div>
      </header>

      <main className="flex-1 container mx-auto p-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 h-[calc(100vh-8rem)]">
          <div className="bg-white/5 rounded-lg overflow-hidden flex flex-col">
            <div className="bg-black/50 p-3 flex justify-between items-center border-b border-white/10">
              <div className="h-6 w-48 bg-gray-800 rounded animate-pulse"></div>
            </div>
            <div className="flex-1 flex items-center justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
            </div>
          </div>

          <div className="bg-white/5 rounded-lg overflow-hidden flex flex-col">
            <div className="bg-black/50 p-3 flex justify-between items-center border-b border-white/10">
              <div className="h-6 w-48 bg-gray-800 rounded animate-pulse"></div>
            </div>
            <div className="flex-1 flex items-center justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-black/30 backdrop-blur-sm border-t border-white/10 p-4 text-center text-sm text-gray-400">
        Website Comparison Tool &copy; {new Date().getFullYear()} • Built with
        Next.js and Tailwind CSS
      </footer>
    </div>
  );
}
