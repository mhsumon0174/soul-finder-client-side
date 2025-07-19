import React, { useState, useContext } from "react";
import { AuthContext } from "../../provider/AuthContext";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const GotMarried = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const [formData, setFormData] = useState({
    selfBiodataId: "",
    partnerBiodataId: "",
    coupleImageLink: "",
    successStory: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (
      !formData.selfBiodataId ||
      !formData.partnerBiodataId ||
      !formData.successStory
    ) {
      return Swal.fire({
        icon: "error",
        title: "Missing Fields",
        text: "Please fill in all required fields.",
      });
    }

    try {
      const payload = {
        ...formData,
        userEmail: user?.email, // Optional: track who submitted
        userName: user?.displayName,
        submittedAt: new Date().toISOString(),
      };

      const { data } = await axiosSecure.post("/success-stories", payload);

      if (data.insertedId) {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Your story has been submitted!",
        });
        setFormData({
          selfBiodataId: "",
          partnerBiodataId: "",
          coupleImageLink: "",
          successStory: "",
        });
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Submission Failed",
        text: "Something went wrong, please try again later.",
      });
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-10  to-white rounded-2xl shadow-xl mt-16 border border-indigo-100">
  <h2 className="text-4xl font-extrabold mb-8 text-center text-indigo-700 tracking-tight">
    Got Married? 💍 Share Your Story
  </h2>

  <form onSubmit={handleSubmit} className="space-y-6">
    {/* Self Biodata ID */}
    <div>
      <label htmlFor="selfBiodataId" className="block text-gray-700 font-medium mb-2">
        Self Biodata ID <span className="text-red-500">*</span>
      </label>
      <input
        id="selfBiodataId"
        name="selfBiodataId"
        value={formData.selfBiodataId}
        onChange={handleChange}
        required
        type="text"
        placeholder="e.g., 1"
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none transition"
      />
    </div>

    {/* Partner Biodata ID */}
    <div>
      <label htmlFor="partnerBiodataId" className="block text-gray-700 font-medium mb-2">
        Partner Biodata ID <span className="text-red-500">*</span>
      </label>
      <input
        id="partnerBiodataId"
        name="partnerBiodataId"
        value={formData.partnerBiodataId}
        onChange={handleChange}
        required
        type="text"
        placeholder="e.g., 2"
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none transition"
      />
    </div>

    {/* Couple Image Link */}
    <div>
      <label htmlFor="coupleImageLink" className="block text-gray-700 font-medium mb-2">
        Couple Image Link <span className="text-red-500">*</span>
      </label>
      <input
        id="coupleImageLink"
        name="coupleImageLink"
        required
        value={formData.coupleImageLink}
        onChange={handleChange}
        type="url"
        placeholder=" Paste your image URL"
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none transition"
      />
      
    </div>

    {/* Success Story */}
    <div>
      <label htmlFor="successStory" className="block text-gray-700 font-medium mb-2">
        Success Story Review <span className="text-red-500">*</span>
      </label>
      <textarea
        id="successStory"
        name="successStory"
        value={formData.successStory}
        onChange={handleChange}
        required
        rows={6}
        placeholder="Tell us how you met your partner and your experience using our platform..."
        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none transition resize-none"
      />
    </div>

    {/* Submit Button */}
    <button
      type="submit"
      className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-lg shadow-md hover:shadow-lg transition-transform hover:-translate-y-0.5"
    >
       Submit Story
    </button>
  </form>
</div>

  );
};

export default GotMarried;
