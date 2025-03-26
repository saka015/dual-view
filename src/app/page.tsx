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
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 pt-16">
      <Card className="bg-black/80 border-white/[0.2] w-auto sm:w-[32rem] rounded-xl p-0">
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
            className="w-full py-3 px-6 mt-4 bg-gradient-to-r from-purple-600 to-blue-500 text-white font-medium text-sm hover:from-purple-700 hover:to-blue-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
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
    </div>
  );
}
