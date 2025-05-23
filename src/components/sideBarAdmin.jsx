import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Icon from '../assets/picc.jpg';
import axios from "axios";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faCalendarCheck,
  faUserInjured,
  faBell,
  faCog,
  faBars,
  faTimes,
  faRightFromBracket
} from "@fortawesome/free-solid-svg-icons";

export default function SideBarAdmin() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleSidebar = () => setIsOpen(!isOpen);
  const navigate = useNavigate();
 const baseLinkClasses = "flex items-center px-4 py-2 rounded-md transition-colors duration-200  dark:text-white text-black hover:bg-[#FFB640] hover:text-black";
 const baseLinkClass = "flex items-center px-4 py-2 rounded-md transition-colors duration-200  dark:bg-black dark:text-white text-black hover:bg-[#FFB640] hover:text-black";
const activeLinkClasses = "bg-gradient-to-r from-[#FFB640] to-[#FFB640] text-white shadow-md";
const linkClasses = ({ isActive }) => 
  isActive ? `${baseLinkClasses} ${activeLinkClasses}` : baseLinkClasses;

const logoutButtonClasses = baseLinkClass + " cursor-pointer w-full text-left";
const handleLogout = async () => {
  try {
   await axios.post(
  "https://citizen-engagement-system-backend.onrender.com/api/user/logout",
  {},
  { withCredentials: true } // ✅ Add this
);
    // Clear localStorage tokens after successful logout
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    // Redirect or update UI after logout
    navigate('/login');
  } catch (error) {
    console.error('Logout failed:', error);
    alert('Failed to logout');
  }
};

  return (
    <>
      {/* Mobile Top Bar Toggle */}
      <div className="md:hidden flex justify-between items-center p-4 bg-gray-100 shadow-sm dark:bg-black">
        <button onClick={toggleSidebar}>
          <FontAwesomeIcon icon={faBars} className="text-2xl" />
        </button>
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden md:flex w-[300px] lg:w-[20%] h-full flex-col bg-gray-100 shadow-sm dark:bg-black dark:text-white">
        <div className="flex items-center gap-5 ml-6 mt-7">
          <img src={Icon} alt="Logo" className="w-14 h-14 object-cover rounded-full" />
          <p><strong>Agent IRIS</strong></p>
        </div>
        <nav className="flex flex-col mt-16 space-y-4 ml-6">
          <NavLink to="/admin/dashboard" className={linkClasses}>
            <FontAwesomeIcon icon={faHome} className="mr-4" /> Home
          </NavLink>
          <NavLink to="/admin/complaints/:agencyId" className={linkClasses}>
            <FontAwesomeIcon icon={faCalendarCheck} className="mr-4" /> Complaints
          </NavLink>
          <NavLink to="/admin/profile/:id" className={linkClasses}>
            <FontAwesomeIcon icon={faUserInjured} className="mr-4" /> Agency Profile
          </NavLink>
          <NavLink to="/admin/notifications" className={linkClasses}>
            <FontAwesomeIcon icon={faBell} className="mr-4" /> Notifications
          </NavLink>
          <NavLink to="/admin/settings" className={linkClasses}>
            <FontAwesomeIcon icon={faCog} className="mr-4" /> Settings
          </NavLink>
          <button onClick={handleLogout} className={logoutButtonClasses}>
  <FontAwesomeIcon icon={faRightFromBracket} className="mr-4" /> Logout
</button>
        </nav>
      </div>

      {/* Mobile Sidebar Drawer */}
      {isOpen && (
        <div className="fixed top-0 left-0 w-64 h-full bg-gray-100 shadow-lg z-50 p-4 flex flex-col md:hidden dark:bg-black dark:text-white">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-3">
              <img src={Icon} alt="Logo" className="w-10 h-10 object-cover rounded-full" />
              <p><strong>Agent IRIS</strong></p>
            </div>
            <button onClick={toggleSidebar}>
              <FontAwesomeIcon icon={faTimes} className="text-2xl dark:text-black" />
            </button>
          </div>
          <nav className="flex flex-col space-y-6">
          <NavLink to="/admin/dashboard" className={linkClasses} onClick={toggleSidebar}>
            <FontAwesomeIcon icon={faHome} className="mr-4" /> Home
          </NavLink>
          <NavLink to="/admin/complaints/:agencyId" className={linkClasses} onClick={toggleSidebar}>
            <FontAwesomeIcon icon={faCalendarCheck} className="mr-4" /> Complaints
          </NavLink>
          <NavLink to="/admin/profile/:id" className={linkClasses} onClick={toggleSidebar}>
            <FontAwesomeIcon icon={faUserInjured} className="mr-4" /> Agency Profile
          </NavLink>
          <NavLink to="/admin/notifications" className={linkClasses} onClick={toggleSidebar}>
            <FontAwesomeIcon icon={faBell} className="mr-4" /> Notifications
          </NavLink>
          <NavLink to="/admin/settings" className={linkClasses} onClick={toggleSidebar}>
            <FontAwesomeIcon icon={faCog} className="mr-4" /> Settings
          </NavLink>
         <button onClick={handleLogout} className={logoutButtonClasses}>
  <FontAwesomeIcon icon={faRightFromBracket} className="mr-4" /> Logout
</button>

          </nav>
        </div>
      )}
    </>
  );
}
