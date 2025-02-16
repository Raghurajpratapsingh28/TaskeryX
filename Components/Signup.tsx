"use client";

import axios from "axios";
import { FormEvent, useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";


const Signup = () => {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");



  const Signing = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
     const response= await axios.post("http://localhost:3000/api/user", 
      { name, email, password }, 
      // { headers: { "Content-Type": "application/json" } }
    );
    
      console.log(response);
  
    } catch (error) {
      console.log(error);
    }
   
    
   
  
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
        <form  className="space-y-4" onSubmit={Signing}>


          {/* Name */}
          <div>
            <label className="block text-gray-700 font-medium">Full Name</label>
            <input
              type="text"  placeholder="Enter your name" onChange={(e)=>{setName(e.target.value)}} 
              // {...register("name", { required: "Name is required" })}
              className="w-full p-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">Error</p>/*{errors.name.message}*/
            )}
          </div>




          {/* Email */}
          <div>
            <label className="block text-gray-700 font-medium">Email</label>
            <input
              type="email" placeholder="example@gmail.com" onChange={(e)=>{setEmail(e.target.value)}}
              
              className="w-full p-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">error email</p>//{errors.email.message}
            )}
          </div>




          {/* Password */}
          <div>
            <label className="block text-gray-700 font-medium">Password</label>
            <input
              type="password" placeholder="password"onChange={(e)=>{setPassword(e.target.value)}}
              // {...register("password", {
              //   required: "Password is required",
              //   minLength: { value: 6, message: "Must be at least 6 characters" },
              // })}
              className="w-full p-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
               error password
              </p>// {errors.password.message}
            )}
          </div>



          {/* Confirm Password */}
          {/* <div>
            <label className="block text-gray-700 font-medium">Confirm Password</label>
            <input
              type="password"
              {...register("confirmPassword", {
                required: "Please confirm your password",
                validate: (value) =>
                  value === watch(password) || "Passwords do not match",
              })}
              className="w-full p-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">
                wrong inputs
              </p>//{errors.confirmPassword.message}
            )}
          </div>
 */}



          {/* Submit Button */}
          <button
            type="submit" 
            className={`w-full p-2 text-white font-medium rounded-md transition ${
              loading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
            }`}
            disabled={loading}
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </button>

          {/* Login Link */}
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
