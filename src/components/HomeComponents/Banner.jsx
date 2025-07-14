import React from "react"
import { Button } from "@/components/ui/button"
import { Link } from "react-router"

export default function Banner() {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center text-white overflow-hidden">
      {/* Background Image with Blur */}
      <img
        src="https://i.ibb.co/fzywjKS9/banner.png"
        alt="Soulfinder Banner"
        className="absolute inset-0 w-full h-full object-cover blur-sm scale-105"
      />

      {/* Overlay Dark Filter */}
      <div className="absolute inset-0 bg-black/40 z-10" />

      {/* Content */}
      <div className="relative z-20 text-center px-6 max-w-2xl">
        <h1 className="text-4xl md:text-5xl font-extrabold leading-tight drop-shadow-md">
          Find Your Perfect Match with <span className="text-blue-400">Soulfinder</span>
        </h1>
        <p className="mt-4 text-lg md:text-xl text-gray-200 drop-shadow">
          Join thousands who’ve already found their soulmate. It’s your time.
        </p>
        <div className="mt-6 flex justify-center gap-4 flex-wrap">
          <Button asChild>
            <Link to="/biodatas">Browse Biodatas</Link>
          </Button>
          <Button asChild variant="outline" className="border-white text-white hover:bg-white/10">
            <Link to="/register">Create Account</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
