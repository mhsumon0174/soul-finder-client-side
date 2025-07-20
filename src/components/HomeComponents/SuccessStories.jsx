import React from "react";
import { useQuery } from "@tanstack/react-query";
import { FaStar } from "react-icons/fa";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Loading from "../../components/Loading"; // show while fetching

const formatDate = (dateStr) => {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(dateStr).toLocaleDateString(undefined, options);
};

const SuccessStories = () => {
  const axiosSecure = useAxiosSecure();

  const { data: stories = [], isLoading } = useQuery({
    queryKey: ["success-stories"],
    queryFn: async () => {
      const res = await axiosSecure.get("/success-stories");
      return res.data;
    },
  });

const sortedStories = [...stories].sort(
  (a, b) => new Date(a.submittedAt) - new Date(b.submittedAt)
);


console.log("Stories before sort:", stories);
console.log("Stories after sort:", sortedStories);

  if (isLoading) return <Loading />;

  return (
    <section className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 py-16  rounded-3xl  mt-16">
      <h2 className="text-4xl font-extrabold text-center text-indigo-700 mb-12">
        Success Stories
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
       {sortedStories.map(
  ({ _id, coupleImageLink, submittedAt, rating, successStory }) => (
    <div
      key={_id}
      className="bg-gradient-to-br from-indigo-100 to-white rounded-xl p-6 shadow-md hover:shadow-xl transform hover:scale-[1.03] transition-all duration-300 flex flex-col items-center text-center"
    >
      <img
        src={coupleImageLink}
        alt="Couple"
        className="w-32 h-32 rounded-full object-cover border-4 border-indigo-400 mb-6 shadow-md"
      />
      <p className="text-indigo-700 font-semibold mb-1">
        Married on {formatDate(submittedAt)}
      </p>

      <div className="flex justify-center mb-4">
        {[...Array(5)].map((_, i) => (
          <FaStar
            key={i}
            className={`text-xl ${
              i < rating ? "text-yellow-400" : "text-gray-300"
            }`}
          />
        ))}
      </div>

      <p className="text-gray-700 text-[15px] font-medium italic leading-relaxed">
        {`"${successStory}"`}
      </p>
    </div>
  )
)}

      </div>
    </section>
  );
};

export default SuccessStories;
