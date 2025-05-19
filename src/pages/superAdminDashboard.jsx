import React, { useState, useEffect } from "react";
import useDocumentTitle from "../customHooks/documentTitle";
import SearchBar from "../components/searchBar";

export default function SuperAdminDashboard() {
  useDocumentTitle("Super Admin Dashboard");

  const [stats, setStats] = useState({
    totalCitizens: 0,
    totalAgencies: 0,
    totalAdmins: 0,
  });

  // Mock recent activities data
  const [recentActivities, setRecentActivities] = useState([]);

  useEffect(() => {
    // Simulate fetching stats and activities
    const fetchDashboardData = () => {
      setTimeout(() => {
        setStats({
          totalCitizens: 1245,
          totalAgencies: 27,
          totalAdmins: 5,
        });

        setRecentActivities([
          { id: 1, description: "New citizen registered: John Doe", time: "2 minutes ago" },
          { id: 2, description: "Agency approved: Health Department", time: "1 hour ago" },
          { id: 3, description: "Admin added: Sarah Smith", time: "Yesterday" },
          { id: 4, description: "Citizen data updated: Alice Johnson", time: "2 days ago" },
          { id: 5, description: "Agency removed: Transport Dept", time: "Last week" },
        ]);
      }, 1000);
    };

    fetchDashboardData();
  }, []);

  return (
    <div className="min-h-screen bg-white text-black dark:text-white dark:bg-gray-800 p-6">
      <h1 className="text-3xl font-bold mb-8">Super Admin Dashboard</h1>
       <SearchBar/>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-3">
        {/* Total Citizens */}
        <div className="bg-white text-black dark:text-white dark:bg-gray-800 rounded-lg shadow p-6 flex flex-col justify-center items-center">
          <h2 className="text-xl font-semibold mb-2">Total Citizens</h2>
          <p className="text-4xl font-bold">{stats.totalCitizens}</p>
        </div>

        {/* Total Agencies */}
        <div className="bg-white text-black dark:text-white dark:bg-gray-800 rounded-lg shadow p-6 flex flex-col justify-center items-center">
          <h2 className="text-xl font-semibold mb-2">Total Agencies</h2>
          <p className="text-4xl font-bold">{stats.totalAgencies}</p>
        </div>

        {/* Total Admins */}
        <div className="bg-white text-black dark:text-white dark:bg-gray-800 rounded-lg shadow p-6 flex flex-col justify-center items-center">
          <h2 className="text-xl font-semibold mb-2">Total Admins</h2>
          <p className="text-4xl font-bold">{stats.totalAdmins}</p>
        </div>
      </div>

      {/* Dashboard bottom section */}
      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Recent Activities */}
        <section className="bg-white text-black dark:text-white dark:bg-gray-800 rounded-lg shadow p-6 max-h-80 overflow-y-auto">
          <h3 className="text-2xl font-semibold mb-4 border-b border-gray-700 pb-2">
            Recent Activities
          </h3>
          {recentActivities.length === 0 ? (
            <p className="text-gray-400 italic">Loading activities...</p>
          ) : (
            <ul className="space-y-3 text-gray-300">
              {recentActivities.map(({ id, description, time }) => (
                <li key={id} className="border-b border-gray-700 pb-2 last:border-none">
                  <p>{description}</p>
                  <small className="text-gray-500">{time}</small>
                </li>
              ))}
            </ul>
          )}
        </section>

        {/* Chart placeholder */}
        <section className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 flex flex-col justify-center items-center">
          <h3 className="text-2xl font-semibold mb-6">User Growth </h3>
          <div className="w-full h-48 bg-gray-700 rounded flex justify-center items-center text-gray-400 italic">
            Chart coming soon...
          </div>
        </section>
      </div>
    </div>
  );
}
