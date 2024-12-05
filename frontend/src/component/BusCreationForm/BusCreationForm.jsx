import React from "react";
import { renderRows, renderSeats } from "./helper.jsx";
function BusCreationForm({
  numberPlate,
  setNumberPlate,
  numberOfLeftRows,
  setNumberOfLeftRows,
  numberOfSeatsInLeftRows,
  setNumberOfSeatsInLeftRows,
  numberOfRightRows,
  setNumberOfRightRows,
  numberOfSeatsInRightRows,
  setNumberOfSeatsInRightRows,
  numberOfSeatsInLastRows,
  setNumberOfSeatsInLastRows,
  MaleRows,setMaleRows,
  FemaleRows,setFemaleRows
}) {
  return (
    <>
      <div className="lg:border border-gray-600 form-container  rounded-lg mt-10 mb-2 px-5 py-2 mx-5 w-full lg:w-1/2">
        <p className="text-3xl font-bold mb-6 text-gray-50">
          Configure <span className="text-yellow-500">Bus</span> Layout
        </p>
        <label className="block text-lg font-semibold text-gray-400 mb-1">
          Enter official plate number
        </label>
        <input
          type="text"
          placeholder="e.g., AB1234"
          value={numberPlate}
          onChange={(e) => setNumberPlate(e.target.value)}
          className="text-gray-300 bg-gray-800 border border-gray-500  rounded p-2 w-full focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition duration-200 mb-4"
        />
        <div className="mb-4 ">
          <div className="flex items-center gap-4">
            {/* Left side input for number of rows */}
            <div className="w-1/2">
              <label className="block text-lg font-semibold text-gray-400 mb-1">
                Number of rows on left side
              </label>
              <input
                type="number"
                placeholder="Enter rows"
                min={1}
                max={15}
                value={numberOfLeftRows || ""}
                onChange={(e) => setNumberOfLeftRows(e.target.value)}
                onKeyDown={(e) => e.preventDefault()} // Disables typing
                onFocus={(e) => e.target.blur()} // Prevents virtual keyboards on mobile
                className="text-gray-300 bg-gray-800 border border-gray-500 rounded p-2 w-full focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition duration-200"
              />
            </div>

            {/* Right side input for number of seats */}
            <div className="w-1/2">
              <label className="block text-lg font-semibold text-gray-400 mb-1">
                Number of seats in each row
              </label>
              <input
                type="number"
                placeholder="Enter seats"
                min={1}
                max={5}
                value={numberOfSeatsInLeftRows || ""}
                onChange={(e) => setNumberOfSeatsInLeftRows(e.target.value)}
                onKeyDown={(e) => e.preventDefault()} // Disables typing
                onFocus={(e) => e.target.blur()} // Prevents virtual keyboards on mobile
                className="text-gray-300 bg-gray-800 border border-gray-500  rounded  p-2 w-full focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition duration-200"
              />
            </div>
          </div>
        </div>
        

        <div className="mb-4  ">
          <div className="flex items-center gap-4">
            <div className="w-1/2">
              <label className="block text-lg font-semibold text-gray-400 mb-1">
                Number of rows on right side
              </label>
              <input
                type="number"
                placeholder="Enter rows"
                min={1}
                max={15}
                value={numberOfRightRows || ""}
                onChange={(e) => setNumberOfRightRows(e.target.value)}
                onKeyDown={(e) => e.preventDefault()} // Disables typing
                onFocus={(e) => e.target.blur()} // Prevents virtual keyboards on mobile
                className="text-gray-300 bg-gray-800 border border-gray-500  rounded  p-2 w-full focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition duration-200"
              />
            </div>
            {/* {numberOfRightRows > 0 && ( */}
            <div className="w-1/2">
              <label className="block text-lg font-semibold text-gray-400 mb-1">
                Number of seats in each row
              </label>
              <input
                type="number"
                placeholder="Enter seats"
                min={1}
                max={5}
                value={numberOfSeatsInRightRows || ""}
                onChange={(e) => setNumberOfSeatsInRightRows(e.target.value)}
                onKeyDown={(e) => e.preventDefault()} // Disables typing
                onFocus={(e) => e.target.blur()} // Prevents virtual keyboards on mobile
                className="text-gray-300 bg-gray-800 border border-gray-500  rounded  p-2 w-full  focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition duration-200"
              />
              {/* )} */}
            </div>
          </div>

          <div className="mb-5 ">
          <div className="flex items-center gap-4">
            {/* Left side input for number of rows */}
            <div className="w-1/2">
              <label className="block text-lg font-semibold text-gray-400 mb-1">
                Enter Row for Female
              </label>
              <input
                type="text"
                placeholder="Enter comma separated row number"
                value={MaleRows || ""}
                onChange={(e) => setMaleRows(e.target.value)}
                className="text-gray-300 bg-gray-800 border border-gray-500 rounded p-2 w-full focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition duration-200"
              />
            </div>

            {/* Right side input for number of seats */}
            <div className="w-1/2">
              <label className="block text-lg font-semibold text-gray-400 mb-1">
                Enter Row for Female
              </label>
              <input
                type="text"
                placeholder="Enter comma separated row number"
                value={FemaleRows || ""}
                onChange={(e) => setFemaleRows(e.target.value)}
                className="text-gray-300 bg-gray-800 border border-gray-500  rounded  p-2 w-full focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition duration-200"
              />
            </div>
          </div>
        </div>
        </div>
        
      </div>

      {/* Bus Layout on the right side */}
      <div className=" bus-layout min-w-[20rem] ">
        {/* <div className="text-center text-xs font-bold text-gray-500 mx-auto py-12  bg-yellow-500 border border-yellow-500 rounded-t-[45px]">FRONT</div> */}
        <div className="items-center bg-yellow-600 border border-yellow-500 rounded-t-[26px] rounded-b-md  min-h-[31rem] max-h-full mt-10 mb-2 px-5 py-2 mx-10 ">
          <div className="flex justify-center m-10 ">
            <h2 className="text-xl font-bold text-gray-500">Front</h2>
          </div>
          <div className="flex justify-center space-x-6">
            {/* Left side rows */}
            <div className="left-side">
              {/* <div className=" bg-green-100 rounded-lg p-2 text-center mb-2 text-sm font-medium text-green-600">
                  Entrance
                </div> */}
              {renderRows(numberOfLeftRows, numberOfSeatsInLeftRows)}
            </div>
            {/* Aisle */}
            <div className="aisle flex flex-col justify-center">
              <div className="aisle-space h-full bg-white border-l border-r border-gray-300"></div>
            </div>
            {/* Right side rows */}
            <div className="right-side">
              {renderRows(numberOfRightRows, numberOfSeatsInRightRows)}
            </div>
          </div>
          {/* Last row seats */}
          <div className="last-row flex justify-center mt-6">
            {renderSeats(numberOfSeatsInLastRows)}
          </div>
        </div>
      </div>
    </>
  );
}

export default BusCreationForm;
