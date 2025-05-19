import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import Icon from "../assets/logo.png";

export default function ChangeStatus() {
  const [status, setStatus] = useState("new");
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setStatus(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Authentication token not found");
      }

      const response = await axios.put(
        `https://citizen-engagement-system-backend.onrender.com/api/complaint/status/${id}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const data = response.data;

      toast.success(data.message || "Complaint status updated successfully.");

      // Redirect back after short delay
      setTimeout(() => {
        navigate(-1); // go back to previous page
      }, 1500);
    } catch (err) {
      toast.error(err.response?.data?.message || err.message || "An error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-screen bg-white justify-center items-center dark:bg-black h-screen flex">
      <div className="max-w-4xl mt-10 p-6 bg-white rounded-md shadow-md h-[400px] flex flex-col justify-center ">
          <div className="mb-6">
                    <img src={Icon} alt="Logo" className="h-12 w-auto" />
                  </div>
        <h2 className="text-2xl font-semibold mb-6">Update Complaint Status</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Select Status
            </label>
            <select
              value={status}
              onChange={handleChange}
              className="w-full h-[42px] p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFB640] text-sm text-gray-700"
            >
              <option value="new">New</option>
              <option value="in_progress">In Progress</option>
              <option value="resolved">Resolved</option>
              <option value="closed">Closed</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="bg-[#FFB640] text-white px-4 py-2 rounded-md hover:bg-[#e6a72a] disabled:opacity-50"
          >
            {loading ? "Updating..." : "Update Status"}
          </button>
        </form>
      </div>
    </div>
  );
}
