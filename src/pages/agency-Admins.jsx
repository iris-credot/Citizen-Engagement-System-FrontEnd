import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

export default function AgencyAdmins() {
  const navigate = useNavigate();
  const [admins, setAdmins] = useState([]);

  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("No token found in localStorage");
          return;
        }

        const response = await axios.get(
          "https://citizen-engagement-system-backend.onrender.com/api/user/getallAdmins",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("Fetched admins:", response.data);
       setAdmins(response.data.admins || response.data.citizens || []);
// Assuming response.data.admins is the array
      } catch (error) {
        console.error("Error fetching admins:", error);
      }
    };

    fetchAdmins();
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
      console.log(data);

      if (!response.ok) throw new Error(data.message || "Failed to delete citizen.");

      // Remove the deleted complaint from UI
      setAdmins((prev) => prev.filter((comp) => comp._id !== id));

      toast.success(data.message || "Citizen deleted successfully.");
    } catch (err) {
      toast.error(err.message || "An error occurred during deletion.");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 dark:text-white">All Agency Admins</h1>

      <button
        className="mb-4 px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
        onClick={() => navigate("/createAdmin")}
      >
        Create New Admin
      </button>

      <table className="w-full border-collapse border border-gray-300 dark:text-white">
        <thead>
          <tr className="bg-gray-100 dark:text-black">
            <th className="border border-gray-300 p-2 text-left">Name</th>
            <th className="border border-gray-300 p-2 text-left">Email</th>
                        <th className="border border-gray-300 p-2 text-left">Agency</th>
            <th className="border border-gray-300 p-2 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {admins.map((admin) => (
            <tr key={admin._id} className="hover:bg-gray-500">
              <td className="border border-gray-300 p-2">{admin.names}</td>
              <td className="border border-gray-300 p-2">{admin.email}</td>
               <td className="border border-gray-300 p-2">  {admin.agency_id ? admin.agency_id.name : "N/A"}</td>
              <td className="border border-gray-300 p-2 text-center space-x-2">
                <button className="px-3 py-1 bg-black text-white rounded hover:bg-gray-800"
                 onClick={() => navigate(`/superAdmin/agency-admins/view-agency/${admin._id || admin.user?._id}`)}>
                  View
                </button>
                <button className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-950"
                onClick={() => handleDelete(admin._id)}>
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
