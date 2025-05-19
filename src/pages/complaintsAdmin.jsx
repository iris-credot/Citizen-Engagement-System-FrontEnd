import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Pencil, Trash2 } from "lucide-react";
import useDocumentTitle from "../customHooks/documentTitle";

export default function ComplaintsAdmin() {
  useDocumentTitle("All Complaints");

  const { agencyId } = useParams();

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
          `https://citizen-engagement-system-backend.onrender.com/api/complaint/getOne/${agencyId}`,
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

  return (
    <div className="min-h-screen bg-white dark:bg-black p-6 text-black dark:text-white">
      <h2 className="text-3xl font-semibold mb-6 text-center">All the Complaints</h2>

      <div className="space-y-6 max-w-4xl mx-auto">
        {complaints.length === 0 && (
          <p className="text-center text-gray-500 dark:text-gray-400">
            No complaints found for this agency.
          </p>
        )}

        {complaints.map((complaint) => (
          <div
            key={complaint._id}
            className="bg-white dark:bg-[#1e1e1e] rounded-xl shadow p-5 border border-gray-200 dark:border-gray-700"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-xl font-bold">{complaint.title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Category: {complaint.category} | Agency: {complaint.agency}
                </p>
              </div>
              <div className="flex gap-2">
                <button className="text-blue-500 hover:text-blue-700">
                  <Pencil size={20} />
                </button>
                <button className="text-red-500 hover:text-red-700">
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
        ))}
      </div>
    </div>
  );
}
