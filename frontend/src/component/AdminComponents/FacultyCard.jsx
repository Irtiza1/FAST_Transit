import React from "react";
import DeleteDialogueBox from "../DeleteDialogueBox/DeleteDialogueBox";
const FacultyCard = ({ faculty,handleCancelDelete,handleConfirmDelete,showDeleteModal,openDeleteModal }) => {
  return (
    <div className="my-2 bg-gray-800 text-gray-200 p-6 border border-gray-600 rounded transition-shadow duration-300 text-base">
      <h2 className="text-2xl font-semibold mb-4 text-gray-400">
        {faculty.FirstName} {faculty.LastName}
      </h2>
      <p className="text-gray-300">
        <strong>Role:</strong> {faculty.Role}
      </p>
      <p className="text-gray-300">
        <strong>Faculty ID:</strong> {faculty.FacultyID}
      </p>
      <p className="text-gray-300">
        <strong>Department:</strong> {faculty.DepartmentName}
      </p>
      <p className="text-gray-300">
        <strong>Email:</strong> {faculty.Email}
      </p>
      <p className="text-gray-300">
        <strong>Contact Info:</strong> {faculty.ContactInfo}
      </p>
      <p className="text-gray-300">
        <strong>Gender:</strong> {faculty.Gender}
      </p>
      <p className="text-gray-300">
        <strong>CNIC:</strong> {faculty.CNIC}
      </p>
      <p className="text-gray-300">
        <strong>Location:</strong> {faculty.Location}
      </p>
      <p className="text-gray-300">
        <strong>Bus ID:</strong> {faculty.BusID || "N/A"}
      </p>
      <p className="text-gray-300">
        <strong>Seat ID:</strong> {faculty.SeatID || "N/A"}
      </p>
      <p className="text-gray-300">
        <strong>Vendor ID:</strong> {faculty.VendorID || "N/A"}
      </p>
      <p
        className={`text-gray-300 ${
          faculty.AccountActivated ? "text-green-600" : "text-red-300"
        }`}
      >
        <strong>Account Activated:</strong>{" "}
        {faculty.AccountActivated ? "Yes" : "No"}
      </p>
      <button onClick={()=> openDeleteModal(faculty.FacultyID)} className="w-20 bg-red-800 bg-opacity-75  border border-red-800 hover:bg-red-900 hover:bg-opacity-75 rounded-lg bg- px-4 py-2 mt-4">
        Delete
      </button>
      <DeleteDialogueBox handleCancelDelete = {handleCancelDelete} handleConfirmDelete={handleConfirmDelete} showDeleteModal={showDeleteModal}/>
    </div>
  );
};

export default FacultyCard;
