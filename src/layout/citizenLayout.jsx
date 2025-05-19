import NavBar from "../components/navBar";
import SideBarCitizen from "../components/sideBarCitizen";
import { Outlet } from "react-router-dom";

export default function LayoutCitizen() {
  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <NavBar />
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <SideBarCitizen />

        {/* Main content */}
        <main className="flex-1 overflow-y-auto bg-white p-4 dark:bg-gray-800">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
