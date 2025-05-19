import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import toast from "react-hot-toast";

import Icon from "../assets/logo.png";

// Zod schema for validation
const schema = z.object({
  email: z.string().email("Enter a valid email address"),
});

export default function ForgotPassword() {

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      const response = await fetch(
        "https://citizen-engagement-system-backend.onrender.com/api/user/forgot",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: data.email }),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        toast.error(result.message || "Failed to send reset link");
        return;
      }

      toast.success(result.message || "Reset instructions sent to your email!");
      reset();
    } catch (error) {
      console.error("Forgot password error:", error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="bg-[#f3f5ff] flex items-center justify-center w-screen min-h-screen p-6">
      <div className="w-full max-w-3xl bg-white rounded-xl flex flex-col p-6 gap-8">
        {/* Logo and Description */}
        <div className="w-full flex flex-col items-center">
          <img src={Icon} alt="Logo" className="h-12 mb-4" />
          <h2 className="text-2xl font-bold text-gray-800">Forgot Password</h2>
          <p className="text-sm text-center mt-2 text-gray-600 px-4">
            Enter your registered email address and we'll send you instructions
            to reset your password.
          </p>
        </div>

        {/* Form */}
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

          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}

          <button
            type="submit"
            className="mt-2 bg-[#FFB640] text-white p-3 rounded-md hover:bg-[#c98b26] transition duration-200"
          >
            Send Reset Link
          </button>
        </form>
      </div>
    </div>
  );
}
