import { Eye, Globe, Settings, Handshake } from "lucide-react";
import React from "react";
import { Navbar, Footer } from "../../components";

import { CTA } from "@/components";

const ctaData = {
  title: " Bridging the Gap Between Talent & Opportunity",
  description:
    " Scholarship Zone represents innovation in education — where technology meets compassion. Our goal is to ensure that no deserving student is left behind becauseof outdated systems or lack of awareness..",
  buttonText: "Start Exploring Now",
  buttonLink: "/scholarships",
  gradientFrom: "purple-700",
  gradientTo: "blue-600",
  buttonVariant: "filled",
  buttonColor: "gold",
  rounded: true,
};
const About = () => {
  return (
    <div className="bg-white text-gray-800">
      <Navbar />

      {/* Header Section (like your example) */}
      <header className="text-center py-20 px-6 bg-gradient-to-b from-blue-50 to-white">
        <h1 className="text-5xl font-extrabold text-gray-800 leading-tight">
          About{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-700">
            Scholarship Zone
          </span>
        </h1>
        <p className="text-lg text-gray-600 mt-4 max-w-2xl mx-auto">
          A digital platform built to{" "}
          <span className="font-bold text-yellow-500">
            simplify scholarships
          </span>{" "}
          — connecting students and universities through transparency,
          technology, and opportunity.
        </p>
      </header>

      {/* Blue Information Card */}
      <section className="max-w-5xl mx-auto bg-gradient-to-r from-blue-700 to-indigo-800 text-white rounded-2xl shadow-xl p-10 md:p-16 mt-10 mb-20">
        <h2 className="text-3xl md:text-4xl font-semibold mb-6 text-center">
          Empowering Education Through Innovation
        </h2>
        <p className="text-blue-100 text-lg leading-relaxed text-center mb-10">
          Scholarship Zone is more than a project — it’s a mission to bring
          fairness and efficiency to the scholarship process. Designed for both
          students and administrators, our system automates application, review,
          and approval workflows while maintaining data security and
          transparency.
        </p>

        <div className="grid md:grid-cols-2 gap-10">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <h3 className="text-2xl font-semibold mb-3 text-yellow-300">
              Our Mission
            </h3>
            <p className="text-blue-100 leading-relaxed">
              To create a seamless scholarship management experience that
              ensures equal opportunity for all. We focus on simplifying
              processes, reducing human errors, and enabling quick
              decision-making.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <h3 className="text-2xl font-semibold mb-3 text-yellow-300">
              Our Vision
            </h3>
            <p className="text-blue-100 leading-relaxed">
              A future where every student has easy access to academic funding
              through a transparent, digital-first ecosystem that promotes
              fairness and inclusivity.
            </p>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="relative py-24 bg-gradient-to-b from-blue-50 to-white overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[600px] h-[600px] bg-blue-100 rounded-full blur-3xl opacity-40"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-16 leading-tight">
            Our{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-700">
              Core Values
            </span>
          </h1>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {[
              {
                title: "Transparency",
                desc: "Every process is open, fair, and trackable.",
                icon: <Eye className="w-12 h-12 text-blue-600 mx-auto mb-4" />,
              },
              {
                title: "Accessibility",
                desc: "Apply and track your scholarship anytime, anywhere.",
                icon: (
                  <Globe className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                ),
              },
              {
                title: "Efficiency",
                desc: "Automated systems that save time and minimize errors.",
                icon: (
                  <Settings className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                ),
              },
              {
                title: "Integrity",
                desc: "We ensure authenticity and equal access for all applicants.",
                icon: (
                  <Handshake className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                ),
              },
            ].map((val, i) => (
              <div
                key={i}
                className="group bg-white border border-gray-100 rounded-2xl p-10 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-100/10 to-purple-100/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                {/* Icon */}
                <div className="flex justify-center items-center">
                  {val.icon}
                </div>

                {/* Title */}
                <h3 className="text-2xl font-semibold text-gray-800 mb-3">
                  {val.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 leading-relaxed">{val.desc}</p>

                {/* Hover underline animation */}
                <div className="mt-6 h-[3px] w-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full group-hover:w-20 transition-all duration-500 mx-auto"></div>
              </div>
            ))}
          </div>
        </div>
      </section>


      <CTA data={ctaData} />

      <Footer />
    </div>
  );
};

export default About;
