import React from "react";
import { useEffect } from "react";
import axios from 'axios'
import { FaPhone, FaIdCard } from "react-icons/fa";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"; // for map functionality
import "leaflet/dist/leaflet.css"; // leaflet map styles

const BusDetail = ({ bus }) => {
  // Fallbacks if bus is undefined
  const busData = bus || {};
  const driver = busData.driver || {};

  const busLayout = [
    // Example layout structure; assume saved from previous input
    { row: 1, left: [1, 2], right: [3, 4], last: [5] },
    { row: 2, left: [6, 7], right: [8, 9], last: [10] },
    { row: 3, left: [11, 12], right: [13, 14], last: [15] },
  ];

  const routeStops = [
    // Example route stops
    { name: "Station A", lat: 51.505, lng: -0.09 },
    { name: "Station B", lat: 51.51, lng: -0.1 },
    { name: "Station C", lat: 51.515, lng: -0.08 },
  ];

  useEffect(()=>{
    //the url of this page will have id of bus 
    //using this id we will fetch requird data from the store which we stored earlier. 
    //const response = axios.get('')
  },[])


  return (
    <div className="bg-gray-950 p-8 min-h-screen text-gray-100">
      {/* Info Cards Row */}
      <div className="flex flex-col lg:flex-row gap-8 mb-8">
        {/* Bus Info Card */}
        <div className="bg-gray-900 border border-gray-700 rounded-lg p-6 w-full lg:w-1/2 shadow-lg">
          <h2 className="text-2xl font-bold text-yellow-500 mb-4">Bus Information</h2>
          <p className="text-gray-400 mb-2">
            <span className="font-semibold text-gray-200">Bus Number:</span> {busData.number || "N/A"}
          </p>
          <p className="text-gray-400 mb-2">
            <span className="font-semibold text-gray-200">Route:</span> {busData.route || "N/A"}
          </p>
          <p className="text-gray-400 mb-2">
            <span className="font-semibold text-gray-200">Total Seats:</span> {busData.totalSeats || "N/A"}
          </p>
        </div>

        {/* Driver Info Card */}
        <div className="bg-gray-900 border border-gray-700 rounded-lg p-6 w-full lg:w-1/2 shadow-lg">
          <h2 className="text-2xl font-bold text-yellow-500 mb-4">Driver Information</h2>
          <p className="text-gray-400 mb-2">
            <span className="font-semibold text-gray-200">Name:</span> {driver.name || "N/A"}
          </p>
          <p className="text-gray-400 mb-2">
            <span className="font-semibold text-gray-200">License Number:</span> {driver.license || "N/A"}
          </p>
          <p className="text-gray-400 mb-2">
            <span className="font-semibold text-gray-200">Phone:</span> {driver.phone || "N/A"} <FaPhone className="inline ml-2" />
          </p>
          <p className="text-gray-400">
            <span className="font-semibold text-gray-200">CNIC:</span> {driver.cnic || "N/A"} <FaIdCard className="inline ml-2" />
          </p>
        </div>
      </div>

      {/* Bus Layout Section */}
      <div className="bg-gray-900 border border-gray-700 rounded-lg p-6 mb-8 shadow-lg">
        <h2 className="text-2xl font-bold text-yellow-500 mb-4">Bus Layout</h2>
        <div className="grid gap-4">
          {busLayout.map((row, index) => (
            <div key={index} className="flex justify-between">
              <div className="flex space-x-2">
                {row.left.map((seat) => (
                  <span
                    key={seat}
                    className={`text-gray-100 text-center w-10 p-2 rounded ${busData.occupiedSeats?.includes(seat) ? "bg-red-500" : "bg-green-500"}`}
                  >
                    {seat}
                  </span>
                ))}
              </div>
              <div className="flex space-x-2">
                {row.right.map((seat) => (
                  <span
                    key={seat}
                    className={`text-gray-100 text-center w-10 p-2 rounded ${busData.occupiedSeats?.includes(seat) ? "bg-red-500" : "bg-green-500"}`}
                  >
                    {seat}
                  </span>
                ))}
              </div>
              <div className="flex space-x-2">
                {row.last.map((seat) => (
                  <span
                    key={seat}
                    className={`text-gray-100 text-center w-10 p-2 rounded ${busData.occupiedSeats?.includes(seat) ? "bg-red-500" : "bg-green-500"}`}
                  >
                    {seat}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Map Section with Route Stops */}
      <div className="bg-gray-900 border border-gray-700 rounded-lg p-6 shadow-lg">
        <h2 className="text-2xl font-bold text-yellow-500 mb-4">Bus Route</h2>
        <MapContainer center={[51.505, -0.09]} zoom={13} className="h-64 w-full rounded-lg">
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {routeStops.map((stop, index) => (
            <Marker key={index} position={[stop.lat, stop.lng]}>
              <Popup>{stop.name}</Popup>
            </Marker>
          ))}
        </MapContainer>
        <div className="mt-4 text-gray-400">
          <h3 className="font-semibold text-lg text-yellow-500 mb-2">Route Stops</h3>
          <ul className="list-disc ml-6">
            {routeStops.map((stop, index) => (
              <li key={index} className="mb-1">{stop.name}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default BusDetail;
