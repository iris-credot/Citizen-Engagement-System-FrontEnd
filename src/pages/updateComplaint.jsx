import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import useDocumentTitle from "../customHooks/documentTitle";
import {  useNavigate } from "react-router-dom";

const complaintSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  category: z.string().min(1, "Please select a category"),
  agency_id: z.string().min(1, "Please select an agency"),
});

export default function UpdateComplaint() {
  useDocumentTitle("Update Complaint");

   // complaint id from URL param
   const { id } = useParams();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
     reset,
  } = useForm({
    resolver: zodResolver(complaintSchema),
  });

  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState("");

  const [categories, setCategories] = useState([]);
  const [agencies, setAgencies] = useState([]);

  useEffect(() => {
    const fetchMeta = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("Not authenticated");

        const [categoriesRes, agenciesRes] = await Promise.all([
          fetch("https://citizen-engagement-system-backend.onrender.com/api/complaint/getCategories", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          fetch("https://citizen-engagement-system-backend.onrender.com/api/agency/getall", {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        if (!categoriesRes.ok) throw new Error("Failed to fetch categories");
        if (!agenciesRes.ok) throw new Error("Failed to fetch agencies");

        const categoriesData = await categoriesRes.json();
        const agenciesData = await agenciesRes.json();

        // Assuming categoriesData.categories or just categoriesData array
        setCategories(categoriesData.categories || categoriesData || []);
        setAgencies(agenciesData.agencies || agenciesData || []);
      } catch (err) {
        setFetchError(err.message || "Failed to load metadata");
      }
    };

    fetchMeta();
  }, []);

  // Fix: Use proper GET complaint URL (likely /api/complaint/:id)
  useEffect(() => {
    const fetchComplaint = async () => {
      try {
        const token = localStorage.getItem("token");
         
        if (!token) throw new Error("Not authenticated");

        const res = await fetch(
          `https://citizen-engagement-system-backend.onrender.com/api/complaint/getOne/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!res.ok) {
          const errData = await res.json();
          throw new Error(errData.message || "Failed to fetch complaint");
        }

        const data = await res.json();
        const complaint = data.complaint || data; // depends on backend

        // Populate form fields:
        setValue("title", complaint.title);
        setValue("description", complaint.description);
        setValue("category", complaint.category); // note: 'category' string, not 'category_id'
        setValue("agency_id", complaint.agency_id); // id
      } catch (err) {
        setFetchError(err.message || "Error loading complaint");
      } finally {
        setLoading(false);
      }
    };

    fetchComplaint();
  }, [id, setValue]);

  const onSubmit = async (formData) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Not authenticated");

      const res = await fetch(
        `https://citizen-engagement-system-backend.onrender.com/api/complaint/update/${id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message || "Failed to update complaint");
      }

      alert("Complaint updated successfully!");
       reset();
      setTimeout(() => {
        navigate(-1); // go back to the previous page
      }, 1500); 
    } catch (err) {
      alert(`Update failed: ${err.message}`);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Loading complaint data...</p>
      </div>
    );
  }

  if (fetchError) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500">Error: {fetchError}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-screen bg-white dark:bg-black p-6 text-black dark:text-white flex justify-center items-start pt-12">
      <div className="w-full max-w-2xl bg-white dark:bg-[#1e1e1e] rounded-xl shadow-md p-8 border border-gray-200 dark:border-gray-700">
        <h2 className="text-2xl font-semibold mb-6 text-center">Update Complaint</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label
              htmlFor="title"
              className="block mb-1 font-medium text-gray-700 dark:text-gray-300"
            >
              Title
            </label>
            <input
              id="title"
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
            <label
              htmlFor="description"
              className="block mb-1 font-medium text-gray-700 dark:text-gray-300"
            >
              Description
            </label>
            <textarea
              id="description"
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
            <label
              htmlFor="category"
              className="block mb-1 font-medium text-gray-700 dark:text-gray-300"
            >
              Category
            </label>
            <select
              id="category"
              {...register("category")}
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFB640] dark:bg-[#1e1e1e] dark:text-white"
            >
              <option value="">-- Select category --</option>
              {categories.map((cat, idx) => (
                <option key={idx} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            {errors.category && (
              <p className="text-red-500 text-sm mt-1">{errors.category.message}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="agency_id"
              className="block mb-1 font-medium text-gray-700 dark:text-gray-300"
            >
              Agency
            </label>
            <select
              id="agency_id"
              {...register("agency_id")}
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFB640] dark:bg-[#1e1e1e] dark:text-white"
            >
              <option value="">-- Select agency --</option>
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

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-2 px-4 bg-[#FFB640] text-white rounded-md hover:bg-[#94661c] transition duration-200 disabled:opacity-50"
          >
            {isSubmitting ? "Updating..." : "Update Complaint"}
          </button>
        </form>
      </div>
    </div>
  );
}
