import React, { useContext, useState } from 'react';
import { NavLink } from 'react-router';
import { FaBars, FaTimes } from 'react-icons/fa';
import Logo from './Logo';
import { AuthContext } from '../Authentication/AuthContext';

const GlassNavbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logOut().catch(console.error);
  };

  const linkHoverStyle =
    'px-4 py-2 rounded-md hover:bg-white/10 hover:backdrop-blur-[3px] transition';

  const NavItems = () => (
    <>
      <li>
        <NavLink to="/donations" className={linkHoverStyle}>
          Donation Requests
        </NavLink>
      </li>
      <li>
        <NavLink to="/blog" className={linkHoverStyle}>
          Blog
        </NavLink>
      </li>
      {user && (
        <li>
          <NavLink to="/funding" className={linkHoverStyle}>
            Funding
          </NavLink>
        </li>
      )}
    </>
  );

  const RightSideDesktop = () => (
    <>
      {!user ? (
        <div className="flex gap-4">
          <NavLink
            to="/auth/login"
            className="bg-green-500 text-white px-4 py-1.5 rounded-md hover:bg-green-600 transition"
          >
            Login
          </NavLink>
          <NavLink
            to="/auth/register"
            className="bg-pink-500 text-white px-4 py-1.5 rounded-md hover:bg-pink-600 transition"
          >
            Sign Up
          </NavLink>
        </div>
      ) : (
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full border border-white">
              <img src={user.photoURL || 'https://i.ibb.co/2M7rtLJ/default-avatar.png'} alt="User" />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="mt-3 z-[9] p-2 shadow menu menu-sm dropdown-content bg-white text-black rounded-box w-52"
          >
            {NavItems()}
            <li>
              <NavLink to="/dashboard" className="px-4 py-2 rounded-md hover:bg-black/10 transition">
                Dashboard
              </NavLink>
            </li>
            <li>
              <button
                onClick={handleLogout}
                className="w-full text-left border border-red-500 text-red-500 px-4 py-1.5 rounded-md hover:bg-red-500 hover:text-white transition"
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      )}
    </>
  );

  return (
    <div className="relative w-full h-[25vh]">
      {/* Background */}
      <img
        src="https://i.ibb.co/XrbyhyQz/pawel-czerwinski-2-PN18-U8-CKi0-unsplash.jpg"
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/20"></div>

      {/* Glass Navbar */}
      <div className="absolute top-10 left-1/2 transform -translate-x-1/2 px-4 py-3 w-[95%] max-w-[1200px] backdrop-blur-[30px] shadow-[0_0_30px_rgba(227,228,237,0.37)] border-[2px] border-solid border-[rgba(255,255,255,0.18)] rounded-lg flex items-center justify-between text-white text-lg font-medium bg-white/5 z-10">
        
        {/* Left: Logo */}
        <div className="flex-shrink-0">
          <Logo />
        </div>

        {/* Middle: Nav Items (Desktop) */}
        <div className="hidden md:flex gap-6">
          <ul className="flex gap-6">{NavItems()}</ul>
        </div>

        {/* Right: Auth Buttons or Avatar (Desktop) */}
        <div className="hidden md:flex items-center gap-4">
          {RightSideDesktop()}
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {menuOpen && (
        <div className="md:hidden absolute top-[20vh] left-1/2 transform -translate-x-1/2 w-[90%] bg-white/10 backdrop-blur-[25px] border border-white/20 rounded-lg p-4 z-20 text-white">
          <ul className="flex flex-col gap-4 text-center">
            <li>
              <NavLink to="/donations" className={linkHoverStyle}>
                Donation Requests
              </NavLink>
            </li>
            <li>
              <NavLink to="/blog" className={linkHoverStyle}>
                Blog
              </NavLink>
            </li>
            {user && (
              <li>
                <NavLink to="/funding" className={linkHoverStyle}>
                  Funding
                </NavLink>
              </li>
            )}
            {!user ? (
              <>
                <li>
                  <NavLink
                    to="/auth/login"
                    className="block bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition"
                  >
                    Login
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/auth/register"
                    className="block bg-pink-500 text-white px-4 py-2 rounded-md hover:bg-pink-600 transition"
                  >
                    Sign Up
                  </NavLink>
                </li>
              </>
            ) : (
              <>
                <li>
                  <NavLink
                    to="/dashboard"
                    className="block px-4 py-2 rounded-md hover:bg-white/10 transition"
                  >
                    Dashboard
                  </NavLink>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left border border-red-500 text-red-500 px-4 py-2 rounded-md hover:bg-red-500 hover:text-white transition"
                  >
                    Logout
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default GlassNavbar;
