import React from 'react';

const WhyChooseUs = () => {
  const features = [
    { title: 'Easy to Use', description: 'Our platform is designed to be intuitive and easy to navigate.' },
    { title: 'Comprehensive Database', description: 'We have a vast database of scholarships from various sources.' },
    { title: 'Personalized Matches', description: 'Our algorithm provides personalized scholarship recommendations.' },
  ];

  return (
    <div className="bg-white py-16">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Why Choose Us?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-gray-50 p-8 rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-green-700 mb-4">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WhyChooseUs;
