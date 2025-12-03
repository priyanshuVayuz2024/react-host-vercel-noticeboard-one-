import React from "react";
import { Link } from "react-router-dom";

const Sidebar = ({ open, onClose }) => {
  return (
    <aside className="w-64 h-full border-r border-gray-800 shadow-gray-400 sidebar-background z-50">
      <div className="flex items-center flex-col p-4 border-b border-gray-200">
        <span className="text-3xl text-white font-bold pb-5 decoration-solid underline">
          ANAROCK
        </span>
        <span className="text-xl text-white font-bold">
          Directory Module POC
        </span>
      </div>
      <nav className="p-4">
        <ul>
          <li>
            <Link
              to="/dashboard"
              className="block py-2.5 px-4 text-white hover:bg-gray-950 "
            >
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              to="/data"
              className="block py-2.5 px-4 text-white hover:bg-gray-950"
            >
              Contacts
            </Link>
          </li>
          <li>
            <Link
              to="/add-contact"
              className="block py-2.5 px-4 text-white hover:bg-gray-950"
            >
              Add Contact
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
