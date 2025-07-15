import { useEffect, useState } from "react";
import axios from "axios";
import BioDataCard from "./BioDataCard";

export default function AllBioData() {
  const [biodatas, setBiodatas] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/all-bio?limit=20").then((res) => {
      setBiodatas(res.data);
    });
  }, []);

  return (
    <div className="flex flex-col md:flex-row gap-6 p-4 ">
      
      <aside className="md:w-1/4 w-full bg-white rounded shadow p-4 space-y-4">
        <h2 className="text-xl font-semibold mb-4">Filter Biodatas</h2>

        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Biodata Type
          </label>
          <select className="w-full border px-3 py-2 rounded">
            <option value="">All</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>

        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Division
          </label>
          <select className="w-full border px-3 py-2 rounded">
            <option value="">All</option>
            <option value="Dhaka">Dhaka</option>
            <option value="Chattagram">Chattagram</option>
            <option value="Rangpur">Rangpur</option>
            <option value="Barisal">Barisal</option>
            <option value="Khulna">Khulna</option>
            <option value="Mymensingh">Mymensingh</option>
            <option value="Sylhet">Sylhet</option>
          </select>
        </div>

        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Age Range
          </label>
          <div className="flex gap-2">
            <input
              type="number"
              placeholder="Min"
              className="w-1/2 border px-3 py-2 rounded"
            />
            <input
              type="number"
              placeholder="Max"
              className="w-1/2 border px-3 py-2 rounded"
            />
          </div>
        </div>

        
        <button
          
          className="w-full bg-blue-700 text-white py-2 rounded opacity-50 cursor-pointer mt-2"
        >
          Apply Filter
        </button>
      </aside>

      {/* Right: Biodata Cards */}
      <section className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {biodatas.map((biodata) => (
          <BioDataCard key={biodata._id} biodata={biodata} />
        ))}
      </section>
    </div>
  );
}
