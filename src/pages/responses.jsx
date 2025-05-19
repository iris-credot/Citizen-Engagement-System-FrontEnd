import React, { useEffect, useState } from "react";
import useDocumentTitle from "../customHooks/documentTitle";

export default function ResponsesPage() {
  useDocumentTitle("Responses");

  const [responses, setResponses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");
  const id = localStorage.getItem("userId");

  useEffect(() => {
    const fetchResponses = async () => {
      try {
        const res = await fetch(
          `https://citizen-engagement-system-backend.onrender.com/api/response/byResponser/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message || "Failed to fetch responses");
        }

        // Ensure `responses` is always an array
        setResponses(Array.isArray(data.responses) ? data.responses : []);
      } catch (err) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    if (token && id) {
      fetchResponses();
    } else {
      setError("You must be logged in to view responses.");
      setLoading(false);
    }
  }, [id, token]);

  return (
    <div className="min-h-screen bg-white dark:bg-black p-6 text-black dark:text-white">
      <h2 className="text-3xl font-semibold mb-6 text-center">Complaint Responses</h2>

      {loading ? (
        <p className="text-center text-gray-500 dark:text-gray-400">Loading...</p>
      ) : error ? (
        <p className="text-center text-red-500 dark:text-red-400">{error}</p>
      ) : (
        <>
          <div className="space-y-6 max-w-3xl mx-auto">
            {responses.map((res) => {
              const complaintTitle = res.complaint_id?.title || "Untitled Complaint";
              const responseText = res.message;
              const responder = res.responder_id?.name || "Unknown";
              const date = res.createdAt;
              const status = res.complaint_id?.status || "new";

              return (
                <div
                  key={res._id}
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
              );
            })}
          </div>

          {responses.length === 0 && (
            <p className="mt-6 text-center text-gray-500 dark:text-gray-400">No responses yet.</p>
          )}
        </>
      )}
    </div>
  );
}
