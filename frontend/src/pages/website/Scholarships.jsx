import React from 'react';
import { Navbar, Footer } from '../../components';

const Scholarships = () => {
  return (
    <div>
      <Navbar />
      <div className="container mx-auto p-8">
        <h1 className="text-3xl font-bold">Scholarships</h1>
        <p>This is the scholarships page.</p>
      </div>
      <Footer />
    </div>
  );
};

export default Scholarships;
