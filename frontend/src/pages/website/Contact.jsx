import React from 'react';
import { Navbar, Footer } from '../../components/layout';

const Contact = () => {
  return (
    <div>
      <Navbar />
      <div className="container mx-auto p-8">
        <h1 className="text-3xl font-bold">Contact Us</h1>
        <p>This is the contact us page.</p>
      </div>
      <Footer />
    </div>
  );
};

export default Contact;
