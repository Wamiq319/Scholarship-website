
import { Navbar, Footer } from "../../components";
import {
  Hero,
  FeaturedScholarships,
  Process,
  WhyChooseUs,
  Testimonials,
} from "@/sections";
import { CTA } from "@/components";
import Announcements from "@/sections/home/Announcements";


const LandingPage = () => {
 const ctaData = {
    title: "Ready to Find Your Scholarship?",
    description:
      "Join thousands of students who have successfully funded their education through our platform. Your future is just a click away.",
    buttonText: "Start Exploring Now",
    buttonLink: "/scholarships",
    gradientFrom: "purple-700",
    gradientTo: "blue-600",
    buttonVariant: "filled",
    buttonColor: "gold",
    rounded: true,
  };

  return (
    <div>
      <Navbar />
      <Hero />
      <FeaturedScholarships />
      <Announcements/>
      <Process />
      <WhyChooseUs />
      <Testimonials />
      <CTA data={ctaData} />
      <Footer />
    </div>
  );
};

export default LandingPage;