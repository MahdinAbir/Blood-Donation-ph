import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = (id) => {
    if (id === "login") {
      window.location.href = "/login";
      return;
    }
    if (id === "signup") {
      window.location.href = "/signup";
      return;
    }
    const section = document.getElementById(id.toLowerCase());
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
    setIsOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 bg-[#fadadf] shadow-md">
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center h-16">
        {/* Logo + Brand */}
        <div className="flex  items-center space-x-2 cursor-pointer">
          <img
            src="https://i.postimg.cc/LXTVGSCr/LIGHTFURY-2.png"
            alt="logo"
            className=" w-32 px-2 "
          />
          <span className="text-xl font-bold text-gray-800">LIGHTFURY</span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-4">
          <button
            onClick={() => handleClick("home")}
            className="px-4 py-2 rounded-lg text-[#660B05] font-medium hover:scale-125 transition relative underline-btn"
          >
            Home
          </button>
          <button
            onClick={() => handleClick("features")}
            className="px-4 py-2 rounded-lg text-[#660B05] font-medium hover:scale-125 transition relative underline-btn"
          >
            Features
          </button>
          <button
            onClick={() => handleClick("courses")}
            className="px-4 py-2 rounded-lg text-[#660B05] font-medium hover:scale-125 transition relative underline-btn"
          >
            Courses
          </button>
          <button
            onClick={() => handleClick("reviews")}
            className="px-4 py-2 rounded-lg text-[#660B05] font-medium hover:scale-125 transition relative underline-btn"
          >
            Reviews
          </button>
          <button
            onClick={() => handleClick("login")}
            className="px-4 py-2 rounded-lg text-[#660B05] font-medium hover:scale-125 transition relative underline-btn"
          >
            Login
          </button>
          <button
            onClick={() => handleClick("signup")}
            className="px-4 py-2 rounded-lg text-[#660B05] font-medium hover:scale-125 transition relative underline-btn"
          >
            Sign Up
          </button>
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden ">
          <button onClick={() => setIsOpen(true)}>
            <Menu className="cursor-pointer hover:bg-amber-100 " size={28} />
          </button>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/50 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setIsOpen(false)}
            />

            {/* Sidebar */}
            <motion.div
              className="fixed top-0 left-0 w-3/4 h-full bg-white shadow-lg p-6 z-50"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.3 }}
            >
              {/* Cross Button */}
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 w-10 h-10 flex cursor-pointer items-center justify-center rounded-md bg-white/10 border border-white/20 z-50"
              >
                <X size={24} />
              </button>

              <div className="flex flex-col space-y-4 mt-16">
                <button
                  onClick={() => handleClick("home")}
                  className="px-4 py-2 rounded-lg text-[#660B05] font-medium hover:scale-125 transition relative underline-btn mobile-underline"
                >
                  Home
                </button>
                <button
                  onClick={() => handleClick("features")}
                  className="px-4 py-2 rounded-lg text-[#660B05] font-medium hover:scale-125 transition relative underline-btn mobile-underline"
                >
                  Features
                </button>
                <button
                  onClick={() => handleClick("courses")}
                  className="px-4 py-2 rounded-lg text-[#660B05] font-medium hover:scale-125 transition relative underline-btn mobile-underline"
                >
                  Courses
                </button>
                <button
                  onClick={() => handleClick("reviews")}
                  className="px-4 py-2 rounded-lg text-[#660B05] font-medium hover:scale-125 transition relative underline-btn mobile-underline"
                >
                  Reviews
                </button>
                <button
                  onClick={() => handleClick("login")}
                  className="px-4 py-2 rounded-lg text-[#660B05] font-medium hover:scale-125 transition relative underline-btn mobile-underline"
                >
                  Login
                </button>
                <button
                  onClick={() => handleClick("signup")}
                  className="px-4 py-2 rounded-lg text-[#660B05] font-medium hover:scale-125 transition relative underline-btn mobile-underline"
                >
                  Sign Up
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Underline CSS */}
      <style>{`
        .underline-btn::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0;
          height: 2px;
          background-color: currentColor;
          transition: width 0.3s ease;
          border-radius: 2px;
        }
        .underline-btn:hover::after {
          width: 100%;
        }

        @media (max-width: 768px) {
          .mobile-underline::after {
            max-width: 95%;
          }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
