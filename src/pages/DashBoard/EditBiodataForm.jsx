import React, { use } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../../provider/AuthContext";
import { Button } from "@/components/ui/button";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";

export default function EditBiodataForm() {
  const { user } = use(AuthContext);
  const axiosSecure = useAxiosSecure();
  const { data: biodata } = useQuery({
    queryKey: ["biodata", user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure(`/my-bio/${user?.email}`);
      return data;
    },
    enabled: !!user?.email,
  });

  const handleSubmit = async (e) => {
  e.preventDefault();
  const form = e.target;
  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());

  // Get the image file
  const imageFile = formData.get("profileImage");

  if (imageFile && imageFile.size > 0) {
    // Convert image to base64 string
    const toBase64 = (file) =>
      new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result.split(",")[1]); // base64 string only
        reader.onerror = (error) => reject(error);
      });

    try {
      const base64Image = await toBase64(imageFile);

      // Upload to imgbb
      const { data: imgData } = await axios.post(
        `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`,
        new URLSearchParams({
          image: base64Image,
        })
      );


      if (imgData.success) {
        data.profileImage = imgData.data.display_url; 
      } else {
        throw new Error("Image upload failed");
      }
    } catch (error) {
      console.error("Image upload error:", error);
      return Swal.fire({
        icon: "error",
        title: "Image Upload Failed",
        text: "Please try uploading your image again.",
      });
    }
  }

  if (data.age) {
    data.age = parseInt(data.age);
  }

  try {
    const response = await axiosSecure.patch(`/edit-bio-data`, data);
    console.log("Server response:", response.data);
    if (response.data) {
      return Swal.fire({
        icon: "success",
        title: "Congratulations",
        text: "You Have Successfully Updated Your Data",
        draggable: true,
        timer: 1400,
      });
    }
  } catch (error) {
    console.error("Error submitting form:", error);
  }
};


  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-md my-10">
      <h2 className="text-2xl font-bold mb-6 text-center">Edit Biodata</h2>
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {/* Biodata Type */}
        <div>
          <label className="block mb-1 font-medium">Biodata Type</label>
          <select
            name="biodataType"
            required
            defaultValue={biodata?.biodataType || ""}
            className="w-full border rounded-md px-3 py-2"
          >
            <option value="">Select</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>

        {/* Name */}
        <div>
          <label className="block mb-1 font-medium">Name</label>
          <input
            name="name"
            type="text"
            required
            defaultValue={biodata?.name || ""}
            className="w-full border rounded-md px-3 py-2"
          />
        </div>

        
        {/* Profile Image Upload */}
        <div className="mb-4">
          <label className="block mb-1 font-semibold text-gray-700">
            Upload Profile Image
          </label>

          <div className="border-2 border-dashed border-indigo-400 bg-indigo-50 rounded-lg p-4 flex items-center justify-center cursor-pointer hover:bg-indigo-100 transition duration-300">
            <input
              name="profileImage"
              type="file"
              accept="image/*"
              required={!biodata?.profileImage}
              className="w-full text-sm text-gray-600
                 file:mr-4 file:py-2 file:px-4
                 file:rounded-full file:border-0
                 file:text-sm file:font-semibold
                 file:bg-indigo-600 file:text-white
                 hover:file:bg-indigo-700"
            />
            {biodata?.profileImage && (
  <div className="mt-2 text-center">
    <p className="text-sm font-medium mb-1">Current Profile Image:</p>
    <img
      src={biodata.profileImage}
      alt="Current Profile"
      className="mx-auto w-32 h-32 object-cover rounded-full border"
    />
    <p className="text-xs text-gray-500 break-all mt-1">
      {biodata.profileImage}
    </p>
  </div>
)}

          </div>
        </div>

        {/* Date of Birth */}
        <div>
          <label className="block mb-1 font-medium">Date of Birth</label>
          <input
            name="dob"
            type="date"
            required
            defaultValue={biodata?.dob ? biodata.dob.split("T")[0] : ""}
            className="w-full border rounded-md px-3 py-2"
          />
        </div>

        {/* Height */}
        <div>
          <label className="block mb-1 font-medium">Height</label>
          <select
            name="height"
            required
            defaultValue={biodata?.height || ""}
            className="w-full border rounded-md px-3 py-2"
          >
            <option value="">Select height (cm)</option>
            {Array.from({ length: 61 }, (_, i) => {
              const value = 140 + i; // 140 to 200 cm
              return (
                <option key={value} value={value}>
                  {value} cm
                </option>
              );
            })}
          </select>
        </div>

        {/* Weight */}
        <div>
          <label className="block mb-1 font-medium">Weight</label>
          <select
            name="weight"
            required
            defaultValue={biodata?.weight || ""}
            className="w-full border rounded-md px-3 py-2"
          >
            <option value="">Select weight (kg)</option>
            {Array.from({ length: 81 }, (_, i) => {
              const value = 40 + i; // 40 to 120 kg
              return (
                <option key={value} value={value}>
                  {value} kg
                </option>
              );
            })}
          </select>
        </div>

        {/* Age */}
        <div>
          <label className="block mb-1 font-medium">Age</label>
          <input
            name="age"
            type="number"
            min="0"
            defaultValue={biodata?.age || ""}
            className="w-full border rounded-md px-3 py-2"
          />
        </div>

        {/* Occupation */}
        <div>
          <label className="block mb-1 font-medium">Occupation</label>
          <select
            name="occupation"
            required
            defaultValue={biodata?.occupation || ""}
            className="w-full border rounded-md px-3 py-2"
          >
            <option value="">Select</option>
            <option value="Student">Student</option>
            <option value="Service Holder">Service Holder</option>
            <option value="Business">Business</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Race */}
        <div>
          <label className="block mb-1 font-medium">Race (Skin Color)</label>
          <select
            name="race"
            required
            defaultValue={biodata?.race || ""}
            className="w-full border rounded-md px-3 py-2"
          >
            <option value="">Select</option>
            <option value="Fair">Fair</option>
            <option value="Medium">Medium</option>
            <option value="Dark">Dark</option>
          </select>
        </div>

        {/* Father's Name */}
        <div>
          <label className="block mb-1 font-medium">Father's Name</label>
          <input
            name="fatherName"
            type="text"
            defaultValue={biodata?.fatherName || ""}
            className="w-full border rounded-md px-3 py-2"
          />
        </div>

        {/* Mother's Name */}
        <div>
          <label className="block mb-1 font-medium">Mother's Name</label>
          <input
            name="motherName"
            type="text"
            defaultValue={biodata?.motherName || ""}
            className="w-full border rounded-md px-3 py-2"
          />
        </div>

        {/* Permanent Division */}
        <div>
          <label className="block mb-1 font-medium">Permanent Division</label>
          <select
            name="permanentDivision"
            required
            defaultValue={biodata?.permanentDivision || ""}
            className="w-full border rounded-md px-3 py-2"
          >
            <option value="">Select</option>
            <option value="Dhaka">Dhaka</option>
            <option value="Rajshahi">Rajshahi</option>
            <option value="Chattagram">Chattagram</option>
            <option value="Rangpur">Rangpur</option>
            <option value="Barisal">Barisal</option>
            <option value="Khulna">Khulna</option>
            <option value="Mymensingh">Mymensingh</option>
            <option value="Sylhet">Sylhet</option>
          </select>
        </div>

        {/* Present Division */}
        <div>
          <label className="block mb-1 font-medium">Present Division</label>
          <select
            name="presentDivision"
            required
            defaultValue={biodata?.presentDivision || ""}
            className="w-full border rounded-md px-3 py-2"
          >
            <option value="">Select</option>
            <option value="Dhaka">Dhaka</option>
            <option value="Rajshahi">Rajshahi</option>
            <option value="Chattagram">Chattagram</option>
            <option value="Rangpur">Rangpur</option>
            <option value="Barisal">Barisal</option>
            <option value="Khulna">Khulna</option>
            <option value="Mymensingh">Mymensingh</option>
            <option value="Sylhet">Sylhet</option>
          </select>
        </div>

        {/* Expected Partner Age */}
        <div>
          <label className="block mb-1 font-medium">Expected Partner Age</label>
          <input
            name="expectedPartnerAge"
            type="number"
            min="0"
            defaultValue={biodata?.expectedPartnerAge || ""}
            className="w-full border rounded-md px-3 py-2"
          />
        </div>

        {/* Expected Partner Height */}
        <div>
          <label className="block mb-1 font-medium">
            Expected Partner Height
          </label>
          <select
            name="expectedPartnerHeight"
            required
            defaultValue={biodata?.expectedPartnerHeight || ""}
            className="w-full border rounded-md px-3 py-2"
          >
            <option value="">Select height (cm)</option>
            {Array.from({ length: 61 }, (_, i) => {
              const value = 140 + i;
              return (
                <option key={value} value={value}>
                  {value} cm
                </option>
              );
            })}
          </select>
        </div>

        {/* Expected Partner Weight */}
        <div>
          <label className="block mb-1 font-medium">
            Expected Partner Weight
          </label>
          <select
            name="expectedPartnerWeight"
            required
            defaultValue={biodata?.expectedPartnerWeight || ""}
            className="w-full border rounded-md px-3 py-2"
          >
            <option value="">Select weight (kg)</option>
            {Array.from({ length: 81 }, (_, i) => {
              const value = 40 + i;
              return (
                <option key={value} value={value}>
                  {value} kg
                </option>
              );
            })}
          </select>
        </div>

        {/* Contact Email */}
        <div>
          <label className="block mb-1 font-medium">Contact Email</label>
          <input
            name="email"
            type="email"
            value={user?.email || ""}
            readOnly
            className="w-full border rounded-md px-3 py-2 bg-gray-100"
          />
        </div>

        {/* Mobile Number */}
        <div>
          <label className="block mb-1 font-medium">Mobile Number</label>
          <input
            name="mobile"
            type="tel"
            required
            defaultValue={biodata?.mobile || ""}
            className="w-full border rounded-md px-3 py-2"
          />
        </div>

        <div className="md:col-span-2 text-center">
          <Button type="submit" className="cursor-pointer px-6 py-2 mt-4">
            Save & Publish
          </Button>
        </div>
      </form>
    </div>
  );
}
