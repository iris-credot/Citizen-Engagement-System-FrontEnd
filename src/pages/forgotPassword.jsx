import React from "react";
import { useNavigate } from "react-router-dom";
import Icon from "../assets/logo.png";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import useDocumentTitle from "../customHooks/documentTitle";
// Zod schema for validation
const schema = z.object({
  email: z.string().email("Enter a valid email address"),
});

export default function ForgotPassword() {
  useDocumentTitle("Forgot-Password");
    const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data) => {
    console.log("Password reset email requested for:", data.email);
    alert("Password reset instructions have been sent to your email.");
    reset();
  };

  return (
    <div className="bg-[#f3f5ff] flex items-center justify-center w-screen min-h-screen p-6">
      <div className="w-full max-w-3xl bg-white rounded-xl flex flex-col  p-6 gap-8">
        {/* Left Panel */}
        <div className=" w-full flex flex-col  rounded-md p-6 justify-center items-center">
          <div className="mb-6">
            <img src={Icon} alt="Logo" className="h-12 w-auto" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800">Forgot Password</h2>
          <p className="text-sm text-center mt-4 text-gray-600 px-4">
            Enter your registered email address and we'll send you instructions
            to reset your password.
          </p>
        </div>

        {/* Right Panel (Form) */}
        <div className=" w-full flex flex-col justify-center">
          <h2 className="flex justify-center items-center text-2xl font-bold mb-10">
            Reset your password
          </h2>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-6 w-full"
          >
            <input
              type="email"
              {...register("email")}
              className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFB640]"
              placeholder="Enter your email address"
            />

            {/* Error Message */}
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}

            <button
              type="submit"
              className="mt-4 bg-[#FFB640] text-white p-3 rounded-md hover:bg-[#c98b26] transition duration-200"
              onClick={() => navigate("/resetpass")}
            >
              Send Reset Link
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
