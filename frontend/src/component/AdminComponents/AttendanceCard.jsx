import React from "react";

const AttendanceCard = ({ data }) => {
  if (!data || !data.AttendanceRecords || data.AttendanceRecords.length === 0) {
    return (
      <div className="text-center text-gray-500 italic p-6">
        No attendance records found.
      </div>
    );
  }

  return (
    <div className="w-full p-6 bg-gray-800 border border-gray-600 rounded  text-gray-200 min-h-screen mt-6">
            <h1 className="text-3xl font-bold text-gray-200 m-2">Attendance</h1>

      {/* Header Section */}
      <div className="mb-6 flex justify-center items-center bg-gray-800  text-white p-5 ">
        {/* <h1 className="text-2xl font-bold">Attendance Information</h1> */}
        <div className="flex space-x-4">
          <div className="px-4 py-2 bg-green-600 bg-opacity-60 rounded-full md:text-sm text-xs font-medium shadow-sm">
            Total Records: {data.totalRecords}
          </div>
        </div>
      </div>

      {/* Attendance Records */}
      <div className="grid gap-6">
        {data.AttendanceRecords.map((record) => (
          <div
            key={record.AttendanceID}
            className={`p-6 rounded bg-gray-900 border-l-8 hover:shadow-lg transition-shadow duration-300
              ${
                record.Status === "Present"
                  ? "border-green-500"
                  : record.Status === "Absent"
                  ? "border-red-500"
                  : "border-yellow-500"
              }`}
          >
            <div className="flex justify-between items-center">
              <div className="text-lg font-semibold text-gray-900">
                Status: {record.Status}
              </div>
              <span className="text-xs text-gray-200 font-semibold">
                {new Date(record.Timestamp).toLocaleString()}
              </span>
            </div>

            <div className="mt-2 text-gray-200">
              <p>User ID: <strong className="">{record.UserID}</strong></p>
              <p>Bus ID: <strong className="">{record.BusID}</strong></p>
              <p>Shift: <strong className="capitalize">{record.Shift}</strong></p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AttendanceCard;
