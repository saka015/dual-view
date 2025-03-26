"use client";

import { useState } from "react";
import { 
  analyzeResponsiveness, 
  analyzeAesthetics, 
  calculateOverallScore,
  getScoreRating,
  analyzeColorScheme,
  analyzeTypography,
  getResponsivenessBreakdown,
  getAestheticsBreakdown
} from "@/utils/scoringSystem";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function WebsiteScorer() {
  const [url, setUrl] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [scores, setScores] = useState<{
    responsive: number | null;
    aesthetic: number | null;
    overall: number | null;
  }>({
    responsive: null,
    aesthetic: null,
    overall: null,
  });
  
  const [colorAnalysis, setColorAnalysis] = useState<{
    score: number;
    palette: string[];
  } | null>(null);
  
  const [typographyAnalysis, setTypographyAnalysis] = useState<{
    score: number;
    fonts: string[];
  } | null>(null);
  
  const [responsiveBreakdown, setResponsiveBreakdown] = useState<{
    [key: string]: number;
  } | null>(null);
  
  const [aestheticsBreakdown, setAestheticsBreakdown] = useState<{
    [key: string]: number;
  } | null>(null);
  
  const [activeTab, setActiveTab] = useState("overview");

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!url) return;
    
    // Validate URL format
    try {
      new URL(url);
    } catch (err) {
      alert("Please enter a valid URL (including http:// or https://)");
      return;
    }
    
    setIsAnalyzing(true);
    setScores({ responsive: null, aesthetic: null, overall: null });
    setColorAnalysis(null);
    setTypographyAnalysis(null);
    setResponsiveBreakdown(null);
    setAestheticsBreakdown(null);
    
    try {
      // Run all analyses in parallel
      const [
        responsiveScore, 
        aestheticScore,
        colorData,
        typographyData,
        responsiveDetails,
        aestheticsDetails
      ] = await Promise.all([
        analyzeResponsiveness(url),
        analyzeAesthetics(url),
        analyzeColorScheme(url),
        analyzeTypography(url),
        getResponsivenessBreakdown(url),
        getAestheticsBreakdown(url)
      ]);
      
      const overall = calculateOverallScore(responsiveScore, aestheticScore);
      
      setScores({
        responsive: responsiveScore,
        aesthetic: aestheticScore,
        overall,
      });
      
      setColorAnalysis(colorData);
      setTypographyAnalysis(typographyData);
      setResponsiveBreakdown(responsiveDetails);
      setAestheticsBreakdown(aestheticsDetails);
      
    } catch (error) {
      console.error("Analysis failed:", error);
      alert("Failed to analyze the website. Please try again.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Function to render a score badge
  const renderScoreBadge = (score: number) => {
    let bgColor = "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300";
    if (score >= 90) bgColor = "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300";
    else if (score >= 80) bgColor = "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300";
    else if (score >= 70) bgColor = "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300";
    else if (score >= 60) bgColor = "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300";
    
    return (
      <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${bgColor}`}>
        {getScoreRating(score)}
      </span>
    );
  };

  // Function to render a factor score bar
  const renderFactorScore = (name: string, score: number, weight: number = 0) => (
    <div className="mb-3">
      <div className="flex justify-between items-center mb-1">
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {name} {weight > 0 && <span className="text-xs text-gray-500">({weight}%)</span>}
        </span>
        <div className="flex items-center">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300 mr-2">
            {score}
          </span>
          {renderScoreBadge(score)}
        </div>
      </div>
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
        <div 
          className={`h-2 rounded-full ${
            score >= 90 ? "bg-green-500" :
            score >= 80 ? "bg-blue-500" :
            score >= 70 ? "bg-yellow-500" :
            score >= 60 ? "bg-orange-500" :
            "bg-red-500"
          }`}
          style={{ width: `${score}%` }}
        ></div>
      </div>
    </div>
  );

  return (
    <div className="w-full max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
          Website Scoring System
        </h2>
        
        <form onSubmit={handleAnalyze} className="mb-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Enter website URL (e.g., https://example.com)"
              className="flex-grow px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              disabled={isAnalyzing}
            />
            <button
              type="submit"
              disabled={isAnalyzing}
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isAnalyzing ? "Analyzing..." : "Analyze"}
            </button>
          </div>
        </form>
      </div>
      
      {isAnalyzing && (
        <div className="text-center py-16">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-300">
            Analyzing website... This may take a moment.
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            We're checking responsiveness, design aesthetics, colors, typography, and more.
          </p>
        </div>
      )}
      
      {scores.overall !== null && (
        <div className="p-6">
          <div className="text-center p-6 bg-gray-50 dark:bg-gray-700 rounded-lg mb-6">
            <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">
              Overall Score
            </h3>
            <div className="text-5xl font-bold text-blue-600 dark:text-blue-400">
              {scores.overall}
              <span className="text-lg font-normal text-gray-500 dark:text-gray-400">/100</span>
            </div>
            <div className="mt-2">
              {renderScoreBadge(scores.overall)}
            </div>
            <div className="w-full max-w-md mx-auto mt-4 bg-gray-200 dark:bg-gray-600 rounded-full h-4">
              <div 
                className={`h-4 rounded-full ${
                  scores.overall >= 90 ? "bg-gradient-to-r from-green-400 to-green-500" :
                  scores.overall >= 80 ? "bg-gradient-to-r from-blue-400 to-blue-500" :
                  scores.overall >= 70 ? "bg-gradient-to-r from-yellow-400 to-yellow-500" :
                  scores.overall >= 60 ? "bg-gradient-to-r from-orange-400 to-orange-500" :
                  "bg-gradient-to-r from-red-400 to-red-500"
                }`}
                style={{ width: `${scores.overall}%` }}
              ></div>
            </div>
          </div>
          
          <Tabs defaultValue="overview" className="w-full" onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-4 mb-6">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="responsive">Responsiveness</TabsTrigger>
              <TabsTrigger value="design">Design</TabsTrigger>
              <TabsTrigger value="details">Details</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <h4 className="font-medium mb-3 text-gray-700 dark:text-gray-200">
                    Responsiveness
                  </h4>
                  <div className="flex items-end">
                    <span className="text-3xl font-bold text-green-600 dark:text-green-400">
                      {scores.responsive}
                    </span>
                    <span className="ml-1 text-sm text-gray-500 dark:text-gray-400">/100</span>
                  </div>
                  <div className="mt-2 w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2.5">
                    <div 
                      className="bg-green-600 h-2.5 rounded-full" 
                      style={{ width: `${scores.responsive}%` }}
                    ></div>
                  </div>
                  <div className="mt-2">
                    {renderScoreBadge(scores.responsive)}
                  </div>
                </div>
                
                <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <h4 className="font-medium mb-3 text-gray-700 dark:text-gray-200">
                    Design Aesthetics
                  </h4>
                  <div className="flex items-end">
                    <span className="text-3xl font-bold text-purple-600 dark:text-purple-400">
                      {scores.aesthetic}
                    </span>
                    <span className="ml-1 text-sm text-gray-500 dark:text-gray-400">/100</span>
                  </div>
                  <div className="mt-2 w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2.5">
                    <div 
                      className="bg-purple-600 h-2.5 rounded-full" 
                      style={{ width: `${scores.aesthetic}%` }}
                    ></div>
                  </div>
                  <div className="mt-2">
                    {renderScoreBadge(scores.aesthetic)}
                  </div>
                </div>
              </div>
              
              {colorAnalysis && (
                <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <h4 className="font-medium mb-3 text-gray-700 dark:text-gray-200">
                    Color Palette
                  </h4>
                  <div className="flex space-x-2 mb-3">
                    {colorAnalysis.palette.map((color, index) => (
                      <div 
                        key={index}
                        className="w-10 h-10 rounded-full border border-gray-300 dark:border-gray-600"
                        style={{ backgroundColor: color }}
                        title={color}
                      ></div>
                    ))}
                  </div>
                  <div className="flex items-center">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300 mr-2">
                      Color Harmony: {colorAnalysis.score}
                    </span>
                    {renderScoreBadge(colorAnalysis.score)}
                  </div>
                </div>
              )}
              
              {typographyAnalysis && (
                <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <h4 className="font-medium mb-3 text-gray-700 dark:text-gray-200">
                    Typography
                  </h4>
                  <div className="mb-3">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Detected Fonts:
                    </span>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {typographyAnalysis.fonts.map((font, index) => (
                        <span 
                          key={index}
                          className="px-2 py-1 bg-gray-200 dark:bg-gray-600 rounded text-xs"
                        >
                          {font}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300 mr-2">
                      Typography Score: {typographyAnalysis.score}
                    </span>
                    {renderScoreBadge(typographyAnalysis.score)}
                  </div>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="responsive" className="space-y-6">
              <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <h4 className="font-medium mb-4 text-gray-700 dark:text-gray-200">
                  Responsiveness Breakdown
                </h4>
                
                {responsiveBreakdown && (
                  <div className="space-y-4">
                    {renderFactorScore("Viewport Meta Configuration", responsiveBreakdown.viewportMeta, 10)}
                    {renderFactorScore("Media Queries Implementation", responsiveBreakdown.mediaQueries, 20)}
                    {renderFactorScore("Flexible Images & Media", responsiveBreakdown.flexibleImages, 15)}
                    {renderFactorScore("Touch Target Sizes", responsiveBreakdown.touchTargets, 10)}
                    {renderFactorScore("Font Scaling", responsiveBreakdown.fontScaling, 10)}
                    {renderFactorScore("No Horizontal Scrolling", responsiveBreakdown.noHorizontalScroll, 15)}
                    {renderFactorScore("Mobile Load Time", responsiveBreakdown.loadTimeMobile, 20)}
                  </div>
                )}
              </div>
              
              <div className="p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
                <h4 className="font-medium mb-2 text-blue-800 dark:text-blue-300">
                  Responsiveness Tips
                </h4>
                <ul className="list-disc list-inside space-y-1 text-sm text-gray-700 dark:text-gray-300">
                  <li>Use relative units (%, em, rem) instead of fixed pixels</li>
                  <li>Implement a mobile-first approach with progressive enhancement</li>
                  <li>Test on multiple devices and screen sizes</li>
                  <li>Ensure touch targets are at least 44x44 pixels</li>
                  <li>Optimize images for mobile devices</li>
                </ul>
              </div>
            </TabsContent>
            
            <TabsContent value="design" className="space-y-6">
              <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <h4 className="font-medium mb-4 text-gray-700 dark:text-gray-200">
                  Design Aesthetics Breakdown
                </h4>
                
                {aestheticsBreakdown && (
                  <div className="space-y-4">
                    {renderFactorScore("Color Harmony", aestheticsBreakdown.colorHarmony, 15)}
                    {renderFactorScore("Typography", aestheticsBreakdown.typography, 15)}
                    {renderFactorScore("Visual Hierarchy", aestheticsBreakdown.visualHierarchy, 20)}
                    {renderFactorScore("Design Consistency", aestheticsBreakdown.consistency, 15)}
                    {renderFactorScore("White Space Usage", aestheticsBreakdown.whiteSpace, 10)}
                    {renderFactorScore("Imagery Quality", aestheticsBreakdown.imageryQuality, 15)}
                    {renderFactorScore("Animations & Transitions", aestheticsBreakdown.animations, 10)}
                  </div>
                )}
              </div>
              
              <div className="p-4 bg-purple-50 dark:bg-purple-900/30 rounded-lg">
                <h4 className="font-medium mb-2 text-purple-800 dark:text-purple-300">
                  Design Tips
                </h4>
                <ul className="list-disc list-inside space-y-1 text-sm text-gray-700 dark:text-gray-300">
                  <li>Use a consistent color scheme with no more than 5 colors</li>
                  <li>Limit font families to 2-3 complementary choices</li>
                  <li>Maintain proper contrast for readability</li>
                  <li>Use white space effectively to create visual breathing room</li>
                  <li>Ensure consistent styling across all pages</li>
                </ul>
              </div>
            </TabsContent>
            
            <TabsContent value="details" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <h4 className="font-medium mb-3 text-gray-700 dark:text-gray-200">
                    Technical Details
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">URL Analyzed:</span>
                      <span className="font-medium text-gray-800 dark:text-gray-200 max-w-[200px] truncate">{url}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Analysis Date:</span>
                      <span className="font-medium text-gray-800 dark:text-gray-200">{new Date().toLocaleDateString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Analysis Time:</span>
                      <span className="font-medium text-gray-800 dark:text-gray-200">{new Date().toLocaleTimeString()}</span>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <h4 className="font-medium mb-3 text-gray-700 dark:text-gray-200">
                    Score Weighting
                  </h4>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2.5 mr-2">
                        <div className="bg-green-500 h-2.5 rounded-full" style={{ width: "60%" }}></div>
                      </div>
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300 whitespace-nowrap">
                        Responsiveness (60%)
                      </span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2.5 mr-2">
                        <div className="bg-purple-500 h-2.5 rounded-full" style={{ width: "40%" }}></div>
                      </div>
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300 whitespace-nowrap">
                        Design Aesthetics (40%)
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <h4 className="font-medium mb-3 text-gray-700 dark:text-gray-200">
                  Improvement Recommendations
                </h4>
                <div className="space-y-3">
                  <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded border-l-4 border-yellow-500">
                    <h5 className="font-medium text-yellow-800 dark:text-yellow-300">Responsiveness</h5>
                    <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                      {scores.responsive && scores.responsive < 80 ? 
                        "Improve mobile responsiveness by implementing better media queries and ensuring all elements scale properly on smaller screens." :
                        "Good job on responsiveness! Consider testing on more device sizes for even better results."
                      }
                    </p>
                  </div>
                  
                  <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded border-l-4 border-purple-500">
                    <h5 className="font-medium text-purple-800 dark:text-purple-300">Design Aesthetics</h5>
                    <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                      {scores.aesthetic && scores.aesthetic < 80 ? 
                        "Improve visual design by using a more consistent color palette and typography. Consider adding more white space between elements." :
                        "Great design work! For further improvement, consider refining your visual hierarchy to guide users' attention more effectively."
                      }
                    </p>
                  </div>
                  
                  <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded border-l-4 border-blue-500">
                    <h5 className="font-medium text-blue-800 dark:text-blue-300">Overall</h5>
                    <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                      {scores.overall && scores.overall < 80 ? 
                        "Focus on improving both responsiveness and design aesthetics for a better overall user experience." :
                        "Your website is performing well! For further improvements, consider optimizing load times and enhancing accessibility features."
                      }
                    </p>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      )}
    </div>
  );
} 