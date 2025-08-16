import { FaUsers, FaBullseye, FaHeart } from "react-icons/fa";
import { Link } from "react-router";

export default function AboutUs() {
  return (
    <section className="relative py-20    overflow-hidden">
      {/* Background Accent */}
      <div className="absolute top-[-100px] left-[-100px] w-[300px] h-[300px]  rounded-full opacity-30 blur-3xl"></div>
      <div className="absolute bottom-[-100px] right-[-100px] w-[300px] h-[300px]  rounded-full opacity-30 blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 ">
        {/* Header */}
        <div className="text-center mb-14 ">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 leading-tight">
            About <span className="text-black">Us</span>
          </h2>
          <p className="text-gray-600 text-md max-w-2xl mx-auto mt-4">
            We’re more than just a platform — we are the bridge between stories, dreams, and a lifetime of companionship.
          </p>
        </div>

        {/* Content */}
        <div className="flex flex-col md:flex-row items-center gap-10">
          {/* Left Image */}
          <div className="w-full md:w-1/2 flex justify-center">
            <img
              src="https://i.ibb.co/wZT7dn55/33523-modified.png"
              alt="Happy Couple"
              className="w-[280px] md:w-[320px] rounded-[2rem]  hover:scale-105 transition duration-500"
            />
          </div>

          {/* Right Text */}
          <div className="w-full md:w-1/2 space-y-6">
            <h3 className="text-2xl font-semibold text-gray-800">Why We Exist</h3>
            <p className="text-gray-600 leading-relaxed">
              In a digital world flooded with choices, our mission is simple: help you find *the one* based on shared values, trust, and emotional connection. We believe love is not an algorithm — it's a journey.
            </p>

            {/* Values */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
              <div className="flex items-start gap-4 group">
                <FaUsers className="text-indigo-500 w-7 h-7 group-hover:scale-110 transition-transform" />
                <div>
                  <h4 className="text-lg font-medium text-gray-800">Community</h4>
                  <p className="text-gray-600 text-sm">We foster a warm, respectful, and inclusive space for everyone.</p>
                </div>
              </div>

              <div className="flex items-start gap-4 group">
                <FaBullseye className="text-purple-500 w-7 h-7 group-hover:scale-110 transition-transform" />
                <div>
                  <h4 className="text-lg font-medium text-gray-800">Purpose</h4>
                  <p className="text-gray-600 text-sm">We help build relationships rooted in meaning, not just matches.</p>
                </div>
              </div>

              <div className="flex items-start gap-4 group">
                <FaHeart className="text-pink-500 w-7 h-7 group-hover:scale-110 transition-transform" />
                <div>
                  <h4 className="text-lg font-medium text-gray-800">Trust</h4>
                  <p className="text-gray-600 text-sm">Your privacy and safety are our highest priorities at every step.</p>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="pt-6 text-center md:text-left">
              <Link to='/register' className="bg-indigo-600 text-white px-6 py-3 rounded-full font-semibold shadow-md hover:bg-indigo-700 transition duration-300">
                Join Our Mission 💜
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
