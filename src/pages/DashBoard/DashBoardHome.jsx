import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Typewriter from "typewriter-effect";
import Loading from "../../components/Loading";
import { use } from "react";
import { AuthContext } from "../../provider/AuthContext";

export default function DashboardHome() {
  const { user } = use(AuthContext);

  // Fetch user stats
  const { data: stats, isLoading } = useQuery({
    queryKey: ["userStats", user?.email],
    queryFn: async () => {
      const { data } = await axios.get(`/userStats`);
      return data;
    },
    enabled: !!user?.email,
  });

  if (isLoading) return <Loading />;
console.log(stats);

  return (
    <div className="p-10">
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-8">
        {/* Welcome Typewriter */}
        <h2 className="text-4xl md:text-5xl font-extrabold text-center">
          <Typewriter
            options={{
              strings: [
                "Click the menu on the left to explore dashboard !",
              ],
              autoStart: true,
              loop: true,
              delay: 75,
              deleteSpeed: 50,
              pauseFor: 2000,
            }}
          />
        </h2>

        {/* User Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10 w-full max-w-4xl">
          <div className="bg-white rounded-xl shadow-md p-6 text-center border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-700">Profile Completeness</h3>
            <p className="text-2xl font-bold text-gray-900">{stats?.profileCompleteness || "0"}%</p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 text-center border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-700">Biodata Status</h3>
            <p className="text-2xl font-bold text-gray-900">{stats?.premium ? "Premium" : "Standard"}</p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 text-center border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-700">Contacts Sent</h3>
            <p className="text-2xl font-bold text-gray-900">{stats?.contactsSent || 0}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
