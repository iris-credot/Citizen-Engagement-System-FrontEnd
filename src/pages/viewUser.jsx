import useDocumentTitle from "../customHooks/documentTitle";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function ViewUser() {
  useDocumentTitle("User Details");

  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const formatDate = (dateStr) => {
    if (!dateStr) return "N/A";
    const date = new Date(dateStr);
    return isNaN(date) ? "N/A" : date.toLocaleDateString();
  };

  useEffect(() => {
    const fetchData = async () => {
      setError("");
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("You are not authorized. Please log in.");
          return;
        }

        const response = await fetch(
          `https://citizen-engagement-system-backend.onrender.com/api/user/getOne/${id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 403) {
          setError("Access denied. You don't have permission to view this user.");
          return;
        }

        if (!response.ok) {
          throw new Error("Something went wrong while fetching user.");
        }

        const data = await response.json();

        if (!data || !data.user) {
          setError("User details not found.");
          return;
        }

        console.log("Fetched user:", data.user);
        setUser(data.user);
      } catch (err) {
        console.error(err);
        setError(err.message || "An unexpected error occurred.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">Loading...</div>
    );

  if (error)
    return <div className="text-red-500 text-center mt-10">Error: {error}</div>;

  if (!user)
    return <div className="text-center mt-10">User not found.</div>;

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4 dark:bg-black">
      <div className="bg-white shadow-lg rounded-2xl w-full max-w-3xl p-6 space-y-6 dark:bg-black">
        <h2 className="text-3xl font-bold text-start text-gray-800 dark:text-white">
          Citizen Details
        </h2>

        <h3 className="text-2xl font-bold text-start text-gray-800 pt-4 border-t dark:text-white">
          Personal Information
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700 dark:text-white mt-10">
          <p><strong>Names:</strong> {user.names ?? "N/A"}</p>
          <p><strong>Username:</strong> {user.username ?? "N/A"}</p>
          <p><strong>Email:</strong> {user.email ?? "N/A"}</p>
          <p><strong>Phone:</strong> {user.phoneNumber ?? "N/A"}</p>
          <p><strong>Address:</strong> {user.address ?? "N/A"}</p>
          <p><strong>Gender:</strong> {user.gender ?? "N/A"}</p>
          <p><strong>Date of Birth:</strong> {formatDate(user.dateOfBirth)}</p>
          <p><strong>Bio:</strong> {user.bio ?? "N/A"}</p>
        </div>
      </div>
    </div>
  );
}
