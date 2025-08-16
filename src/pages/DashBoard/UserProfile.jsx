import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { AuthContext } from "../../provider/AuthContext";
import Loading from "../../components/Loading";
import { use } from "react";
import { FaUserCircle } from "react-icons/fa";

const UserProfile = () => {
  const { user } = use(AuthContext);
  const axiosSecure = useAxiosSecure();

  const { data: biodata, isLoading } = useQuery({
    queryKey: ["biodata", user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/my-bio/${user.email}`);
      return data;
    },
    enabled: !!user?.email,
  });

  if (isLoading) return <Loading />;

  return (
    <div className="max-w-3xl mx-auto mt-12 px-6 py-8 bg-white border border-gray-200 rounded-xl shadow-md">
      {/* Header */}
      <div className="flex flex-col items-center text-center mb-6">
        {biodata?.profileImage ? (
          <img
            src={biodata.profileImage}
            alt={biodata.name}
            className="w-32 h-32 rounded-full object-cover ring-2 ring-gray-300 shadow-sm"
          />
        ) : (
          <FaUserCircle className="w-32 h-32 text-gray-400" />
        )}
        <h1 className="text-2xl font-bold text-gray-900 mt-4">{biodata?.name || "User Name"}</h1>
        <p className="text-gray-600">{biodata?.email || "user@example.com"}</p>
      </div>

      {/* Info Section */}
      <div className="grid grid-cols-1 gap-4 text-gray-700 text-base">
        <div className="flex justify-between">
          <span className="font-semibold">Full Name:</span>
          <span>{biodata?.name || "-"}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-semibold">Email:</span>
          <span>{biodata?.email || "-"}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-semibold">Mobile:</span>
          <span>{biodata?.mobile || "-"}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-semibold">Date of Birth:</span>
          <span>{biodata?.dob || "-"}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-semibold">Age:</span>
          <span>{biodata?.age || "-"}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-semibold">Height:</span>
          <span>{biodata?.height ? `${biodata.height} cm` : "-"}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-semibold">Weight:</span>
          <span>{biodata?.weight ? `${biodata.weight} kg` : "-"}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-semibold">Occupation:</span>
          <span>{biodata?.occupation || "-"}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-semibold">Permanent Division:</span>
          <span>{biodata?.permanentDivision || "-"}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-semibold">Present Division:</span>
          <span>{biodata?.presentDivision || "-"}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-semibold">Father's Name:</span>
          <span>{biodata?.fatherName || "-"}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-semibold">Mother's Name:</span>
          <span>{biodata?.motherName || "-"}</span>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
