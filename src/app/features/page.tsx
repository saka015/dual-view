import React from "react";
import {
  FiCloud,
  FiShield,
  FiZap,
  FiSmartphone,
  FiUsers,
  FiBarChart2,
} from "react-icons/fi";

export default function FeaturesPage() {
  const features = [
    {
      icon: <FiCloud className="w-10 h-10 text-primary" />,
      title: "Cloud Integration",
      description:
        "Seamlessly sync your data across all devices with our secure cloud infrastructure.",
    },
    {
      icon: <FiShield className="w-10 h-10 text-primary" />,
      title: "Advanced Security",
      description:
        "Enterprise-grade encryption and security protocols to keep your information safe.",
    },
    {
      icon: <FiZap className="w-10 h-10 text-primary" />,
      title: "Lightning Fast",
      description:
        "Optimized performance ensures quick loading times and responsive interactions.",
    },
    {
      icon: <FiSmartphone className="w-10 h-10 text-primary" />,
      title: "Mobile Friendly",
      description:
        "Fully responsive design that works beautifully on any device or screen size.",
    },
    {
      icon: <FiUsers className="w-10 h-10 text-primary" />,
      title: "Collaboration Tools",
      description:
        "Work together with your team in real-time with intuitive sharing capabilities.",
    },
    {
      icon: <FiBarChart2 className="w-10 h-10 text-primary" />,
      title: "Analytics Dashboard",
      description:
        "Gain valuable insights with comprehensive analytics and customizable reports.",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-12 text-center">Our Features</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <div
            key={index}
            className="bg-card rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex flex-col items-center text-center">
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-16 bg-card rounded-lg shadow-md p-8 text-center">
        <h2 className="text-2xl font-semibold mb-4">Ready to get started?</h2>
        <p className="text-lg mb-6">
          Join thousands of satisfied users who have transformed their workflow.
        </p>
        <button className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 rounded-md font-medium">
          Try For Free
        </button>
      </div>
    </div>
  );
}
