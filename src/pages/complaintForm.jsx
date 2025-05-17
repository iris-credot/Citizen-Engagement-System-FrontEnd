import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import useDocumentTitle from "../customHooks/documentTitle";

const categories = [
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
];

const complaintSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  category: z.string().min(3, "Please select a valid category"),
  agency_id: z.string().min(2, "Please select a valid agency"),
});

export default function ComplaintForm() {
  useDocumentTitle("Complaint Form");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(complaintSchema),
  });

  const onSubmit = (data) => {
    console.log("Complaint submitted:", data);
    alert("Complaint submitted successfully!");
    reset();
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-white dark:bg-black p-6">
      <div className="w-full max-w-2xl bg-white dark:bg-[#121212] rounded-xl shadow-md p-8">
        <h2 className="text-2xl font-semibold text-black dark:text-white mb-6 text-center">
          Submit a Complaint
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Title
            </label>
            <input
              type="text"
              {...register("title")}
              className="w-full p-2 mt-1 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFB640] dark:bg-[#1e1e1e] dark:text-white"
              placeholder="Enter title"
            />
            {errors.title && (
              <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Description
            </label>
            <textarea
              {...register("description")}
              rows={4}
              className="w-full p-2 mt-1 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFB640] dark:bg-[#1e1e1e] dark:text-white"
              placeholder="Describe your issue"
            />
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Category
            </label>
            <select
              {...register("category")}
              className="w-full p-2 mt-1 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFB640] dark:bg-[#1e1e1e] dark:text-white"
            >
              <option value="">-- Choose a category --</option>
              {categories.map((cat) => (
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
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Select Agency
            </label>
            <select
              {...register("agency_id")}
              className="w-full p-2 mt-1 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFB640] dark:bg-[#1e1e1e] dark:text-white"
            >
              <option value="">-- Choose an agency --</option>
              <option value="police-id">Police Department</option>
              <option value="health-id">Health Services</option>
              <option value="edu-id">Education Board</option>
              {/* Replace values with real agency IDs from your backend */}
            </select>
            {errors.agency_id && (
              <p className="text-red-500 text-sm mt-1">{errors.agency_id.message}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-[#FFB640] text-white rounded-md hover:bg-[#94661c] transition duration-200"
          >
            Submit Complaint
          </button>
        </form>
      </div>
    </div>
  );
}
