import React from "react";
import { FaQuoteLeft } from "react-icons/fa";

const Testimonials = () => {
  const testimonials = [
    {
      name: "John Doe",
      quote:
        "Scholarship Zone helped me find the perfect scholarship to fund my studies. I am very grateful!",
    },
    {
      name: "Jane Smith",
      quote:
        "The application process was so easy and straightforward. I highly recommend this platform.",
    },
    {
      name: "Sam Wilson",
      quote:
        "I found a scholarship that I never would have known about otherwise. Thank you, Scholarship Zone!",
    },
  ];

  return (
    <section className="bg-gray-50 py-16">
      <div className="container mx-auto px-6">
        {/* Section Title */}
        <h2 className="text-3xl md:text-4xl font-extrabold text-center text-blue-700 mb-12">
          What Our Users Say
        </h2>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-xl shadow hover:shadow-lg transition flex flex-col"
            >
              {/* Quote Icon */}
              <FaQuoteLeft className="text-yellow-400 text-3xl mb-4" />

              {/* Quote */}
              <p className="text-gray-700 italic mb-6 leading-relaxed">
                “{testimonial.quote}”
              </p>

              {/* Name */}
              <p className="text-blue-700 font-semibold text-right mt-auto">
                – {testimonial.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
