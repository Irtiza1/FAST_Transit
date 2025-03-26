import React from "react";
import { useSelector } from "react-redux";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { useState } from "react";

function BusLayoutUser({ busData,selectedSeat,setSelectedSeat }) {

    const [alert,setAlert] = useState({message:"",severity:"",open:false})
    const handleCloseAlert= () =>{
      setAlert({...alert,open:false})
    }
  const userData = useSelector((state)=>state.user)  
  let rowCounter = 1
  console.log(busData)
  const {
    BusID,
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
      "w-10 h-10 flex items-center justify-center font-bold border border-gray-500 rounded-xl m-1";

    if (seat.OccupancyStatus === "Occupied") {
      return `${baseClasses} bg-red-600 text-white`; // Red for occupied seats
    }
    if(seat.SeatID == selectedSeat.seatID){
        return `${baseClasses} bg-blue-600 text-white`;
    }
    // if (seat.BookingStatus === "Booked") {
    //   return `${baseClasses} bg-yellow-400 text-black`; // Yellow for booked seats
    // }
    return `${baseClasses} bg-green-600 text-white`; // Green for available seats
  };

  // Utility to determine row background
  const getRowBackground = (rowIndex) => {
    if (MaleRowNumbers.includes(rowIndex)) return "bg-blue-300 bg-opacity-80"; // Light blue for male rows
    if (FemaleRowNumbers.includes(rowIndex)) return "bg-pink-300 bg-opacity-80"; // Light pink for female rows
    return "bg-yellow-400"; // Neutral gray for other rows
  };

  const handleSeatClick = (seat,rowIndex) => {
    if (seat.OccupancyStatus !== "Available") {
        alert("This seat is already occupied.");
        return;
    }
    // Gender validation - skip check for Last Row (rowIndex === null)
    if (rowIndex !== null) {
        if (MaleRowNumbers.includes(rowIndex) && userData.data.Gender === 'Female') {
        // alert("You cannot select a seat in the Male row.");
        setAlert({ message: 'You cannot select a seat in the Male row.', severity: "error", open: true });
        return;
        }
        if (FemaleRowNumbers.includes(rowIndex) && userData.data.Gender === 'Male') {
        // alert("You cannot select a seat in the Female row.");
        setAlert({ message: 'You cannot select a seat in the Female row.', severity: "error", open: true });
        return;
        }
    }
    if (seat.OccupancyStatus === "Available") {
      setSelectedSeat(seat.SeatID,BusID);
      console.log(selectedSeat)
    }
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
                    <div key={innerIndex} className={getSeatClasses(seat)} onClick={() => handleSeatClick(seat,outerIndex + 1)}>
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
                    <div key={innerIndex} className={getSeatClasses(seat)} onClick={() => handleSeatClick(seat,outerIndex + LeftRows + 1)}>
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
      <div className="mt-6 p-4 bg-yellow-400 rounded-xl border border-gray-500  text-center ">
        <div className="flex justify-center">
          {[...Array(LastSeatsPerRow)].map((_, outerIndex) => {
            const seat = Seats[counter++];
            return (
              <div key={outerIndex} className={getSeatClasses(seat)} onClick={() => handleSeatClick(seat)}>
                {seat?.SeatNumber || "N/A"}
              </div>
            );
          })}
        </div>
      </div>
      </div>
      <Snackbar open={alert.open} autoHideDuration={6000} onClose={handleCloseAlert} anchorOrigin={{ vertical: "top", horizontal: "center" }}>
        <Alert severity={alert.severity} onClose={handleCloseAlert} className="w-full max-w-md mx-auto text-sm sm:text-base font-medium text-center p-4">
        {alert.message}
        </Alert>
    </Snackbar>
    </div>
    
  );
}

export default BusLayoutUser;
