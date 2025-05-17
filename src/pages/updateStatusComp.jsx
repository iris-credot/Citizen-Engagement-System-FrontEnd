import { useState } from "react";
import useDocumentTitle from "../customHooks/documentTitle";

export default function ChangeStatus() {
  useDocumentTitle("Change Status");

  const [status, setStatus] = useState("new");
  const [message, setMessage] = useState("");

  // Placeholder complaint ID (replace with dynamic value or props)
  const complaintId = "1234567890";

  const handleChange = (e) => {
    setStatus(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // TODO: Replace with API call to update complaint status
    console.log(`Updating complaint ${complaintId} to status:`, status);

    // Simulate success
    setMessage("Complaint status updated successfully.");
  };

  return (
    <div className="w-screen bg-white justify-center items-center dark:bg-black h-screen flex">
    <div className="max-w-3xl  mt-10 p-6 bg-white rounded-md shadow-md ">
      <h2 className="text-2xl font-semibold mb-6">Change Complaint Status</h2>

      {message && <p className="text-green-600 mb-4">{message}</p>}

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
          className="bg-[#FFB640] text-white px-4 py-2 rounded-md hover:bg-[#e6a72a]"
        >
          Update Status
        </button>
      </form>
    </div>
    </div>
  );
}
