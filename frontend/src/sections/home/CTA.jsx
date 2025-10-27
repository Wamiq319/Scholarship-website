import React from "react";
import { Button } from "@/components";
import { useNavigate } from "react-router-dom";

const CTA = () => {
  const navigate = useNavigate();

  return (
    <section className="py-20 bg-gradient-to-tr from-purple-700 to-blue-600">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-4xl font-extrabold text-white mb-4">
          Ready to Find Your Scholarship?
        </h2>
        <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
          Join thousands of students who have successfully funded their
          education through our platform. Your future is just a click away.
        </p>
        <Button
          onClick={() => navigate("/scholarships")}
          variant="filled"
          color="gold"
          rounded
          className="text-lg"
        >
          Start Exploring Now
        </Button>
      </div>
    </section>
  );
};

export default CTA;
