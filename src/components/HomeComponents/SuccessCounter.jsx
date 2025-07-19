import React, { useEffect, useState } from "react";
import { FaFemale, FaMale, FaRing } from "react-icons/fa";

const SuccessCounter = () => {
  // Sample static data
  const stats = [
    {
      id: 1,
      icon: <FaFemale className="text-pink-500" />,
      label: "Women",
      value: 2450,
    },
    {
      id: 2,
      icon: <FaMale className="text-blue-500" />,
      label: "Men",
      value: 2650,
    },
    {
      id: 3,
      icon: <FaRing className="text-yellow-500" />,
      label: "Marriages Successfully Arranged",
      value: 520,
    },
  ];

  const [counts, setCounts] = useState(stats.map(() => 0));

  useEffect(() => {
    const intervals = stats.map((stat, i) => {
      let start = 0;
      const end = stat.value;
      const duration = 2000; // 2 seconds total
      const increment = Math.ceil(end / (duration / 50)); // update every 50ms

      return setInterval(() => {
        start += increment;
        if (start >= end) {
          start = end;
          clearInterval(intervals[i]);
        }
        setCounts((prev) => {
          const newCounts = [...prev];
          newCounts[i] = start;
          return newCounts;
        });
      }, 50);
    });

    return () => intervals.forEach((id) => clearInterval(id));
  }, []);

  return (
    <section className="bg-gray-50 py-16 px-6 md:px-20 lg:px-32 rounded-3xl shadow-lg mt-16">
      {/* Heading */}
      <h2 className="text-4xl font-extrabold text-center text-indigo-700 mb-12">
        At A Glance
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-12 text-center">
        {stats.map((stat, i) => (
          <div
            key={stat.id}
            className="bg-white rounded-2xl p-8 shadow-md flex flex-col items-center"
          >
            <div className="text-5xl mb-4">{stat.icon}</div>
            <p className="text-5xl font-extrabold text-indigo-700">
              {counts[i].toLocaleString()}+
            </p>
            <p className="mt-2 text-lg font-bold text-indigo-600">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SuccessCounter;
