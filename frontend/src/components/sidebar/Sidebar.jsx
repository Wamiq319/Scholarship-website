import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { SidebarMenus } from "./sidebarData";

export const Sidebar = ({ role }) => {
  const menus = SidebarMenus[role] || [];
  const [isOpen, setIsOpen] = useState(false);

  // TODO put reail logic
  const handleLogout = () => {
    localStorage.removeItem("admin");
    window.location.href = "/";
  };

  return (
    <>
      {/*  Mobile Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed top-4 left-4 z-50 bg-yellow-500 text-white p-2 rounded-md shadow-md"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/*  Sidebar Container */}
      <div
        className={`fixed md:static top-0 left-0 h-full w-64 bg-white border-r border-green-800 shadow-md p-4 flex flex-col transform transition-transform duration-300 z-40
        ${isOpen ? "translate-x-0" : "-translate-x-full"} 
        md:translate-x-0`}
      >
        {/* TODO REPLACE LOGO */}
        <div className="text-2xl font-bold text-blue-600 mb-6 text-center">
          Scholarship Zone
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-2">
          {menus.map(({ label, icon: Icon, path }) => (
            <NavLink
              key={path}
              to={path}
              end={path === `/${role.toLowerCase()}`}
              onClick={() => setIsOpen(false)} // close sidebar on mobile click
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-yellow-500 text-white  shadow-md"
                    : "text-gray-700 hover:bg-yellow-100"
                }`
              }
            >
              <Icon className="w-5 h-5" />
              {label}
            </NavLink>
          ))}
        </nav>

        {/* Logout Button */}
        <div className="mt-auto border-t border-green-800 pt-4">
          <button
            onClick={handleLogout}
            className="w-full py-2 text-center bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>
      </div>

      {/*  Overlay */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black bg-opacity-40 md:hidden z-30"
        />
      )}
    </>
  );
};
