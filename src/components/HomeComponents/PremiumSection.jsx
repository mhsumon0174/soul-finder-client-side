import React, { useState } from "react";
import { Link } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Loading from "../Loading";

const PremiumSection = () => {
  const axiosSecure = useAxiosSecure();
  const [sortOrder, setSortOrder] = useState("asc");

  const { data: premiumMembers = [], isLoading, isError } = useQuery({
    queryKey: ["premium-members"],
    queryFn: async () => {
      const res = await axiosSecure.get("/premium-bio");
      return res.data;
    },
  });

  if (isLoading) return <Loading/>
  

  
  const sortedMembers = premiumMembers
    .sort((a, b) => (sortOrder === "asc" ? a.age - b.age : b.age - a.age))
    

  return (
    <section className="mb-12 px-6 md:px-12 lg:px-24 rounded-3xl ">
      
      <h2 className="text-3xl md:text-4xl font-extrabold text-center  tracking-wide drop-shadow-sm mb-8">
         Premium Members 
      </h2><div className="flex justify-end mb-8 flex-wrap gap-4">
        
        <div className="text-sm">
          <label htmlFor="sort" className="font-medium text-gray-700 mr-2">
            Sort by Age:
          </label>
          <select
            id="sort"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="border border-black rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-pink-400"
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {sortedMembers.map((member) => (
          <div
  key={member._id}
  className="relative bg-white border border-gray-300 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group"
>
  {/* Top Accent Bar */}
  <div className="absolute top-0 left-0 w-full h-1.5 bg-black" />

  {/* Profile Picture */}
  <div className="flex justify-center mt-7">
    <div className="relative w-28 h-28 rounded-full overflow-hidden border-2 border-gray-600 shadow-md group-hover:scale-105 transition-transform duration-300">
      <img
        src={member.profileImage}
        alt={member.name}
        className="w-full h-full object-cover"
      />
    </div>
  </div>

  {/* Content */}
  <div className="p-6 text-center flex flex-col items-center">
  <h3 className="text-2xl font-extrabold text-gray-900 mb-2 tracking-tight">
    {member.name}
  </h3>
  <p className="text-xs font-semibold text-gray-500 uppercase mb-5 tracking-widest">
    Biodata ID: {member.BiodataId}
  </p>

  <div className="w-full max-w-xs text-left space-y-3">
    <div className="flex justify-between border-b border-gray-200 pb-2">
      <span className="text-sm text-gray-700 font-medium">Type</span>
      <span className="text-sm text-gray-900">{member.biodataType}</span>
    </div>
    <div className="flex justify-between border-b border-gray-200 pb-2">
      <span className="text-sm text-gray-700 font-medium">Age</span>
      <span className="text-sm text-gray-900">{member.age}</span>
    </div>
    <div className="flex justify-between border-b border-gray-200 pb-2">
      <span className="text-sm text-gray-700 font-medium">Division</span>
      <span className="text-sm text-gray-900">{member.permanentDivision}</span>
    </div>
    <div className="flex justify-between pb-2">
      <span className="text-sm text-gray-700 font-medium">Occupation</span>
      <span className="text-sm text-gray-900">{member.occupation}</span>
    </div>
  </div>

  <Link
    to={`/biodatas/${member._id}`}
    className="mt-6 px-3 py-2 rounded-xl bg-blue-500 text-white font-semibold shadow-lg hover:bg-blue-700 transition duration-300"
  >
    View Profile
  </Link>
</div>


  {/* Premium Badge */}
  <div className="absolute top-4 right-4 bg-gray-100 text-black text-xs font-bold px-3 py-1 rounded-full shadow-lg uppercase tracking-widest">
    PREMIUM
  </div>
</div>

        ))}
      </div>
    </section>
  );
};

export default PremiumSection;
