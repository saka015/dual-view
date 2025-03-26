import React from "react";

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8 text-center">About Us</h1>

      <div className="max-w-3xl mx-auto bg-card rounded-lg shadow-md p-8">
        <p className="text-lg mb-6">
          Welcome to our platform! We are a dedicated team of innovators
          committed to creating cutting-edge solutions that transform how people
          interact with technology.
        </p>

        <p className="text-lg mb-6">
          Founded in 2025, our mission is to build intuitive, accessible, and
          powerful tools that empower users to achieve more in their personal
          and professional lives.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Our Values</h2>

        <ul className="list-disc pl-6 space-y-3">
          <li className="text-lg">
            <span className="font-medium">Innovation:</span> We constantly push
            boundaries to create new possibilities.
          </li>
          <li className="text-lg">
            <span className="font-medium">Quality:</span> We believe in crafting
            solutions with meticulous attention to detail.
          </li>
          <li className="text-lg">
            <span className="font-medium">Accessibility:</span> We design with
            everyone in mind, ensuring our products are usable by all.
          </li>
          <li className="text-lg">
            <span className="font-medium">Community:</span> We value the power
            of collaboration and open communication.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Our Team</h2>
        <p className="text-lg mb-6">
          Our diverse team brings together expertise from various fields
          including software engineering, design, product management, and
          customer support. Together, we work to deliver exceptional experiences
          that make a difference.
        </p>
      </div>
    </div>
  );
}
