// import React, { useState } from 'react';

// const CreateBusPage = () => {
//   const [busName, setBusName] = useState('');
//   const [rows, setRows] = useState(0);
//   const [leftSeats, setLeftSeats] = useState([]);
//   const [rightSeats, setRightSeats] = useState([]);
//   const [lastRowSeats, setLastRowSeats] = useState(0);

//   // Functinpmon to handle changes in rows and seat inputs
//   const handleRowsChange = (value) => {
//     setRows(value);
//     // Reset seats array if rows are adjusted
//     setLeftSeats(Array(value).fill(0));
//     setRightSeats(Array(value).fill(0));
//   };

//   const handleLeftSeatsChange = (rowIndex, value) => {
//     const newSeats = [...leftSeats];
//     newSeats[rowIndex] = value;
//     setLeftSeats(newSeats);
//   };

//   const handleRightSeatsChange = (rowIndex, value) => {
//     const newSeats = [...rightSeats];
//     newSeats[rowIndex] = value;
//     setRightSeats(newSeats);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const busData = {
//       name: busName,
//       rows,
//       leftSeats,
//       rightSeats,
//       lastRowSeats
//     };

//     // API call to submit the bus layout
//     try {
//       const response = await fetch('/api/bus/create', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(busData),
//       });
//       const result = await response.json();
//       if (response.ok) {
//         alert('Bus created successfully');
//       } else {
//         alert('Error creating bus');
//       }
//     } catch (error) {
//       console.error('Error:', error);
//     }
//   };

//   return (

//     <div className="p-6 bg-white rounded-lg shadow-md max-w-4xl mx-auto">
//       <h2 className="text-2xl font-bold mb-6 text-center">Create New Bus</h2>
//       <form onSubmit={handleSubmit}>
//         {/* Bus Name */}
//         <div className="mb-4">
//           <label className="block text-gray-700 font-semibold mb-2">Bus Name (Optional):</label>
//           <input
//             type="text"
//             value={busName}
//             onChange={(e) => setBusName(e.target.value)}
//             className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
//           />
//         </div>

//         {/* Number of Rows */}
//         <div className="mb-4">
//           <label className="block text-gray-700 font-semibold mb-2">Number of Rows:</label>
//           <input
//             type="number"
//             min="1"
//             value={rows}
//             onChange={(e) => handleRowsChange(parseInt(e.target.value, 10))}
//             className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
//           />
//         </div>

//         {/* Seats per Row Configuration */}
//         <div className="grid grid-cols-2 gap-4 mb-4">
//           {/* Left Side Configuration */}
//           <div>
//             <h3 className="text-lg font-bold mb-2">Left Side Seats</h3>
//             {Array.from({ length: rows }, (_, rowIndex) => (
//               <div key={rowIndex} className="mb-2">
//                 <label className="block text-gray-600 font-semibold">Row {rowIndex + 1} (Left):</label>
//                 <input
//                   type="number"
//                   min="1"
//                   value={leftSeats[rowIndex] || 0}
//                   onChange={(e) => handleLeftSeatsChange(rowIndex, parseInt(e.target.value, 10))}
//                   className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                 />
//               </div>
//             ))}
//           </div>

//           {/* Right Side Configuration */}
//           <div>
//             <h3 className="text-lg font-bold mb-2">Right Side Seats</h3>
//             {Array.from({ length: rows }, (_, rowIndex) => (
//               <div key={rowIndex} className="mb-2">
//                 <label className="block text-gray-600 font-semibold">Row {rowIndex + 1} (Right):</label>
//                 <input
//                   type="number"
//                   min="1"
//                   value={rightSeats[rowIndex] || 0}
//                   onChange={(e) => handleRightSeatsChange(rowIndex, parseInt(e.target.value, 10))}
//                   className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                 />
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Last Row Configuration */}
//         <div className="mb-4">
//           <label className="block text-gray-700 font-semibold mb-2">Seats in Last Row:</label>
//           <input
//             type="number"
//             min="1"
//             value={lastRowSeats}
//             onChange={(e) => setLastRowSeats(parseInt(e.target.value, 10))}
//             className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
//           />
//         </div>

//         {/* Submit Button */}
//         <button
//           type="submit"
//           className="w-full bg-indigo-600 text-white py-3 rounded-md font-bold hover:bg-indigo-700 transition-colors duration-300"
//         >
//           Create Bus
//         </button>
//       </form>
//     </div>
//   );
// };

// export default CreateBusPage;
import React, { useState } from "react";

