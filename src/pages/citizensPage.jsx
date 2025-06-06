import { useEffect, useState } from "react";
import useDocumentTitle from "../customHooks/documentTitle";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function CitizensPage() {
  useDocumentTitle("All Citizens");
   const navigate = useNavigate();
  const [citizens, setCitizens] = useState([]);

  useEffect(() => {
    const fetchCitizens = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("No token found in localStorage");
          return;
        }

        const response = await axios.get(
          "https://citizen-engagement-system-backend.onrender.com/api/user/getallCitiens",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("Fetched citizens:", response.data);
         setCitizens(response.data.citizens);
      } catch (error) {
        console.error("Error fetching citizens:", error);
      }
    };

    fetchCitizens();
  }, []);
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this citizen?");
    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Authentication token not found");

      const response = await fetch(
        `https://citizen-engagement-system-backend.onrender.com/api/user/delete/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) throw new Error(data.message || "Failed to delete citizen.");

      // Remove the deleted complaint from UI
      setCitizens((prev) => prev.filter((comp) => comp._id !== id));

      toast.success(data.message || "Citizen deleted successfully.");
    } catch (err) {
      toast.error(err.message || "An error occurred during deletion.");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 dark:text-white">All Citizens</h1>

      <table className="w-full border-collapse border border-gray-300 dark:text-white">
        <thead>
          <tr className="bg-gray-100 dark:text-black">
            <th className="border border-gray-300 p-2 text-left">Name</th>
            <th className="border border-gray-300 p-2 text-left">Email</th>
            <th className="border border-gray-300 p-2 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {citizens.map((citizen, index) => (
            <tr key={index} className="hover:bg-gray-200 dark:hover:bg-gray-500">
              <td className="border border-gray-300 p-2">{citizen.names}</td>
              <td className="border border-gray-300 p-2">{citizen.email}</td>
              <td className="border border-gray-300 p-2 text-center space-x-2">
                <button className="px-3 py-1 bg-black text-white rounded hover:bg-gray-800"
                                    onClick={() => navigate(`/superAdmin/citizens/view-user/${citizen._id || citizen.user?._id}`)}>
                  View
                </button>
                <button className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-950"  onClick={() => handleDelete(citizen._id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
