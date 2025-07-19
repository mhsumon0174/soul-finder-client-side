import React from "react";
import {
  FaUserCircle,
  FaSearch,
  FaComments,
  FaHandshake,
  FaHeart,
} from "react-icons/fa";

const steps = [
  {
    icon: <FaUserCircle />,
    title: "Create Your Profile",
    description:
      "Register and build your detailed biodata with accurate information to attract genuine matches.",
  },
  {
    icon: <FaSearch />,
    title: "Search Compatible Matches",
    description:
      "Use filters and advanced search to find profiles that suit your preferences and lifestyle.",
  },
  {
    icon: <FaComments />,
    title: "Connect & Communicate",
    description:
      "Send contact requests, chat securely, and get to know your potential partner better.",
  },
  {
    icon: <FaHandshake />,
    title: "Request Contact Approval",
    description:
      "Our secure process ensures privacy and approval before sharing contact details.",
  },
  {
    icon: <FaHeart />,
    title: "Start Your Journey",
    description:
      "Meet, interact, and move forward towards building a beautiful life together.",
  },
];

const HowItWorks = () => {
  return (
    <section className="bg-gray-50 py-16 px-6 md:px-20 lg:px-32 rounded-3xl shadow-lg mt-16">
      <h2 className="text-4xl font-extrabold text-center text-blue-800 mb-14 drop-shadow-md">
        How It Works
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 max-w-7xl mx-auto">
        {steps.map((step, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl p-8 flex flex-col items-center text-center shadow-md hover:shadow-2xl transition-shadow duration-300 cursor-default relative"
          >
            <div className="flex items-center justify-center w-16 h-16 rounded-full bg-blue-600 text-white text-3xl mb-6 animate-pulse hover:animate-none transition-transform duration-300 transform hover:scale-110">
              {step.icon}
            </div>
            
            <h3 className="text-xl font-semibold text-blue-700 mb-3 mt-6">
              {step.title}
            </h3>
            <p className="text-gray-700 leading-relaxed text-sm">
              {step.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;
