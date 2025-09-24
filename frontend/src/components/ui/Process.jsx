import React from "react";

const steps = [
  { id: 1, text: "Register and create your profile." },
  { id: 2, text: "Search and explore available scholarships." },
  { id: 3, text: "Apply online and submit your documents." },
];

const Process = () => {
  return (
    <section className="bg-white py-16">
      <div className="container mx-auto px-6">
        {/* Section Title */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-green-700">
            Application Process
          </h2>
          <p className="mt-3 text-gray-600 max-w-xl mx-auto">
            Follow these simple steps to apply for scholarships quickly and
            easily.
          </p>
        </div>

        {/* Steps */}
        <div className="flex flex-col md:flex-row justify-center items-start md:items-center gap-12 md:gap-16">
          {steps.map((step) => (
            <div
              key={step.id}
              className="flex flex-col items-center text-center max-w-xs"
            >
              <div className="bg-green-600 text-white rounded-full h-14 w-14 flex items-center justify-center text-lg font-bold shadow-md">
                {step.id}
              </div>
              <p className="mt-4 text-gray-700">{step.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Process;
