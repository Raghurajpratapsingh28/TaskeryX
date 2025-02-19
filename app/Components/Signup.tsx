
"use client";

import axios from "axios";
import { FormEvent, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";



const Signup = () => {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // State for error messages

  const router=useRouter();
  
  const Signing = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage(""); // Clear any previous error messages

    try {
      const response = await axios.post(`http://localhost:3000/api/user/signup`, {
        name,
        email,
        password,
        role,
      });
      console.log(response.data);
      alert("Signup successful! Redirecting to login...");
      router.push("/login");

    } catch (error: any) {
      console.log(error);
      if (error.response) {
        setErrorMessage(error.response.data.message || "An error occurred. Please try again.");
      } else {
        setErrorMessage("Network error. Please try again.");
      }
    }

    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-white shadow-lg rounded-2xl p-6"
      >
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">
          Create an Account
        </h2>

        {errorMessage && (
          <p className="text-red-500 text-sm text-center mb-2">{errorMessage}</p>
        )}

        <form className="space-y-4" onSubmit={Signing}>
          <div>
            <label className="block text-gray-700 font-medium">Full Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Email</label>
            <input
              type="email"
              placeholder="example@gmail.com"
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Role</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full p-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="">Select a Role</option>
              <option value="IT Tech Lead">IT Tech Lead</option>
              <option value="Software Engineer">Software Engineer</option>
              <option value="Full-Stack Developer">Full-Stack Developer</option>
              <option value="Project Manager">Project Manager</option>
              <option value="CEO">CEO</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Password</label>
            <input
              type="password"
              placeholder="password"
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <button
            type="submit"
            className={`w-full p-2 text-white font-medium rounded-md transition ${
              loading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
            }`}
            disabled={loading}
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </button>

          <p className="text-sm text-gray-600 text-center">
            Already have an account?{" "}
            <Link href="/login" className="text-blue-500 hover:underline">
              Log in
            </Link>
          </p>
        </form>
      </motion.div>
    </div>
  );
};

export default Signup;





