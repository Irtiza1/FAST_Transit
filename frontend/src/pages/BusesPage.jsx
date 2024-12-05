import React, { useEffect, useState } from "react";
import { FaPlus, FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import axios from "axios";

const BusesPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [busData,setBusData] = useState(null)
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

  useEffect(() => {
    const fetchBusData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/admin/Vendor/dropdown/View/Bus"
        );
        if (response.status === 200) {
          console.log(response);
          setBusData(response)
          // Optionally reset form or redirect
        } else {
          alert("Failed to fetch the bus. Please try again.", response.status);
        }
      } catch (error) {
        console.log(error);
      }
      // try {
      //   const response = await axios.get(
      //     "http://localhost:8000/admin/Vendor/dropdown/View/BusDetails/28"
      //   );
      //   if (response.status === 200) {
      //     console.log(response);
      //     // Optionally reset form or redirect
      //   } else {
      //     alert("Failed to fetch the bus. Please try again.", response.status);
      //   }
      // } catch (error) {
      //   console.log(error);
      // }
    };
    fetchBusData();
    //the url of this page will have id of vendor
    //using this id we will query data base and will get all the buses which are registered by this vendor id along detail of its driver  and its route with list of stops as response. This will be saved in store
    //const response = axios.get('')
  }, []);

  return (
    <div className="bg-gray-950 p-8">
      <div className="p-6 bg-gray-900 min-h-screen text-gray-100 border border-gray-600 rounded">
        {/* Header with Title, Search Bar, and Add Button */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-6 space-y-4 lg:space-y-0">
          <h2 className="text-4xl font-bold mb-4">
            Registered <span className="text-yellow-500">Buses</span>
          </h2>

          <div className="flex lg:items-center justify-between space-x-2">
            {/* Search Bar */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search buses"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="text-gray-300 z-0 bg-gray-800 border border-gray-600 rounded p-2 pl-10 lg:w-64 md:w-64 w-2/3 focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition duration-200"
              />
              <FaSearch className="absolute left-3 top-3 text-gray-500" />
            </div>

            {/* Add Bus Button */}
            <Link
              to="/vendor/create-bus"
              className="flex items-center bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold lg:px-4 lg:py-2 md:px-4 md:py-2 p-1 rounded text-sm"
            >
              <FaPlus className="mr-2 text-sm" /> Add New Bus
            </Link>
          </div>
        </div>

        {/* Bus Cards */}
        {/* clicking any card will direct to new page by taking id of bus in url which will display detail information of a bus */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {busData?.data.filter(
              (bus) =>
                bus.BusNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                bus.RouteName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                bus.DriverID.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map((bus) => (
              <Link
                to={`/vendor/buses/${bus.BusID}`}
                key={bus.BusID}
                className="bg-gray-800 border border-gray-700 rounded-lg p-4 cursor-pointer hover:bg-gray-900 hover:shadow-lg transition-shadow duration-200"
                onClick={() => console.log("Clicked on bus", bus.number)}
              >
                <h2 className="text-lg font-semibold text-yellow-500 mb-2">
                  Bus #{bus.BusNumber}
                </h2>
                <p className="text-gray-400 mb-1">
                  <span className="font-medium text-gray-200">Route:</span>{" "}
                  {bus.RouteName}
                </p>
                <p className="text-gray-400">
                  <span className="font-medium text-gray-200">Driver ID:</span>{" "}
                  {bus.DriverID}
                </p>
                <p className="text-gray-400">
                  <span className="font-medium text-gray-200">Status:</span>{" "}
                  {bus.Status}
                </p>
                <p className="text-gray-400">
                  <span className="font-medium text-gray-200">Arrival Time:</span>{" "}
                  {bus.ArrivalTIme  }

                </p>
                <p className="text-gray-400">
                  <span className="font-medium text-gray-200">Departure Time:</span>{" "}
                  {bus.DepartureTime}

                </p>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
};

export default BusesPage;
