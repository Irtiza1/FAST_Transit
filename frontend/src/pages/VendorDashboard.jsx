import React, { useState, useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import { FaBars } from "react-icons/fa";
function VendorDashboard() {
  const [sideBarOpen, setSideBarOpen] = useState(false);

  // Check screen size on initial load and adjust sidebar state
  useEffect(() => {
    const isMediumOrLarger = window.innerWidth >= 768;
    setSideBarOpen(isMediumOrLarger);
  }, []);

  function toggleSideBar() {
    setSideBarOpen(!sideBarOpen);
  }

  return (
    <>
      <div className="bg-gray-950 font-zendot">
      <div className="fixed bg-gray-950 w-full top-0 left-0 h-12 text-gray-400 border-b border-gray-600 z-10 flex justify-between items-center px-4">
        <div className="flex justify-center items-center">
        <button
          className="mr-4 p-2 rounded hover:bg-gray-800 transition-colors duration-300"
          onClick={toggleSideBar}
        >
          <FaBars className="text-xl text-gray-400 hover:text-yellow-600 transition duration-300" />
        </button>
        <p className="text-xl font-bold text-gray-200">Dashboard</p>
        </div>
        <div className="sm:text-sm">
          <button className="font-bold text-gray-400 hover:text-yellow-600 hover:transition duration-300 ">Sign Out</button>
        </div>
      </div>

      <div
        className={`bg-gray-950 h-screen md:w-1/5 sm:w-2/5 fixed top-12 left-0 ${
          sideBarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-all duration-300 ease-in-out z-10`}
      >
        <div className="h-full max-h-screen overflow-y-auto flex flex-col px-2 py-4">
          <div className="p-3">
            <p className="text-yellow-600 md:text-6xl text-4xl font-electrolize">FAST</p>
            <p className="text-gray-100 md:text-4xl text-xl  font-electrolize">Transit</p>
          </div>
          <ul className="text-gray-300 px-2 pb-10 mb-6 transition-all ease-in-out">
            <li>
              <Link
                to="buses"
                className="block w-full px-2 py-1 font-bold rounded md:text-base text-xs hover:bg-yellow-500 hover:bg-opacity-50 hover:text-sm hover:transition-all duration-500 ease-in-out"
              >
                Buses
              </Link>
            </li>
            <li>
              <Link
                to="routes"
                className="block w-full px-2 py-1 font-bold rounded md:text-base text-xs hover:bg-yellow-500 hover:bg-opacity-50 hover:text-sm hover:transition-all duration-500 ease-in-out"
              >
                Routes
              </Link>
            </li>
            <li>
              <Link
                to="drivers"
                className="block w-full px-2 py-1 font-bold rounded md:text-base text-xs hover:bg-yellow-500 hover:bg-opacity-50 hover:text-sm hover:transition-all duration-500 ease-in-out"
              >
                Drivers
              </Link>
            </li>
            <li>
              <Link className="block w-full px-2 py-1 font-bold rounded md:text-base text-xs hover:bg-yellow-500 hover:bg-opacity-50 hover:text-sm hover:transition-all duration-500 ease-in-out">
                Profile
              </Link>
            </li>
            <li>
              <Link className="block w-full px-2 py-1 font-bold rounded md:text-base text-xs hover:bg-yellow-500 hover:bg-opacity-50 hover:text-sm hover:transition-all duration-500 ease-in-out">
                Complains
              </Link>
            </li>
            <li>
              <Link className="block w-full px-2 py-1 font-bold rounded md:text-base text-xs hover:bg-yellow-500 hover:bg-opacity-50 hover:text-sm hover:transition-all duration-500 ease-in-out">
                Maintenance
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <main
        className={`${
          sideBarOpen ? "md:ml-[20%]" : "ml-0"
        } mt-12 transition-all duration-300 ease-in-out z-10`}
      >
        <Outlet />
      </main>
      </div>
    </>
  );
}

export default VendorDashboard;
