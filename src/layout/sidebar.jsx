// src/components/Sidebar.js
import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="h-screen w-64 bg-gray-800 text-white flex flex-col">
      <div className="p-4 font-bold text-xl">Dashboard</div>
      <nav className="flex-grow">
        <Link to="/data" className="block py-2.5 px-4 hover:bg-gray-700">
          Data Table
        </Link>
        <Link to="/add-data" className="block py-2.5 px-4 hover:bg-gray-700">
          Add Data
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar;
