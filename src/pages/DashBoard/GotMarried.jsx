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
    rating: "", 
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

    const { selfBiodataId, partnerBiodataId, coupleImageLink, successStory, rating } = formData;

    // Basic validation
    if (!selfBiodataId || !partnerBiodataId || !coupleImageLink || !successStory || !rating) {
      return Swal.fire({
        icon: "error",
        title: "Missing Fields",
        text: "Please fill in all required fields.",
      });
    }

    try {
      const payload = {
        ...formData,
        rating: parseInt(rating),
        userEmail: user?.email,
        userName: user?.displayName,
        submittedAt: new Date().toISOString(),
      };

      const { data } = await axiosSecure.post("/success-stories", payload);

      if (data.insertedId) {
        Swal.fire({
          icon: "success",
          title: "Success",
          timer: 1400,
          text: "Your story has been submitted!",
        });
        setFormData({
          selfBiodataId: "",
          partnerBiodataId: "",
          coupleImageLink: "",
          successStory: "",
          rating: "",
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
    <div className="max-w-2xl mx-auto p-10 rounded-2xl shadow-xl mt-16 border border-indigo-100">
      <h2 className="text-4xl font-extrabold mb-8 text-center  tracking-tight">
        Got Married? 💍 Share Your Story
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Self Biodata ID */}
        <div>
          <label htmlFor="selfBiodataId" className="block font-medium mb-2">
            Self Biodata ID <span className="text-red-500">*</span>
          </label>
          <input
            id="selfBiodataId"
            name="selfBiodataId"
            value={formData.selfBiodataId}
            onChange={handleChange}
            required
            type="text"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-400"
          />
        </div>

        {/* Partner Biodata ID */}
        <div>
          <label htmlFor="partnerBiodataId" className="block font-medium mb-2">
            Partner Biodata ID <span className="text-red-500">*</span>
          </label>
          <input
            id="partnerBiodataId"
            name="partnerBiodataId"
            value={formData.partnerBiodataId}
            onChange={handleChange}
            required
            type="text"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-400"
          />
        </div>

        {/* Couple Image Link */}
        <div>
          <label htmlFor="coupleImageLink" className="block font-medium mb-2">
            Couple Image Link <span className="text-red-500">*</span>
          </label>
          <input
            id="coupleImageLink"
            name="coupleImageLink"
            value={formData.coupleImageLink}
            onChange={handleChange}
            required
            type="url"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-400"
          />
        </div>

        {/* Rating Field */}
        <div>
          <label htmlFor="rating" className="block font-medium mb-2">
            Rate Our Website (1–5) <span className="text-red-500">*</span>
          </label>
          <input
            id="rating"
            name="rating"
            value={formData.rating}
            onChange={handleChange}
            required
            type="number"
            min="1"
            max="5"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-400"
          />
        </div>

        {/* Success Story Textarea */}
        <div>
          <label htmlFor="successStory" className="block font-medium mb-2">
            Success Story Review <span className="text-red-500">*</span>
          </label>
          <textarea
            id="successStory"
            name="successStory"
            value={formData.successStory}
            onChange={handleChange}
            required
            rows={6}
            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-400 resize-none"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-lg shadow-md transition-transform hover:-translate-y-0.5"
        >
          Submit Story
        </button>
      </form>
    </div>
  );
};

export default GotMarried;
