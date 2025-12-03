// src/components/DashboardLayout.js
import React from "react";
import Sidebar from "./sidebar";

const DashboardLayout = ({ children }) => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-grow p-6">{children}</div>
    </div>
  );
};

export default DashboardLayout;
