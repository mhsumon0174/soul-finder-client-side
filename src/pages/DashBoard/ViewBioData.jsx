import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { FaStar } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import Loading from "../../components/Loading";
import { use } from "react";
import { AuthContext } from "../../provider/AuthContext";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import useRole from "../../hooks/useRole";

export default function ViewBioData() {
  const { user } = use(AuthContext);
  const [role]=useRole();
  
  
const axiosSecure=useAxiosSecure()
  const { data: biodata, isLoading } = useQuery({
    queryKey: ["biodata", user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/my-bio/${user.email}`
        
      );
      return data;
    },
    enabled: !!user?.email,
  });
  const handleBtn = (biodata) => {
  Swal.fire({
    title: 'Are you sure?',
    text: `Do you want to send a premium request ?`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, send it!',
  }).then((result) => {
    if (result.isConfirmed) {
      axiosSecure.post(`/premium-request`,{
        name:biodata?.name,
        email:biodata?.email,
        BiodataId:biodata?.BiodataId,
        type:biodata?.type
      })
        .then(res => {
          console.log(res.data);
          Swal.fire('Sent!', 'Your premium request has been sent.', 'success');
        })
        .catch(err => {
          const message=err?.response?.data?.message
          Swal.fire('Error!',message,'error' );
        });
    }
  });
};

  if (isLoading) return <Loading />;

  return (
    <div className="max-w-3xl mx-auto mt-12 px-4 sm:px-6 py-8 bg-gradient-to-br from-white via-slate-50 to-slate-100 rounded-xl shadow-lg border border-gray-200">
      <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center text-gray-800">
        Your Biodata
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-1 gap-4 sm:gap-6 text-gray-700 text-base">
        <div className="flex justify-center"><strong>Biodata Type : </strong>  {biodata?.biodataType}</div>
        <div className="flex justify-center"><strong>Name : </strong> {biodata?.name}</div>

        <div className="sm:col-span-2 flex justify-center my-4">
          <img
            src={biodata?.profileImage}
            alt="Profile"
            className="w-24 h-24 sm:w-32 sm:h-32 rounded-full object-cover ring-4 ring-blue-200 shadow-md"
          />
        </div>

        <div><strong>Date of Birth:</strong> {biodata?.dob}</div>
        <div><strong>Height:</strong> {biodata?.height} cm</div>
        <div><strong>Weight:</strong> {biodata?.weight} kg</div>
        <div><strong>Age:</strong> {biodata?.age}</div>
        <div><strong>Occupation:</strong> {biodata?.occupation}</div>
        <div><strong>Race:</strong> {biodata?.race}</div>
        <div><strong>Father's Name:</strong> {biodata?.fatherName}</div>
        <div><strong>Mother's Name:</strong> {biodata?.motherName}</div>
        <div><strong>Permanent Division:</strong> {biodata?.permanentDivision}</div>
        <div><strong>Present Division:</strong> {biodata?.presentDivision}</div>
        <div><strong>Expected Partner Age:</strong> {biodata?.expectedPartnerAge}</div>
        <div><strong>Expected Partner Height:</strong> {biodata?.expectedPartnerHeight} cm</div>
        <div><strong>Expected Partner Weight:</strong> {biodata?.expectedPartnerWeight} kg</div>
        <div><strong>Email:</strong> {biodata?.email}</div>
        <div><strong>Mobile:</strong> {biodata?.mobile}</div>
      </div>

      <div className="mt-8 text-center">
  {role === "premium" ? (
    <div className="text-green-600 text-lg font-semibold">
       Your biodata is  <span className="underline">Premium</span>!
    </div>
  ) : (
    <button
      onClick={() => handleBtn(biodata)}
      className="bg-gradient-to-r cursor-pointer from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-3 rounded-full font-semibold flex items-center gap-2 mx-auto"
    >
      <FaStar className="text-yellow-300" />
      Make Biodata Premium
    </button>
  )}
</div>

    </div>
  );
}
