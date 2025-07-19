import React from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import Loading from "../../../components/Loading";

const ApprovedPremium = () => {
  const axiosSecure = useAxiosSecure();

  const { data: premiumRequests = [], isLoading, refetch } = useQuery({
    queryKey: ["premium-request"],
    queryFn: async () => {
      const res = await axiosSecure.get("/premium-request");
      return res.data;
    },
  });

  const handleApprovePremium = async (email) => {
    try {
      await axiosSecure.patch(`/premium-role-update/${email}`);
      Swal.fire({
        icon: "success",
        title: "Upgraded!",
        text: `${email} is now a Premium User.`,
      });
      refetch();
    } catch (error) {
      Swal.fire("Error", "Failed to upgrade to premium", "error");
    }
  };

  if (isLoading) return <Loading />;

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white rounded shadow mt-10">
      <h2 className="text-2xl font-semibold mb-6">Premium Approval Requests</h2>

      {premiumRequests.length === 0 ? (
        <p className="text-center text-gray-500">No premium requests pending.</p>
      ) : (
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Email</th>
              <th className="border px-4 py-2">Biodata ID</th>
              <th className="border px-4 py-2 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {premiumRequests.map((request) => (
              <tr key={request._id} className="hover:bg-gray-50">
                <td className="border px-4 py-2">{request.name || "N/A"}</td>
                <td className="border px-4 py-2">{request.email}</td>
                <td className="border px-4 py-2">{request.biodataId}</td>
                <td className="border px-4 py-2 text-center">
                  <button
                    onClick={() => handleApprovePremium(request.email)}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
                  >
                    Make Premium
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ApprovedPremium;
