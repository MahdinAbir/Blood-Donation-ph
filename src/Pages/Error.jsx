import React from "react";
import { NavLink } from "react-router";

const Error = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-[#FFE1FF] text-[#DFD0B8]">
      <div className="bg-[#393E46] p-10 rounded-2xl shadow-lg text-center max-w-md w-full">
        <h1 className="text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#948979] to-[#6CA7EC]">
          404
        </h1>
        <h2 className="text-2xl font-semibold mt-4">OPPS! PAGE NOT FOUND</h2>
        <p className="text-sm mt-2 text-[#DFD0B8]">
          Sorry, the page you're looking for doesn't exist. 
        </p>
        <NavLink to={"/"} className="flex justify-center   gap-4 mt-6">

             <button className="bg-[#948979] text-[#222831] cursor-pointer px-5 py-2 rounded-full hover:bg-[#DFD0B8] transition">
            RETURN HOME
          </button>
            
         
          
        </NavLink>
      </div>
    </div>
  );
};

export default Error;
