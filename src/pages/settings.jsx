import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


import { useThemee } from "../components/darkTheme.jsx";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon, faSun, faPen } from '@fortawesome/free-solid-svg-icons';

export default function SettingsPage() {
    const navigate = useNavigate();
    const fileInputRef = useRef(null);

    const [selectedFile, setSelectedFile] = useState(null);
    const { darkMode, toggleDarkMode } = useThemee();
   

    const [userData, setUserData] = useState({
        names: "",
        bio: "",
        address: "",
        email: "",
        phoneNumber: "",
        dateOfBirth: "",
        image: ""
    });

    // Fetch user data on mount
const fetchUser = async () => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
        console.error("User ID not found in localStorage.");
        return;
    }

    try {
        const res = await axios.get(`https://citizen-engagement-system-backend.onrender.com/api/user/getOne/${userId}`);
        console.log("Fetched user data:", res.data.user);

        const data = res.data.user;
        setUserData({
            names: data.names || "",
            bio: data.bio || "",
            address: data.address || "",
            email: data.email || "",
            phoneNumber: data.phoneNumber || "",
            dateOfBirth: data.dateOfBirth ? new Date(data.dateOfBirth).toISOString().split("T")[0] : "",
            image: data.image || ""
        });
    } catch (error) {
        console.error("Error fetching user data:", error);
    }
};

useEffect(() => {
    fetchUser();
}, []); // Only run once on mount
const token = localStorage.getItem("token"); 

// Move these functions OUTSIDE useEffect
const handleImageUpload = async () => {
    const userId = localStorage.getItem("userId");
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append("image", selectedFile);

    try {
        const res = await axios.put(`https://citizen-engagement-system-backend.onrender.com/api/user/profile/${userId}`, formData, {
            headers: { 
              "Content-Type": "multipart/form-data",
               Authorization: `Bearer ${token}`,
             },
        });
        console.log("Image uploaded:", res.data);
        alert("Image updated successfully!");
          if (res.data.image) {
      setUserData((prev) => ({
        ...prev,
        image: res.data.image,
      }));
    } else {
      // fallback: re-fetch user data
      fetchUser();
    }
            setSelectedFile(null);
        window.location.reload(); // Optionally reload to see updated image
    } catch (error) {
        console.error("Error uploading image:", error);
        alert("Failed to upload image.");
    }
};

const handleSaveChanges = async () => {
    const userId = localStorage.getItem("userId");
    try {
        const res = await axios.put(`https://citizen-engagement-system-backend.onrender.com/api/user/profile/${userId}`, userData,
          {
             headers: { 
             
               Authorization: `Bearer ${token}`,
             },
          }
        );
        console.log("Updated user data:", res.data);
        alert("Changes saved successfully!");
    } catch (error) {
        console.error("Error updating user data:", error);
        alert("Failed to save changes.");
    }
};


    // Save profile changes


    // Save profile image
  

    return (
        <div className="flex flex-col justify-center p-5 gap-6 dark:text-white items-center dark:bg-black">
            <h1 className="font-bold text-5xl">Settings</h1>
            <h2 className="text-3xl font-bold mt-8 flex justify-center">Profile</h2>

            <div className="w-full flex justify-center mb-6 mt-4 gap-10">
                <div className="relative">
                   <img src={selectedFile
                              ? URL.createObjectURL(selectedFile)
                              : userData.image || "https://www.svgrepo.com/show/7025/user.svg"
                         }
                     alt="Profile"
                           className="w-24 h-24 rounded-full object-cover dark:bg-white"
                          />
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                            console.log("Selected file:", e.target.files[0]);
                            setSelectedFile(e.target.files[0]);
                        }}
                        ref={fileInputRef}
                        className="hidden"
                    />
                    <button
                        type="button"
                        onClick={() => fileInputRef.current.click()}
                        className="absolute bottom-0 right-0 bg-white rounded-full p-1 shadow hover:bg-gray-100 dark:text-gray-800"
                    >
                        <FontAwesomeIcon icon={faPen} />
                    </button>
                </div>
                {selectedFile && (
                    <div className="w-[20%] mt-14">
                        <button
                            type="button"
                            onClick={handleImageUpload}
                            className="mt-2 bg-green-500 text-white px-2 text-xs rounded"
                        >
                            Save Image
                        </button>
                    </div>
                )}
            </div>

            <div className="bg-gray-50 w-full rounded-lg shadow max-w-4xl p-6 dark:bg-gray-800">
                <form className="flex flex-col space-y-4 w-full">
                    {[
                        { label: "Name", type: "text", key: "names" },
                        { label: "Bio", type: "text", key: "bio" },
                        { label: "Address", type: "text", key: "address" },
                        { label: "Email", type: "email", key: "email" },
                        { label: "Phone Number", type: "text", key: "phoneNumber" },
                        { label: "Date of Birth", type: "date", key: "dateOfBirth" },
                    ].map((field, id) => (
                        <div key={id} className="flex flex-col md:flex-row md:items-center gap-2">
                            <label className="md:w-[40%] w-full">{field.label}</label>
                            <input
                                type={field.type}
                                value={userData[field.key]}
                                onChange={(e) => {
                                    console.log(`Changing ${field.key}:`, e.target.value);
                                    setUserData({ ...userData, [field.key]: e.target.value });
                                }}
                                className="border rounded-md p-2 md:w-[60%] w-full dark:text-black"
                            />
                        </div>
                    ))}
                </form>
                <div className="flex justify-end mt-4 items-center">
                    <button
                        type="button"
                        onClick={handleSaveChanges}
                        className="bg-green-500 text-white rounded-lg px-4 py-2"
                    >
                        Save Changes
                    </button>
                </div>
            </div>

            <div className="flex md:flex-row gap-12 w-full mt-8 justify-center items-center">
                <label className="w-[70%] sm:text-2xl text-lg font-semibold">Update Password</label>
                <button
                    type="button"
                    onClick={() => navigate("/update-pass")}
                    className="bg-[#FFB640] text-white rounded-lg px-2 py-2 w-[20%]"
                >
                    Edit
                </button>
            </div>

            <div className="flex md:flex-row gap-12 w-full mt-8 justify-center items-center">
                <label className="w-[70%] sm:text-2xl text-lg font-semibold">Dark Theme</label>
                <button
                    type="button"
                    onClick={toggleDarkMode}
                    className={`flex justify-center items-center sm:gap-2 gap-1 rounded-lg px-2 py-2 w-[20%] border transition duration-300 ${
                        darkMode
                            ? "bg-[#FFB640] text-white border-[#FFB640]"
                            : "bg-white text-black border-black"
                    }`}
                >
                    <FontAwesomeIcon icon={darkMode ? faSun : faMoon} />
                    <span>{darkMode ? "On" : "Off"}</span>
                </button>
            </div>
        </div>
    );
}
