import React, { use, useState } from "react";
import { Link, NavLink } from "react-router";
import { Tooltip } from "react-tooltip";
import { AuthContext } from "../provider/AuthContext";
import { FaUser } from "react-icons/fa";
import { MdDashboard } from "react-icons/md"; 
import Swal from "sweetalert2";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logOut } = use(AuthContext);


  const handleLogout = () => {
    logOut()
    .then(() => {
            Swal.fire({
              icon: "success",
              title: "Congratulations",
              text: "You Have Successfully Logged Out Successful",
              timer: 1400,
            });
          })
          .catch((error) => {
            console.log(error);
          });
    setIsOpen(false);
  };

  return (
    <nav className="bg-gray-50 border-b border-gray-200 fixed top-0 left-0 right-0 z-50 shadow-sm">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo + Website Name */}
          <Link to="/" className="flex items-center space-x-2">
            <img
              src="https://i.ibb.co/wZT7dn55/33523-modified.png"
              alt="Soulfinder Logo"
              className="h-8 w-auto"
            />
            <span className="font-bold text-xl text-gray-900 select-none">
              Soulfinder
            </span>
          </Link>

          {/* Mobile Left Side: Avatar + Auth Button */}
          <div className="flex items-center space-x-4 md:hidden ml-auto">
            {user ? (
              <>
                {user?.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt="User"
                    className="w-8 h-8 rounded-full"
                     data-tooltip-id="my-tooltip"
              data-tooltip-content={user.displayName}
                  />
                ) : (
                  <FaUser  data-tooltip-id="my-tooltip"
              data-tooltip-content={user.displayName} className="w-6 h-6 text-gray-500" />
                )}
                <button
                  onClick={handleLogout}
                  className=" cursor-pointer btn btn-outline text-sm text-gray-700 border border-gray-700 rounded-md px-2 py-1 hover:bg-yellow-400"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="text-sm cursor-pointer text-gray-700 border border-gray-700 rounded-md px-3 py-1 hover:bg-yellow-400"
              >
                Login
              </Link>
            )}
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-10 items-center">
            <NavLink to="/" className="text-gray-700 hover:text-gray-900 font-medium transition">
              Home
            </NavLink>
            <NavLink to="/biodatas" className="text-gray-700 hover:text-gray-900 font-medium transition">
              Biodatas
            </NavLink>
            <NavLink to="/about-us" className="text-gray-700 hover:text-gray-900 font-medium transition">
              About Us
            </NavLink>
            <NavLink to="/contact-us" className="text-gray-700 hover:text-gray-900 font-medium transition">
              Contact Us
            </NavLink>
            {user && (
              <NavLink
                to="/dashboard"
                className="text-gray-700 hover:text-gray-900 font-medium transition flex items-center gap-1"
              >
                <MdDashboard className="text-xl" />
                Dashboard
              </NavLink>
            )}
          </div>
<Tooltip id="my-tooltip" />
          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <>
                {user?.photoURL ? (
                  <img
                  data-tooltip-id="my-tooltip"
              data-tooltip-content={user.displayName}
                    src={user.photoURL}
                    alt="User"
                    className="w-8 h-8 rounded-full"
                  />
                ) : (
                  <FaUser  className="w-6 h-6 text-gray-500"  data-tooltip-id="my-tooltip"
              data-tooltip-content={user.displayName} />
                )}
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 border  border-gray-700 rounded-md text-gray-700 hover:bg-yellow-400 transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="px-4 py-2 border border-gray-700 rounded-md text-gray-700 hover:bg-yellow-400 transition"
              >
                Login
              </Link>
            )}
          </div>

          {/* Hamburger Button (mobile) */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
            aria-expanded={isOpen}
            className="md:hidden ml-2 inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:bg-gray-100"
          >
            <svg
              className={`${isOpen ? "hidden" : "block"} h-6 w-6`}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <svg
              className={`${isOpen ? "block" : "hidden"} h-6 w-6`}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-4 pt-2 pb-4 space-y-1">
            <Link to="/" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100" onClick={() => setIsOpen(false)}>
              Home
            </Link>
            <Link to="/biodatas" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100" onClick={() => setIsOpen(false)}>
              Biodatas
            </Link>
            <Link to="/about-us" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100" onClick={() => setIsOpen(false)}>
              About Us
            </Link>
            <Link to="/contact-us" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100" onClick={() => setIsOpen(false)}>
              Contact Us
            </Link>
            {user && (
              <Link
                to="/dashboard"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                onClick={() => setIsOpen(false)}
              >
                <MdDashboard className="text-xl" />
                Dashboard
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
