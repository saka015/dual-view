"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Home() {
  const [url1, setUrl1] = useState("");
  const [url2, setUrl2] = useState("");
  const router = useRouter();

  const handleCompare = () => {
    if (url1 && url2) {
      // Encode URLs to safely pass them as query parameters
      const encodedUrl1 = encodeURIComponent(url1);
      const encodedUrl2 = encodeURIComponent(url2);
      router.push(`/compare?url1=${encodedUrl1}&url2=${encodedUrl2}`);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 pb-12">
      <div className="flex flex-col w-full justify-center items-center">
          <Card className="bg-black/80 m-48 border-white/[0.2] w-auto sm:w-[32rem] rounded-xl p-0">
        <CardHeader className="p-8 pb-4">
          <CardTitle className="text-2xl font-bold text-white">
            Website Comparison Tool
          </CardTitle>
          <CardDescription className="text-neutral-300 text-sm max-w-sm">
            Enter two URLs below to compare websites side by side. Our tool
            analyzes performance, design, and SEO metrics.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4 p-8 pt-4">
          <div className="relative">
            <input
              type="url"
              value={url1}
              onChange={(e) => setUrl1(e.target.value)}
              placeholder="Enter first website URL"
              className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all"
            />
          </div>

          <div className="relative">
            <input
              type="url"
              value={url2}
              onChange={(e) => setUrl2(e.target.value)}
              placeholder="Enter second website URL"
              className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all"
            />
          </div>

          <Button
            onClick={handleCompare}
            disabled={!url1 || !url2}
            className="w-full py-6 px-6 mt-4 bg-gradient-to-r from-purple-600 to-blue-500 text-white font-medium text-sm hover:from-purple-700 hover:to-blue-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Compare Websites
          </Button>
        </CardContent>

        <CardFooter className="p-8 pt-0">
          <div className="text-xs text-neutral-400 text-center w-full">
            Powered by shadcn UI • Instant analysis • No sign-up required
          </div>
        </CardFooter>
      </Card>

      <div className="mt-16 text-center">
        <h2 className="text-2xl font-bold text-white mb-6">Our Tools</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto px-4">
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 hover:bg-white/15 transition-all">
            <div className="h-12 w-12 bg-gradient-to-br from-purple-600 to-blue-500 rounded-lg flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2 text-white">Website Scoring</h3>
            <p className="text-gray-300 mb-4">
              Analyze and score any website based on responsiveness and design aesthetics.
            </p>
            <Button
              onClick={() => router.push('/score')}
              className="w-full py-2 px-4 bg-white/10 hover:bg-white/20 text-white font-medium text-sm transition-all duration-300"
            >
              Try it now
            </Button>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 hover:bg-white/15 transition-all">
            <div className="h-12 w-12 bg-gradient-to-br from-purple-600 to-blue-500 rounded-lg flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2 text-white">Website Comparison</h3>
            <p className="text-gray-300 mb-4">
              Compare two websites side by side to analyze differences and similarities.
            </p>
            <Button
              onClick={() => {
                document.querySelector('input')?.focus();
              }}
              className="w-full py-2 px-4 bg-white/10 hover:bg-white/20 text-white font-medium text-sm transition-all duration-300"
            >
              Compare now
            </Button>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 hover:bg-white/15 transition-all">
            <div className="h-12 w-12 bg-gradient-to-br from-purple-600 to-blue-500 rounded-lg flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2 text-white">Design Insights</h3>
            <p className="text-gray-300 mb-4">
              Get detailed insights about website design, colors, typography, and more.
            </p>
            <Button
              onClick={() => router.push('/features')}
              className="w-full py-2 px-4 bg-white/10 hover:bg-white/20 text-white font-medium text-sm transition-all duration-300"
            >
              Learn more
            </Button>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}
