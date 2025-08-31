import React from "react";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="h-screen w-[250px] bg-white border-r border-gray-300 rounded-l-2xl hidden md:block">
      <div className="ml-8">
        <button className="mt-11 bg-white hover:bg-blue-500 hover:text-white text-gray-800 font-bold py-2 px-10 rounded-2xl border border-gray-400 inline-flex items-center gap-2">
          <i className="bi bi-person-fill-check"></i>
          <span>Accounts</span>
        </button>
        <button
          onClick={handleLogout}
          className="mt-11 bg-white hover:bg-blue-500 hover:text-white text-gray-800 font-bold py-2 px-10 rounded-2xl border border-gray-400 inline-flex items-center gap-2"
        >
          <i className="bi bi-box-arrow-right"></i>
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
