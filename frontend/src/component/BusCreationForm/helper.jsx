import React from "react";
export const renderSeats = (numSeats) => {
  return Array.from({ length: numSeats }, (_, i) => (
    <div
      key={i}
      className="seat bg-gray-300 rounded w-5 h-5 mr-1 mb-1 shadow-md"
    ></div>
  ));
};

export const renderRows = (numRows, numSeatsInRow) => {
  return Array.from({ length: numRows }, (_, i) => (
    <div key={i} className="row flex mb-6">
      {renderSeats(numSeatsInRow)}
    </div>
  ));
};
