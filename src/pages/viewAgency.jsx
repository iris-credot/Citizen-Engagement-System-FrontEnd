import { useState, useEffect } from "react";
import useDocumentTitle from "../customHooks/documentTitle";

export default function ViewAgency() {
  useDocumentTitle("Agency");

  const [agency, setAgency] = useState(null);

  useEffect(() => {
    // Static example data
    const fetchedAgency = {
      _id: "1",
      name: "Agency One",
      description: "This agency focuses on community development.",
      location: "123 Main St, Cityville",
      contact_email: "contact@agencyone.com",
      createdAt: "2024-01-10T12:00:00Z",
      updatedAt: "2024-04-15T15:00:00Z",
    };

    setAgency(fetchedAgency);
  }, []);

  if (!agency) {
    return (
      <div className="flex bg-white dark:bg-black text-center p-6">
        <div className="text-gray-900 dark:text-gray-100">Loading agency details...</div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center h-screen bg-white dark:bg-black p-6 ">
      <div className="max-w-3xl w-full bg-white dark:bg-gray-900 rounded-md shadow-md p-8 text-gray-900 dark:text-gray-100">
        <h1 className="text-3xl font-bold mb-4">{agency.name}</h1>

        <p className="mb-2">
          <strong>Description:</strong> {agency.description || "N/A"}
        </p>
        <p className="mb-2">
          <strong>Location:</strong> {agency.location || "N/A"}
        </p>
        <p className="mb-2">
          <strong>Contact Email:</strong>{" "}
          <a
            href={`mailto:${agency.contact_email}`}
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            {agency.contact_email}
          </a>
        </p>

        <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
          Created: {new Date(agency.createdAt).toLocaleDateString()}
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
          Last Updated: {new Date(agency.updatedAt).toLocaleDateString()}
        </p>

        <button
          onClick={() => alert("Navigate to Edit Agency page")}
          className="bg-[#FFB640] text-white px-4 py-2 rounded-md hover:bg-[#e6a72a]"
        >
          Edit Agency
        </button>
      </div>
    </div>
  );
}
