import React, { useEffect, useState } from "react";
import { FaFemale, FaMale, FaRing } from "react-icons/fa";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const SuccessCounter = () => {
  const axiosSecure = useAxiosSecure();
  const [animatedCounts, setAnimatedCounts] = useState({
    female: 0,
    male: 0,
    married: 0,
    totalBiodata: 0,
  });

  const { data: counts = {} } = useQuery({
    queryKey: ["count-all"],
    queryFn: () => axiosSecure.get("/count-all").then(res => res.data),
  });

  useEffect(() => {
    if (!counts) return;

    const keys = ["female", "male", "married", "totalBiodata"];
    const intervals = [];

    keys.forEach((key) => {
      let start = 0;
      const end = counts[key] || 0;
      const duration = 2000;
      const increment = Math.ceil(end / (duration / 50)); // update every 50ms

      const interval = setInterval(() => {
        start += increment;
        if (start >= end) {
          start = end;
          clearInterval(interval);
        }
        setAnimatedCounts((prev) => ({
          ...prev,
          [key]: start,
        }));
      }, 50);

      intervals.push(interval);
    });

    return () => intervals.forEach((id) => clearInterval(id));
  }, [counts]);

  return (
    <section className="bg-gray-50 py-16 px-6 md:px-20 lg:px-32 rounded-3xl shadow-lg mt-16">
      <h2 className="text-4xl font-extrabold text-center text-indigo-700 mb-12">
        At A Glance
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-12 text-center">
        <div className="bg-white rounded-2xl p-8 shadow-md flex flex-col items-center">
          <span className="text-5xl text-green-500 mb-4">📄</span>
          <p className="text-5xl font-extrabold text-indigo-700">
            {animatedCounts.totalBiodata.toLocaleString()}+
          </p>
          <p className="mt-2 text-lg font-bold text-indigo-600">Total Biodatas</p>
        </div>
        <div className="bg-white rounded-2xl p-8 shadow-md flex flex-col items-center">
          <FaFemale className="text-5xl text-pink-500 mb-4" />
          <p className="text-5xl font-extrabold text-indigo-700">
            {animatedCounts.female.toLocaleString()}+
          </p>
          <p className="mt-2 text-lg font-bold text-indigo-600">Women</p>
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-md flex flex-col items-center">
          <FaMale className="text-5xl text-blue-500 mb-4" />
          <p className="text-5xl font-extrabold text-indigo-700">
            {animatedCounts.male.toLocaleString()}+
          </p>
          <p className="mt-2 text-lg font-bold text-indigo-600">Men</p>
        </div>

        

        <div className="bg-white rounded-2xl p-8 shadow-md flex flex-col items-center">
          <FaRing className="text-5xl text-yellow-500 mb-4" />
          <p className="text-5xl font-extrabold text-indigo-700">
            {animatedCounts.married.toLocaleString()}+
          </p>
          <p className="mt-2 text-lg font-bold text-indigo-600">
            Marriages Successfully Arranged
          </p>
        </div>
      </div>
    </section>
  );
};

export default SuccessCounter;
