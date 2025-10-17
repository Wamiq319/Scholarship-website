import { Sidebar } from "@/components";
import React from "react";
import { Outlet } from "react-router-dom";

export const CommitteePage = () => {
  return (
    <div className="w-full h-screen flex bg-gray-50">
      <Sidebar role="COMMITTEE" />
      <div className="flex-1 p-6 overflow-y-auto">
        <Outlet />
      </div>
    </div>
  );
};
