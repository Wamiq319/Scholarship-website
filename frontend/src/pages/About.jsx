import React from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

const About = () => {
  return (
    <div>
      <Navbar />
      <div className="container mx-auto p-8">
        <h1 className="text-3xl font-bold">About Us</h1>
        <p>This is the about us page.</p>
      </div>
      <Footer />
    </div>
  );
};

export default About;
