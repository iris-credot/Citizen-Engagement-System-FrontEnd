import { useState } from "react";
import useDocumentTitle from "../customHooks/documentTitle";

export default function AllAgencies() {
  useDocumentTitle("Agencies Page");

  // Static dummy data, replace with your API data fetching logic
  const [agencies, setAgencies] = useState([
    { _id: "1", name: "Agency One", description: "Description one" },
    { _id: "2", name: "Agency Two", description: "Description two" },
    { _id: "3", name: "Agency Three", description: "Description three" },
  ]);

  const handleAddAgency = () => {
    // Navigate to add agency page or open modal
    alert("Navigate to Add Agency form");
  };

  const handleEditAgency = (id) => {
    // Navigate to edit agency page or open modal with agency id
    alert(`Edit agency ${id}`);
  };

  const handleDeleteAgency = (id) => {
    // Confirm delete, then call delete API and update state
    if (window.confirm("Are you sure you want to delete this agency?")) {
      setAgencies((prev) => prev.filter((agency) => agency._id !== id));
      alert(`Agency ${id} deleted`);
    }
  };

  const handleViewAgency = (id) => {
    // Navigate to view agency details page
    alert(`View agency ${id}`);
  };

  return (
    <div className="min-h-screen  bg-white dark:bg-black p-6 text-black  flex justify-center items-start pt-12">
    <div className="w-full mx-auto mt-10 p-6 bg-white rounded-md shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">All Agencies</h1>
        <button
          onClick={handleAddAgency}
          className="bg-[#FFB640] text-white px-4 py-2 rounded-md hover:bg-[#e6a72a]"
        >
          Add New Agency
        </button>
      </div>

      <table className="w-full border border-gray-300 rounded-md">
        <thead className="bg-gray-100">
          <tr>
            <th className="border border-gray-300 px-4 py-2 text-left">Name</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Description</th>
            <th className="border border-gray-300 px-4 py-2 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {agencies.length === 0 && (
            <tr>
              <td colSpan="3" className="text-center py-4 text-gray-500">
                No agencies found.
              </td>
            </tr>
          )}

          {agencies.map((agency) => (
            <tr key={agency._id} className="hover:bg-gray-50">
              <td className="border border-gray-300 px-4 py-2">{agency.name}</td>
              <td className="border border-gray-300 px-4 py-2">{agency.description}</td>
              <td className="border border-gray-300 px-4 py-2 text-center space-x-2">
                <button
                  onClick={() => handleViewAgency(agency._id)}
                  className="text-blue-600 hover:underline"
                >
                  View
                </button>
                <button
                  onClick={() => handleEditAgency(agency._id)}
                  className="text-yellow-600 hover:underline"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteAgency(agency._id)}
                  className="text-red-600 hover:underline"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
  );
}
