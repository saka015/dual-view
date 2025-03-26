"use client";

import { CardContainer, CardBody, CardItem } from "@/components/ui/3d-card";
import { useState } from "react";
import { useRouter } from "next/navigation";

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
      <CardContainer className="inter-var">
        <CardBody className="relative group/card bg-black/80 border-white/[0.2] w-auto sm:w-[32rem] h-auto rounded-xl p-8 border">
          <CardItem
            translateZ="50"
            className="text-2xl font-bold text-white mb-6"
          >
            Website Comparison Tool
          </CardItem>

          <CardItem
            as="p"
            translateZ="60"
            className="text-neutral-300 text-sm max-w-sm mb-8"
          >
            Enter two URLs below to compare websites side by side. Our tool
            analyzes performance, design, and SEO metrics.
          </CardItem>

          <div className="space-y-4 w-full">
            <CardItem translateZ="40" className="w-full">
              <div className="relative">
                <input
                  type="url"
                  value={url1}
                  onChange={(e) => setUrl1(e.target.value)}
                  placeholder="Enter first website URL"
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all"
                />
              </div>
            </CardItem>

            <CardItem translateZ="40" className="w-full">
              <div className="relative">
                <input
                  type="url"
                  value={url2}
                  onChange={(e) => setUrl2(e.target.value)}
                  placeholder="Enter second website URL"
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all"
                />
              </div>
            </CardItem>

            <CardItem translateZ="80" className="w-full mt-6">
              <button
                onClick={handleCompare}
                disabled={!url1 || !url2}
                className="w-full py-3 px-6 rounded-lg bg-gradient-to-r from-purple-600 to-blue-500 text-white font-medium text-sm hover:from-purple-700 hover:to-blue-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover-glow"
              >
                Compare Websites
              </button>
            </CardItem>
          </div>

          <CardItem
            translateZ="30"
            className="text-xs text-neutral-400 mt-8 text-center"
          >
            Powered by Aceternity UI • Instant analysis • No sign-up required
          </CardItem>
        </CardBody>
      </CardContainer>
    </div>
  );
}
