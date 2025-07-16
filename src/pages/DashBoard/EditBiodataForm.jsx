import React, { use } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../../provider/AuthContext";
import { Button } from "@/components/ui/button";
import Swal from "sweetalert2";

export default function EditBiodataForm() {
  const { user } = use(AuthContext);
  
  const { data: biodata } = useQuery({
    queryKey: ['biodata', user?.email],
    queryFn: async () => {
      const { data } = await axios(
        `http://localhost:3000/my-bio/${user?.email}`
      );
      return data;
    },
    enabled: !!user?.email,  // only run when user.email exists
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
     if (data.age) {
    data.age = parseInt(data.age); 
  }
    try {
      const response = await axios.patch("http://localhost:3000/edit-bio-data", data);
      console.log("Server response:", response.data);
      if(response.data){
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
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

        {/* Profile Image */}
        <div>
          <label className="block mb-1 font-medium">Profile Image URL</label>
          <input
            name="profileImage"
            type="url"
            defaultValue={biodata?.profileImage || ""}
            className="w-full border rounded-md px-3 py-2"
          />
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
          <label className="block mb-1 font-medium">Expected Partner Height</label>
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
          <label className="block mb-1 font-medium">Expected Partner Weight</label>
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
