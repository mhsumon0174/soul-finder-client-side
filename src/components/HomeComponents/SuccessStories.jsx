import React, { useState } from "react";
import { FaStar } from "react-icons/fa";

const dummySuccessStories = [
  {
    id: 1,
    image: "https://i.ibb.co/svHsNrb/man1.jpg",
    marriageDate: "2023-06-15",
    rating: 5,
    story:
      "We met through this platform and it changed our lives forever. The process was smooth and support was fantastic!",
  },
  {
    id: 2,
    image: "https://i.ibb.co/3NFh09X/woman1.jpg",
    marriageDate: "2022-11-20",
    rating: 4,
    story:
      "Thanks to this site, we found each other and are happily married. Highly recommended for serious match seekers.",
  },
  {
    id: 3,
    image: "https://i.ibb.co/YbKxF5x/man2.jpg",
    marriageDate: "2023-01-10",
    rating: 5,
    story:
      "A wonderful journey that started with a profile and ended in happiness. The communication features helped a lot.",
  },
];

const formatDate = (dateStr) => {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(dateStr).toLocaleDateString(undefined, options);
};

const SuccessStories = () => {
  
  const [stories] = useState(
    dummySuccessStories.sort(
      (a, b) => new Date(b.marriageDate) - new Date(a.marriageDate)
    )
  );

  return (
    <section className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 py-16 bg-white rounded-3xl shadow-lg mt-16">
      <h2 className="text-4xl font-extrabold text-center text-indigo-700 mb-12">
        Success Stories
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {stories.map(({ id, image, marriageDate, rating, story }) => (
          <div
            key={id}
            className="bg-indigo-50 rounded-xl p-6 shadow-md flex flex-col items-center text-center"
          >
            <img
              src={image}
              alt="Couple"
              className="w-32 h-32 rounded-full object-cover border-4 border-indigo-400 mb-6"
            />
            <p className="text-indigo-700 font-semibold mb-1">
              Married on {formatDate(marriageDate)}
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

            <p className="text-gray-700 text-sm font-medium italic">{`"${story}"`}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SuccessStories;
