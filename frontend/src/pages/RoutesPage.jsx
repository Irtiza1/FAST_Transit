import React, { useEffect, useState } from "react";
import { FaPlus, FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import axios from 'axios';

const RoutesPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [routes, setRoutes] = useState([
    { id: 1, name: "Route 1", startPoint: "Downtown", endPoint: "Uptown" },
    { id: 2, name: "Route 2", startPoint: "Westside", endPoint: "Eastside" },
    { id: 3, name: "Route 3", startPoint: "North", endPoint: "South" },
  ]);

  useEffect(() => {
    // URL of the page will contain vendor ID
    // Use vendor ID to fetch all registered routes by this vendor from the database
    // axios.get(`api/routes?vendorId=${vendorId}`)
    //   .then(response => setRoutes(response.data))
    //   .catch(error => console.error("Error fetching routes", error));
  }, []);

  return (
    <div className="bg-gray-950 p-8">
      <div className="p-6 bg-gray-900 min-h-screen text-gray-100 border border-gray-600 rounded">
        
        {/* Header with Title, Search Bar, and Add Button */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-6 space-y-4 lg:space-y-0">
          <h2 className="text-4xl font-bold mb-4">
            Registered <span className="text-yellow-500">Routes</span>
          </h2>

          <div className="flex lg:items-center justify-between space-x-2">
            {/* Search Bar */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search routes"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="text-gray-300 bg-gray-800 border border-gray-600 rounded p-2 pl-10 lg:w-64 md:w-64 w-2/3 focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition duration-200"
              />
              <FaSearch className="absolute left-3 top-3 text-gray-500" />
            </div>

            {/* Add Route Button */}
            <Link to='/create-route' className="flex items-center bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold lg:px-4 lg:py-2 md:px-4 md:py-2 p-1 rounded text-sm">
              <FaPlus className="mr-2 text-sm" /> Add New Route
            </Link>
          </div>
        </div>

        {/* Route Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {routes
            .filter(
              (route) =>
                route.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                route.startPoint.toLowerCase().includes(searchTerm.toLowerCase()) ||
                route.endPoint.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map((route) => (
              <Link to={`/route/${route.id}`}
                key={route.id}
                className="bg-gray-800 border border-gray-700 rounded-lg p-4 cursor-pointer hover:bg-gray-900 hover:shadow-lg transition-shadow duration-200"
              >
                <h2 className="text-lg font-semibold text-yellow-500 mb-2">
                  {route.name}
                </h2>
                <p className="text-gray-400 mb-1">
                  <span className="font-medium text-gray-200">Start Point:</span> {route.startPoint}
                </p>
                <p className="text-gray-400">
                  <span className="font-medium text-gray-200">End Point:</span> {route.endPoint}
                </p>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
};

export default RoutesPage;
