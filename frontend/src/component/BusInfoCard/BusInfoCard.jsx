import React from "react";

function BusInfoCard({ busData }) {
  return (
    <div className="bg-gray-800 border border-gray-600 rounded p-6 w-full lg:w-1/2 ">
      <h2 className="text-2xl font-bold  text-gray-100 mb-4">
        Bus Information
      </h2>
      <p className="text-gray-400 mb-2">
        <span className="font-semibold text-gray-200">Bus Number:</span>{" "}
        {busData.number || "N/A"}
      </p>
      <p className="text-gray-400 mb-2">
        <span className="font-semibold text-gray-200">Route:</span>{" "}
        {busData.route || "N/A"}
      </p>
      <p className="text-gray-400 mb-2">
        <span className="font-semibold text-gray-200">Total Seats:</span>{" "}
        {busData.totalSeats || "N/A"}
      </p>
    </div>
  );
}

export default BusInfoCard;
