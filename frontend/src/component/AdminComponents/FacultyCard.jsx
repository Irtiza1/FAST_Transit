import React from "react";

const FacultyCard = ({ faculty }) => {
  return (
    <div className="bg-gray-800 text-gray-200 p-6 rounded text-sm transition-shadow duration-300">
      <h4 className="text-xl font-semibold mb-2">
        {faculty.FirstName} {faculty.LastName}
      </h4>
      <p className="text-gray-400">
        <strong>Role:</strong> {faculty.Role}
      </p>
      <p className="text-gray-400">
        <strong>Faculty ID:</strong> {faculty.FacultyID}
      </p>
      <p className="text-gray-400">
        <strong>Department:</strong> {faculty.DepartmentName}
      </p>
      <p className="text-gray-400">
        <strong>Email:</strong> {faculty.Email}
      </p>
      <p className="text-gray-400">
        <strong>Contact Info:</strong> {faculty.ContactInfo}
      </p>
      <p className="text-gray-400">
        <strong>Gender:</strong> {faculty.Gender}
      </p>
      <p className="text-gray-400">
        <strong>CNIC:</strong> {faculty.CNIC}
      </p>
      <p className="text-gray-400">
        <strong>Location:</strong> {faculty.Location}
      </p>
      <p className="text-gray-400">
        <strong>Bus ID:</strong> {faculty.BusID || "N/A"}
      </p>
      <p className="text-gray-400">
        <strong>Seat ID:</strong> {faculty.SeatID || "N/A"}
      </p>
      <p className="text-gray-400">
        <strong>Vendor ID:</strong> {faculty.VendorID || "N/A"}
      </p>
      <p
        className={`text-gray-400 ${
          faculty.AccountActivated ? "text-green-600" : "text-red-300"
        }`}
      >
        <strong>Account Activated:</strong>{" "}
        {faculty.AccountActivated ? "Yes" : "No"}
      </p>
    </div>
  );
};

export default FacultyCard;
