"use client";

import { Button } from "@/components/ui/button";
import { Link, useLocation, useNavigate } from "react-router";
import { FcGoogle } from "react-icons/fc";
import { use } from "react";
import { AuthContext } from "../provider/AuthContext";
import Swal from "sweetalert2";
import { saveUserInDB } from "../api/utilities";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state?.from?.pathname || "/";

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
          navigate(from, { replace: true });
          return Swal.fire({
            icon: "success",
            title: "Welcome Back",
            text: "Logged in successfully!",
            timer: 1400,
            showConfirmButton: false,
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
        navigate(from, { replace: true });
        return Swal.fire({
          icon: "success",
          title: "Welcome!",
          text: "You have successfully logged in",
          timer: 1400,
          showConfirmButton: false,
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
    <div className=" flex items-center justify-center px-4 ">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 animate-fadeIn">
        {/* Illustration */}
        <div className="flex justify-center mb-6">
          <img
            src="https://i.ibb.co.com/fVKdqH8Z/online-registration-or-sign-up-login-for-account-on-smartphone-app-user-interface-with-secure-passwo.jpg" // place an SVG/PNG inside your public folder
            alt="Login illustration"
            className="w-24 h-24 animate-bounce-slow"
          />
        </div>

        <h2 className="text-2xl font-bold text-center mb-6 text-gray-900">
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
          <div className="animate-slideUp">
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
              className="w-full px-4 py-2 border border-gray-300 rounded-md 
              focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Your Email"
            />
          </div>

          <div className="animate-slideUp delay-100">
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
              className="w-full px-4 py-2 border border-gray-300 rounded-md 
              focus:outline-none focus:ring-2 focus:ring-blue-500"
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
