import { useState } from "react";


export default function ResponseForm({ complaintId }) {
  

  const [message, setMessage] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const [error, setError] = useState("");

 const handleSubmit = async (e) => {
  e.preventDefault();
  setStatusMessage("");
  setError("");

  if (!message.trim()) {
    setError("Response message is required");
    return;
  }

 

  try {
   const token = localStorage.getItem("token"); // or wherever you store it

const response = await fetch(
  "https://citizen-engagement-system-backend.onrender.com/api/response/create",
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
    body: JSON.stringify({ complaint_id: complaintId, message }),
  }
);


    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.message || "Failed to send response");
    }

    setStatusMessage("Response sent successfully.");
    setMessage("");
  } catch (err) {
    setError(err.message);
  }
};


  return (
    <div className="w-screen bg-white justify-center items-center dark:bg-black h-screen flex">
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-md shadow-md">
      <h2 className="text-2xl font-semibold mb-6">Respond to Complaint</h2>

      {statusMessage && <p className="text-green-600 mb-4">{statusMessage}</p>}
      {error && <p className="text-red-600 mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
            Response Message
          </label>
          <textarea
            id="message"
            rows="4"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFB640] text-sm text-gray-700 resize-none"
            placeholder="Write your response here..."
            required
          />
        </div>

        <button
          type="submit"
          className="bg-[#FFB640] text-white px-4 py-2 rounded-md hover:bg-[#e6a72a]"
        >
          Send Response
        </button>
      </form>
    </div>
    </div>
  );
}
