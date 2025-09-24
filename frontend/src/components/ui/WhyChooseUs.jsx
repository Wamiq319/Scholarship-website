import React from "react";
import { FaCheckCircle, FaDatabase, FaUserGraduate } from "react-icons/fa";

const WhyChooseUs = () => {
  const features = [
    {
      title: "Easy to Use",
      description:
        "Our platform is designed to be **intuitive** and **simple to navigate**, so students can focus on opportunities, not forms.",
      icon: <FaCheckCircle className="text-blue-600 text-3xl" />,
    },
    {
      title: "Comprehensive Database",
      description:
        "We provide access to a **vast database of scholarships** from universities, organizations, and government programs.",
      icon: <FaDatabase className="text-yellow-500 text-3xl" />,
    },
    {
      title: "Personalized Matches",
      description:
        "Our smart algorithm delivers **tailored recommendations** based on academic achievements and financial needs.",
      icon: <FaUserGraduate className="text-blue-600 text-3xl" />,
    },
  ];

  return (
    <section className="bg-gray-50 py-16">
      <div className="container mx-auto px-6">
        {/* Section Heading */}
        <h2 className="text-3xl md:text-4xl font-extrabold text-center text-blue-700 mb-12">
          Why Choose Us?
        </h2>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-xl shadow hover:shadow-lg transition"
            >
              <div className="flex items-center justify-center mb-6">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3 text-center">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-center leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
