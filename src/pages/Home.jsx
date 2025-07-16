import React, { use } from "react"
import { Button } from "@/components/ui/button"
import { Link } from "react-router"
import { AuthContext } from "../provider/AuthContext"

export default function Banner() {
  const {user}=use(AuthContext)
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden text-white">
      {/* Background Image with Blur */}
      <img
        src="https://i.ibb.co/fzywjKS9/banner.png"
        alt="Soulfinder Banner"
        className="absolute inset-0 w-full h-full object-cover blur-sm scale-105"
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent z-10" />

      {/* Content */}
      <div className="relative z-20 text-center px-6 max-w-2xl">
        <h1 className="text-4xl md:text-5xl font-extrabold leading-tight drop-shadow-md">
          Discover Your <span className="text-blue-400">Perfect Match</span>
        </h1>
        <p className="mt-4 text-lg md:text-xl text-gray-200 drop-shadow">
          Real people. Real stories. Begin your journey to a meaningful relationship.
        </p>

        <div className="mt-6 flex justify-center gap-4 flex-wrap">
          <Button asChild className="border-white bg-yellow-100 text-black hover:text-white ">
            <Link to="/biodatas">Browse Biodatas</Link>
          </Button>
          <Button
            asChild
            variant="outline"
            className="border-white bg-green-500 text-white "
          >
           {user? <Link to="/contact-us">Contact Us</Link>:
            <Link to="/register">Join Soulfinder</Link>}
          </Button>
        </div>
      </div>
    </section>
  )
}
