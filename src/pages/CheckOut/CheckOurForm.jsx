import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react';
import { ScaleLoader} from 'react-spinners'
import useAxiosSecure from '../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
const CheckOurForm = ({ biodata, user }) => {
  const stripe = useStripe();
  const elements = useElements();
const [cardError,setCardError]=useState(null)
const [processing,setProcessing]=useState(false)
const [clientSecret,setClientSecret]=useState('')
const axiosSecure=useAxiosSecure()
const fee= 5;
useEffect(()=>{
const getClientSecret=async ()=>{

    const {data}=await axiosSecure.post('/create-payment-intent',{
        amount:fee
    })
    setClientSecret(data?.clientSecret)
    
}
getClientSecret()
},[axiosSecure,user,biodata])

  const handleSubmit = async (event) => {
    setProcessing(true)
    event.preventDefault();

    if (!stripe || !elements) return;

    const card = elements.getElement(CardElement);
    if (card == null) return;

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card,
    });

    if (error) {
     
      setCardError(error)
      setProcessing(false)
      return
    } else {
      
      setCardError()
    }
    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card,
        billing_details: {
          name: user?.displayName,
          email: user?.email,
        },
      },
    })
    
    

    if (result?.error) {
      setCardError(result?.error?.message)
      return
    }
   
    
   if (result?.paymentIntent) {
  Swal.fire({
    icon: "success",
    title: "Congratulations",
    text: "You have successfully sent your request",
    draggable: true,
    timer: 1400,
  });

  setProcessing(false);
  const transactionId = result?.paymentIntent?.id;

  try {
  const { data } = await axiosSecure.post(`/contact-req`, {
    transactionId,
    name: user?.displayName,
    biodataId: biodata?.BiodataId,
    email: user?.email,
    nowStatus:"Pending",
    biodata,
    fee
  });

  console.log('Contact request saved:', data);
} catch (error) {
  setProcessing(false);

  if (error.response && error.response.status === 400) {
    Swal.fire({
      icon: 'error',
      title: 'Request Already Sent',
      text: error.response.data.message || 'You have already sent a request for this biodata.',
    });
  } else {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Something went wrong. Please try again later.',
    });
  }

  return;
}

}

   
   
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 bg-gradient-to-br from-white via-pink-50 to-white p-6 rounded-xl shadow-md border border-pink-200"
    >
      <div className="space-y-2">
        <label className="block text-sm font-semibold text-gray-600">Biodata ID</label>
        <input
          type="text"
          readOnly
          value={biodata?.BiodataId }
          className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-gray-100 text-gray-800 cursor-not-allowed focus:outline-none"
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-semibold text-gray-600">Your Email</label>
        <input
          type="email"
          readOnly
          value={user?.email || ''}
          className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-gray-100 text-gray-800 cursor-not-allowed focus:outline-none"
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-semibold text-gray-600">Card Details</label>
        <div className="p-4 border border-gray-300 rounded-lg bg-white shadow-inner">
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: '16px',
                  color: '#424770',
                  '::placeholder': { color: '#aab7c4' },
                },
                invalid: { color: '#9e2146' },
              },
            }}
          />
        </div>
      </div>
{cardError&& <p className='text-red-700'>{cardError.message}</p>}
      <button
        type="submit"
        disabled={!stripe || processing}
        className="w-full cursor-pointer bg-green-400  text-black font-bold py-2 rounded-lg transition-all duration-300"
      >
       
        {
            processing ? 
            <ScaleLoader/>:`Pay ${fee} USD`
        }
        
      </button>
    </form>
  );
};

export default CheckOurForm;
