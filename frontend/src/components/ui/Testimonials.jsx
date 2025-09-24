import React from 'react';

const Testimonials = () => {
  const testimonials = [
    { name: 'John Doe', quote: 'Scholarship Zone helped me find the perfect scholarship to fund my studies. I am very grateful!' },
    { name: 'Jane Smith', quote: 'The application process was so easy and straightforward. I highly recommend this platform.' },
    { name: 'Sam Wilson', quote: 'I found a scholarship that I never would have known about otherwise. Thank you, Scholarship Zone!' },
  ];

  return (
    <div className="bg-gray-100 py-16">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">What Our Users Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white p-8 rounded-lg shadow-md">
              <p className="text-gray-600 italic mb-4">"{testimonial.quote}"</p>
              <p className="text-green-700 font-bold">- {testimonial.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
