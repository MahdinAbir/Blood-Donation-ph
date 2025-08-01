import React from "react";
import { NavLink } from "react-router";

const Footer = () => {
  return (
    <footer className="bg-[#EAEBD0] text-[#2f2f2f] py-10 border-t border-[#DA6C6C]">
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-3 gap-8">

        
        <div>
          <h2 className="text-2xl font-bold mb-2 text-[#AF3E3E]">LifeDrop</h2>
          <p className="text-sm max-w-xs">
            Connecting lives through timely blood donation and compassion.
          </p>
        </div>

       
        <div>
          <h3 className="text-lg font-semibold mb-3 text-[#AF3E3E]">Useful Links</h3>
          <ul className="space-y-2 text-[#2f2f2f]">
            <li>
              <NavLink to={"/auth/terms"}
               
                className="hover:text-[#DA6C6C] transition-colors duration-300"
              >
                Terms & Conditions
              </NavLink>
            </li>
            <li>
              <NavLink to={"/auth/privacy"}
                
                className="hover:text-[#DA6C6C] transition-colors duration-300"
              >
                Privacy Policy
              </NavLink>
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <p className="text-[#2f2f2f] mb-3 font-semibold">Connect With Us</p>
          <div className="flex space-x-6 text-[#AF3E3E] text-2xl">
            <a
              href="https://www.facebook.com/mahdin.hossenabir/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="hover:text-[#CD5656] transition-colors duration-300"
            >
              <i className="fab fa-facebook-f"></i>
            </a>
            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="hover:text-[#CD5656] transition-colors duration-300"
            >
              <i className="fab fa-instagram"></i>
            </a>
            <a
              href="https://twitter.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
              className="hover:text-[#CD5656] transition-colors duration-300"
            >
              <i className="fab fa-twitter"></i>
            </a>
            <a
              href="https://www.youtube.com/@mahdinhossenabir7500"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              className="hover:text-[#CD5656] transition-colors duration-300"
            >
              <i className="fab fa-youtube"></i>
            </a>
          </div>
        </div>
      </div>

      <div className="mt-10 text-center text-sm text-[#2f2f2f]">
        &copy; {new Date().getFullYear()} Lifedrop. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
