import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { AuthContext } from "../../provider/AuthContext";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useRole from "../../hooks/useRole";
import Swal from "sweetalert2";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../components/Loading";

const BioDetails = () => {
  const { user } = React.useContext(AuthContext);
  const { id } = useParams();
  const [biodata, setBiodata] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const axiosSecure = useAxiosSecure();
  const [role, isRoleLoading] = useRole();

  // Fetch main biodata with react-query
  const {
    data: biodataData,
    isLoading
 
  } = useQuery({
    queryKey: ["biodata", id, user?.email],
    queryFn: async () => {
      if (!user?.email) return null;
      const res = await axiosSecure.get(`/get-bio/${id}?email=${user.email}`);
      return res.data;
    },
    enabled: !!user?.email && !!id,
  });

  // Update local biodata and favorite state on fetch
  useEffect(() => {
    if (!biodataData) return;
    setBiodata(biodataData);
    setIsFavorite(Boolean(biodataData?.isFavorite));
  }, [biodataData]);

  // Fetch similar biodatas using react-query directly (no local state)
  const {
    data: similarBiodatas = [], // default to empty array if no data
  } = useQuery({
    queryKey: ["similarBiodatas", biodata?.biodataType, biodata?._id],
    queryFn: async () => {
      if (!biodata?.biodataType) return [];
      const res = await axiosSecure.get(
        `/similar-biodata/${biodata.biodataType}?exclude=${biodata._id}`
      );
      return res.data || [];
    },
    enabled: !!biodata?.biodataType && !!biodata?._id,
  });

  const toggleFavorite = () => {
    if (isFavorite) {
      axiosSecure
        .delete(`/favorite-bios/${biodata?._id}?email=${user?.email}`)
        .then(() => {
          setIsFavorite(false);
          console.log("Removed from favorites");
        })
        .catch((err) => {
          console.error("Failed to remove favorite", err);
        });
    } else {
      if (biodata.email === user?.email) {
        return Swal.fire({
          icon: "error",
          title: "Failed",
          text: "You Can't Add Favorite Your Own Bio-Data",
          draggable: true,
          timer: 3400,
        });
      }
      const favoriteData = biodata;

      axiosSecure
        .post(`/favorite-bios/${user?.email}`, favoriteData)
        .then(() => {
          setIsFavorite(true);
          console.log("Added to favorites");
        })
        .catch((err) => {
          console.error("Failed to add favorite", err);
          setIsFavorite(false);
        });
    }
  };

  if(isLoading) return <Loading></Loading>
  return (
    <div className="max-w-5xl mx-auto p-8 mt-12">
      {/* Main Biodata Card */}
      <div className="bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-500 rounded-3xl shadow-xl text-white">
        <div className="bg-white rounded-2xl shadow-2xl text-gray-800 flex flex-col md:flex-row overflow-hidden">
          {/* Left Image */}
          <div className="md:w-1/3 bg-gradient-to-b from-purple-800 to-pink-300 flex items-center justify-center p-8">
            <img
              src={biodata?.profileImage}
              alt={biodata?.name}
              className="rounded-full border-8 border-white w-48 h-48 object-cover shadow-lg"
            />
          </div>

          {/* Right Details */}
          <div className="md:w-2/3 p-10 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-extrabold tracking-wide mb-2">
                  {biodata?.name}
                </h1>
                <span className="inline-block px-4 py-1 bg-pink-500 text-white rounded-full uppercase text-sm tracking-wide font-semibold">
                  {biodata?.biodataType}
                </span>
              </div>

              {/* Favorite Button */}
              <button
                onClick={toggleFavorite}
                className={`cursor-pointer p-3 rounded-full transition-colors duration-300 ${
                  isFavorite
                    ? "bg-red-600 text-white"
                    : "bg-gray-200 text-gray-700"
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

            {/* Personal Info Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-gray-700 text-lg">
              {/* Column 1 */}
              <div className="space-y-2">
                <p>
                  <span className="font-semibold text-gray-900">
                    Date of Birth:{" "}
                  </span>
                  {biodata?.dob}
                </p>
                <p>
                  <span className="font-semibold text-gray-900">Age: </span>
                  {biodata?.age} years
                </p>
                <p>
                  <span className="font-semibold text-gray-900">Height: </span>
                  {biodata?.height} cm
                </p>
                <p>
                  <span className="font-semibold text-gray-900">Weight: </span>
                  {biodata?.weight} kg
                </p>
                <p>
                  <span className="font-semibold text-gray-900">Occupation: </span>
                  {biodata?.occupation}
                </p>
                <p>
                  <span className="font-semibold text-gray-900">Race: </span>
                  {biodata?.race}
                </p>
              </div>

              {/* Column 2 */}
              <div className="space-y-2">
                <p>
                  <span className="font-semibold text-gray-900">Father's Name: </span>
                  {biodata?.fatherName}
                </p>
                <p>
                  <span className="font-semibold text-gray-900">Mother's Name: </span>
                  {biodata?.motherName}
                </p>
                <p>
                  <span className="font-semibold text-gray-900">
                    Permanent Division:{" "}
                  </span>
                  {biodata?.permanentDivision}
                </p>
                <p>
                  <span className="font-semibold text-gray-900">
                    Present Division:{" "}
                  </span>
                  {biodata?.presentDivision}
                </p>
                <p>
                  <span className="font-semibold text-gray-900">
                    Expected Partner Age:{" "}
                  </span>
                  {biodata?.expectedPartnerAge} years
                </p>
                <p>
                  <span className="font-semibold text-gray-900">
                    Expected Partner Height:{" "}
                  </span>
                  {biodata?.expectedPartnerHeight} cm
                </p>
                <p>
                  <span className="font-semibold text-gray-900">
                    Expected Partner Weight:{" "}
                  </span>
                  {biodata?.expectedPartnerWeight} kg
                </p>
              </div>
            </div>

            {/* Contact Info */}
            <div className="pt-6 border-t border-gray-200 text-lg text-gray-700 text-center mt-6">
              {role === "premium" ? (
                <>
                  <p className="mb-4 font-bold bg-amber-200 p-1 rounded-2xl">
                    Contact Information
                  </p>
                  <p>
                    <span className="font-semibold text-gray-900">Email: </span>
                    <a className="text-pink-900 hover:underline">{biodata?.email}</a>
                  </p>
                  <p>
                    <span className="font-semibold text-gray-900">Mobile: </span>
                    <a className="text-pink-900 hover:underline">{biodata?.mobile}</a>
                  </p>
                </>
              ) : (
                <button
                  onClick={() => (window.location.href = `/checkout/${biodata?._id}`)}
                  className="cursor-pointer mt-4 bg-pink-600 hover:bg-pink-700 text-white font-medium py-2 px-4 rounded-md transition duration-300"
                >
                  Request Contact Information
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Similar Biodatas Section */}
      {similarBiodatas.length > 0 && (
        <div className="mt-20 px-4">
          <h2 className="text-3xl font-bold mb-10 text-center text-gray-800">
            Explore Similar Biodatas
          </h2>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {similarBiodatas.map((bio) => (
              <div
                key={bio._id}
                className="relative group bg-white rounded-2xl shadow-lg p-5 transition-all duration-300 hover:shadow-2xl hover:scale-105 cursor-pointer"
              >
                <div className="aspect-[3/4] overflow-hidden rounded-xl mb-4">
                  <img
                    src={bio.profileImage}
                    alt={bio.name}
                    className="w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">{bio.name}</h3>
                <p className="text-sm text-gray-600">Age: {bio.age}</p>
                <p className="text-sm text-gray-600">Division: {bio.permanentDivision}</p>
                <button
                  onClick={() => (window.location.href = `/biodatas/${bio._id}`)}
                  className="mt-4 cursor-pointer bg-pink-600 hover:bg-pink-700 text-white font-medium py-2 px-4 rounded-md transition duration-300"
                >
                  View Profile
                </button>
              </div>
            ))}
          </div>

          {/* Centered Explore All Button */}
          <div className="flex justify-center mt-10">
            <button
              onClick={() => (window.location.href = "/biodatas")}
              className="bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-6 rounded-md transition duration-300"
            >
              Explore All
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BioDetails;
