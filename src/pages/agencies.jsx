import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function AgenciesPage() {
  const navigate = useNavigate();
  
  const [agencies, setAgencies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

useEffect(() => {
  const fetchAgencies = async () => {
    try {
      const token = localStorage.getItem("token"); // make sure this matches your auth storage

      const response = await axios.get(
        "https://citizen-engagement-system-backend.onrender.com/api/agency/getall",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Fetched agencies:", response.data);
      setAgencies(response.data.agencies || []);
    } catch (err) {
      console.error("Error fetching agencies:", err);
      setError("Failed to load agencies.");
    } finally {
      setLoading(false);
    }
  };

  fetchAgencies();
}, []);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white">
        Explore Government Agencies
      </h1>
       <button
        className="mb-4 px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
        onClick={() => navigate("/createAdmin")}
      >
        Create New Agency
      </button>
      {loading && (
        <p className="text-center text-gray-700 dark:text-gray-300">Loading...</p>
      )}
      {error && (
        <p className="text-center text-red-600 dark:text-red-400">{error}</p>
      )}

      {!loading && !error && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {agencies.map((agency) => (
            <div
              key={agency._id}
              className="bg-white dark:bg-gray-900 shadow-md hover:shadow-lg transition-shadow rounded-2xl p-5 border border-gray-200 dark:border-gray-700"
            >
              <h2 className="text-xl font-semibold text-black dark:text-white mb-2">
                {agency.name}
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-2">
                {agency.description}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                📍 <strong>Location:</strong> {agency.location}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                ✉️ <strong>Email:</strong>{" "}
                <a
                  href={`mailto:${agency.contact_email}`}
                  className="text-[#FFB640] font-medium hover:underline"
                >
                  {agency.contact_email}
                </a>
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
