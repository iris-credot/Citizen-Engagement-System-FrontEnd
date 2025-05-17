import React from "react";
import { Pencil, Trash2 } from "lucide-react";
import useDocumentTitle from "../customHooks/documentTitle";

const staticComplaints = [
  {
    _id: "1",
    title: "Potholes on Main Street",
    description: "There are several large potholes on the main road causing damage to vehicles.",
    category: "Roads and Infrastructure",
    agency: "Public Works Department",
    status: "new",
  },
  {
    _id: "2",
    title: "Broken Streetlight",
    description: "The streetlight near my house hasn't worked for two weeks.",
    category: "Electricity",
    agency: "Electricity Board",
    status: "in_progress",
  },
];

export default function ComplaintsPage() {
  useDocumentTitle("Complaints Page");

  return (
    <div className="min-h-screen bg-white dark:bg-black p-6 text-black dark:text-white">
      <h2 className="text-3xl font-semibold mb-6 text-center">All the Complaints</h2>

      <div className="space-y-6 max-w-4xl mx-auto">
        {staticComplaints.map((complaint) => (
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
