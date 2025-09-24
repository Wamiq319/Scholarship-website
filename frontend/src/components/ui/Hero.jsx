import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import Button from "./Button";
import heroBg1 from "../../assets/hero/hero-bg-1.jpeg";
import heroBg2 from "../../assets/hero/hero-g-2.jpeg";

const Hero = () => {
  const slides = [
    {
      bgImage: heroBg1,
      title: (
        <>
          Unlock Your <span className="text-yellow-400">Future</span> <br />{" "}
          with Scholarships
        </>
      ),
      subtitle:
        "Discover funding opportunities tailored to your education goals and build a brighter tomorrow.",
      description:
        "With Scholarship Zone, students can **apply faster**, **track applications**, and access **fair, transparent processes** without paperwork.",
      buttonText: "Browse Scholarships",
    },
    {
      bgImage: heroBg2,
      title: (
        <>
          Simple <span className="text-yellow-400">Applications</span>, <br />{" "}
          Big Opportunities
        </>
      ),
      subtitle:
        "Our platform simplifies scholarship management for students and universities alike.",
      description:
        "Get access to **real-time updates**, **document verification**, and **merit-based selection** — all in one place.",
      buttonText: "Start Applying",
    },
  ];

  return (
    <Swiper
      modules={[Navigation, Pagination, Autoplay]}
      spaceBetween={0}
      slidesPerView={1}
      navigation
      pagination={{ clickable: true }}
      autoplay={{ delay: 6000 }}
      loop
    >
      {slides.map((slide, index) => (
        <SwiperSlide key={index}>
          <div
            className="relative h-screen bg-cover bg-center flex items-center justify-center"
            style={{ backgroundImage: `url(${slide.bgImage})` }}
          >
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/80 to-black/40"></div>

            {/* Content */}
            <div className="relative z-10 text-center px-6 max-w-3xl">
              <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-4 text-white drop-shadow-lg">
                {slide.title}
              </h1>
              <p className="text-lg md:text-xl mb-4 text-gray-200">
                {slide.subtitle}
              </p>
              <p className="text-md md:text-lg mb-6 text-gray-300">
                {slide.description}
              </p>
              <Button color="gold" variant="filled" rounded>
                {slide.buttonText}
              </Button>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Hero;
