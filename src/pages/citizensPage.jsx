import { useEffect, useState } from "react";
import useDocumentTitle from "../customHooks/documentTitle";
import axios from "axios";

export default function CitizensPage() {
  useDocumentTitle("All Citizens");

  const [citizens, setCitizens] = useState([]);

  useEffect(() => {
    const fetchCitizens = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("No token found in localStorage");
          return;
        }

        const response = await axios.get(
          "https://citizen-engagement-system-backend.onrender.com/api/user/getallCitiens",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("Fetched citizens:", response.data);
         setCitizens(response.data.citizens);
      } catch (error) {
        console.error("Error fetching citizens:", error);
      }
    };

    fetchCitizens();
  }, []);


  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 dark:text-white">All Citizens</h1>

      <table className="w-full border-collapse border border-gray-300 dark:text-white">
        <thead>
          <tr className="bg-gray-100 dark:text-black">
            <th className="border border-gray-300 p-2 text-left">Name</th>
            <th className="border border-gray-300 p-2 text-left">Email</th>
            <th className="border border-gray-300 p-2 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {citizens.map((citizen, index) => (
            <tr key={index} className="hover:bg-gray-50">
              <td className="border border-gray-300 p-2">{citizen.names}</td>
              <td className="border border-gray-300 p-2">{citizen.email}</td>
              <td className="border border-gray-300 p-2 text-center space-x-2">
                <button className="px-3 py-1 bg-black text-white rounded hover:bg-gray-800">
                  View
                </button>
                <button className="px-3 py-1 bg-black text-white rounded hover:bg-gray-800">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
