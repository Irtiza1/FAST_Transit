import React from 'react'

function BusLayout({bus}) {
  const getSeatClass = (seatNumber) => {
    const occupiedSeat = bus.occupiedSeats.find((seat) => seat.seatNumber === seatNumber);
    if (occupiedSeat) {
      return occupiedSeat.gender === "male" ? "bg-blue-500" : "bg-pink-500";
    }
    return "bg-yellow-600"; // Vacant seat
  };
  return (
    <div>

       {/* Legend */}
       <div className="lg:flex md:flex text-sm justify-center p-2 md:space-x-8">
        <div className="flex  flex-col md:space-y-4 space-y-2 mx-4 mb-4">
          <div className="flex items-center  space-x-2">
            <span className="bg-blue-500 w-4 h-4 rounded-full inline-block"></span>
            <span>Occupied (Male)</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="bg-pink-500 w-4 h-4 rounded-full inline-block"></span>
            <span>Occupied (Female)</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="bg-yellow-600 w-4 h-4 rounded-full inline-block"></span>
            <span>Vacant</span>
          </div>
        </div>

        {/* Bus Seat Layout */}
        <div className="grid gap-4 ">
          {bus.layout.map((row, index) => (
            <div key={index} className="flex md:justify-between md:space-x-0 justify-center space-x-8">
              <div className="flex space-x-1">
                {row.left.map((seat) => (
                  <span
                    key={seat}
                    className={`text-gray-100 text-center md:w-10 md:p-2 w-6 p-1 rounded ${getSeatClass(seat)}`}
                  >
                    {seat}
                  </span>
                ))}
              </div>
              <div className="flex space-x-1">
                {row.right.map((seat) => (
                  <span
                    key={seat}
                    className={`text-gray-100 text-center md:w-10 md:p-2 w-6 p-1 rounded ${getSeatClass(seat)}`}
                  >
                    {seat}
                  </span>
                ))}
              </div>
            </div>
          ))}
          <div className="flex justify-center space-x-1 mt-4">
            {bus.layout[bus.layout.length - 1].last.map((seat) => (
              <span
                key={seat}
                className={`text-gray-100 text-center md:w-10 md:p-2 w-6 p-1 rounded ${getSeatClass(seat)}`}
              >
                {seat}
              </span>
            ))}
          </div>
        </div>
        </div>

    </div>
  )
}

export default BusLayout
