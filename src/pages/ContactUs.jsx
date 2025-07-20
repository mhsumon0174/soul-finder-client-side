import { FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import Swal from "sweetalert2";

export default function ContactUs() {
    const handleForm = (e) => {
    e.preventDefault();
    Swal.fire({
      icon: "success",
      title: "Sent!",
      text: "Your message has been successfully sent to the administrator.",
      timer: 2500,
      timerProgressBar: true,
    });
    e.target.reset();
  };
  return (
    <section className="min-h-screen  py-20 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="text-5xl font-extrabold text-gray-800">
            Let’s <span className="text-indigo-600">Connect</span>
          </h2>
          <p className="text-gray-600 mt-4 max-w-xl mx-auto text-lg">
            Whether you're looking for love or support, we're here to listen and help.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Contact Form */}
          <div className="bg-white/70 backdrop-blur-lg rounded-3xl shadow-xl p-10 space-y-6 border border-indigo-100">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Send Us a Message</h3>
            <form className="space-y-5 " onSubmit={handleForm}>
              <div className="flex flex-col">
                <label className="text-sm text-gray-600 mb-1">Full Name</label>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="Enter your name"
                  className="px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-sm text-gray-600 mb-1">Email Address</label>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="you@example.com"
                  className="px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-sm text-gray-600 mb-1">Your Message</label>
                <textarea
                  name="message"
                  rows="5"
                  required
                  placeholder="Write your message here..."
                  className="px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none resize-none"
                ></textarea>
              </div>
              <button
                type="submit"
                className="bg-indigo-600 text-white font-semibold px-6 py-3 rounded-full shadow hover:bg-indigo-700 transition duration-300 w-full"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="space-y-8">
            <div className="flex items-start gap-4">
              <FaMapMarkerAlt className="text-indigo-600 w-6 h-6 mt-1" />
              <div>
                <h4 className="text-lg font-medium text-gray-800">Our Address</h4>
                <p className="text-gray-600">123 Dhanmondi/27, Dhaka, Bangladesh</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <FaPhone className="text-indigo-600 w-6 h-6 mt-1" />
              <div>
                <h4 className="text-lg font-medium text-gray-800">Phone</h4>
                <p className="text-gray-600">+8801744508060</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <FaEnvelope className="text-indigo-600 w-6 h-6 mt-1" />
              <div>
                <h4 className="text-lg font-medium text-gray-800">Email</h4>
                <p className="text-gray-600">soulfinder@gmail.com</p>
              </div>
            </div>

            <p className="text-sm text-gray-500 italic mt-6">
              We're committed to responding within 24 hours.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
