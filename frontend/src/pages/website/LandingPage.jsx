import React from "react";
import { Navbar, Footer } from "../../components";
import {
  Hero,
  FeaturedScholarships,
  Process,
  WhyChooseUs,
  Testimonials,
  CTA,
} from "@/sections";

const LandingPage = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      <FeaturedScholarships />
      <Process />
      <WhyChooseUs />
      <Testimonials />
      <CTA />
      <Footer />
    </div>
  );
};

export default LandingPage;
