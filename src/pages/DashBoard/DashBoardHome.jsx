import { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../../provider/AuthContext";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function DashboardHome() {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  // Favorite biodatas
  const { data: favourites = [] } = useQuery({
    queryKey: ["favorite-bio", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/favorite-bios/${user.email}`);
      return res.data;
    },
  });

  // Contact requests
  const { data: contacts = [] } = useQuery({
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

  

 
  const chartData = {
    labels: ["Favorite Biodatas", "Contact Requests"],
    datasets: [
      {
        label: "Counts",
        data: [favourites.length, contacts.length],
        backgroundColor: ["#4B5563", "#6B7280", "#111827", "#9CA3AF"],
      },
    ],
  };

  const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Dashboard Overview",
    },
  },
  scales: {
    y: {
      beginAtZero: true,  // start from 0
      ticks: {
        stepSize: 1,      // increments of 1
        precision: 0,     // remove decimals
      },
    },
  },
};


  return (
    <div className="p-10">
      <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
        My Stats
      </h2>
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-xl shadow-md border border-gray-200">
        <Bar data={chartData} options={options} />
      </div>
    </div>
  );
}
