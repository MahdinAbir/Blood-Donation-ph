import React, { useContext } from 'react';
import { Link, Outlet, useLocation } from 'react-router';
import { AuthContext } from '../Authentication/AuthContext';


const Volunteer = () => {
  const { user } = useContext(AuthContext);
  const location = useLocation();

  return (
    <div className="min-h-screen flex bg-[#EAEBD0]">
      {/* Sidebar */}
      <aside className="w-64 bg-[#DA6C6C] text-white flex flex-col justify-between py-6 px-4 shadow-lg">
        <div>
          <h2 className="text-2xl font-bold mb-8">Donor Dashboard</h2>
          <nav className="space-y-4">
            <NavItem to="/dashboard" label="🏠 Dashboard Home" path={location.pathname} />
            <NavItem to="/dashboard/create-donation-request" label="➕ Create Donation Request" path={location.pathname} />
            <NavItem to="/dashboard/my-donation-requests" label="📄 My Requests" path={location.pathname} />
          </nav>
        </div>

        <div className="text-sm text-[#FFDCDC] mt-6">
          <Link to="/" className="hover:underline">← Back to Home</Link>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Topbar */}
        <header className="bg-[#FFDCDC] px-6 py-4 flex justify-between items-center shadow-md">
          <h1 className="text-xl font-semibold text-[#AF3E3E]">
            👋 Welcome, <span className="font-bold">{user?.displayName || 'Donor'}</span>
          </h1>
          <div className="flex items-center gap-4">
            <img
              src={user?.photoURL || 'https://i.ibb.co/X0Pv7t9/default-avatar.png'}
              alt="User"
              className="w-10 h-10 rounded-full border-2 border-[#AF3E3E]"
            />
          </div>
        </header>

        {/* Outlet for Child Routes */}
        <main className="flex-1 p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

// Sidebar link component
const NavItem = ({ to, label, path }) => (
  <Link
    to={to}
    className={`block px-3 py-2 rounded-md font-medium transition ${
      path === to
        ? 'bg-[#AF3E3E] text-white'
        : 'hover:bg-[#CD5656] text-[#FFE8CD]'
    }`}
  >
    {label}
  </Link>
);

export default Volunteer;
