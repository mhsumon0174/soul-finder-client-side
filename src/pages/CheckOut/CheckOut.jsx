import React from "react";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { AuthContext } from "../../provider/AuthContext";
import { useContext } from "react";
import CheckOurForm from "./CheckOurForm";
import Loading from "../../components/Loading";
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_KEY);


const CheckOut = () => {
  
  
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);

  const { data: biodata, isLoading } = useQuery({
    queryKey: ["biodata", id],
    queryFn: async () => {
      const res = await axiosSecure(`/get-bio/${id}?email=${user.email}`);
      return res.data;
    },
  });


  if (isLoading) return <Loading />;

  return (
    <div className="max-w-xl mx-auto mt-12 p-8 bg-white rounded-2xl shadow-lg border border-gray-200">
      <h2 className="text-3xl font-bold mb-6 text-center text-pink-600">
        Pay to View Contact Details
      </h2>

     <Elements stripe={stripePromise}>
      <CheckOurForm biodata={biodata} user={user}/>
     </Elements>

    </div>
  );
};

export default CheckOut;
