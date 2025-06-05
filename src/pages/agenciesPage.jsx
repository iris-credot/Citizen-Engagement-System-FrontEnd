import { useEffect, useState } from "react";
import useDocumentTitle from "../customHooks/documentTitle";
import axios from "axios";
import toast from "react-hot-toast";
export default function AgenciesPage() {
  useDocumentTitle("Agencies");

  const [agencies, setAgencies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

useEffect(() => {
  const fetchAgencies = async () => {
    try {
      const token = localStorage.getItem("token"); // make sure this matches your auth storage

      const response = await axios.get(
        "https://citizen-engagement-system-backend.onrender.com/api/agency/getall",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Fetched agencies:", response.data);
      setAgencies(response.data.agencies || []);
    } catch (err) {
      console.error("Error fetching agencies:", err);
      setError("Failed to load agencies.");
    } finally {
      setLoading(false);
    }
  };

  fetchAgencies();
}, []);
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this complaint?");
    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Authentication token not found");

      const response = await fetch(
        `https://citizen-engagement-system-backend.onrender.com/api/agency/delete/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) throw new Error(data.message || "Failed to delete complaint.");

      // Remove the deleted complaint from UI
      setAgencies((prev) => prev.filter((comp) => comp._id !== id));

      toast.success(data.message || "Complaint deleted successfully.");
    } catch (err) {
      toast.error(err.message || "An error occurred during deletion.");
    }
  };
  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white">
        Explore Government Agencies
      </h1>

      {loading && (
        <p className="text-center text-gray-700 dark:text-gray-300">Loading...</p>
      )}
      {error && (
        <p className="text-center text-red-600 dark:text-red-400">{error}</p>
      )}

      {!loading && !error && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {agencies.map((agency) => (
            <div
              key={agency._id}
              className="bg-white dark:bg-gray-900 shadow-md hover:shadow-lg transition-shadow rounded-2xl p-5 border border-gray-200 dark:border-gray-700"
            >
              <h2 className="text-base  text-center font-extrabold text-black dark:text-white mb-2">
                {agency.name}
              </h2>
              <p className="text-base font-serif mt-5 text-gray-700 dark:text-gray-300 mb-2">
                {agency.description}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                📍 <strong>Location:</strong> {agency.location}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                ✉️ <strong>Email:</strong>{" "}
                <a
                  href={`mailto:${agency.contact_email}`}
                  className="text-[#FFB640] font-medium hover:underline"
                >
                  {agency.contact_email}
                </a>
              </p>
                            <button
    className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-950 mt-4"
            onClick={() => handleDelete(agency._id)}
          >
            Delete
          </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
