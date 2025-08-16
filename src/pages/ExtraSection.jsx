import { FaExclamationTriangle } from "react-icons/fa";

export default function ExtraSection() {
  const tips = [
    "Never send money to someone you haven’t verified.",
    "Do not share your banking or payment details with anyone on the platform.",
    "Avoid deals that seem too good to be true.",
    "Always report suspicious profiles to the administrator.",
    "Use the platform’s official channels for payments and transactions.",
  ];

  return (
    <section className="">
      <div className="max-w-5xl mx-auto ">
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 flex items-center justify-center gap-3">
            <FaExclamationTriangle className="text-yellow-500 w-8 h-8" />
            Safety & Caution Tips
          </h2>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto text-lg">
            Protect yourself and your funds. Please follow these important guidelines.
          </p>
        </div>

        {/* Tips List */}
        <ul className="space-y-4">
          {tips.map((tip, index) => (
            <li
              key={index}
              className="flex items-start gap-3 bg-white p-4 rounded-xl shadow border border-gray-200"
            >
              <FaExclamationTriangle className="text-red-500 w-6 h-6 mt-1" />
              <p className="text-gray-800">{tip}</p>
            </li>
          ))}
        </ul>

        {/* Footer Note */}
        <p className="text-gray-500 italic mt-10 text-center">
          Remember: SoulFinder will never ask you for money outside the official platform.
        </p>
      </div>
    </section>
  );
}
