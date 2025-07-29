// Home.jsx

import { motion } from "framer-motion";
import { Link } from "react-router"; // Ensure you're using react-router-dom
import { FaHeartbeat, FaTint, FaHandHoldingHeart, FaShieldAlt, FaPlusCircle, FaUserNurse } from "react-icons/fa";

const Home = () => {
  return (
    <div className="bg-[#EAEBD0] text-[#2f2f2f]">
      {/* Banner Section */}
      <section className="min-h-[90vh] flex flex-col md:flex-row items-center justify-between px-6 md:px-20 py-16 gap-10">
        <motion.div
          initial={{ x: -80, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          className="flex-1 space-y-6"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-[#AF3E3E] leading-tight">
            Donate Blood. <br /> Save Lives.
          </h1>
          <p className="text-lg text-gray-700">
            Your single donation can save up to three lives. Join our mission to bring hope and health to those in need.
          </p>
          <div className="space-x-4">
            <Link to="/auth/register" className="btn bg-[#DA6C6C] hover:bg-[#CD5656] border-none text-white font-semibold">
              Join as a Donor
            </Link>
            {/* <Link to="/search" className="btn bg-white hover:bg-[#FFD6BA] border border-[#CD5656] text-[#AF3E3E] font-semibold">
              Search Donors
            </Link> */}
          </div>
        </motion.div>

        {/* Placeholder for your image */}
        <motion.div
          initial={{ x: 80, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          className="flex-1"
        >
          <div className="w-full md:max-w-md max-w-sm h-64 bg-gray-300 rounded-xl mx-auto flex items-center justify-center">
            <p className="text-gray-600 text-center"> <img src="https://i.ibb.co/7xhQ0xD2/premium-photo-1682309704250-6bac0f499665-w-600-auto-format-fit-crop-q-60-ixlib-rb-4-1.jpg" alt="" /> </p>
          </div>
        </motion.div>
      </section>

      {/* Featured Section */}
      <section className="px-6 md:px-20 py-16 bg-[#FFF2EB]">
        <h2 className="text-3xl font-bold text-center text-[#2f2f2f] mb-12">
          Why Donate Blood?
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {[
            {
              icon: <FaHeartbeat />,
              title: "Saves Lives",
              desc: "A single donation can save up to three lives in emergencies and surgeries.",
            },
            {
              icon: <FaTint />,
              title: "Boosts Health",
              desc: "Regular donation helps balance iron levels and improve heart health.",
            },
            {
              icon: <FaHandHoldingHeart />,
              title: "Free Health Screening",
              desc: "Each donation includes a basic health check — completely free.",
            },
            {
              icon: <FaShieldAlt />,
              title: "Reduces Disease Risk",
              desc: "May lower the risk of heart disease and harmful cholesterol levels.",
            },
            {
              icon: <FaPlusCircle />,
              title: "Promotes Blood Cell Growth",
              desc: "Your body regenerates new cells after each donation — it's healthy!",
            },
            {
              icon: <FaUserNurse />,
              title: "Be Someone’s Hero",
              desc: "It only takes 15 minutes to become a real-life hero for someone in need.",
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05, backgroundColor: "#FFDCDC" }}
              className="bg-white p-6 rounded-xl shadow-md text-center transition-all cursor-default"
            >
              <div className="text-4xl mb-4 text-[#DC2525] mx-auto">
                {item.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-600 text-sm">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section className="px-6 md:px-20 py-16 bg-white">
        <h2 className="text-3xl font-bold text-center mb-12 text-[#2f2f2f]">Contact Us</h2>
        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <form className="space-y-6">
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">Name</label>
              <input type="text" className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#AF3E3E]" placeholder="Your Name" required />
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">Email</label>
              <input type="email" className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#AF3E3E]" placeholder="Your Email" required />
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">Message</label>
              <textarea rows="4" className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#AF3E3E]" placeholder="Your Message" required></textarea>
            </div>
            <button type="submit" className="btn bg-[#AF3E3E] hover:bg-[#901E3E] text-white font-semibold">
              Send Message
            </button>
          </form>

          {/* Contact Info */}
          <div className="space-y-6 text-[#2f2f2f]">
            <div>
              <h4 className="text-lg font-semibold">Email:</h4>
              <p className="text-sm">mahdinabir0608@gmail.com</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold">Phone:</h4>
              <p className="text-sm">01580133452</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold">Address:</h4>
              <p className="text-sm">Kafrul, Dhaka Cantonment, Dhaka-1206, Bangladesh</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#FFE8CD] text-center py-6 border-t border-[#E0E0E0]">
        <p className="text-gray-700 text-sm">© 2025 Blood Donation App. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
