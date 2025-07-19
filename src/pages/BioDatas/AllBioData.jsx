import { useEffect, useState } from "react";
import axios from "axios";
import BioDataCard from "./BioDataCard";
import useAxiosSecure from "../../hooks/useAxiosSecure";

export default function AllBioData() {
  const [type, setType] = useState("");
  const [division, setDivision] = useState("");
  const [minAge, setMinAge] = useState("");
  const [maxAge, setMaxAge] = useState("");
  const [biodatas, setBiodatas] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const limit = 20; 

  const fetchBioData = () => {
    const query = new URLSearchParams();

    if (type) query.append("type", type);
    if (division) query.append("division", division);
    if (minAge) query.append("minAge", minAge);
    if (maxAge) query.append("maxAge", maxAge);

    query.append("limit", limit);
    query.append("page", page);

    axios.get(`http://localhost:3000/all-bio?${query.toString()}`).then((res) => {
      setBiodatas(res.data.data);
      setTotalPages(res.data.totalPages);
    });
  };


  useEffect(() => {
    fetchBioData();
  }, [page]);

  
  const applyFilters = () => {
    setPage(1);
    fetchBioData();
  };

  return (
    <div className="flex flex-col md:flex-row gap-6 p-4 ">
      <aside className="md:w-1/4 w-full bg-white rounded shadow p-4 space-y-4">
        <h2 className="text-xl font-semibold mb-4">Filter Biodatas</h2>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Biodata Type
          </label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full border px-3 py-2 rounded"
          >
            <option value="">All</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Division
          </label>
          <select
            value={division}
            onChange={(e) => setDivision(e.target.value)}
            className="w-full border px-3 py-2 rounded"
          >
            <option value="">All</option>
            <option value="Dhaka">Dhaka</option>
            <option value="Rajshahi">Rajshahi</option>
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
              value={minAge}
              onChange={(e) => setMinAge(e.target.value)}
              type="number"
              placeholder="Min"
              className="w-1/2 border px-3 py-2 rounded"
            />
            <input
              value={maxAge}
              onChange={(e) => setMaxAge(e.target.value)}
              type="number"
              placeholder="Max"
              className="w-1/2 border px-3 py-2 rounded"
            />
          </div>
        </div>

        <button
          onClick={applyFilters}
          className="w-full cursor-pointer bg-blue-700 text-white py-2 rounded mt-2"
        >
          Apply Filter
        </button>
      </aside>

      <section className="flex-1">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {biodatas.map((biodata) => (
            <BioDataCard key={biodata._id} biodata={biodata} />
          ))}
        </div>

        <div className="flex justify-center items-center gap-4 mt-6">
          <button
            disabled={page === 1}
            onClick={() => setPage((p) => Math.max(p - 1, 1))}
            className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
          >
            Prev
          </button>

          <span>
            Page {page} of {totalPages}
          </span>

          <button
            disabled={page === totalPages}
            onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
            className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </section>
    </div>
  );
}
