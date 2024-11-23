const StudentCard = ({ student })=> {
  return (
    <div className="bg-gray-800 text-gray-200 p-6 rounded transition-shadow duration-300 text-sm">
      <h2 className="text-xl font-semibold mb-2">
        {student.FirstName} {student.LastName}
      </h2>
      <p className="text-gray-400">
        <strong>Role:</strong> {student.Role}
      </p>
      <p className="text-gray-400">
        <strong>Student ID:</strong> {student.StudentID}
      </p>
      <p className="text-gray-400">
        <strong>Department:</strong> {student.DepartmentName}
      </p>
      <p className="text-gray-400">
        <strong>Semester:</strong> {student.Semester}
      </p>
      <p className="text-gray-400">
        <strong>Batch:</strong> {student.Batch}
      </p>
      <p className="text-gray-400">
        <strong>Email:</strong> {student.Email}
      </p>
      <p className="text-gray-400">
        <strong>Contact Info:</strong> {student.ContactInfo}
      </p>
      <p className="text-gray-400">
        <strong>Gender:</strong> {student.Gender}
      </p>
      <p className="text-gray-400">
        <strong>CNIC:</strong> {student.CNIC}
      </p>
      <p className="text-gray-400">
        <strong>Location:</strong> {student.Location}
      </p>
      <p className="text-gray-400">
        <strong>Bus ID:</strong> {student.BusID || "N/A"}
      </p>
      <p className="text-gray-400">
        <strong>Seat ID:</strong> {student.SeatID || "N/A"}
      </p>
      <p className="text-gray-400">
        <strong>Vendor ID:</strong> {student.VendorID || "N/A"}
      </p>
      <p
        className={`text-gray-400 ${
          student.AccountActivated ? "text-green-600" : "text-red-300"
        }`}
      >
        <strong>Account Activated:</strong>{" "}
        {student.AccountActivated ? "Yes" : "No"}
      </p>
      <p className="text-gray-400">
        <strong>Registration Status:</strong>{" "}
        {student.RegisterationStatus || "N/A"}
      </p>
    </div>
  );
}

export default StudentCard;
