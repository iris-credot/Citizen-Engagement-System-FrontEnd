import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import useDocumentTitle from "../customHooks/documentTitle";

const complaintSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  category: z.enum([
    "Roads and Infrastructure",
    "Water and Sanitation",
    "Electricity",
    "Public Safety",
    "Health Services",
    "Education",
    "Waste Management",
    "Corruption",
    "Noise Pollution",
    "Environmental Issues",
    "Public Transport",
    "Social Services",
    "Illegal Construction",
    "Others"
  ], { errorMap: () => ({ message: "Please select a valid category" }) }),
  agency: z.string().min(2, "Please enter an agency"),
});

export default function UpdateComplaint() {
  useDocumentTitle("Update Complaint");

  // Static pre-filled complaint data (simulate fetched complaint)
  const complaint = {
    title: "Overflowing Garbage Bins",
    description: "Garbage bins on 5th Street are overflowing and not collected regularly.",
    category: "Waste Management",
    agency: "City Sanitation Department",
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(complaintSchema),
    defaultValues: complaint,
  });

  const onSubmit = (data) => {
    console.log("Updated complaint:", data);
    alert("Complaint updated successfully!");
    // Here you would send the data to your backend API
  };

  return (
    <div className="min-h-screen w-screen bg-white dark:bg-black p-6 text-black dark:text-white flex justify-center items-start pt-12">
      <div className="w-full max-w-2xl bg-white dark:bg-[#1e1e1e] rounded-xl shadow-md p-8 border border-gray-200 dark:border-gray-700">
        <h2 className="text-2xl font-semibold mb-6 text-center">Update Complaint</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label className="block mb-1 font-medium text-gray-700 dark:text-gray-300">
              Title
            </label>
            <input
              type="text"
              {...register("title")}
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFB640] dark:bg-[#1e1e1e] dark:text-white"
              placeholder="Enter complaint title"
            />
            {errors.title && (
              <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
            )}
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-700 dark:text-gray-300">
              Description
            </label>
            <textarea
              {...register("description")}
              rows={4}
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFB640] dark:bg-[#1e1e1e] dark:text-white"
              placeholder="Describe your issue"
            />
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
            )}
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-700 dark:text-gray-300">
              Category
            </label>
            <select
              {...register("category")}
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFB640] dark:bg-[#1e1e1e] dark:text-white"
            >
              <option value="">-- Select category --</option>
              {[
                "Roads and Infrastructure",
                "Water and Sanitation",
                "Electricity",
                "Public Safety",
                "Health Services",
                "Education",
                "Waste Management",
                "Corruption",
                "Noise Pollution",
                "Environmental Issues",
                "Public Transport",
                "Social Services",
                "Illegal Construction",
                "Others",
              ].map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            {errors.category && (
              <p className="text-red-500 text-sm mt-1">{errors.category.message}</p>
            )}
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-700 dark:text-gray-300">
              Agency
            </label>
            <input
              type="text"
              {...register("agency")}
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFB640] dark:bg-[#1e1e1e] dark:text-white"
              placeholder="Enter agency name"
            />
            {errors.agency && (
              <p className="text-red-500 text-sm mt-1">{errors.agency.message}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-[#FFB640] text-white rounded-md hover:bg-[#94661c] transition duration-200"
          >
            Update Complaint
          </button>
        </form>
      </div>
    </div>
  );
}
