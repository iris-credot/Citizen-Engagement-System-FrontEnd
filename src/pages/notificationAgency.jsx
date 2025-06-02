import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function NotificationAgency() {
  const [notifications, setNotifications] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [hasNoNotifications, setHasNoNotifications] = useState(false);

  const ITEMS_PER_PAGE = 8;


useEffect(() => {
  const fetchNotifications = async () => {
    const storedUser = localStorage.getItem("user");
    console.log(storedUser);
    const parsedUser = storedUser ? JSON.parse(storedUser) : null;
    const id = parsedUser?.agency_id;
    console.log(id);

    if (!id) {
      console.warn("❌ No agency_id found. Skipping API call.");
      setHasNoNotifications(true);
      setLoading(false);
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      console.error("❌ Auth token not found in localStorage");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.get(
        `https://citizen-engagement-system-backend.onrender.com/api/notify/getByAgency/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const fetchedNotifications = (res.data.notifications || []).sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );

      console.log("✅ Notifications fetched:", fetchedNotifications);

      setNotifications(fetchedNotifications);
      setHasNoNotifications(fetchedNotifications.length === 0);
    } catch (err) {
      console.error("❌ Error fetching notifications:", err);

      if (err.response?.status === 404) {
        setHasNoNotifications(true);
        setNotifications([]);
      } else {
        setError("Failed to load notifications. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  fetchNotifications();
}, []);



  const indexOfLast = currentPage * ITEMS_PER_PAGE;
  const indexOfFirst = indexOfLast - ITEMS_PER_PAGE;
  const currentItems = notifications.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(notifications.length / ITEMS_PER_PAGE);

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(prev => prev + 1);
  };

  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage(prev => prev - 1);
  };
const handleDelete = async (id) => {
  const confirmDelete = window.confirm("Are you sure you want to delete this notification?");
  if (!confirmDelete) return;

  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("Authentication token not found");

    const response = await fetch(
      `https://citizen-engagement-system-backend.onrender.com/api/notify/delete/${id}`, // FIXED URL
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const contentType = response.headers.get("content-type");

    if (!response.ok) {
      let errorMsg = "Failed to delete notification.";
      if (contentType && contentType.includes("application/json")) {
        const data = await response.json();
        errorMsg = data.message || errorMsg;
      }
      throw new Error(errorMsg);
    }

    const data = await response.json();
    console.log(data);

    // Remove the deleted notification from UI
    setNotifications((prev) => prev.filter((n) => n._id !== id));
    toast.success(data.message || "Notification deleted successfully.");
  } catch (err) {
    toast.error(err.message || "An error occurred during deletion.");
  }
};


  return (
    <div className="flex flex-col dark:text-white p-6">
      <h1 className="font-bold text-4xl mb-10">Notifications</h1>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {hasNoNotifications && !loading && <p>No notifications to show.</p>}

      {!loading && !hasNoNotifications && (
        <>
          <div className="space-y-4">
            {currentItems.map(notification => (
              <div
                key={notification._id}
                className="flex gap-2 border border-gray-300 dark:border-gray-600 rounded-lg p-4 shadow hover:shadow-md transition"
              >
                <div className="w-[90%]">
                  <h2 className="font-semibold">{notification.message}</h2>
<p className="text-sm text-gray-500 dark:text-white">
  {new Date(notification.createdAt).toLocaleString()}
</p>
                  
                </div>
              

                  <span className="text-red-700 text-2xl ">
                    <i className="fas fa-trash"  onClick={() => handleDelete(notification._id)}></i>
                  </span>
             
              </div>
            ))}
          </div>

          <div className="flex justify-between mt-6">
            <button
              onClick={handlePrevious}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded disabled:opacity-50"
            >
              Previous
            </button>
            <button
              onClick={handleNext}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}
