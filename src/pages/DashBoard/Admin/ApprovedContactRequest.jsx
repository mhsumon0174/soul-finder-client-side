import React from "react";

import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import Loading from "../../../components/Loading";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const ApprovedContactRequest = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: contactRequests = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["contact-request"],
    queryFn: async () => {
      const res = await axiosSecure.get("/contact-req");
      return res.data;
    },
  });
console.log(contactRequests);

  const handleApproveContact = async (id) => {
    try {
      await axiosSecure.patch(`/approve-contact-request/${id}`);
      refetch()
      Swal.fire({
        icon: "success",
        title: "Approved!",
        text: `Contact request approved.`,
      });
      
    } catch (error) {
      Swal.fire("Error", "Failed to approve contact request", "error");
    }
  };

  if (isLoading) return <Loading />;

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white rounded shadow mt-10">
      <h2 className="text-2xl font-semibold mb-6">Approved Contact Requests</h2>

      {contactRequests.length === 0 ? (
        <p className="text-center text-gray-500">No contact requests found.</p>
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
            {contactRequests.map((request) => (
              <tr key={request._id} className="hover:bg-gray-50">
                <td className="border px-4 py-2">{request?.name || "N/A"}</td>
                <td className="border px-4 py-2">{request?.email}</td>
                <td className="border px-4 py-2">{request?.biodataId}</td>
                <td className="border px-4 py-2 text-center">
                  {request?.nowStatus === "Approved" ? (
                    <span className="text-green-600 font-medium">Approved</span>
                  ) : (
                    <button
                      onClick={() => handleApproveContact(request?._id)}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
                    >
                      Approve Contact
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ApprovedContactRequest;
