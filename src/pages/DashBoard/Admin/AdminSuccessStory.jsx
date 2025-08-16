import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useState } from "react";
import Loading from "../../../components/Loading";
import { Dialog } from "@headlessui/react";

const AdminSuccessStory = () => {
  const axiosSecure = useAxiosSecure();
  const [selectedStory, setSelectedStory] = useState(null);

  const { data: stories = [], isLoading } = useQuery({
    queryKey: ["admin-success-stories"],
    queryFn: async () => {
      const res = await axiosSecure.get("/success-stories");
      return res.data;
    },
  });

  if (isLoading) return <Loading />;

  return (
    <section className="p-6 lg:p-10 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-indigo-700 text-center">Success Stories</h2>

      <div className="overflow-x-auto bg-white shadow-md rounded-xl">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-indigo-600 text-white">
            <tr>
              <th className="py-3 px-4">Male Biodata ID</th>
              <th className="py-3 px-4">Female Biodata ID</th>
              <th className="py-3 px-4 text-center">View Story</th>
            </tr>
          </thead>
          <tbody>
            {stories.map((story) => (
              <tr key={story._id} className="border-b hover:bg-gray-50">
                <td className="py-3 px-4">{story.selfBiodataId}</td>
                <td className="py-3 px-4">{story.partnerBiodataId}</td>
                <td className="py-3 px-4 text-center">
                  <button
                    onClick={() => setSelectedStory(story)}
                    className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-full text-sm font-medium"
                  >
                    View Story
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      <Dialog open={!!selectedStory} onClose={() => setSelectedStory(null)} className="relative z-50">
  <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

  <div className="fixed inset-0 flex items-center justify-center p-4">
    <div className="bg-white rounded-xl p-6 max-w-md w-full shadow-lg">
      <h3 className="text-xl font-semibold text-black mb-4 text-center">Success Story</h3>

      {selectedStory?.coupleImageLink && (
        <img
          src={selectedStory.coupleImageLink}
          alt="Success couple"
          className="w-32 h-32 object-cover mx-auto rounded-full border mb-4"
        />
      )}

      <p><strong>Male Biodata ID:</strong> {selectedStory?.selfBiodataId}</p>
      <p><strong>Female Biodata ID:</strong> {selectedStory?.partnerBiodataId}</p>

      {selectedStory?.rating && (
        <p className="text-yellow-500 mb-1">
          <strong>Rating:</strong> {"⭐".repeat(selectedStory.rating)}
        </p>
      )}

      {selectedStory?.submittedAt && (
        <p className="text-gray-500 text-sm mb-3">
          <strong>Date:</strong> {new Date(selectedStory.submittedAt).toLocaleDateString()}
        </p>
      )}

      <p className="text-gray-800 italic mb-6">"{selectedStory?.successStory}"</p>

      <button
        onClick={() => setSelectedStory(null)}
        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-md"
      >
        Close
      </button>
    </div>
  </div>
</Dialog>

    </section>
  );
};

export default AdminSuccessStory;
