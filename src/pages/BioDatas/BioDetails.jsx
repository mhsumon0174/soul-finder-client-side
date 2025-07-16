import axios from "axios";
import React, { use, useEffect, useState } from "react";
import { useParams } from "react-router";
import { AuthContext } from "../../provider/AuthContext";

const BioDetails = () => {
    const {user}=use(AuthContext)
  const { id } = useParams();
  const [biodata, setBiodata] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/all-bio/${id}`)
      .then((res) => setBiodata(res.data))
      .catch((err) => console.log(err));
  }, [id]);

  if (!biodata) return <div>Loading...</div>;

  const toggleFavorite = () => {
    
  setIsFavorite(!isFavorite);

  const favoriteData = {
    setBy: user?.email,   
    biodata         
  };

  axios
    .post("http://localhost:3000/favorite-bios", favoriteData)
    .then(() => {
      console.log("Added to favorites");
    })
    .catch((err) => console.error("Favorite failed", err));
};

 

  return (
    <div className="max-w-5xl mx-auto p-8 bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-500 rounded-3xl shadow-xl text-white mt-12">
      <div className="bg-white rounded-2xl shadow-2xl text-gray-800 flex flex-col md:flex-row overflow-hidden">
        <div className="md:w-1/3 bg-gradient-to-b from-purple-800 to-pink-300 flex items-center justify-center p-8">
          <img
            src={biodata.profileImage}
            alt={biodata.name}
            className="rounded-full border-8 border-white w-48 h-48 object-cover shadow-lg"
          />
        </div>

        <div className="md:w-2/3 p-10 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-extrabold tracking-wide mb-2">{biodata.name}</h1>
              <span className="inline-block px-4 py-1 bg-pink-500 text-white rounded-full uppercase text-sm tracking-wide font-semibold">
                {biodata.biodataType}
              </span>
            </div>


            <button
              onClick={toggleFavorite}
              className={`p-3 rounded-full transition-colors duration-300 ${
                isFavorite ? "bg-red-600 text-white" : "bg-gray-200 text-gray-700"
              } hover:bg-red-600 hover:text-white`}
              aria-label="Toggle Favorite"
              title={isFavorite ? "Remove from favorites" : "Add to favorites"}
            >
              
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill={isFavorite ? "currentColor" : "none"}
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 116.364 6.364L12 21.364l-7.682-7.682a4.5 4.5 0 010-6.364z"
                />
              </svg>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-gray-700 text-lg">
            <div className="space-y-2">
              <p>
                <span className="font-semibold text-gray-900">Date of Birth: </span>
                {biodata.dob}
              </p>
              <p>
                <span className="font-semibold text-gray-900">Age: </span>
                {biodata.age} years
              </p>
              <p>
                <span className="font-semibold text-gray-900">Height: </span>
                {biodata.height} cm
              </p>
              <p>
                <span className="font-semibold text-gray-900">Weight: </span>
                {biodata.weight} kg
              </p>
              <p>
                <span className="font-semibold text-gray-900">Occupation: </span>
                {biodata.occupation}
              </p>
              <p>
                <span className="font-semibold text-gray-900">Race: </span>
                {biodata.race}
              </p>
            </div>

            <div className="space-y-2">
              <p>
                <span className="font-semibold text-gray-900">Father's Name: </span>
                {biodata.fatherName}
              </p>
              <p>
                <span className="font-semibold text-gray-900">Mother's Name: </span>
                {biodata.motherName}
              </p>
              <p>
                <span className="font-semibold text-gray-900">Permanent Division: </span>
                {biodata.permanentDivision}
              </p>
              <p>
                <span className="font-semibold text-gray-900">Present Division: </span>
                {biodata.presentDivision}
              </p>
              <p>
                <span className="font-semibold text-gray-900">Expected Partner Age: </span>
                {biodata.expectedPartnerAge} years
              </p>
              <p>
                <span className="font-semibold text-gray-900">Expected Partner Height: </span>
                {biodata.expectedPartnerHeight} cm
              </p>
              <p>
                <span className="font-semibold text-gray-900">Expected Partner Weight: </span>
                {biodata.expectedPartnerWeight} kg
              </p>
            </div>
          </div>

          <div className="pt-6 border-t border-gray-200 text-lg text-gray-700 text-center">
            <p>
              <span className="font-semibold text-gray-900">Email: </span>
              <a  className="text-pink-900 hover:underline">
                {biodata.email}
              </a>
            </p>
            <p>
              <span className="font-semibold text-gray-900">Mobile: </span>
              <a  className="text-pink-900 hover:underline">
                {biodata.mobile}
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BioDetails;
