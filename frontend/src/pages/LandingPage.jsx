import React from 'react';
import Navbar from '../components/layout/Navbar';
import Hero from '../components/ui/Hero';
import FeaturedScholarships from '../components/ui/FeaturedScholarships';
import Process from '../components/ui/Process';
import Footer from '../components/layout/Footer';

const LandingPage = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      <FeaturedScholarships />
      <Process />
      <Footer />
    </div>
  );
};

export default LandingPage;