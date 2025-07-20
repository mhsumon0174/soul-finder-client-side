import React, { useState, useContext } from "react";
import { AuthContext } from "../../../provider/AuthContext";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../../components/Loading";
import Swal from "sweetalert2";

const ManageUsers = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const [searchText, setSearchText] = useState("");
  const [submittedSearch, setSubmittedSearch] = useState(""); // actual search trigger


  const { data: premium = [], refetch: refetchPremium } = useQuery({
    queryKey: ["premium-request", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get("/premium-request");
      return res.data;
    },
  });


  const {
    data: users = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["manage-user", user?.email, submittedSearch],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get("/find-all-users", {
        params: { search: submittedSearch },
      });
      return res.data;
    },
  });

  const handleSearch = (e) => {
    e.preventDefault();
    setSubmittedSearch(searchText.trim());
  };

  const updateAdminRole = async (email, newRole) => {
    try {
      await axiosSecure.patch(`/update-role/${email}`, {
        role: newRole,
      });
      refetch();
      Swal.fire({
        icon: "success",
        title: "Success",
        text: `User upgraded to ${newRole}`,
        timer: 1400,
        showConfirmButton: false,
      });
    } catch (error) {
      Swal.fire("Error", "Failed to update role", "error");
    }
  };

  const updatePremiumRequest = async (email) => {
    try {
      await axiosSecure.patch(`/premium-role-update/${email}`);
      refetchPremium();
      refetch();
      Swal.fire({
        icon: "success",
        title: "Upgraded!",
        text: `${email} is now a Premium User.`,
        timer: 1500,
      });
    } catch (error) {
      Swal.fire("Error", "Failed to upgrade to premium", "error");
    }
  };

  if (isLoading) return <Loading />;

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white rounded shadow mt-10">
      <h2 className="text-2xl font-semibold mb-4">Manage Users</h2>

      {/* Search box */}
      <div className="mb-4">
        <form onSubmit={handleSearch} className="flex gap-2">
          <input
            type="text"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="Search by username or email"
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          >
            Search
          </button>
        </form>
      </div>

      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-4 py-2 text-left">User Name</th>
            <th className="border border-gray-300 px-4 py-2 text-left">User Email</th>
            <th className="border border-gray-300 px-4 py-2 text-center">Make Admin</th>
            <th className="border border-gray-300 px-4 py-2 text-center">Make Premium</th>
          </tr>
        </thead>
        <tbody>
          {users.length === 0 ? (
            <tr>
              <td colSpan={4} className="text-center py-4">
                No users found.
              </td>
            </tr>
          ) : (
            users.map((u) => {
              const hasRequestedPremium = premium.some((p) => p.email === u.email);
              return (
                <tr key={u.email} className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2">{u.name || "N/A"}</td>
                  <td className="border border-gray-300 px-4 py-2">{u.email}</td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    {u.role === "admin" ? (
                      <span className="text-green-600 font-semibold">Admin</span>
                    ) : (
                      <button
                        onClick={() => updateAdminRole(u.email, "admin")}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded"
                      >
                        Make Admin
                      </button>
                    )}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    {u.role === "premium" ? (
                      <span className="text-purple-600 font-semibold">Premium</span>
                    ) : hasRequestedPremium ? (
                      <button
                        onClick={() => updatePremiumRequest(u.email)}
                        className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
                      >
                        Make Premium
                      </button>
                    ) : (
                      <span className="text-gray-400">No Request</span>
                    )}
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ManageUsers;
