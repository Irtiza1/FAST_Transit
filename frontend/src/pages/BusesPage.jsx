import React, { useState } from "react";
import { FaPlus, FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
const BusesPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const buses = [
    { id: 1, number: "A123", route: "Downtown - Uptown", driver: "John Doe" },
    {
      id: 2,
      number: "B456",
      route: "Westside - Eastside",
      driver: "Jane Smith",
    },
    { id: 3, number: "C789", route: "North - South", driver: "Mike Johnson" },
  ];

  return (
    <div className="bg-gray-950 p-8">
      <div className="p-6 bg-gray-900 min-h-screen text-gray-100 border border-gray-500 rounded">
        {/* Header with Title, Search Bar, and Add Button */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-6 space-y-4 lg:space-y-0">
          <h2 className="text-4xl font-bold mb-4">
            Registered <span className="text-yellow-500">Buses</span>
          </h2>
          
          <div className="flex lg:items-center justify-between space-x-4">
            {/* Search Bar */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search buses"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="text-gray-300 bg-gray-800 border border-gray-600 rounded p-2 pl-10 w-64 focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition duration-200"
              />
              <FaSearch className="absolute left-3 top-3 text-gray-500" />
            </div>

            {/* Add Bus Button */}
            <button className="flex items-center bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold px-4 py-2 rounded">
              <FaPlus className="mr-2" /> Add Bus
            </button>
          </div>
        </div>


        {/* Bus Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {buses
            .filter(
              (bus) =>
                bus.number.toLowerCase().includes(searchTerm.toLowerCase()) ||
                bus.route.toLowerCase().includes(searchTerm.toLowerCase()) ||
                bus.driver.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map((bus) => (
              <Link
                key={bus.id}
                className="bg-gray-800 border border-gray-700 rounded-lg p-4 cursor-pointer hover:bg-gray-900 hover:shadow-lg transition-shadow duration-200"
                onClick={() => console.log("Clicked on bus", bus.number)}
              >
                <h2 className="text-lg font-semibold text-yellow-500 mb-2">
                  Bus #{bus.number}
                </h2>
                <p className="text-gray-400 mb-1">
                  <span className="font-medium text-gray-200">Route:</span>{" "}
                  {bus.route}
                </p>
                <p className="text-gray-400">
                  <span className="font-medium text-gray-200">Driver:</span>{" "}
                  {bus.driver}
                </p>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
};

export default BusesPage;
