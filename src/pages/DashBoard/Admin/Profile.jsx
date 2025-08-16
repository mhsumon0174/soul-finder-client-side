import React, { useContext } from "react";
import { AuthContext } from "../../../provider/AuthContext";

const Profile = () => {
  const { user } = useContext(AuthContext);
  const { email, displayName, photoURL } = user || {};

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full border border-gray-200">
        {/* Profile Photo */}
        <div className="flex flex-col items-center">
          {photoURL ? (
            <img
              src={photoURL}
              alt="User"
              className="w-24 h-24 rounded-full border border-gray-300 object-cover"
            />
          ) : (
            <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-3xl font-bold">
              {displayName ? displayName[0] : "U"}
            </div>
          )}

          {/* Name */}
          <h2 className="mt-4 text-xl font-semibold text-gray-900">
            {displayName || "Unnamed User"}
          </h2>

          {/* Email */}
          <p className="text-gray-600 text-sm">{email || "No email available"}</p>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 my-6"></div>

        {/* Profile Info */}
        <div className="space-y-2 text-gray-700 text-sm">
          <div className="flex justify-between">
            <span className="font-medium">Full Name:</span>
            <span>{displayName || "Not set"}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Email:</span>
            <span>{email || "Not set"}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
