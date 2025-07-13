import React, { use, useState } from "react"
import { Link } from "react-router"
import { AuthContext } from "../provider/AuthContext"
import { FaUser } from "react-icons/fa"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const { user, logOut } = use(AuthContext)

  const handleLogout = () => {
    logOut()
    setIsOpen(false)
  }

  return (
    <nav className="bg-white border-b border-gray-200 fixed top-0 left-0 right-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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

          {/* Mobile Left Side: User Avatar + Button (visible always on mobile) */}
          <div className="flex items-center space-x-4 md:hidden ml-auto">
            {user ? (
              <>
                {user?.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt="User"
                    className="w-8 h-8 rounded-full"
                  />
                ) : (
                  <FaUser className="w-6 h-6 text-gray-500" />
                )}
                <button
                  onClick={handleLogout}
                  className="text-sm text-gray-700 border border-gray-700 rounded-md px-2 py-1 hover:bg-gray-100"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="text-sm text-gray-700 border border-gray-700 rounded-md px-3 py-1 hover:bg-gray-100"
              >
                Login
              </Link>
            )}
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex space-x-10 items-center">
            <Link to="/" className="text-gray-700 hover:text-gray-900 font-medium transition">
              Home
            </Link>
            <Link to="/biodatas" className="text-gray-700 hover:text-gray-900 font-medium transition">
              Biodatas
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-gray-900 font-medium transition">
              About Us
            </Link>
            <Link to="/contact" className="text-gray-700 hover:text-gray-900 font-medium transition">
              Contact Us
            </Link>
          </div>

          {/* Desktop Login/Logout */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <>
                {user?.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt="User"
                    className="w-8 h-8 rounded-full"
                  />
                ) : (
                  <FaUser className="w-6 h-6 text-gray-500" />
                )}
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 border border-gray-700 rounded-md text-gray-700 hover:bg-gray-100 transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="px-4 py-2 border border-gray-700 rounded-md text-gray-700 hover:bg-gray-100 transition"
              >
                Login
              </Link>
            )}
          </div>

          {/* Hamburger Button */}
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

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-4 pt-2 pb-4 space-y-1">
            <Link to="/" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100" onClick={() => setIsOpen(false)}>
              Home
            </Link>
            <Link to="/biodatas" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100" onClick={() => setIsOpen(false)}>
              Biodatas
            </Link>
            <Link to="/about" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100" onClick={() => setIsOpen(false)}>
              About Us
            </Link>
            <Link to="/contact" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100" onClick={() => setIsOpen(false)}>
              Contact Us
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}
