import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const BannerSlider = () => {
  const slides = [
    
    {
      title: "Donate Blood, Save Lives",
      subtitle: "Your one bag of blood can give someone another chance at life.",
    },
    {
      title: "Be a Hero, Be a Donor",
      subtitle: "Every drop counts—donate blood and be the reason for someone's heartbeat.",
    },
    {
      title: "Need Blood? We’re Here",
      subtitle: "Find blood donors nearby in minutes and ensure timely help.",
    },
    {
      title: "Organize Blood Camps",
      subtitle: "Host or join local blood donation drives to help your community.",
    },
  ];

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [slides.length]);

  const variants = {
    enter: { opacity: 0, y: 20 },
    center: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  return (
    <div className="relative mx-auto max-w-4xl w-full h-72 sm:h-96 overflow-hidden rounded-xl shadow-lg bg-gradient-to-r from-[#B0DB9C] via-[#D4E9B9] to-[#A4C06C] mb-10 ">
      <AnimatePresence mode="wait">
        {slides.map(
          (slide, index) =>
            index === current && (
              <motion.div
                key={index}
                className="absolute inset-0 flex flex-col justify-center items-center text-center text-[#880808] px-8"
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.7 }}
              >
                <h2 className="text-2xl md:text-5xl sm:text-4xl font-bold mb-2 tracking-wide drop-shadow-md">
                  {slide.title}
                </h2>
                <p className="text-sm sm:text-lg">{slide.subtitle}</p>
              </motion.div>
            )
        )}
      </AnimatePresence>

      <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-3 h-3 rounded-full transition-transform duration-300 ${
              index === current ? "bg-white scale-125" : "bg-gray-400"
            } hover:scale-110`}
            aria-label={`Go to slide ${index + 1}`}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default BannerSlider;
