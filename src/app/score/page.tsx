import WebsiteScorer from "@/components/WebsiteScorer";

export const metadata = {
  title: 'Website Scoring System',
  description: 'Analyze and score websites based on responsiveness and design aesthetics',
};

export default function ScorePage() {
  return (
    <main className="container mx-auto py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-2 text-center">Website Scoring System</h1>
        <p className="text-gray-600 dark:text-gray-300 text-center mb-8">
          Analyze any website and get a detailed score based on responsiveness and design aesthetics
        </p>
        
        <WebsiteScorer />
        
        <div className="mt-12 bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">How Our Scoring Works</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-2">Responsiveness (60% of total score)</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-2">
                We analyze how well a website adapts to different screen sizes and devices.
              </p>
              <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-300">
                <li>Proper viewport configuration</li>
                <li>Effective use of media queries</li>
                <li>Flexible images and media</li>
                <li>Appropriate touch target sizes</li>
                <li>Font scaling and readability</li>
                <li>No horizontal scrolling on mobile</li>
                <li>Mobile page load performance</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-2">Design Aesthetics (40% of total score)</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-2">
                We evaluate the visual appeal and design quality of the website.
              </p>
              <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-300">
                <li>Color harmony and palette usage</li>
                <li>Typography and readability</li>
                <li>Visual hierarchy and content organization</li>
                <li>Design consistency across pages</li>
                <li>Effective use of white space</li>
                <li>Image and graphic quality</li>
                <li>Animation and transition quality</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 