import React from "react";

function BusLayout({ busData }) {
  const {
    MaleRowNumbers,
    FemaleRowNumbers,
    Seats,
    LeftSeatsPerRow,
    RightSeatsPerRow,
    LastSeatsPerRow,
    LeftRows,
    RightRows,
  } = busData;

  let counter = 0;

  // Utility to determine seat classes
  const getSeatClasses = (seat) => {
    const baseClasses =
      "w-12 h-12 flex items-center justify-center font-bold border border-gray-500 rounded-xl m-1";

    if (seat.OccupancyStatus === "Occupied") {
      return `${baseClasses} bg-red-800 text-white`; // Red for occupied seats
    }
    // if (seat.BookingStatus === "Booked") {
    //   return `${baseClasses} bg-yellow-400 text-black`; // Yellow for booked seats
    // }
    return `${baseClasses} bg-green-700 text-white`; // Green for available seats
  };

  // Utility to determine row background
  const getRowBackground = (rowIndex) => {
    if (MaleRowNumbers.includes(rowIndex)) return "bg-blue-400 bg-opacity-80"; // Light blue for male rows
    if (FemaleRowNumbers.includes(rowIndex)) return "bg-pink-400 bg-opacity-80"; // Light pink for female rows
    return "bg-yellow-600"; // Neutral gray for other rows
  };

  return (
    <div className="p-6 text-gray-300">
      <div className="flex justify-center space-x-8 mb-6">
        <div className="flex items-center space-x-2">
          <span className="w-4 h-4 bg-blue-400 bg-opacity-80 inline-block border border-gray-500 rounded"></span>
          <span>Male Row</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="w-4 h-4 bg-pink-400 bg-opacity-80 inline-block border border-gray-500 rounded"></span>
          <span>Female Row</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="w-4 h-4 bg-yellow-600 inline-block border border-gray-500 rounded"></span>
          <span>Neutral Row</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="w-4 h-4 bg-green-700 inline-block border border-gray-500 rounded"></span>
          <span>Available Seat</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="w-4 h-4 bg-red-800 inline-block border border-gray-500 rounded"></span>
          <span>Occupied Seat</span>
        </div>
      </div>
      {/* Left and Right Rows */}
      <div className="flex justify-center">
        {/* Left Rows */}
        <div>
          {[...Array(LeftRows)].map((_, outerIndex) => (
            <div
              key={outerIndex}
              className={`p-3 mb-3 rounded-xl border border-gray-500 ${getRowBackground(
                outerIndex + 1
              )}`}
            >
              {/* <h3 className="text-lg font-semibold mb-2">
                Row: {outerIndex + 1} 
              </h3> */}
              <div className="flex">
                {[...Array(LeftSeatsPerRow)].map((_, innerIndex) => {
                  const seat = Seats[counter++];
                  return (
                    <div key={innerIndex} className={getSeatClasses(seat)}>
                      {seat?.SeatNumber || "N/A"}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
          <div className="m-4"></div>
        {/* Right Rows */}
        <div>
          {[...Array(RightRows)].map((_, outerIndex) => (
            <div
              key={outerIndex}
              className={`p-3 mb-3 rounded-xl border border-gray-500  ${getRowBackground(
                outerIndex + LeftRows + 1
              )}`}
            >
              {/* <h3 className="text-lg font-semibold mb-2">
                Row: {outerIndex + LeftRows + 1}
              </h3> */}
              <div className="flex ">
                {[...Array(RightSeatsPerRow)].map((_, innerIndex) => {
                  const seat = Seats[counter++];
                  return (
                    <div key={innerIndex} className={getSeatClasses(seat)}>
                      {seat?.SeatNumber || "N/A"}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Last Row */}
      <div className="flex justify-center">
      <div className="mt-6 p-4 bg-yellow-600 rounded-xl border border-gray-500  text-center ">
        <div className="flex justify-center">
          {[...Array(LastSeatsPerRow)].map((_, outerIndex) => {
            const seat = Seats[counter++];
            return (
              <div key={outerIndex} className={getSeatClasses(seat)}>
                {seat?.SeatNumber || "N/A"}
              </div>
            );
          })}
        </div>
      </div>
      </div>
    </div>
  );
}

export default BusLayout;
