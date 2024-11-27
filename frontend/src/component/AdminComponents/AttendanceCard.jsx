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
    <div className="w-full  bg-gray-900 shadow-lg rounded-lg">
      {/* Overview Section */}
      <h2 className="text-3xl font-bold text-gray-200 mb-6">Attendance</h2>
      <div className="flex flex-col md:flex-row justify-center items-center mb-8">
        <div className="flex flex-wrap justify-center items-center gap-4 mt-4 md:mt-0">
          <div className="bg-gray-500 p-4 rounded">
            <h2 className="text-xl  text-gray-200">
              Total Records: {data.totalRecords}
            </h2>
          </div>
        </div>
      </div>

      {/* Attendance Records */}
      <div className="w-full my-2">
        {data.AttendanceRecords.map((record) => (
          <div
            key={record.AttendanceID}
            className={`border-l-8 shadow-lg rounded-lg p-6 bg-gray-800 hover:shadow-xl transition-shadow mb-2 
              ${
                record.Status === "Present"
                  ? "border-green-500"
                  : record.Status === "Absent"
                  ? "border-red-500"
                  : "border-yellow-500"
              }`}
          >
            <div className="flex justify-between items-center mb-2">
              <div className="text-xl font-semibold  text-gray-200">
                {record.Status}
              </div>
            </div>

            <div className="text-sm text-gray-200">
              <p>
                <span className="font-medium">User ID:</span> {record.UserID}
              </p>
              <p>
                <span className="font-medium">Bus ID:</span> {record.BusID}
              </p>
              <p>
                <span className="font-medium">Shift:</span> {record.Shift}
              </p>
              <p className="mt-6">
                <span className="text-base text-gray-200 font-semibold">
                  {new Date(record.Timestamp).toLocaleString()}
                </span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AttendanceCard;
