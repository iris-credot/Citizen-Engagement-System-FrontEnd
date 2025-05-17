import React from "react";
import useDocumentTitle from "../customHooks/documentTitle";

export default function ResponsesPage() {
  useDocumentTitle("Responses");

  // Example static responses data
  const responses = [
    {
      id: "1",
      complaintTitle: "Overflowing Garbage Bins",
      responseText: "Our sanitation team has been notified and will clear the bins within 24 hours.",
      responder: "City Sanitation Dept",
      date: "2025-05-15T10:30:00Z",
      status: "in_progress",
    },
    {
      id: "2",
      complaintTitle: "No street lights on 7th Ave",
      responseText: "Maintenance scheduled for next week to replace faulty street lights.",
      responder: "Public Safety Agency",
      date: "2025-05-14T09:00:00Z",
      status: "new",
    },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-black p-6 text-black dark:text-white">
      <h2 className="text-3xl font-semibold mb-6 text-center">Complaint Responses</h2>

      {responses.length === 0 ? (
        <p className="text-center text-gray-500 dark:text-gray-400">No responses yet.</p>
      ) : (
        <div className="space-y-6 max-w-3xl mx-auto">
          {responses.map(({ id, complaintTitle, responseText, responder, date, status }) => (
            <div
              key={id}
              className="p-4 border rounded-md border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-[#1e1e1e]"
            >
              <h3 className="text-xl font-semibold">{complaintTitle}</h3>
              <p className="mt-2 text-gray-800 dark:text-gray-300">{responseText}</p>
              <div className="mt-3 flex justify-between text-sm text-gray-600 dark:text-gray-400">
                <span>
                  <strong>Responder:</strong> {responder}
                </span>
                <span>
                  <strong>Date:</strong> {new Date(date).toLocaleString()}
                </span>
                <span
                  className={`font-semibold capitalize ${
                    status === "resolved"
                      ? "text-green-600 dark:text-green-400"
                      : status === "in_progress"
                      ? "text-yellow-600 dark:text-yellow-400"
                      : "text-gray-600 dark:text-gray-400"
                  }`}
                >
                  {status.replace("_", " ")}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
