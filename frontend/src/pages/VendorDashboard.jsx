import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
function VendorDashboard() {
  const [sideBarOpen, setSideBarOpen] = useState(true);

  function toggleSideBar() {
    setSideBarOpen(!sideBarOpen);
  }

  return (
    <>
      <div className="fixed bg-gray-950 w-full top-0 left-0 min-h-12 text-gray-400 border-b border-gray-600 z-10">
        <button className="p-1 bg-gray-800 m-1 rounded" onClick={toggleSideBar}>Temp Menu Button</button>
      </div>

      <div
        className={`bg-gray-950 h-screen md:w-1/5 sm:w-2/5 fixed top-12 left-0 ${
          sideBarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-all duration-300 ease-in-out z-10`}
      >
        <div className="h-full max-h-screen overflow-y-auto flex flex-col">
          <div className="p-2">
            <p className="text-yellow-600 text-4xl font-extrabold">FAST</p>
            <p className="text-gray-100 text-xl font-extrabold">Transit</p>
          </div>
          <ul className="text-gray-300 px-2  pb-10 my-6 transition-all ease-in-out">
            
            <li>
              <Link
                to="buses"
                className="block w-full px-2 py-1 font-bold rounded text-xs hover:bg-yellow-500 hover:bg-opacity-50 hover:text-sm hover:transition-all duration-500 ease-in-out"
              >
                Buses
              </Link>
            </li>
            <li>
              <Link
                to="routes"
                className="block w-full px-2 py-1 font-bold rounded text-xs hover:bg-yellow-500 hover:bg-opacity-50 hover:text-sm hover:transition-all duration-500 ease-in-out"
              >
                Routes
              </Link>
            </li>
            <li>
              <Link
                to="drivers"
                className="block w-full px-2 py-1 font-bold rounded text-xs hover:bg-yellow-500 hover:bg-opacity-50 hover:text-sm hover:transition-all duration-500 ease-in-out"
              >
                Drivers
              </Link>
            </li>
            <li>
              <Link className="block w-full px-2 py-1 font-bold rounded text-xs hover:bg-yellow-500 hover:bg-opacity-50 hover:text-sm hover:transition-all duration-500 ease-in-out">
                Profile
              </Link>
            </li>
            <li>
              <Link className="block w-full px-2 py-1 font-bold rounded text-xs hover:bg-yellow-500 hover:bg-opacity-50 hover:text-sm hover:transition-all duration-500 ease-in-out">
                Complains
              </Link>
            </li>
            <li>
              <Link className="block w-full px-2 py-1 font-bold rounded text-xs hover:bg-yellow-500 hover:bg-opacity-50 hover:text-sm hover:transition-all duration-500 ease-in-out">
                Maintainenace
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <main
        className={`${
          sideBarOpen ? "md:ml-[20%]" : "ml-0"
        } mt-12 transition-all duration-300 ease-in-out z-10`}
      >
        <Outlet />
      </main>
    </>
  );
}

export default VendorDashboard;

// import React, { useState } from 'react';
// import { Link, Outlet } from 'react-router-dom';

// function VendorDashboard() {
//   const [sideBarOpen, setSideBarOpen] = useState(true);

//   function toggleSideBar() {
//     setSideBarOpen(!sideBarOpen);
//   }

//   return (
//     <>
//       <div className="bg-gray-950 w-full top-0 left-0 min-h-12 text-gray-400">
//         <button onClick={toggleSideBar}>Menu</button>
//       </div>

//       <div className={`bg-gray-950 h-screen md:w-1/5 sm:w-2/5 fixed top-12 left-0 ${sideBarOpen ? "translate-x-0" : "-translate-x-full"} transition-all duration-300 ease-in-out`}>
//         <div className='h-full max-h-screen overflow-y-auto flex flex-col'>
//           <div className='p-2'>
//             <p className='text-yellow-600 text-4xl font-extrabold'>FAST</p>
//             <p className='text-gray-100 text-xl font-extrabold'>Transit</p>
//           </div>
//           <ul className='text-gray-300 px-2 pb-10 my-6 transition-all ease-in-out'>
//             <li><Link className='block w-full px-2 py-1 font-bold rounded text-xs hover:bg-yellow-500 hover:bg-opacity-50 hover:text-sm hover:transition-all duration-500 ease-in-out'>Profile</Link></li>
//             <li><Link to="buses" className='block w-full px-2 py-1 font-bold rounded text-xs hover:bg-yellow-500 hover:bg-opacity-50 hover:text-sm hover:transition-all duration-500 ease-in-out'>Buses</Link></li>
//             <li><Link to="routes" className='block w-full px-2 py-1 font-bold rounded text-xs hover:bg-yellow-500 hover:bg-opacity-50 hover:text-sm hover:transition-all duration-500 ease-in-out'>Routes</Link></li>
//             <li><Link to="drivers" className='block w-full px-2 py-1 font-bold rounded text-xs hover:bg-yellow-500 hover:bg-opacity-50 hover:text-sm hover:transition-all duration-500 ease-in-out'>Drivers</Link></li>
//           </ul>
//         </div>
//       </div>
//       <main className="ml-[20%] p-4"> {/* Adjust this margin to align with sidebar width */}
//         <Outlet />
//       </main>
//     </>
//   );
// }

// export default VendorDashboard;
