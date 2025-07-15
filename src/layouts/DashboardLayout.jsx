import { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router";
import SideBar from "../pages/DashBoard/SideBar";
import { FaBars } from "react-icons/fa";
import DashboardHome from "../pages/DashBoard/DashBoardHome";

export default function DashboardLayout() {
  const [showSidebar, setShowSidebar] = useState(false);
  const location = useLocation();

  
  useEffect(() => {
    setShowSidebar(false);
  }, [location.pathname]);

  
  const isDashboardRoot = location.pathname === "/dashboard";

  return (
    <div className="flex min-h-screen relative">
      
      <button
        className="md:hidden fixed top-4 left-4 z-50 bg-yellow-200 p-2 shadow rounded-md"
        onClick={() => setShowSidebar(!showSidebar)}
      >
        <FaBars size={20} />
      </button>

     
      <div
        className={`fixed top-0 left-0 h-full z-40 bg-white transition-transform duration-300 ease-in-out w-64
          ${showSidebar ? "translate-x-0" : "-translate-x-full"} 
          md:translate-x-0 md:static md:block shadow-md`}
      >
        <SideBar />
      </div>

     
      {showSidebar && (
        <div
          onClick={() => setShowSidebar(false)}
          className="fixed inset-0 bg-black bg-opacity-30 z-30 md:hidden"
        ></div>
      )}

     
      <main className="flex-1 ml-0 md:ml-4 p-4 bg-white min-h-screen">
        {isDashboardRoot ? <DashboardHome /> : <Outlet />}
      </main>
    </div>
  );
}
