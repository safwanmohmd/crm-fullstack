import React from "react";

const Navbar = () => {
  return (
    <div className="border-gray-400 rounded-2xl shadow w-full bg-white h-[60px] flex items-center justify-between px-5">
      <h2 className="text-2xl font-bold">CRM</h2>
      <img
        className="w-10 h-10 rounded-full object-cover"
        src="https://static.vecteezy.com/system/resources/previews/009/749/751/original/avatar-man-icon-cartoon-male-profile-mascot-illustration-head-face-business-user-logo-free-vector.jpg"
        alt="User Avatar"
      />
    </div>
  );
};

export default Navbar;
