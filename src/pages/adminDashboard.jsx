import React, { useEffect, useState } from "react";
import useDocumentTitle from "../customHooks/documentTitle";
import { BarChart3, Users, FileText, AlertCircle } from "lucide-react";
import SearchBar from "../components/searchBar";

export default function AdminDashboard() {
  useDocumentTitle("Admin Dashboard");

  // State for metrics
  const [metrics, setMetrics] = useState({
    totalUsers: null,
    totalComplaints: null,
    pendingActions: null,
    notifications: null,
  });

  // State for recent complaints
  const [recentComplaints, setRecentComplaints] = useState([]);

  // State for loading and error
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data on mount
  useEffect(() => {
    async function fetchDashboardData() {
      setLoading(true);
      setError(null);

      try {
        // Fake APIs, replace URLs with your real endpoints
        const [
          usersRes,
          complaintsRes,
          pendingRes,
          notificationsRes,
          recentComplaintsRes,
        ] = await Promise.all([
          fetch("https://jsonplaceholder.typicode.com/users"),
          fetch("https://jsonplaceholder.typicode.com/posts"), // pretend posts = complaints
          fetch("https://jsonplaceholder.typicode.com/todos"), // pretend todos = pending actions
          fetch("https://jsonplaceholder.typicode.com/comments"), // pretend comments = notifications
          fetch("https://jsonplaceholder.typicode.com/posts?_limit=3"), // recent complaints (limit 3)
        ]);

        if (
          !usersRes.ok ||
          !complaintsRes.ok ||
          !pendingRes.ok ||
          !notificationsRes.ok ||
          !recentComplaintsRes.ok
        ) {
          throw new Error("Failed to fetch one or more API endpoints");
        }

        const users = await usersRes.json();
        const complaints = await complaintsRes.json();
        const pendingActions = await pendingRes.json();
        const notifications = await notificationsRes.json();
        const recentComplaintsData = await recentComplaintsRes.json();

        // For demo: counting some statuses for pending actions and notifications
        const pendingCount = pendingActions.filter((item) => !item.completed).length;
        const notificationsCount = notifications.length;

        setMetrics({
          totalUsers: users.length,
          totalComplaints: complaints.length,
          pendingActions: pendingCount,
          notifications: notificationsCount,
        });

        // Map recent complaints with title and fake statuses
        const statuses = ["Pending", "Resolved", "Escalated"];
        const mappedComplaints = recentComplaintsData.map((item, idx) => ({
          id: item.id,
          title: item.title,
          status: statuses[idx % statuses.length],
        }));

        setRecentComplaints(mappedComplaints);
      } catch (err) {
        setError(err.message || "Error fetching dashboard data");
      } finally {
        setLoading(false);
      }
    }

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="p-6 bg-gray-50 min-h-screen dark:bg-gray-900 flex justify-center items-center">
        <p className="text-gray-800 dark:text-white">Loading dashboard...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 bg-gray-50 min-h-screen dark:bg-gray-900 flex justify-center items-center">
        <p className="text-red-500">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen dark:bg-gray-900">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">Admin Dashboard</h1>
      <SearchBar />

      {/* Top Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 mt-4">
        <DashboardCard
          title="Total Users"
          value={metrics.totalUsers?.toLocaleString() || "0"}
          icon={<Users className="h-6 w-6 text-blue-600" />}
        />
        <DashboardCard
          title="Total Complaints"
          value={metrics.totalComplaints?.toLocaleString() || "0"}
          icon={<FileText className="h-6 w-6 text-green-600" />}
        />
        <DashboardCard
          title="Pending Actions"
          value={metrics.pendingActions?.toLocaleString() || "0"}
          icon={<AlertCircle className="h-6 w-6 text-yellow-600" />}
        />
        <DashboardCard
          title="Notifications"
          value={metrics.notifications?.toLocaleString() || "0"}
          icon={<BarChart3 className="h-6 w-6 text-purple-600" />}
        />
      </div>

      {/* Section - Recent Complaints */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm">
        <h2 className="text-xl font-semibold text-gray-700 dark:text-white mb-4">
          Recent Complaints
        </h2>
        <ul className="space-y-4">
          {recentComplaints.length === 0 ? (
            <li className="text-gray-500 dark:text-gray-400">No recent complaints found.</li>
          ) : (
            recentComplaints.map((complaint) => (
              <li
                key={complaint.id}
                className="flex items-center justify-between p-4 bg-gray-100 dark:bg-gray-700 rounded-xl"
              >
                <span className="text-gray-800 dark:text-white">{complaint.title}</span>
                <span
                  className={`text-sm font-medium ${
                    complaint.status === "Pending"
                      ? "text-yellow-600"
                      : complaint.status === "Resolved"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {complaint.status}
                </span>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
}

function DashboardCard({ title, value, icon }) {
  return (
    <div className="bg-white dark:bg-gray-800 p-5 rounded-2xl shadow-md flex items-center space-x-4">
      <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded-full">{icon}</div>
      <div>
        <h3 className="text-gray-600 dark:text-gray-300 text-sm">{title}</h3>
        <p className="text-xl font-bold text-gray-800 dark:text-white">{value}</p>
      </div>
    </div>
  );
}
