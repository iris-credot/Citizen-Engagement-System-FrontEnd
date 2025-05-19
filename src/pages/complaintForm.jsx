import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import toast from "react-hot-toast";

import Loading from "./loadingPage";

// Validation schema
const complaintSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  category: z.string().min(1, "Please select a category"),
  agency_id: z.string().min(1, "Please select a valid agency"),
});

export default function ComplaintForm() {
  const [categories, setCategories] = useState([]);
  const [agencies, setAgencies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(complaintSchema),
  });

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("token");

        const [agenciesRes, categoriesRes] = await Promise.all([
          fetch("https://citizen-engagement-system-backend.onrender.com/api/agency/getall", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }),
          fetch("https://citizen-engagement-system-backend.onrender.com/api/complaint/getCategories", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }),
        ]);

        const agenciesData = await agenciesRes.json();
        const categoriesData = await categoriesRes.json();

        if (agenciesRes.ok) {
          setAgencies(agenciesData.agencies || []);
        } else {
          toast.error(agenciesData.message || "Failed to load agencies");
        }

        if (categoriesRes.ok) {
          setCategories(categoriesData.categories || []);
        } else {
          toast.error(categoriesData.message || "Failed to load categories");
        }
      } catch (error) {
        console.error("Fetch error:", error);
        toast.error("Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const onSubmit = async (data) => {
  try {
    const token = localStorage.getItem("token");
       setSubmitting(true);

    const response = await fetch("https://citizen-engagement-system-backend.onrender.com/api/complaint/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    // If backend returns an error status
    if (!response.ok) {
      const err = await response.json();
      throw new Error(err.message || "Failed to submit complaint");
    }

    const result = await response.json();

    // Show success toast and clear the form
    toast.success("Complaint submitted successfully!");
    reset();

    console.log("Submitted complaint:", result);
  } catch (error) {
    console.error("Error submitting complaint:", error);
    toast.error(error.message || "Submission failed");
  }
  finally {
    setSubmitting(false);
  }
};


  if (loading) return <Loading />;

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-white dark:bg-black p-6">
      <div className="w-full max-w-2xl bg-white dark:bg-[#121212] rounded-xl shadow-md p-8">
        <h2 className="text-2xl font-semibold text-black dark:text-white mb-6 text-center">
          Submit a Complaint
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Title</label>
            <input
              type="text"
              {...register("title")}
              className="w-full p-2 mt-1 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFB640] dark:bg-[#1e1e1e] dark:text-white"
              placeholder="Enter title"
            />
            {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Description</label>
            <textarea
              {...register("description")}
              rows={4}
              className="w-full p-2 mt-1 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFB640] dark:bg-[#1e1e1e] dark:text-white"
              placeholder="Describe your issue"
            />
            {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Category</label>
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
            {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category.message}</p>}
          </div>

          {/* Agency */}
          <div>
           
              <label htmlFor="agency_id" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Agency
              </label>
              <select
                 {...register("agency_id")}
                 className="w-full p-2 mt-1 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFB640] dark:bg-[#1e1e1e] dark:text-white"                      >
                     <option value="">Select an agency</option>
                         {agencies.map((agency) => (
                        <option key={agency._id} value={agency._id}>
                           {agency.name}
                            </option>
                                   ))}
                                   </select>

              {errors.agency_id && (
                <p className="text-red-500 text-sm mt-1">{errors.agency_id.message}</p>
              )}
          </div>

          {/* Submit Button */}
         <button
  type="submit"
  disabled={submitting}
  className={`w-full py-2 px-4 rounded-md transition duration-200 ${
    submitting ? "bg-gray-400 cursor-not-allowed" : "bg-[#FFB640] hover:bg-[#94661c]"
  } text-white`}
>
  {submitting ? "Submitting..." : "Submit Complaint"}
</button>  
        </form>
      </div>
    </div>
  );
}
