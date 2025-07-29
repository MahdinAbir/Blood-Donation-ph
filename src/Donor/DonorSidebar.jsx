import React, { useContext, useState } from 'react';
import { NavLink, Link } from 'react-router';
import { AuthContext } from '../Authentication/AuthContext';
import { Menu, X } from 'lucide-react'; // hamburger icons

const DonorSidebar = () => {
  const { user, mainProfileData } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  console.log(mainProfileData)

  const navLinkClasses = ({ isActive }) =>
    `block px-4 py-2 rounded-lg font-medium transition shadow-sm ${
      isActive
        ? 'bg-[#AF3E3E] text-white shadow-md'
        : 'text-[#FFE8CD] hover:bg-[#CD5656] hover:text-white'
    }`;

  // Centralized navigation items
  const navItems = [
    { to: '/dashboard/donor', label: '🏠 Dashboard Home', end: true },
    { to: '/dashboard/donor/create-donation-request', label: '➕ Create Request' },
    { to: '/dashboard/donor/my-donation-requests', label: '📄 My Requests' },
    { to: '/dashboard/donor/profile', label: '👤  My Profile' },
  ];

  return (
    <>
      {/* Hamburger button for mobile */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="sm:hidden fixed top-4 left-4 z-50 bg-[#660033] text-white p-2 rounded-md shadow-lg"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`w-64 sm:w-56 md:w-64 min-h-screen bg-[#660033] text-white flex flex-col justify-between py-6 px-4 shadow-2xl rounded-br-3xl 
                    fixed sm:relative top-0 left-0 z-40 transform transition-transform duration-300 ease-in-out
                    ${isOpen ? 'translate-x-0' : '-translate-x-full'} sm:translate-x-0`}
      >
        {/* Profile Section */}
        <div>
          <div className="flex flex-col items-center mb-8">
            <img
              src={user?.photoURL || 'https://i.ibb.co/X0Pv7t9/default-avatar.png'}
              alt="Profile"
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-4 border-[#FFDCDC] shadow-lg"
            />
            <p className="mt-3 text-sm sm:text-md font-semibold text-[#FFE8CD] text-center">
              {mainProfileData?.name || 'User'}
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h2 className="text-md sm:text-lg font-bold text-[#FFDCDC] mb-4 pl-2 uppercase tracking-widest">
              Dashboard
            </h2>
            <nav className="flex flex-col gap-2 text-sm sm:text-base">
              {navItems.map(({ to, label, end }) => (
                <NavLink key={to} to={to} end={end} className={navLinkClasses} onClick={() => setIsOpen(false)}>
                  {label}
                </NavLink>
              ))}
            </nav>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 text-center text-sm sm:text-base">
          <Link
            to="/"
            className="text-[#FFE8CD] hover:text-white hover:underline transition duration-200"
            onClick={() => setIsOpen(false)}
          >
            ← Back to Home
          </Link>
        </div>
      </aside>
    </>
  );
};

export default DonorSidebar;