function CreateBusPage() {
  const [numberOfLeftRows, setNumberOfLeftRows] = useState(null);
  const [numberOfSeatsInLeftRows, setNumberOfSeatsInLeftRows] = useState(null);
  const [numberOfRightRows, setNumberOfRightRows] = useState(null);
  const [numberOfSeatsInRightRows, setNumberOfSeatsInRightRows] =
    useState(null);
  const [numberOfSeatsInLastRows, setNumberOfSeatsInLastRows] = useState(null);

  // Helper function to create seat layout for a row
  const renderSeats = (numSeats) => {
    return Array.from({ length: numSeats }, (_, i) => (
      <div
        key={i}
        className="seat bg-gray-300 rounded w-5 h-5 m-1 shadow-md"
      ></div>
    ));
  };

  // Helper function to render rows on one side
  const renderRows = (numRows, numSeatsInRow) => {
    return Array.from({ length: numRows }, (_, i) => (
      <div key={i} className="row flex mb-2">
        {renderSeats(numSeatsInRow)}
      </div>
    ));
  };

  return (
    <div className="p-8 min-h-screen bg-gray-950">
      <div className="bg-gray-900 my-10 border rounded border-gray-600 container mx-auto flex flex-col lg:flex-row items-center lg:items-start justify-between space-y-8 lg:space-y-0 lg:space-x-0">
        {/* Input Form on the left side */}
        <div className="lg:border border-gray-600 form-container  rounded-lg mt-20 mb-2 px-5 py-2 mx-5 w-full lg:w-2/3">
          <p className="text-3xl font-bold mb-6 text-gray-50">
            Configure <span className="text-yellow-500">Bus</span> Layout
          </p>

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
                  className="text-gray-300 bg-gray-800 border border-gray-500  rounded p-2 w-full focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition duration-200"
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
                className="text-gray-300 bg-gray-800 border border-gray-500  rounded  p-2 w-full focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition duration-200"
              />
              </div>
              {/* {numberOfRightRows > 0 && ( */}
                <div className="w-1/2">
                <label className="block text-lg font-semibold text-gray-400 mb-1">
                  Number of seats in each row</label>
                <input
                  type="number"
                  placeholder="Enter seats"
                  min={1}
                  max={5}
                  value={numberOfSeatsInRightRows || ""}
                  onChange={(e) => setNumberOfSeatsInRightRows(e.target.value)}
                  className="text-gray-300 bg-gray-800 border border-gray-500  rounded  p-2 w-full  focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition duration-200"
                />
              {/* )} */}
                </div>
            </div>

            <div className="mb-4">
              <label className="block text-lg font-semibold text-gray-400 mb-1 mt-2">
                Number of seats in last row
              </label>
              <input
                type="number"
                placeholder="Enter seats"
                min={0}
                max={8}
                value={numberOfSeatsInLastRows || ""}
                onChange={(e) => setNumberOfSeatsInLastRows(e.target.value)}
                className="text-gray-300 bg-gray-800 border border-gray-500  rounded  p-2 w-full focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition duration-200"
              />
            </div>
          </div>
          <button className="w-full rounded bg-yellow-300 hover:bg-yellow-400 px-8 py-3 mt-5 mb-2 font-bold text-gray-700  transition-all hover:opacity-90 hover:shadow-lg">
            Register Bus
          </button>
        </div>

        {/* Bus Layout on the right side */}
        <div className="bus-layout p-6 w-full lg:w-1/3 md:w-1/2 sm:w-2/3">
          <div className="text-center text-xs font-bold text-gray-500 mx-auto py-12 w-2/3 bg-yellow-500 border border-yellow-500 rounded-t-[45px]">FRONT</div>
          <div className="w-3/4 items-center bg-yellow-500 py-4 px-5 border border-yellow-500 rounded-t-[26px] rounded-b-md  min-h-[32rem] max-h-full mx-auto">
            <div className="flex justify-center my-8">
              <h2 className="text-xl font-bold text-gray-500">Bus Layout</h2>
            </div>
            <div className="flex justify-center items-start space-x-6">
              {/* Left side rows */}
              <div className="left-side">
                {/* <div className=" bg-green-100 rounded-lg p-2 text-center mb-2 text-sm font-medium text-green-600">
                  Entrance
                </div> */}
                {numberOfLeftRows > 0 && numberOfSeatsInLeftRows > 0 ? (
                  renderRows(numberOfLeftRows, numberOfSeatsInLeftRows)
                ) : (
                  <div className=" text-gray-50 p-2 font-semibold rounded-md text-center bg-red-400 border border-red-600 ">No rows on left side</div>
                )}
              </div>
              {/* Aisle */}
              <div className="aisle flex flex-col justify-center">
                <div className="aisle-space h-full bg-white border-l border-r border-gray-300"></div>
              </div>
              {/* Right side rows */}
              <div className="right-side">
                {numberOfRightRows > 0 && numberOfSeatsInRightRows > 0 ? (
                  renderRows(numberOfRightRows, numberOfSeatsInRightRows)
                ) : (
                  <div className=" text-gray-50 p-2 font-semibold rounded-md text-center bg-red-400 border border-red-600">No rows on right side</div>
                )}
              </div>
            </div>
            {/* Last row seats */}
            <div className="last-row flex justify-center mt-6">
              {numberOfSeatsInLastRows > 0 ? (
                renderSeats(numberOfSeatsInLastRows)
              ) : (
                <div className=" text-gray-50 p-2 font-semibold rounded-md text-center bg-red-400 border border-red-600 ">No seats in last row</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateBusPage;
