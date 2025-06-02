import { useEffect, useState } from "react";
import useDocumentTitle from "../customHooks/documentTitle";

export default function AgencyProfile() {
  useDocumentTitle("Agency Profile");

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    location: "",
    contact_email: "",
  });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const parsedUser = storedUser ? JSON.parse(storedUser) : null;
    const id = parsedUser?.agency_id;
    const token = localStorage.getItem("token");

    if (!id || !token) {
      setError("Missing agency ID or token.");
      setLoading(false);
      return;
    }

    fetch(
      `https://citizen-engagement-system-backend.onrender.com/api/agency/getOne/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.agency?._id) {
          const updatedUser = { ...parsedUser, agency_id: data.agency._id };
          localStorage.setItem("user", JSON.stringify(updatedUser));

          setFormData({
            name: data.agency.name || "",
            description: data.agency.description || "",
            location: data.agency.location || "",
            contact_email: data.agency.contact_email || "",
          });
        } else {
          setError("Agency not found.");
        }
      })
      .catch((err) => {
        console.error("🚫 Failed to fetch agency info:", err);
        setError("Failed to load agency data.");
      })
      .finally(() => setLoading(false));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const storedUser = localStorage.getItem("user");
    const parsedUser = storedUser ? JSON.parse(storedUser) : null;
    const id = parsedUser?.agency_id;
    if (!id) {
      setMessage("No agency associated with this user.");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `https://citizen-engagement-system-backend.onrender.com/api/agency/update/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update agency.");
      }

      setMessage("✅ Agency profile updated successfully.");
    } catch (error) {
      console.error("Error updating agency:", error);
      setMessage(`❌ Error updating agency: ${error.message}`);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white dark:bg-black rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-6 dark:text-white">Agency Profile</h2>

      {loading && <p className="text-blue-500 mb-4">Loading agency data...</p>}
      {error && <p className="text-red-600 mb-4">{error}</p>}
      {message && <p className="text-green-600 mb-4">{message}</p>}

      {!loading && !error && (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-white">
              Agency Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#FFB640] mt-2"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-white">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="3"
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#FFB640] mt-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-white">
              Location
            </label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#FFB640] mt-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-white">
              Contact Email
            </label>
            <input
              type="email"
              name="contact_email"
              value={formData.contact_email}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#FFB640] mt-2"
              required
            />
          </div>

          <button
            type="submit"
            className="bg-[#FFB640] text-white px-4 py-2 rounded-md hover:bg-[#e6a72a]"
          >
            Update Profile
          </button>
        </form>
      )}
    </div>
  );
}
