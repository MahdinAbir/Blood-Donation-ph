import React from 'react';
import { Link } from 'react-router';

const Logo = () => {
  return (
    <Link to="/" className="group max-w-[200px] inline-block cursor-pointer">
      <div className="relative w-full">
        {/* Default Image */}
        <img
          src="https://i.ibb.co/ks2XCj5z/Picsart-25-07-26-18-23-56-527.png"
          alt="Logo"
          className="w-full transition-opacity duration-300 group-hover:opacity-0"
        />
        {/* Hover Image (appears when hovered) */}
        <img
          src="https://i.ibb.co/JFFWFjxy/Adobe-Express-file.png"
          alt="Logo Hover"
          className="w-full absolute top-0 left-0 transition-opacity duration-300 opacity-0 group-hover:opacity-100"
        />
      </div>
    </Link>
  );
};

export default Logo;
