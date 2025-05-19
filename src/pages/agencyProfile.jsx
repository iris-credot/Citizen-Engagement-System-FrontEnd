import { useEffect,useState} from "react";
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

  const [agencyId, setAgencyId] = useState(null);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (user?.role === "agency") {
      // Agency already available
      if (user?.agency) {
        setAgencyId(user.agency?._id || user.agency);
      } else {
        // Fetch agency by user ID
        fetch(`https://citizen-engagement-system-backend.onrender.com/api/agency/by-user/${user._id}`)
          .then(res => res.json())
          .then(data => {
            if (data.agency?._id) {
              const updatedUser = { ...user, agency: data.agency._id };
              localStorage.setItem("user", JSON.stringify(updatedUser));
              setAgencyId(data.agency._id);
            }
          })
          .catch(err => {
            console.error("Failed to fetch agency info:", err);
          });
      }
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!agencyId) {
      setMessage("No agency associated with this user.");
      console.error("No agency ID found in user object.");
      return;
    }

    try {
      const response = await fetch(
        `https://citizen-engagement-system-backend.onrender.com/api/agency/update/${agencyId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update agency");
      }

      setMessage("Agency profile updated successfully.");
    } catch (error) {
      console.error("Error updating agency:", error);
      setMessage(`Error updating agency: ${error.message}`);
    }
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
