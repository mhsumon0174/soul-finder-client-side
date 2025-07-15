import React from "react";
import { Link } from "react-router";
import {
  FaVenusMars,
  FaMapMarkerAlt,
  FaBirthdayCake,
  FaBriefcase,
} from "react-icons/fa";

const BioDataCard = ({ biodata }) => {
  return (
    <div className="relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition duration-300 p-6 flex flex-col items-center text-center border border-gray-100 hover:border-blue-300 group">
      {/* Glowing image ring */}
      <div className="relative mb-5">
        <div className="rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 p-[2px] group-hover:scale-105 transition-transform duration-300">
          <img
            src={biodata.profileImage}
            alt="Profile"
            className="w-28 h-28 rounded-full object-cover border-4 border-white shadow"
          />
        </div>
      </div>

      {/* Biodata Title */}
      <h3 className="text-2xl font-bold text-gray-900 mb-3">
        Biodata #{biodata.BiodataId}
      </h3>

      {/* Info List */}
      <ul className="text-left w-full max-w-xs space-y-2 text-gray-700 text-sm">
        <li className="flex items-center gap-3">
          <FaVenusMars className="text-indigo-500 w-5 h-5" />
          <span>
            <strong className="text-gray-900">Type:</strong> {biodata.biodataType}
          </span>
        </li>
        <li className="flex items-center gap-3">
          <FaMapMarkerAlt className="text-indigo-500 w-5 h-5" />
          <span>
            <strong className="text-gray-900">Division:</strong> {biodata.permanentDivision}
          </span>
        </li>
        <li className="flex items-center gap-3">
          <FaBirthdayCake className="text-indigo-500 w-5 h-5" />
          <span>
            <strong className="text-gray-900">Age:</strong> {biodata.age}
          </span>
        </li>
        <li className="flex items-center gap-3">
          <FaBriefcase className="text-indigo-500 w-5 h-5" />
          <span>
            <strong className="text-gray-900">Occupation:</strong> {biodata.occupation}
          </span>
        </li>
      </ul>

      {/* View Profile Button */}
      <Link
        to={`/biodatas/${biodata._id}`}
        className="mt-6 bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-5 py-2 rounded-full font-medium text-sm shadow hover:from-indigo-600 hover:to-purple-600 transition duration-300"
      >
        View Profile
      </Link>
    </div>
  );
};

export default BioDataCard;
