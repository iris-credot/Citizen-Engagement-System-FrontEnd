import { useEffect, useState } from "react";

import Loading from "./loadingPage";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
export default function AllComplaints() {
  const navigate = useNavigate();
  

  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const token = localStorage.getItem("token"); // Adjust this if you're using cookies or context
        if (!token) {
          throw new Error("Authentication token not found");
        }

        const response = await fetch(
          "https://citizen-engagement-system-backend.onrender.com/api/complaint/getall",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch complaints");
        }

        const data = await response.json();
       // Sort by createdAt descending
const sortedComplaints = (data.complaints || []).sort(
  (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
);

setComplaints(sortedComplaints);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchComplaints();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this complaint?");
    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Authentication token not found");

      const response = await fetch(
        `https://citizen-engagement-system-backend.onrender.com/api/complaint/delete/${id}`,
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
      setComplaints((prev) => prev.filter((comp) => comp._id !== id));

      toast.success(data.message || "Complaint deleted successfully.");
    } catch (err) {
      toast.error(err.message || "An error occurred during deletion.");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4 dark:text-white">All Complaints</h2>

      {loading && <Loading/>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && (
        <table className="w-full border-collapse border border-gray-300 dark:text-white">
          <thead>
            <tr className="bg-gray-100 dark:text-black">
              <th className="border border-gray-300 p-2 text-left">Title</th>
              <th className="border border-gray-300 p-2 text-left">Category</th>
              <th className="border border-gray-300 p-2 text-left">Status</th>
              <th className="border border-gray-300 p-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {complaints.map((complaint, idx) => (
              <tr key={idx} className="">
                  <td className="border border-gray-300 p-2 whitespace-normal break-words text-sm sm:text-base">{complaint.title}</td>
                <td className="border border-gray-300 p-2">{complaint.category}</td>
                <td className="border border-gray-300 p-2">{complaint.status}</td>
                <td className="border border-gray-300 p-2 text-center">
        <div className="flex flex-col gap-2 sm:flex-row sm:justify-center sm:items-center">
          <button
            className="px-3 py-1 bg-black text-white rounded hover:bg-gray-800"
            onClick={() => navigate(`/view-complaint/${complaint._id}`)}
          >
            View
          </button>
          <button
            className="px-3 py-1 bg-black text-white rounded hover:bg-gray-800"
            onClick={() => navigate(`/change-status/${complaint._id}`)}
          >
            Edit
          </button>
          <button
            className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-950"
            onClick={() => handleDelete(complaint._id)}
          >
            Delete
          </button>
        </div>
      </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
