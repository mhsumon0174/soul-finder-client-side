import React from "react";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../../../provider/AuthContext";
import Loading from "../../../components/Loading";

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

const AdminDashboardHome = () => {
  const { user } = React.useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const { data, isLoading } = useQuery({
    queryKey: ["dashboard-data", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/all-info`);
      return res.data;
    },
  });

  if (isLoading || !data) {
    return <Loading/>
  }

  const {
    maleCount,
    femaleCount,
    premiumCount,
    totalBiodata,
    totalRevenue,
  } = data;

  // Compose data for a single pie chart
  const pieData = {
    labels: [
      "Male",
      "Female",
      "Premium",
      "Total Biodata",
      "Total Revenue ($)",
    ],
    datasets: [
      {
        label: "Admin Dashboard Overview",
        data: [maleCount, femaleCount, premiumCount, totalBiodata, totalRevenue],
        backgroundColor: [
          "rgba(54, 162, 235, 0.7)", // Male - Blue
          "rgba(255, 99, 132, 0.7)", // Female - Pink
          "rgba(255, 206, 86, 0.7)", // Premium - Yellow
          "rgba(75, 192, 192, 0.7)", // Total Biodata - Teal
          "rgba(153, 102, 255, 0.7)", // Revenue - Purple
        ],
        borderColor: [
          "rgba(54, 162, 235, 1)",
          "rgba(255, 99, 132, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

 const pieOptions = {
  plugins: {
    legend: {
      position: "bottom",
    },
    datalabels: {
      display: false,  // <-- disable labels inside pie slices
    },
    tooltip: {
      callbacks: {
        label: function (context) {
          const label = context.label || "";
          const value = context.parsed;
          return `${label}: ${value.toLocaleString()}`; // No percentage here either
        },
      },
    },
  },
};



  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-10">
      <h2 className="text-3xl font-bold mb-6 text-center text-indigo-700">
        Admin Dashboard Overview
      </h2>
      <Pie data={pieData} options={pieOptions} />
    </div>
  );
};

export default AdminDashboardHome;
