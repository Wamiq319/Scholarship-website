import React, { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../../assets/LOGO.png";
import { Button } from "../ui";

const navLinks = [
  { label: "Home", path: "/" },
  { label: "Scholarships", path: "/scholarships" },
  { label: "About", path: "/about" },
  { label: "Contact", path: "/contact" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md border-b border-gray-100">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        <div className="text-2xl font-bold text-green-700">
          <Link to="/">
            <img src={Logo} alt="Scholarship Zone" className="h-8" />
          </Link>
        </div>

        <div className="hidden md:flex items-center space-x-6">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              to={link.path}
              className="text-gray-700 hover:text-green-700 font-bold transition"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden md:block">
          <Button rounded>Login</Button>
        </div>

        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="text-gray-700">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              ></path>
            </svg>
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden mt-4 px-6 pb-4">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.path}
                className="text-gray-700 hover:text-green-700 font-bold transition"
              >
                {link.label}
              </Link>
            ))}
            <Button rounded>Login</Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
