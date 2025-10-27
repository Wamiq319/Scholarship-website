import React from "react";
import { Button } from "@/components";
import { FaAward, FaHandHoldingHeart, FaFutbol } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const FeaturedScholarships = () => {
  const navigate = useNavigate();
  const scholarships = [
    {
      id: 1,
      title: "Merit Scholarship",
      description: "Awarded to students with excellent academic performance.",
      icon: <FaAward className="text-5xl text-blue-500" />,
    },
    {
      id: 2,
      title: "Need-Based Scholarship",
      description: "Supporting students who require financial assistance.",
      icon: <FaHandHoldingHeart className="text-5xl text-purple-500" />,
    },
    {
      id: 3,
      title: "Athletic Scholarship",
      description: "For students showcasing outstanding athletic abilities.",
      icon: <FaFutbol className="text-5xl text-yellow-500" />,
    },
  ];

  return (
    <section className="bg-gray-50 py-20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-800">
            Featured{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-700">
              Scholarships
            </span>
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Explore some of the most popular scholarships available for our
            students.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {scholarships.map((scholarship) => (
            <div
              key={scholarship.id}
              className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 border-t-4 border-yellow-500 text-center"
            >
              <div className="flex justify-center mb-6">{scholarship.icon}</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3">
                {scholarship.title}
              </h3>
              <p className="text-gray-600 mb-6">{scholarship.description}</p>
              <Button
                onClick={() => navigate("/scholarships")}
                color="blue"
                variant="outline"
                rounded
              >
                Learn More
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedScholarships;
