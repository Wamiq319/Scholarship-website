import { Sidebar } from "@/components";
import React from "react";
import { Outlet } from "react-router-dom";

export const StudentPanel = () => {
  return (
    <div className="w-full h-screen flex bg-gray-50">
      <Sidebar role="STUDENT" />
      <div className="flex-1 p-6 overflow-y-auto">
        <Outlet />
      </div>
    </div>
  );
};
