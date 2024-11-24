import React from "react";

function DriverCard({driver}) {
  return (
    <div className="bg-gray-800 text-gray-200 p-6 rounded text-sm transition-shadow duration-300">
      <h2 className="text-xl font-semibold mb-2">
        Driver ID: {driver.DriverID}
      </h2>
      <p className="text-gray-400">
        <strong>Driver Name:</strong> {driver.DriverName}
      </p>
      <p className="text-gray-400">
        <strong>Contact Info:</strong> {driver.PhoneNumber}
      </p>
      <p className="text-gray-400">
        <strong>Bus ID:</strong> {driver.BusID}
      </p>
      <p className="text-gray-400">
        <strong>Bus Number:</strong> {driver.BusNumber}
      </p>
      <p className="text-gray-400">
        <strong>Vendor ID:</strong> {driver.VendorID}
      </p>
      <p className="text-gray-400">
        <strong>License Number:</strong> {driver.LicenseNumber}
      </p>
    </div>
  );
}

export default DriverCard;
