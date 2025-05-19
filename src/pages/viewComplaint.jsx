import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import axios from "axios";
import Loading from "./loadingPage";

export default function ViewComplaint() {
 

  const { id } = useParams();
  const navigate = useNavigate();
  const [complaint, setComplaint] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
 

  useEffect(() => {
    const fetchComplaint = async () => {
      try {
        const token = localStorage.getItem("token"); // or from context, if applicable
        if (!token) {
          throw new Error("Authentication token not found");
        }
    
        const response = await axios.get(
          `https://citizen-engagement-system-backend.onrender.com/api/complaint/getOne/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
    
        setComplaint(response.data.complaint);
      } catch (err) {
        console.error("Error fetching complaint:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    

    fetchComplaint();
  }, [id]);




  return (
      <div className=" dark:bg-black h-screen w-screen flex flex-col justify-center items-center">
    
      
         <h2 className="text-3xl font-bold mt-5 text-black flex justify-center items-center dark:text-white">Complaint Details</h2>
         <button
          onClick={() => navigate(-1)}
          className=" text-sm text-blue-600 dark:text-blue-400 hover:underline  mt-7 lg:ml-96 md:ml-72 ml-44"
        >
          ← Back
        </button>
         {loading && <div className="w-screen"><Loading/></div> }
         {error && <p className="min-h-screen w-screen flex justify-center items-center bg-white dark:bg-black text-red-600 dark:text-white">{error}</p>}

{!loading && !error && (
   
      <div className="max-w-3xl mx-auto bg-white dark:bg-[#1e1e1e] rounded-xl shadow-md p-6 mt-6 text-white border border-gray-200 dark:border-gray-700">
        
       
        <h2 className="text-2xl font-semibold mb-4">{complaint.title}</h2>

        <div className="mb-4 text-sm text-gray-500 dark:text-gray-400">
          <p><strong>Category:</strong> {complaint.category}</p>
          <p><strong>Agency:</strong> {complaint.agency?.name || "N/A"}</p>
          <p><strong>Status:</strong> 
            <span className="ml-2 px-2 py-1 bg-[#FFB640] text-white rounded-full text-xs">
              {complaint.status}
            </span>
          </p>
          <p><strong>Created:</strong> {new Date(complaint.createdAt).toLocaleString()}</p>
          <p><strong>Updated:</strong> {new Date(complaint.updatedAt).toLocaleString()}</p>
        </div>

        <div className="mb-4">
          <h3 className="font-semibold">Description</h3>
          <p className="mt-1">{complaint.description}</p>
        </div>

        {complaint.attachments?.length > 0 && (
          <div>
            <h3 className="font-semibold mb-1">Attachments</h3>
            <ul className="list-disc list-inside text-sm text-blue-500 dark:text-blue-400">
              {complaint.attachments.map((file, index) => (
                <li key={index}>{file}</li>
              ))}
            </ul>
          </div>
        )}
         <button className="px-3 py-1 bg-black text-white rounded hover:bg-gray-800"onClick={() => navigate('/respond-form')}>
                    Rensponse
                  </button>
      </div>
    )}
    </div>
  );
}
