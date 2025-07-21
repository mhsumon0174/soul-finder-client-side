import React from "react";
import { use } from "react";
import { AuthContext } from "../../provider/AuthContext";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Loading from "../../components/Loading";
import Swal from "sweetalert2";

const MyContactRequest = () => {
  const { user } = use(AuthContext);
  const axiosSecure = useAxiosSecure();

  const { data = [], isLoading, refetch } = useQuery({
    queryKey: ["contact-req", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/get-my-contact-req/${user?.email}`);
      return res?.data?.map((item) => ({
        ...item.biodata,
        status: item.nowStatus,
      }));
    },
  });
  console.log(data);

  const handleDelete = (email) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axiosSecure.delete(`/contact-req/${email}`);
          refetch();
          Swal.fire("Deleted!", "Your request has been deleted.", "success");
        } catch (error) {
          Swal.fire("Error!", "Failed to delete. Try again later.", "error");
        }
      }
    });
  };

  return (
    <section className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 py-12 bg-white rounded-3xl shadow-lg mt-16">
      <h2 className="text-3xl font-extrabold text-center mb-8 text-indigo-700">
        My Contact Requests
      </h2>

      <div className="w-full overflow-x-scroll rounded-lg border scrollbar-thin scrollbar-thumb-indigo-300 scrollbar-track-gray-100">
        <table className="min-w-[800px] w-full border-collapse border border-gray-200">
          <thead className="bg-indigo-100 sticky top-0">
            <tr>
              <th className="border border-gray-300 px-4 py-3 text-left text-indigo-800 font-semibold">
                Name
              </th>
              <th className="border border-gray-300 px-4 py-3 text-left text-indigo-800 font-semibold">
                Biodata ID
              </th>
              <th className="border border-gray-300 px-4 py-3 text-left text-indigo-800 font-semibold">
                Status
              </th>
              <th className="border border-gray-300 px-4 py-3 text-left text-indigo-800 font-semibold">
                Mobile No
              </th>
              <th className="border border-gray-300 px-4 py-3 text-left text-indigo-800 font-semibold">
                Email
              </th>
              <th className="border border-gray-300 px-4 py-3 text-center text-indigo-800 font-semibold">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map(({ _id, name, BiodataId, status, mobile, email }) => (
              <tr
                key={_id}
                className="hover:bg-indigo-50 transition-colors duration-200"
              >
                <td className="border border-gray-300 px-4 py-3">{name}</td>
                <td className="border border-gray-300 px-4 py-3">{BiodataId}</td>
                <td className="border border-gray-300 px-4 py-3">
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                      status === "Approved"
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {status}
                  </span>
                </td>
                <td className="border border-gray-300 px-4 py-3">
                  {status === "Approved" ? mobile : "Pending"}
                </td>
                <td className="border border-gray-300 px-4 py-3">
                  {status === "Approved" ? email : "Pending"}
                </td>
                <td className="border border-gray-300 px-4 py-3 text-center">
                  <button
                    onClick={() => handleDelete(email)}
                    className="bg-red-600 cursor-pointer hover:bg-red-700 text-white px-3 py-1 rounded-md transition-colors duration-200"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default MyContactRequest;
