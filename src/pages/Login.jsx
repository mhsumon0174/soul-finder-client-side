"use client";

import { Button } from "@/components/ui/button";
import { Link, useLocation, useNavigate } from "react-router";
import { FcGoogle } from "react-icons/fc";
import { use } from "react";
import { AuthContext } from "../provider/AuthContext";
import Swal from "sweetalert2";

export default function Login() {
  const navigate=useNavigate()
  const location=useLocation()
  const from = location?.state?.from?.pathname || '/'
  
  const { signIn, googleSign } = use(AuthContext);
  const handleLogIn = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const userData = Object.fromEntries(formData.entries());
    const { email, password } = userData;
    signIn(email, password)
      .then((data) => {
        if (data.user) {
          navigate(from, { replace: true })

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
        navigate(from, { replace: true })
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
          Login to Soulfinder
        </h2>

        {/* Google Sign In */}
        <Button
          onClick={handleGoogleSignIn}
          variant="outline" 
          className="w-full flex items-center justify-center gap-2 cursor-pointer"
        >
          <FcGoogle className="text-xl" />
          Sign in with Google
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

        {/* Email/Password Form */}
        <form onSubmit={handleLogIn} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              name="email"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Your Email"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              name="password"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Your password"
            />
          </div>

          <Button type="submit" className="cursor-pointer w-full">
            Login
          </Button>
        </form>

        {/* Register Link */}
        <p className="mt-6 text-center text-sm text-gray-600">
          Don&apos;t have an account?{" "}
          <Link to="/register" className="text-blue-600 hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
