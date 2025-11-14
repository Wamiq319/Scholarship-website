import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Navbar, Footer, InputField, Button } from "../../components";
import {
  Mail,
  Phone,
  Facebook,
  Twitter,
  Linkedin,
  CheckCircle,
} from "lucide-react";
import { createResource } from "@/redux/slices/resourcesSLice";
import toast from "react-hot-toast";

const Contact = () => {
  const dispatch = useDispatch();

  // form state
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!fullName || !email || !message) {
      setError("Please fill all required fields.");
      return;
    }

    setError("");

    try {
      await dispatch(
        createResource({
          resource: "contact",
          body: { fullName, email, subject, message },
        })
      );

      setSuccessMessage("Your message has been sent successfully!");
      setFullName("");
      setEmail("");
      setSubject("");
      setMessage("");
      toast.success("Your message has been sent successfully!");
      setTimeout(() => setSuccessMessage(""), 10000);
    } catch (err) {
      toast.error("Something went wrong. Please try again!");
      setError("Something went wrong. Please try again.", err);
    }
  };

  return (
    <div className="bg-gray-50 flex flex-col min-h-screen">
      <Navbar />

      {/* Header Section */}
      <header className="text-center py-20 px-6 bg-gradient-to-b from-blue-50 to-white">
        <h1 className="text-5xl font-extrabold text-gray-800">
          Get in{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-700">
            Touch
          </span>
        </h1>
        <p className="text-lg text-gray-600 mt-4 max-w-2xl mx-auto">
          Have a question, partnership idea, or need scholarship assistance?{" "}
          <span className="font-semibold text-yellow-500">
            We’d love to hear from you.
          </span>{" "}
          Our team is ready to help.
        </p>
      </header>

      {/* Contact Section */}
      <section className="max-w-6xl mx-auto py-20 px-6 grid md:grid-cols-2 gap-12">
        {/* Contact Form */}
        <div className="bg-white/90 backdrop-blur-sm shadow-lg rounded-2xl p-10 border border-blue-100 hover:shadow-2xl transition-all duration-300">
          <h2 className="text-3xl font-semibold text-blue-700 mb-6 text-center">
            Send Us a Message
          </h2>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <InputField
              label="Full Name "
              name="fullName"
              type="text"
              placeholder="Enter your full name"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
            <InputField
              label="Email Address"
              name="email"
              type="email"
              placeholder="yourname@email.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <InputField
              label="Subject"
              name="subject"
              type="text"
              placeholder="What's this about?"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
            <InputField
              label="Message"
              name="message"
              type="textarea"
              placeholder="Write your message here..."
              required
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={5}
            />

            {error && <p className="text-red-500">{error}</p>}
            {successMessage && (
              <p className="flex items-center gap-2 text-green-600 font-medium">
                <CheckCircle className="w-5 h-5 text-green-600" />
                {successMessage}
              </p>
            )}

            <Button
              type="submit"
              color="blue"
              variant="filled"
              rounded
              className="w-full py-3 text-lg"
            >
              Send Message
            </Button>
          </form>
        </div>

        {/* Contact Info */}
        <div className="space-y-10 flex flex-col justify-center">
          <div className="text-center md:text-left">
            <h2 className="text-3xl font-semibold text-blue-700 mb-4">
              Contact Information
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Reach out to us through any of the channels below. Our support
              team typically responds within{" "}
              <span className="font-semibold text-blue-600">24 hours</span>.
            </p>
          </div>

          <div className="space-y-6">
            {[
              {
                icon: <Mail className="w-6 h-6 text-blue-600" />,
                title: "Email",
                detail: "support@scholarshipzone.edu.pk",
              },
              {
                icon: <Phone className="w-6 h-6 text-blue-600" />,
                title: "Helpline",
                detail: "+92 300 1234567",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="flex items-start bg-white rounded-xl shadow p-5 border border-gray-100 hover:shadow-md transition-all"
              >
                <div className="mr-4 mt-1">{item.icon}</div>
                <div>
                  <h3 className="text-lg font-semibold text-blue-600">
                    {item.title}
                  </h3>
                  <p className="text-gray-700">{item.detail}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Social Media */}
          <div className="pt-4">
            <h3 className="text-2xl font-semibold text-blue-700 mb-3">
              Follow Us
            </h3>
            <div className="flex space-x-5">
              <a
                href="https://facebook.com"
                className="p-2 bg-blue-100 rounded-full text-blue-600 hover:bg-blue-200 transition"
              >
                <Facebook />
              </a>
              <a
                href="https://twitter.com"
                className="p-2 bg-blue-100 rounded-full text-blue-600 hover:bg-blue-200 transition"
              >
                <Twitter />
              </a>
              <a
                href="https://linkedin.com"
                className="p-2 bg-blue-100 rounded-full text-blue-600 hover:bg-blue-200 transition"
              >
                <Linkedin />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="bg-gradient-to-t from-white to-blue-50 py-16">
        <div className="max-w-6xl mx-auto px-6 text-center space-y-8">
          <h2 className="text-3xl font-semibold text-blue-700">
            Visit Our Campus
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We welcome visitors to our campus. Feel free to drop by and learn
            more about how Scholarship Zone is shaping the future of digital
            education management.
          </p>
          <div className="w-full h-80 rounded-2xl overflow-hidden shadow-xl border border-blue-100">
            <iframe
              title="Scholarship Zone Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3311.987607551019!2d73.0479!3d33.6844!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38df958b8c2ab72b%3A0x2e00ad77fbead4a2!2sIslamabad!5e0!3m2!1sen!2s!4v1696538425000"
              className="w-full h-full border-0"
              loading="lazy"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
