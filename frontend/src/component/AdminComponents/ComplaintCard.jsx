import React from "react";

const ComplaintCard = ({ data }) => {
  if (!data || data.complaints.length === 0) {
    return (
      <div className="p-6 bg-gray-800 shadow-lg rounded-md">
        <h2 className="text-2xl font-bold text-gray-200 text-center">
          No Complaints Available
        </h2>
      </div>
    );
  }

  const { totalComplaints, statusCounts, complaints } = data;

  return (
    <div className=" bg-gray-900 shadow-lg rounded-lg">
      {/* Header Section */}
      <h2 className="text-3xl font-bold text-gray-200 mb-6">
        Complaints Overview
      </h2>
      <div className="flex flex-col md:flex-row justify-center items-center mb-8">
        <div className="flex flex-wrap justify-center items-center gap-4 mt-4 md:mt-0">
        <div className="bg-gray-500 text-gray-200 bg-opacity-60  px-4 py-2 rounded">
            Total Complaints:{" "}
            <span className="text-gray-200">{totalComplaints}</span>
          </div>
          <div className="bg-yellow-600 bg-opacity-60 text-gray-200 px-4 py-2 rounded ">
            Pending: {statusCounts.pending}
          </div>
          <div className="bg-green-600 bg-opacity-60 text-gray-200 px-4 py-2 rounded ">
            Resolved: {statusCounts.resolved}
          </div>
          <div className="bg-blue-600 bg-opacity-60 text-gray-200 px-4 py-2 rounded">
            In Progress: {statusCounts.inprogress}
          </div>
          
        </div>
      </div>

      {/* Total Complaints */}

      {/* Complaint Cards */}
      <div className="w-full my-2">
        {complaints.map((complaint) => (
          <div
            key={complaint.ComplaintID}
            className={`border-l-8 shadow-lg rounded-lg p-6 bg-gray-800 hover:shadow-xl transition-shadow mb-2
              ${complaint.Status === "Pending" ? "border-yellow-600" : ""}
              ${complaint.Status === "Resolved" ? "border-green-600" : ""}
              ${complaint.Status === "In Progress" ? "border-blue-600" : ""}`}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-gray-200">
                {complaint.UserName}
              </h3>
              <span
                className={`text-sm font-medium px-3 py-1 rounded-md 
                  ${
                    complaint.Status === "Pending"
                      ? "bg-yellow-600 bg-opacity-60 text-gray-200"
                      : ""
                  }
                  ${
                    complaint.Status === "Resolved"
                      ? "bg-green-600 bg-opacity-60 text-gray-200"
                      : ""
                  }
                  ${
                    complaint.Status === "In Progress"
                      ? "bg-blue-600 bg-opacity-60 text-gray-200"
                      : ""
                  }`}
              >
                {complaint.Status}
              </span>
            </div>
            <p className="text-gray-400 mb-4">{complaint.ComplaintText}</p>
            <div className="text-sm text-gray-200">
              <p className="mb-1">
                <strong className="text-gray-200">Bus:</strong>{" "}
                {complaint.BusNumber} ({complaint.BusID})
              </p>
              <p className="mb-1">
                <strong className="text-gray-200">Vendor:</strong>{" "}
                {complaint.VendorName} ({complaint.ContactInfo})
              </p>
              <p>
                <strong className="text-gray-200">Date:</strong>{" "}
                {new Date(complaint.DateField).toLocaleDateString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ComplaintCard;
