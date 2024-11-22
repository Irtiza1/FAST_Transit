import React from "react";

function DriverCard({driver}) {
  return (
    <div className="driver-card border rounded shadow-lg p-4 bg-white">
      <h2 className="text-xl font-semibold mb-2">
        Driver ID: {driver.DriverID}
      </h2>
      <p className="text-gray-600">
        <strong>Driver Name:</strong> {driver.DriverName}
      </p>
      <p className="text-gray-600">
        <strong>Contact Info:</strong> {driver.PhoneNumber}
      </p>
      <p className="text-gray-600">
        <strong>Bus ID:</strong> {driver.BusID}
      </p>
      <p className="text-gray-600">
        <strong>Bus Number:</strong> {driver.BusNumber}
      </p>
      <p className="text-gray-600">
        <strong>Vendor ID:</strong> {driver.VendorID}
      </p>
      <p className="text-gray-600">
        <strong>License Number:</strong> {driver.LicenseNumber}
      </p>
    </div>
  );
}

export default DriverCard;
