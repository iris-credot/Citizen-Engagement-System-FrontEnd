import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import toast, { Toaster } from "react-hot-toast";

// Zod schema
const schema = z
  .object({
    currentPassword: z.string().min(6, "Current password is required"),
    newPassword: z.string().min(6, "New password must be at least 6 characters"),
    confirm: z.string(),
  })
  .refine((data) => data.newPassword === data.confirm, {
    path: ["confirm"],
    message: "Passwords do not match",
  });

export default function UpdatePassword() {
  const navigate = useNavigate(); 
 

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
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("Authentication token not found");
    }

    const response = await fetch("https://citizen-engagement-system-backend.onrender.com/api/user/password", {
      method: "PUT",
      headers: {
         "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
       
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) {
      toast.error(result.error || "Something went wrong");
      return;
    }

    toast.success(result.message || "Password updated successfully");
    reset();

    setTimeout(() => {
      navigate(-1);
    }, 1500);
  } catch (error) {
    toast.error("An error occurred");
    console.error("Error:", error);
  }
};

  

  return (
    <div className="flex items-center justify-center h-full bg-white dark:bg-slate-950 ">
      <Toaster />
      <div className="w-full max-w-xl bg-white rounded-xl flex flex-col p-6 gap-6 mt-20 dark:bg-gray-700">
        <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white">
          Update Password
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <input
            type="password"
            {...register("currentPassword")}
            className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFB640]"
            placeholder="Current Password"
          />
          {errors.currentPassword && (
            <p className="text-red-500 text-sm">{errors.currentPassword.message}</p>
          )}

          <input
            type="password"
            {...register("newPassword")}
            className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFB640]"
            placeholder="New Password"
          />
          {errors.newPassword && (
            <p className="text-red-500 text-sm">{errors.newPassword.message}</p>
          )}

          <input
            type="password"
            {...register("confirm")}
            className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFB640]"
            placeholder="Confirm New Password"
          />
          {errors.confirm && (
            <p className="text-red-500 text-sm">{errors.confirm.message}</p>
          )}

          <button
            type="submit"
            className="mt-2 bg-[#FFB640] text-white p-3 rounded-md hover:bg-[#a2742b] transition duration-200"
          >
            Update Password
          </button>
        </form>
      </div>
    </div>
  );
}
