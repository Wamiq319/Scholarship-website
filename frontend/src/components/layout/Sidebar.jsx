import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { SidebarMenus } from "@/Data";
import { Button } from "@/components";

const Sidebar = ({ role }) => {
  const menus = SidebarMenus[role] || [];
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
    
  };

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed top-4 left-4 z-[9999] p-2 w-12 h-12 flex items-center justify-center bg-yellow-500 text-white rounded-lg shadow-lg"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar Container */}
      <div
        className={`fixed md:static top-0 left-0 h-full w-64 bg-white border-r border-green-800 shadow-md p-4 flex flex-col transform transition-transform duration-300 z-40
        ${isOpen ? "translate-x-0" : "-translate-x-full"} 
        md:translate-x-0`}
      >
        {/* Logo */}
        <div className="text-2xl font-bold text-blue-600 mb-6 text-center">
          <button className="cursor-pointer" onClick={() => navigate("/")}>

          Scholarship Zone
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-2">
          {menus.map(({ label, Icon, path }) => (
            <NavLink
              key={path}
              to={path}
              end={path === `/${role.toLowerCase()}`}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-yellow-500 text-white  shadow-md"
                    : "text-gray-700 hover:bg-yellow-100"
                }`
              }
            >
              {Icon && <Icon className="w-5 h-5" />}
              {label}
            </NavLink>
          ))}
        </nav>

        {/* Logout Button */}
        <div className="mt-auto border-t border-green-800 pt-4">
          <Button
            onClick={handleLogout}
            variant="filled"
            color="red"
            className="w-full bg-red-500 hover:bg-red-600 text-white"
          >
            Logout
          </Button>
        </div>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black bg-opacity-40 md:hidden z-30"
        />
      )}
    </>
  );
};

export default Sidebar;
