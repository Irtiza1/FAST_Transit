import React from "react";

function DriverCard({driver}) {
  return (
    <div className="my-2 bg-gray-800 text-gray-300 p-6 border border-gray-600 rounded transition-shadow duration-300 text-base">
      <h2 className="text-2xl font-semibold mb-4 text-gray-400">
        Driver ID: {driver.DriverID}
      </h2>
      <p className="text-gray-300">
        <strong>Driver Name:</strong> {driver.DriverName}
      </p>
      <p className="text-gray-300">
        <strong>Contact Info:</strong> {driver.PhoneNumber} 
      </p>
      <p className="text-gray-300">
        <strong>Bus ID:</strong> {driver.BusID}
      </p>
      <p className="text-gray-300">
        <strong>Bus Number:</strong> {driver.BusNumber}
      </p>
      <p className="text-gray-300">
        <strong>Vendor ID:</strong> {driver.VendorID}
      </p>
      <p className="text-gray-300">
        <strong>License Number:</strong> {driver.LicenseNumber}
      </p>
    </div>
  );
}

export default DriverCard;
