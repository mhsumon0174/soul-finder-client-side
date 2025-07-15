"use client";
import Swal from "sweetalert2";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router";
import { FcGoogle } from "react-icons/fc";
import { AuthContext } from "../provider/AuthContext";
import { use } from "react";
import { saveUserInDB } from "../api/utilities";

export default function Register() {
  const navigate = useNavigate();
  const { createUser, googleSign, setUser, updateUser } = use(AuthContext);
  const handleRegister = (e) => {
    e.preventDefault();

    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const userData = Object.fromEntries(formData.entries());
    const { name, email, password, photoURL } = userData;
    createUser(email, password)
      .then((data) => {
        saveUserInDB({ name, email, photoURL });
        const user = data.user;

        if (user) {
          updateUser({displayName:name,photoURL})
          .then(data=>{
            setUser({...user,displayName:name,photoURL})
          })
         
          navigate("/");

          return Swal.fire({
            icon: "success",
            title: "Congratulations",
            text: "You have successfully registered and logged in",
            draggable: true,
            timer: 1400,
          });
        }
      })
      .catch((error) => {
        return Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.message,
        });
      });
  };
  const handleGoogleSignIn = (e) => {
    e.preventDefault();
    googleSign()
      .then((data) => {
        const { displayName: name, email, photoURL } = data.user;
        saveUserInDB({ name, email, photoURL });

        navigate("/");
        return Swal.fire({
          icon: "success",
          title: "Congratulations",
          text: "You have successfully  logged in",
          draggable: true,
          timer: 1400,
        });
      })
      .catch((error) => {
        return Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.message,
        });
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-900">
          Create Your Soulfinder Account
        </h2>

        {/* Google Sign In */}
        <Button
          onClick={handleGoogleSignIn}
          variant="outline"
          className="w-full flex items-center justify-center gap-2"
        >
          <FcGoogle className="text-xl" />
          Sign up with Google
        </Button>

        {/* Divider */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-sm text-gray-500">
            <span className="bg-white px-2">or continue with</span>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleRegister} className="space-y-5">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Full Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              placeholder="Your Name"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              name="email"
              required
              placeholder="Your Email"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              name="password"
              required
              placeholder="Your Password"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label
              htmlFor="photo"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Photo URL
            </label>
            <input
              id="photo"
              type="url"
              name="photoURL"
              placeholder="https://example.com/photo.jpg"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <Button type="submit" className="w-full cursor-pointer">
            Register
          </Button>
        </form>

        {/* Redirect to Login */}
        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
