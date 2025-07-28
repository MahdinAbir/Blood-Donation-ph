import React from 'react';
import { Link } from 'react-router';


const Unauthorized = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-[#FFE8CD] px-4">
      <div className="bg-white shadow-2xl rounded-2xl p-8 max-w-md text-center border border-[#FFD6BA]">
        <div className="flex justify-center mb-4">
          <div className="bg-[#DC2525]/10 p-4 rounded-full">
            
          </div>
        </div>
        <h1 className="text-3xl font-extrabold text-[#AF3E3E] mb-2">Unauthorized Access</h1>
        <p className="text-[#6B2C2C] mb-6 text-base">
          Sorry, you don’t have permission to view this page. Please check your role or try logging in again.
        </p>
        <Link
          to="/"
          className="inline-block bg-[#DC2525] text-white px-6 py-3 rounded-full font-semibold shadow-md hover:bg-[#AF3E3E] transition duration-300"
        >
          ⬅ Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default Unauthorized;
