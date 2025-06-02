import React, { useEffect, useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Loading from "./loadingPage";
import toast from "react-hot-toast";
export default function ComplaintsPage() {
    const navigate = useNavigate();
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchComplaints = async () => {
     const storedUser = localStorage.getItem("user");
    console.log(storedUser);
    const parsedUser = storedUser ? JSON.parse(storedUser) : null;
    const id = parsedUser?.agency_id;
      const token = localStorage.getItem("token");

      if (!token || !id) {
        setError("User not authenticated");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          `https://citizen-engagement-system-backend.onrender.com/api/complaint/getOneAgency/${id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          const errData = await response.json();
          throw new Error(errData.message || "Failed to fetch complaints");
        }

        const data = await response.json();
        setComplaints(data.complaints); // <-- Use correct key
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
console.log(data);
      // Remove the deleted complaint from UI
      setComplaints((prev) => prev.filter((comp) => comp._id !== id));

      toast.success(data.message || "Complaint deleted successfully.");
    } catch (err) {
      toast.error(err.message || "An error occurred during deletion.");
    }
  };


  if (loading) return <div className="text-center mt-10"><Loading/></div>;
  if (error) return <div className="text-center mt-10 text-red-500">{error}</div>;

  return (
    <div className="min-h-screen bg-white dark:bg-black p-6 text-black dark:text-white">
      <h2 className="text-3xl font-semibold mb-6 text-center">All the Complaints</h2>

      <div className="space-y-6 max-w-4xl mx-auto">
        {complaints.length === 0 ? (
          <div className="text-center text-gray-500">No complaints found.</div>
        ) : (
          complaints.map((complaint) => (
            <div
              key={complaint._id}
              className="bg-white dark:bg-[#1e1e1e] rounded-xl shadow p-5 border border-gray-200 dark:border-gray-700"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-bold">{complaint.title}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Category: {complaint.category} | Agency: {complaint.agency_id.name }
                  </p>
                </div>
                <div className="flex gap-2">
                  <button className="text-blue-500 hover:text-blue-700"  onClick={() => navigate(`/update-complaint/${complaint._id}`)}>
                    <Pencil size={20} />
                  </button>
                  <button className="text-red-500 hover:text-red-700"  onClick={() => handleDelete(complaint._id)}>
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
