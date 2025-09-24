import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-green-700 text-white pt-10 pb-6 mt-16">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold">Scholarship Zone</h3>
            <p className="mt-3 text-green-100 text-sm">
              A centralized digital platform to apply, manage, and track
              scholarships with transparency and ease.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-3">Quick Links</h4>
            <ul className="space-y-2 text-green-100 text-sm">
              <li>
                <Link to="/" className="hover:text-white transition">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/scholarships"
                  className="hover:text-white transition"
                >
                  Scholarships
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white transition">
                  About
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-3">Contact</h4>
            <p className="text-green-100 text-sm">
              support@scholarshipzone.com
            </p>
            <p className="text-green-100 text-sm">+92 300 1234567</p>
            <p className="text-green-100 text-sm">Islamabad, Pakistan</p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 border-t border-green-600 pt-4 text-center text-green-100 text-sm">
          <p>
            &copy; {new Date().getFullYear()} Scholarship Zone. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
