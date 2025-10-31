import React from "react";

const Home = () => {
  return (
    <div className="relative w-full h-screen flex items-center justify-center">
      {/* Background Image */}
      <img
        src="https://i.postimg.cc/8zWZxNbt/martin-adams-ICFXCD0-VBv-I-unsplash.jpg" // replace with your image path
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover opacity-90"
      />

      {/* Overlay Content */}
      <div className="relative z-10 text-center text-white px-4">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 drop-shadow-lg">
         LIGHT FURY 
        </h1>

        <div className="flex gap-4 justify-center">
          <button className="bg-blue-600 hover:bg-blue-700 text-lg px-6 py-3 rounded-2xl shadow-lg">
            Register Now
          </button>
          <button className="bg-green-600 hover:bg-green-700 text-lg px-6 py-3 rounded-2xl shadow-lg">
            Login Now
          </button>
        </div>
      </div>

      {/* Dark overlay for better readability */}
      <div className="absolute inset-0  bg-opacity-40"></div>
    </div>
  );
};

export default Home;
