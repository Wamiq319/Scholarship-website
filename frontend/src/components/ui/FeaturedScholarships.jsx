import React from "react";

const FeaturedScholarships = () => {
  const scholarships = [
    {
      id: 1,
      title: "Merit Scholarship",
      description: "Awarded to students with excellent academic performance.",
    },
    {
      id: 2,
      title: "Need-Based Scholarship",
      description: "Supporting students who require financial assistance.",
    },
    {
      id: 3,
      title: "Athletic Scholarship",
      description: "For students showcasing outstanding athletic abilities.",
    },
  ];

  return (
    <section className="bg-gray-50 py-16">
      <div className="container mx-auto px-6">
        {/* Section Heading */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-green-700">
            Featured Scholarships
          </h2>
          <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
            Explore some of the most popular scholarships available for our
            students.
          </p>
        </div>

        {/* Scholarship Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {scholarships.map((scholarship) => (
            <div
              key={scholarship.id}
              className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition border-t-4 border-green-600"
            >
              <h3 className="text-xl font-semibold text-green-700 mb-3">
                {scholarship.title}
              </h3>
              <p className="text-gray-600 mb-4">{scholarship.description}</p>
              <button className="px-4 py-2 bg-green-600 text-white rounded-full text-sm font-medium hover:bg-green-700 transition">
                Learn More
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedScholarships;
