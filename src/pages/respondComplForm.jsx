import { useState } from "react";
import { useParams,useNavigate  } from "react-router-dom"; // <-- import useParams

export default function ResponseForm() {
    const navigate = useNavigate(); 
  const { id: complaintId } = useParams(); // <-- get complaintId from the URL

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
      const token = localStorage.getItem("token");

      const response = await fetch(
        "https://citizen-engagement-system-backend.onrender.com/api/response/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ complaint_id: complaintId, message }),
        }
      );

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Failed to send response");
      }

      console.log("Complaint ID passed to form:", complaintId);
      setStatusMessage("Response sent successfully.");
      setMessage("");
       // ⏳ Optional: slight delay before navigating back
      setTimeout(() => {
        navigate(-1); // 👈 go back to the previous page
      }, 1000);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
   <div className="w-screen flex items-center">

      <div className="w-[50%]  h-[400px] flex-col  bg-black items-center text-white mx-auto mt-10 p-6  rounded-md shadow-md">
        <h2 className="text-2xl font-semibold mb-11 font-serif ">Send Complaint Response</h2>

        {statusMessage && <p className="text-green-600 mb-4">{statusMessage}</p>}
        {error && <p className="text-red-600 mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-8 ">
          <div>
            <label htmlFor="message" className="block text-sm font-medium  mb-1">
              Message
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
            Sending
          </button>
        </form>
      </div>
    </div>
  );
}
