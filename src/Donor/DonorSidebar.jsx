import React, { useContext } from 'react';
import { NavLink, Link } from 'react-router';
import { AuthContext } from '../Authentication/AuthContext';

const DonorSidebar = () => {
  const { user } = useContext(AuthContext);

  // 🧠 Define the class logic once
  const navLinkClasses = ({ isActive }) =>
    `block px-4 py-2 rounded-lg font-medium transition shadow-sm ${
      isActive
        ? 'bg-[#AF3E3E] text-white shadow-md'
        : 'text-[#FFE8CD] hover:bg-[#CD5656] hover:text-white'
    }`;

  return (
    <aside className="w-64 min-h-screen bg-[#660033] text-white flex flex-col justify-between py-6 px-4 shadow-2xl  rounded-br-3xl">
      {/* Profile Section */}
      <div>
        <div className="flex flex-col items-center mb-8">
          <img
            src={user?.photoURL || 'https://i.ibb.co/X0Pv7t9/default-avatar.png'}
            alt="Profile"
            className="w-20 h-20 rounded-full border-4 border-[#FFDCDC] shadow-lg"
          />
          <p className="mt-3 text-md font-semibold text-[#FFE8CD]">
            {user?.displayName || 'User'}
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h2 className="text-lg font-bold text-[#FFDCDC] mb-4 pl-2 uppercase tracking-widest">
            Dashboard
          </h2>
          <nav className="flex flex-col gap-2">
            <NavLink to="/dashboard/donor" end className={navLinkClasses}>
              🏠 Dashboard Home
            </NavLink>
            <NavLink to="/dashboard/donor/create-donation-request" className={navLinkClasses}>
              ➕ Create Request
            </NavLink>
            <NavLink to="/dashboard/donor/my-donation-requests" className={navLinkClasses}>
              📄 My Requests
            </NavLink>
          </nav>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-6 text-center">
        <Link
          to="/"
          className="text-[#FFE8CD] hover:text-white hover:underline transition duration-200"
        >
          ← Back to Home
        </Link>
      </div>
    </aside>
  );
};

export default DonorSidebar;
