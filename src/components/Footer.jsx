"use client"

import React from "react"
import { Link } from "react-router"
import { FiMail, FiPhone } from "react-icons/fi"
import { FaInstagram, FaTwitter, FaFacebookF } from "react-icons/fa"

export default function Footer() {
  return (
    <footer className="bg-background border-t border-border text-muted-foreground">
      <div className="max-w-8xl mx-auto px-6 py-16 grid grid-cols-1 text-center md:grid-cols-4 gap-10">
        {/* About Section */}
        <div className="flex flex-col items-center md:items-start">
          <div className="flex items-center space-x-3 mb-4">
            <img
              src="https://i.ibb.co/wZT7dn55/33523-modified.png"
              alt="Soulfinder Logo"
              className="w-10 h-10 object-contain"
            />
            <h2 className="text-3xl font-bold text-foreground">Soulfinder</h2>
          </div>
          <p className="leading-relaxed text-center md:text-left max-w-sm">
            Connect with your better half. Soulfinder helps you find meaningful relationships with ease and trust.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-foreground">Quick Links</h3>
          <nav className="flex flex-col space-y-2">
            <Link to="/" className="hover:text-foreground transition-colors">
              Home
            </Link>
            <Link to="/biodatas" className="hover:text-foreground transition-colors">
              Biodatas
            </Link>
            <Link to="/about" className="hover:text-foreground transition-colors">
              About Us
            </Link>
            <Link to="/contact" className="hover:text-foreground transition-colors">
              Contact Us
            </Link>
            <Link to="/login" className="hover:text-foreground transition-colors">
              Login
            </Link>
          </nav>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-foreground">Contact</h3>
          <p className="flex items-center justify-center space-x-2">
            <FiMail className="w-5 h-5" />
            <span>support@soulfinder.com</span>
          </p>
          <p className="flex items-center justify-center space-x-2 mt-2">
            <FiPhone className="w-5 h-5" />
            <span>+8801744508060</span>
          </p>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-foreground">Follow Us</h3>
          <div className="flex justify-center space-x-4">
            <a href="#" aria-label="Instagram" className="hover:text-foreground transition-colors">
              <FaInstagram className="w-6 h-6" />
            </a>
            <a href="#" aria-label="Twitter" className="hover:text-foreground transition-colors">
              <FaTwitter className="w-6 h-6" />
            </a>
            <a href="#" aria-label="Facebook" className="hover:text-foreground transition-colors">
              <FaFacebookF className="w-6 h-6" />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-border mt-10 py-6 text-center text-xs text-muted-foreground select-none">
        © {new Date().getFullYear()} Soulfinder. All rights reserved.
      </div>
    </footer>
  )
}
