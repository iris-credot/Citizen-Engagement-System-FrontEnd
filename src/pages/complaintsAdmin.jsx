import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Pencil, Trash2 } from "lucide-react";
import useDocumentTitle from "../customHooks/documentTitle";
import toast from "react-hot-toast";

export default function ComplaintsAdmin() {
  useDocumentTitle("All Complaints");
  const navigate = useNavigate();
  const { agencyId } = useParams();
console.log("agencyId from URL:", agencyId); 
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!agencyId) {
      setError("No agency ID provided in URL");
      setLoading(false);
      return;
    }

    async function fetchComplaints() {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");

        if (!token) throw new Error("Not authenticated");

        const response = await fetch(
          `https://citizen-engagement-system-backend.onrender.com/api/complaint/getOneAgency/${agencyId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error(`Error fetching complaints: ${response.statusText}`);
        }

        const data = await response.json();
        setComplaints(data.complaints);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchComplaints();
  }, [agencyId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-black p-6 text-black dark:text-white flex justify-center items-center">
        <p>Loading complaints...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white dark:bg-black p-6 text-black dark:text-white flex justify-center items-center">
        <p className="text-red-500">Error: {error}</p>
      </div>
    );
  }
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
    <div className="min-h-screen bg-white dark:bg-black p-6 text-black dark:text-white">
      <h2 className="text-3xl font-semibold mb-6 text-center">Agency Complaints</h2>

      <div className="space-y-6 max-w-4xl mx-auto">
        {complaints.length === 0 ? (
          <p className="text-center text-gray-500 dark:text-gray-400">
            No complaints found for this agency.
          </p>
        ) :  (
  [...complaints]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .map((complaint) =>  (
            <div
              key={complaint._id}
              className="bg-white dark:bg-[#1e1e1e] rounded-xl shadow p-5 border border-gray-200 dark:border-gray-700"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-bold">{complaint.title}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Category: {complaint.category} 
                  </p>
                            <p><strong>Created:</strong> {new Date(complaint.createdAt).toLocaleString()}</p>
          <p><strong>Updated:</strong> {new Date(complaint.updatedAt).toLocaleString()}</p>
                </div>
                <div className="flex md:flex-row flex-col gap-2">
                  <button
                    className="px-3 py-1 bg-black text-white rounded hover:bg-gray-800"
                    onClick={() => navigate(`/respond-form/${complaint._id}`)}
                  >
                    Reply
                  </button>
                  <button className="text-blue-500 hover:text-blue-700"   onClick={() => navigate(`/change-status/${complaint._id}`)}>
                    <Pencil size={20} />
                  </button>
                  <button className="text-red-500 hover:text-red-700"    onClick={() => handleDelete(complaint._id)}>
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
              <p className="mt-3">{complaint.description}</p>
              <div className="mt-2 text-sm">
                <span className="inline-block px-2 py-1 bg-[#FFB640] text-white rounded-full text-xs">
                  Status: {complaint.status}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
