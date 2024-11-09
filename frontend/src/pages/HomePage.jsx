import { Link } from "react-router-dom";
import React from "react";
import { FaPlus,FaSearch } from "react-icons/fa";

const Dashboard = () => {
  return (
    <div className="bg-gray-950 p-8">
      <div className="p-6 bg-gray-900 min-h-screen text-gray-100 space-y-6 border border-gray-500  rounded">
        <h2 className="text-4xl font-bold mb-8">
          Vendor <span className="text-yellow-500">Dashboard</span>
        </h2>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left Side (Main Content) */}
          <div className="lg:w-2/3 space-y-6">
            {/* View Buses Card */}
            <div className="bg-gray-900 p-6 rounded border border-gray-500 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-bold">Buses</h3>
                <div className="flex items-center space-x-4">
                  {/* Search Bar */}
                  <div className="relative">
            <input
              type="text"
              placeholder="Search buses"
              // value={searchTerm}
              // onChange={(e) => setSearchTerm(e.target.value)}
              className="text-gray-300 bg-gray-800 border border-gray-600 rounded p-2 pl-10 w-64 focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition duration-200"
            />
            <FaSearch className="absolute left-3 top-3 text-gray-500" />
          </div>
                  {/* Add Bus Button */}
                  <button className="flex items-center px-4 py-2 bg-yellow-500 text-gray-900 font-bold rounded-lg hover:bg-yellow-600 transition">
                    <FaPlus className="mr-2" />
                    Add Bus
                  </button>
                </div>
              </div>
              <ul className="space-y-2">
                {/* Display 2-3 buses */}
                <li className="p-2 bg-gray-700 rounded flex justify-between">
                  <span className="m-1">Bus Number</span>
                  <span className="m-1">capacity:32</span>
                  <span className="m-1">Route Name: Not assigned</span>
                  <span className="m-1">Diver Name: Not assigned</span>
                </li>
                <li className="p-2 bg-gray-700 rounded flex justify-between">
                  <span className="m-1">Bus Number</span>
                  <span className="m-1">capacity:32</span>
                  <span className="m-1">Route Name: Not assigned</span>
                  <span className="m-1">Diver Name: Not assigned</span>
                </li>
                <li className="p-2 bg-gray-700 rounded flex justify-between">
                  <span className="m-1">Bus Number</span>
                  <span className="m-1">capacity:32</span>
                  <span className="m-1">Route Name: Not assigned</span>
                  <span className="m-1">Diver Name: Not assigned</span>
                </li>
              </ul>
              <Link  to='/buses' className="text-yellow-500 mt-2  hover:underline ">
                View All
              </Link>
            </div>

            {/* Routes and Drivers Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* View Routes Card */}
              <div className="bg-gray-900 border border-gray-500 p-4 rounded  space-y-4">
                <h3 className="text-2xl font-bold">View Routes</h3>
                <ul className="space-y-2">
                  {/* Display 2-3 routes */}
                  <li className="p-2 bg-gray-700 rounded">Route 1 Details</li>
                  <li className="p-2 bg-gray-700 rounded">Route 2 Details</li>
                  <li className="p-2 bg-gray-700 rounded">Route 3 Details</li>
                </ul>
                <Link to='/routes' className="text-yellow-500 mt-2 hover:underline">
                  View All
                </Link>
              </div>

              {/* View Drivers Card */}
              <div className="bg-gray-900 border border-gray-500 p-4 rounded space-y-4">
                <h3 className="text-2xl font-bold">View Drivers</h3>
                <ul className="space-y-2">
                  {/* Display 2-3 drivers */}
                  <li className="p-2 bg-gray-700 rounded">Driver 1 Details</li>
                  <li className="p-2 bg-gray-700 rounded">Driver 2 Details</li>
                  <li className="p-2 bg-gray-700 rounded">Driver 3 Details</li>
                </ul>
                <Link to='/drivers' className="text-yellow-500 mt-2 hover:underline">
                  View All
                </Link>
              </div>
            </div>
          </div>

          {/* Right Side (Notifications and Complaints) */}
          <div className="lg:w-1/3 space-y-6">
            {/* Notifications Card */}
            <div className="bg-gray-900 border border-gray-500 p-4 rounded space-y-4">
              <h3 className="text-2xl font-bold">Notifications</h3>
              <ul className="space-y-2">
                {/* Display few notifications */}
                <li className="p-2 bg-gray-700 rounded">Notification 1</li>
                <li className="p-2 bg-gray-700 rounded">Notification 2</li>
                <li className="p-2 bg-gray-700 rounded">Notification 3</li>
              </ul>
              <button className="text-yellow-500 mt-2 hover:underline">
                View All
              </button>
            </div>

            {/* Complaints Card */}
            <div className="bg-gray-900 border border-gray-500 p-4 rounded space-y-4">
              <h3 className="text-2xl font-bold">Complaints</h3>
              <ul className="space-y-2">
                {/* Display few complaints */}
                <li className="p-2 bg-gray-700 rounded">Complaint 1</li>
                <li className="p-2 bg-gray-700 rounded">Complaint 2</li>
                <li className="p-2 bg-gray-700 rounded">Complaint 3</li>
              </ul>
              <button className="text-yellow-500 mt-2 hover:underline">
                View All
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
