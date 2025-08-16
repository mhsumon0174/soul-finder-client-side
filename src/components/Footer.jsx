import React from "react"
import { Link } from "react-router"
import { FiMail, FiPhone } from "react-icons/fi"
import { FaInstagram, FaTwitter, FaFacebookF } from "react-icons/fa"

export default function Footer() {
  return (
    <footer className=" bg-gray-50 border-t border-border text-muted-foreground">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 md:px-12 lg:px-20 py-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 text-center md:text-left">
        {/* About Section */}
        <div className="flex flex-col items-center md:items-start">
          <Link to="/" className="mb-4 flex items-center space-x-3">
            <img
              src="https://i.ibb.co/wZT7dn55/33523-modified.png"
              alt="Soulfinder Logo"
              className="w-12 h-12 object-contain"
            />
            <h2 className="text-3xl font-bold text-foreground">Soulfinder</h2>
          </Link>
          <p className="leading-relaxed max-w-sm text-sm">
            Connect with your better half. Soulfinder helps you find meaningful relationships with ease and trust.
          </p>
        </div>

        {/* Quick Links (Manual) */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-foreground">Quick Links</h3>
          <nav className="flex flex-col space-y-2 text-sm">
            <Link to="/" className="hover:text-foreground hover:underline transition-colors">
              Home
            </Link>
            <Link to="/biodatas" className="hover:text-foreground hover:underline transition-colors">
              Biodatas
            </Link>
            <Link to="/about-us" className="hover:text-foreground hover:underline transition-colors">
              About Us
            </Link>
            <Link to="/contact-us" className="hover:text-foreground hover:underline transition-colors">
              Contact Us
            </Link>
            
          </nav>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-foreground">Contact</h3>
          <div className="space-y-3 text-sm">
            <div className="flex items-center justify-center md:justify-start space-x-2">
              <FiMail className="w-5 h-5" />
              <span>soulfinder@gmail.com</span>
            </div>
            <div className="flex items-center justify-center md:justify-start space-x-2">
              <FiPhone className="w-5 h-5" />
              <span>+8801744508060</span>
            </div>
          </div>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-foreground">Follow Us</h3>
          <div className="flex justify-center md:justify-start space-x-5">
            <a href="https://www.instagram.com/programminghero/?hl=en" aria-label="Instagram" className="hover:text-pink-600 transition-all">
              <FaInstagram className="w-6 h-6" />
            </a>
            <a href="https://twitter.com/programminghero?lang=bn" aria-label="Twitter" className="hover:text-sky-500 transition-all">
              <FaTwitter className="w-6 h-6" />
            </a>
            <a href="https://www.facebook.com/programmingHero/" aria-label="Facebook" className="hover:text-blue-600 transition-all">
              <FaFacebookF className="w-6 h-6" />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-border mt-10 py-6 text-center text-xs text-muted-foreground select-none">
        © {new Date().getFullYear()} <span className="font-medium text-foreground">Soulfinder</span>. All rights reserved.
      </div>
    </footer>
  )
}
