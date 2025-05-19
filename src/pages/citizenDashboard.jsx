
import useDocumentTitle from "../customHooks/documentTitle";
import { BarChart3, Users, FileText, AlertCircle } from "lucide-react";
import SearchBar from "../components/searchBar";
export default function CitizenDashboard() {
  useDocumentTitle("Citizen-Dashboard");

  return (
    <div className="p-6 bg-gray-50 min-h-screen dark:bg-gray-900">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">Citizen Dashboard</h1>
 <SearchBar/>
      {/* Top Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 mt-3">
        <DashboardCard
          title="Total Complaints"
          value="1,250"
          icon={<Users className="h-6 w-6 text-blue-600" />}
        />
        <DashboardCard
          title="Total Agencies"
          value="342"
          icon={<FileText className="h-6 w-6 text-green-600" />}
        />
        <DashboardCard
          title="Pending Actions"
          value="18"
          icon={<AlertCircle className="h-6 w-6 text-yellow-600" />}
        />
        <DashboardCard
          title="Notifications"
          value="76"
          icon={<BarChart3 className="h-6 w-6 text-purple-600" />}
        />
      </div>

      {/* Section - Recent Complaints (Example) */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm">
        <h2 className="text-xl font-semibold text-gray-700 dark:text-white mb-4">
          Recent Complaints
        </h2>
        <ul className="space-y-4">
          <li className="flex items-center justify-between p-4 bg-gray-100 dark:bg-gray-700 rounded-xl">
            <span className="text-gray-800 dark:text-white">Street light outage in Nyamirambo</span>
            <span className="text-sm text-yellow-600 font-medium">Pending</span>
          </li>
          <li className="flex items-center justify-between p-4 bg-gray-100 dark:bg-gray-700 rounded-xl">
            <span className="text-gray-800 dark:text-white">Water leak in Kicukiro</span>
            <span className="text-sm text-green-600 font-medium">Resolved</span>
          </li>
          <li className="flex items-center justify-between p-4 bg-gray-100 dark:bg-gray-700 rounded-xl">
            <span className="text-gray-800 dark:text-white">Pothole on Kimironko road</span>
            <span className="text-sm text-red-600 font-medium">Escalated</span>
          </li>
        </ul>
      </div>
    </div>
  );
}

function DashboardCard({ title, value, icon }) {
  return (
    <div className="bg-white dark:bg-gray-800 p-5 rounded-2xl shadow-md flex items-center space-x-4">
      <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded-full">
        {icon}
      </div>
      <div>
        <h3 className="text-gray-600 dark:text-gray-300 text-sm">{title}</h3>
        <p className="text-xl font-bold text-gray-800 dark:text-white">{value}</p>
      </div>
    </div>
  );
}
