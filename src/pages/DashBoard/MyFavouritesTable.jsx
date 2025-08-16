import { useQuery, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { AuthContext } from "../../provider/AuthContext";
import Swal from "sweetalert2";
import { useContext } from "react";

const MyFavouritesTable = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const { data: favourites = [], isLoading, isError,refetch } = useQuery({
    queryKey: ["favorite-bio", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/favorite-bios/${user.email}`);
      return res.data;
    },
  });


  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You are about to remove this biodata from your favourites.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        const res = await axiosSecure.delete(`/favorite-bios/${id}?email=${user?.email}`);
    refetch()
        if (res?.data?.deletedCount > 0) {
         
          
          Swal.fire({
            icon: "success",
            title: "Deleted!",
            text: "Biodata has been removed from your favourites.",
            timer: 1500,
            showConfirmButton: false,
          });
        }
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong while deleting.",
        });
      }
    }
  };

  if (isLoading) return <p className="text-center py-10">Loading...</p>;
  if (isError)
    return (
      <p className="text-center text-red-500 py-10">
        Failed to load favourite biodata.
      </p>
    );

  return (
    <section className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 py-12 bg-white rounded-3xl shadow-lg mt-16">
      <h2 className="text-3xl font-extrabold text-center mb-8 ">
        My Favourites Biodata
      </h2>

      <div className="overflow-x-scroll">
        <table className="min-w-full border border-gray-200 border-collapse">
          <thead className="bg-indigo-100 sticky top-0">
            <tr>
              <th className="border border-gray-300 px-4 py-3 text-left text-indigo-800 font-semibold">
                Name
              </th>
              <th className="border border-gray-300 px-4 py-3 text-left text-indigo-800 font-semibold">
                Biodata ID
              </th>
              <th className="border border-gray-300 px-4 py-3 text-left text-indigo-800 font-semibold">
                Permanent Address
              </th>
              <th className="border border-gray-300 px-4 py-3 text-left text-indigo-800 font-semibold">
                Occupation
              </th>
              <th className="border border-gray-300 px-4 py-3 text-center text-indigo-800 font-semibold">
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {favourites.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center py-6 text-gray-500">
                  No favourites found.
                </td>
              </tr>
            ) : (
              favourites.map((item) => (
                <tr
                  key={item._id}
                  className="hover:bg-indigo-50 transition-colors duration-200"
                >
                  <td className="border border-gray-300 px-4 py-3">{item?.name}</td>
                  <td className="border border-gray-300 px-4 py-3">{item?.BiodataId}</td>
                  <td className="border border-gray-300 px-4 py-3">{item?.permanentDivision}</td>
                  <td className="border border-gray-300 px-4 py-3">{item?.occupation}</td>
                  <td className="border border-gray-300 px-4 py-3 text-center">
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="bg-red-600 cursor-pointer hover:bg-red-700 text-white px-3 py-1 rounded-md transition-colors duration-200"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default MyFavouritesTable;
