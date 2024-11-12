import React from "react";
import { FaPhone, FaIdCard } from "react-icons/fa"; 

function DriverInfoCard({ driver }) {
  return (
    <div className="bg-gray-800 border border-gray-600 rounded p-6 w-full lg:w-1/2 ">
      <h2 className="text-2xl font-bold  text-gray-100  mb-4">
        Driver Information
      </h2>
      <p className="text-gray-400 mb-2">
        <span className="font-semibold text-gray-200">Name:</span>{" "}
        {driver.name || "N/A"}
      </p>
      <p className="text-gray-400 mb-2">
        <span className="font-semibold text-gray-200">License Number:</span>{" "}
        {driver.license || "N/A"}
      </p>
      <p className="text-gray-400 mb-2">
        <span className="font-semibold text-gray-200">Phone:</span>{" "}
        {driver.contact || "N/A"} <FaPhone className="inline ml-2" />
      </p>
      <p className="text-gray-400">
        <span className="font-semibold text-gray-200">CNIC:</span>{" "}
        {driver.cnic || "N/A"} <FaIdCard className="inline ml-2" />
      </p>
    </div>
  );
}

export default DriverInfoCard;
