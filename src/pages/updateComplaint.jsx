import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export default function UpdateComplaint() {
  const { id } = useParams(); // complaint ID from route param
  const navigate = useNavigate();

  const [complaint, setComplaint] = useState({
    title: "",
    description: "",
  });

  const [error, setError] = useState("");

  useEffect(() => {
    const fetchComplaint = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Not authenticated");
        return;
      }
      try {
        const res = await axios.get(
          `https://citizen-engagement-system-backend.onrender.com/api/complaint/getOneComplaint/${id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const data = res.data.complaint || res.data;
        console.log("Fetched complaint data:", res.data);

        setComplaint({
          title: data.title || "",
          description: data.description || "",
        });
      } catch (err) {
        setError(
          err.response?.data?.message ||
            err.message ||
            "Failed to fetch complaint data"
        );
      }
    };

    fetchComplaint();
  }, [id]);

  const handleChange = (e) => {
    setComplaint({ ...complaint, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      setError("Not authenticated");
      return;
    }
    try {
      await axios.put(
        `https://citizen-engagement-system-backend.onrender.com/api/complaint/update/${id}`,
        complaint,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Complaint updated successfully!");
      navigate(-1); // or wherever you want to redirect after update
    } catch (err) {
      setError(
        err.response?.data?.message || err.message || "Failed to update complaint"
      );
    }
  };

return (
  <div className="min-h-screen flex items-center w-screen justify-center bg-gray-100 dark:bg-gray-900 p-4">
    <div className="w-full max-w-3xl p-8 bg-gray-100 dark:bg-gray-900 dark:text-white rounded-lg shadow-lg flex flex-col space-y-6">
      <h1 className="text-4xl font-extrabold text-center mb-4">Update Complaint</h1>

      {error && (
        <div className="bg-red-100 dark:bg-red-700 text-red-700 dark:text-red-200 px-4 py-2 rounded-md font-semibold shadow">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="title"
            className="block mb-2 font-semibold text-lg"
          >
            Title
          </label>
          <input
            id="title"
            name="title"
            type="text"
            value={complaint.title}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
            required
          />
        </div>

        <div>
          <label
            htmlFor="description"
            className="block mb-2 font-semibold text-lg"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            rows={6}
            value={complaint.description}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
            required
          />
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 transition-colors text-white font-semibold px-8 py-3 rounded-md shadow-md"
          >
            Update Complaint
          </button>
        </div>
      </form>
    </div>
  </div>
);

}
