import DeleteDialogueBox from "../DeleteDialogueBox/DeleteDialogueBox";
const StudentCard = ({ student,handleCancelDelete,handleConfirmDelete,showDeleteModal,openDeleteModal })=> {
  return (
    <div className=" my-2 bg-gray-800 text-gray-200 p-6 border border-gray-600 rounded transition-shadow duration-300 text-base">
      
      <h4 className="text-2xl font-bold mb-4 text-gray-400">
        {student.FirstName} {student.LastName}
      </h4>
      <p className="text-gray-300">
        <strong>Role:</strong> {student.Role}
      </p>
      <p className="text-gray-300">
        <strong>Student ID:</strong> {student.StudentID}
      </p>
      <p className="text-gray-300">
        <strong>Department:</strong> {student.DepartmentName}
      </p>
      <p className="text-gray-300">
        <strong>Semester:</strong> {student.Semester}
      </p>
      <p className="text-gray-300">
        <strong>Batch:</strong> {student.Batch}
      </p>
      <p className="text-gray-300">
        <strong>Email:</strong> {student.Email}
      </p>
      <p className="text-gray-300">
        <strong>Contact Info:</strong> {student.ContactInfo}
      </p>
      <p className="text-gray-300">
        <strong>Gender:</strong> {student.Gender}
      </p>
      <p className="text-gray-300">
        <strong>CNIC:</strong> {student.CNIC}
      </p>
      <p className="text-gray-300">
        <strong>Location:</strong> {student.Location}
      </p>
      <p className="text-gray-300">
        <strong>Bus ID:</strong> {student.BusID || "N/A"}
      </p>
      <p className="text-gray-300">
        <strong>Seat ID:</strong> {student.SeatID || "N/A"}
      </p>
      <p className="text-gray-300">
        <strong>Vendor ID:</strong> {student.VendorID || "N/A"}
      </p>
      <p
        className={`text-gray-300 ${
          student.AccountActivated ? "text-green-600" : "text-red-300"
        }`}
      >
        <strong>Account Activated:</strong>{" "}
        {student.AccountActivated ? "Yes" : "No"}
      </p>
      <p className="text-gray-300">
        <strong>Registration Status:</strong>{" "}
        {student.RegisterationStatus || "N/A"}
      </p>
      <button onClick={()=> openDeleteModal(student.StudentID)} className="w-20 bg-red-800 bg-opacity-75  border border-red-800 hover:bg-red-900 hover:bg-opacity-75 rounded-lg bg- px-4 py-2 mt-4">
        Delete
      </button>
      <DeleteDialogueBox handleCancelDelete = {handleCancelDelete} handleConfirmDelete={handleConfirmDelete} showDeleteModal={showDeleteModal}/>
    </div>
  );
}

export default StudentCard;
