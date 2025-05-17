import React from "react";
import { useNavigate } from "react-router-dom";
import Icon from '../assets/logo.png'
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import useDocumentTitle from "../customHooks/documentTitle";
const model =z.object({
  names:z.string().min(8,"Names must be atleast 3 characters"),
  username:z.string().min(4,"Username must have atleast 4 characters"),
  gender:z.enum(["male","female"]),
  email:z.string().min(1,"Email is required").email("Invalid Email"),
  password:z.string().min(6,"Password must be atleast 6 characters")
});
export default function SignUp(){
  useDocumentTitle("SignUp");
   const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(model),
  });

  const onSubmit = (data) => {
    console.log("Login data:", data);
    alert("Form Submitted")
    reset(); 
  };
    return(

        <div className="md:bg-[#f3f5ff] h-screen overflow-auto flex md:items-center  md:justify-center w-screen md:p-0 p-6 ">
          <div className="w-full max-w-4xl h-screen  bg-white rounded-xl flex  flex-col p-2 md:gap-1 gap-14 ">
          <div className=" w-full flex flex-col p-2 rounded-md  ">
        
                <div className="w-full bg-white h-1/4 flex flex-col justify-center items-center gap-4">
                    <h2 className="text-lg sm:text-2xl md:text-3xl font-bold text-gray-800">Welcome to OpenVoice</h2>
                  </div>
                  <div className="w-full bg-white h-2/4 flex justify-center items-center mt-2">
                    <img src={Icon} alt="Logo" className="h-12 w-auto" />
                  </div>
                 
                  <div className="w-full bg-white h-1/4">
                    <p className="ml-4 md:ml-6 p-4 text-xs text-center md:text-center">
                    "Your voice. Our mission. Trusted agencies ready to act!"
                    </p>
                  </div>
                </div>
        <div className=" w-full flex justify-center ">
        <div className="p-6 w-full h-full flex flex-col max-w-md overflow-hidden ">
  <form onSubmit={handleSubmit(onSubmit)} className="w-full  flex flex-col items-start  gap-2 ">
  <div className="flex justify-center  w-full">
    <h3 className="text-2xl font-semibold text-[#FFB640] md:mb-2 mb-5">
      Create Account
    </h3>
  </div>
      
    <label htmlFor="firstname" className="text-sm font-medium text-gray-700">Names</label>
    <input
    {...register("names")}
      type="names"
      className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFB640] w-full max-w-md"
      placeholder="Enter your  names"
    />
     {errors.names && (
                <p className="text-red-500 text-sm">{errors.names.message}</p>
              )}

 
             
              
    <div className="flex md:flex-row flex-col w-full gap-2 ">
      <div className="flex flex-col md:w-2/3 w-full max-w-md gap-2 ">
    <label htmlFor="username" className="text-gray-700 font-medium text-sm">Username</label>
    <input {...register("username")} type="username" placeholder="Enter your username"  className="p-2 border border-gray-300 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFB640]"/>
    {errors.username && (
                <p className="text-red-500 text-sm">{errors.username.message}</p>
              )}
    </div>
    <div className="flex flex-col md:w-1/3 max-w-md gap-2 w-full">
    <label htmlFor="gender" className="text-gray-700 font-medium text-sm">Gender</label>
    <select
    {...register("gender")}
    name="gender"
    className="h-[42px] p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFB640] text-sm text-gray-700"
  >
    <option value="">Select gender</option>
    <option value="male">Male</option>
    <option value="female">Female</option>
  </select>
  {errors.gender && (
                <p className="text-red-500 text-sm">{errors.gender.message}</p>
              )}
    </div>
     </div>
    <label htmlFor="email"  className="text-sm font-medium text-gray-700">Email</label>
    <input {...register("email")} type="email" placeholder="Enter your email"  className="border border-gray-300 p-2 rounded-md w-full max-w-md focus:outline-none focus:ring-2 focus:ring-[#FFB640]"/>
    {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}

    <label htmlFor="password" className="text-sm font-medium text-gray-700">Password</label>
    <input {...register("password")} type="password"  className="border border-gray-300 p-2 rounded-md w-full max-w-md focus:outline-none focus:ring-2 focus:ring-[#FFB640]" placeholder="Enter your password" />
    {errors.password && (
                <p className="text-red-500 text-sm">{errors.password.message}</p>
              )}


    <div className="flex items-center gap-2">
      <input type="checkbox" id="remember" className="accent-[#FFB640] " />
      <label htmlFor="remember" className="text-sm text-gray-600">Show Password</label>
    </div>

    <button
      type="submit"
      className="mt-10 md:mt-4 p-2 bg-[#FFB640] text-white rounded-md hover:bg-[#94661c] transition duration-200 w-full max-w-md"
      onClick={() => navigate("/verify")}
    >
      Create an account
    </button>
  </form>

  <div className="w-full mt-6  text-sm text-gray-600 max-w-md">
    <div className="flex gap-1">
      <p>Already have an account?</p>
      <p className="text-[#FFB640] hover:underline cursor-pointer" onClick={() => navigate("/login")}>Login</p>
    </div>
  </div>
</div>

        </div>
          </div>
        </div>
    )
}