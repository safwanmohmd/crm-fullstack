import React from "react";
import Navbar from "../componants/Navbar";
import Sidebar from "../componants/Sidebar";
import UserLists from "../componants/UserLists";

const Home = () => {
  return (
    <div className="bg-gray-200 min-h-screen flex justify-center items-start px-2 sm:px-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-[1600px] overflow-hidden">
        <Navbar />
        <div className="flex flex-col md:flex-row h-full">
          <Sidebar />
          <div className="bg-gray-200 w-full p-4">
            <UserLists />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
