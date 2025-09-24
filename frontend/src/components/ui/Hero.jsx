import React from 'react';
import Button from './Button';

const Hero = () => {
  return (
    <div className="bg-gray-900 text-white text-center p-20">
      <h1 className="text-5xl font-bold mb-4">Welcome to Scholarship Zone</h1>
      <p className="text-xl mb-8">Find and apply for scholarships to fund your education.</p>
      <Button>Explore Scholarships</Button>
    </div>
  );
};

export default Hero;
