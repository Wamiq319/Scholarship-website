import React from "react";
import { Navbar, Footer } from "../../components";
import {
  Hero,
  FeaturedScholarships,
  Process,
  WhyChooseUs,
  Testimonials,
  LatestNews,
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
      <LatestNews />
      <Footer />
    </div>
  );
};

export default LandingPage;
