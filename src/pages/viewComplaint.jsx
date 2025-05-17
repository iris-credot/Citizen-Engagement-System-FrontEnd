import React from "react";
import useDocumentTitle from "../customHooks/documentTitle";

export default function ViewComplaint() {
  useDocumentTitle("Complaint");

  // Static complaint details for now
  const complaint = {
    _id: "abc123",
    title: "Overflowing Garbage Bins",
    description: "Garbage bins on 5th Street are overflowing and not collected regularly.",
    category: "Waste Management",
    agency: "City Sanitation Department",
    status: "in_progress",
    attachments: ["photo1.jpg", "photo2.jpg"],
    createdAt: "2025-05-01T08:30:00Z",
    updatedAt: "2025-05-16T10:45:00Z",
  };

  return (
    <div className="min-h-screen w-screen flex justify-center items-center bg-white dark:bg-black p-6 text-black dark:text-white">
      <div className="max-w-3xl mx-auto bg-white dark:bg-[#1e1e1e] rounded-xl shadow-md p-6 border border-gray-200 dark:border-gray-700">
        <h2 className="text-2xl font-semibold mb-4">{complaint.title}</h2>

        <div className="mb-4 text-sm text-gray-500 dark:text-gray-400">
          <p><strong>Category:</strong> {complaint.category}</p>
          <p><strong>Agency:</strong> {complaint.agency}</p>
          <p><strong>Status:</strong> 
            <span className="ml-2 px-2 py-1 bg-[#FFB640] text-white rounded-full text-xs">
              {complaint.status}
            </span>
          </p>
          <p><strong>Created:</strong> {new Date(complaint.createdAt).toLocaleString()}</p>
          <p><strong>Updated:</strong> {new Date(complaint.updatedAt).toLocaleString()}</p>
        </div>

        <div className="mb-4">
          <h3 className="font-semibold">Description</h3>
          <p className="mt-1">{complaint.description}</p>
        </div>

        {complaint.attachments.length > 0 && (
          <div>
            <h3 className="font-semibold mb-1">Attachments</h3>
            <ul className="list-disc list-inside text-sm text-blue-500 dark:text-blue-400">
              {complaint.attachments.map((file, index) => (
                <li key={index}>{file}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
