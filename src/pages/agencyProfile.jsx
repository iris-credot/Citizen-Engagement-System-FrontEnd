import { useState} from "react";
import useDocumentTitle from "../customHooks/documentTitle";

export default function AgencyProfile() {
  useDocumentTitle("Agency Profile");

  // Dummy default values (replace with API call later)
  const [formData, setFormData] = useState({
    name: "Ministry of Health",
    description: "Responsible for health sector policies.",
    location: "Kigali, Rwanda",
    contact_email: "info@health.gov.rw",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Later: replace with PUT / PATCH request to your API
    console.log("Submitting updated agency:", formData);
    setMessage("Agency profile updated successfully.");
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white dark:bg-black  rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-6 dark:text-white">Agency Profile</h2>

      {message && <p className="text-green-600 mb-4">{message}</p>}

      <form onSubmit={handleSubmit} className="space-y-4 ">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-white">Agency Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#FFB640]  mt-2"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-white">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="3"
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#FFB640]  mt-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-white">Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#FFB640]  mt-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-white ">Contact Email</label>
          <input
            type="email"
            name="contact_email"
            value={formData.contact_email}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#FFB640]  mt-2"
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
    </div>
  );
}
