import React, { useState, useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import { FaBars } from "react-icons/fa";
function VendorDashboard() {
  const [sideBarOpen, setSideBarOpen] = useState(false);

  // Check screen size on initial load and adjust sidebar state
  useEffect(() => {
    const isMediumOrLarger = window.innerWidth >= 768;
    setSideBarOpen(isMediumOrLarger);
  }, []);

  function toggleSideBar() {
    setSideBarOpen(!sideBarOpen);
  }

  return (
    <>
      <div className="bg-gray-950 font-zendot">
      <div className="fixed bg-gray-950 w-full top-0 left-0 h-12 text-gray-400 border-b border-gray-600 z-10 flex justify-between items-center px-4">
        <div className="flex justify-center items-center">
        <button
          className="mr-4 p-2 rounded hover:bg-gray-800 transition-colors duration-300"
          onClick={toggleSideBar}
        >
          <FaBars className="text-xl text-gray-400 hover:text-yellow-600 transition duration-300" />
        </button>
        <p className="text-xl font-bold text-gray-200">Dashboard</p>
        </div>
        <div className="sm:text-sm">
          <button className="font-bold text-gray-400 hover:text-yellow-600 hover:transition duration-300 ">Sign Out</button>
        </div>
      </div>

      <div
        className={`bg-gray-950 h-screen md:w-1/5 sm:w-2/5 fixed top-12 left-0 ${
          sideBarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-all duration-300 ease-in-out z-10`}
      >
        <div className="h-full max-h-screen overflow-y-auto flex flex-col px-2 py-4">
          <div className="p-3">
            <p className="text-yellow-600 md:text-6xl text-4xl font-electrolize">FAST</p>
            <p className="text-gray-100 md:text-4xl text-xl  font-electrolize">Transit</p>
          </div>
          <ul className="text-gray-300 px-2 pb-10 mb-6 transition-all ease-in-out">
            {/* <li>
              <Link
                to="buses"
                className="block w-full px-2 py-1 font-bold rounded md:text-base text-xs hover:bg-yellow-500 hover:bg-opacity-50 hover:text-sm hover:transition-all duration-500 ease-in-out"
              >
                Buses
              </Link>
            </li> */}
            <li>
              <Link
                to="view-routes"
                className="block w-full px-2 py-1 font-bold rounded md:text-base text-xs hover:bg-yellow-500 hover:bg-opacity-50 hover:text-sm hover:transition-all duration-500 ease-in-out"
              >
                Routes
              </Link>
            </li>
            <li>
              <Link
                to="avail-service"
                className="block w-full px-2 py-1 font-bold rounded md:text-base text-xs hover:bg-yellow-500 hover:bg-opacity-50 hover:text-sm hover:transition-all duration-500 ease-in-out"
              >
                Avail Service
              </Link>
            </li>
            {/* <li>
              <Link
                to="drivers"
                className="block w-full px-2 py-1 font-bold rounded md:text-base text-xs hover:bg-yellow-500 hover:bg-opacity-50 hover:text-sm hover:transition-all duration-500 ease-in-out"
              >
                Drivers
              </Link>
            </li> */}
            <li>
              <Link className="block w-full px-2 py-1 font-bold rounded md:text-base text-xs hover:bg-yellow-500 hover:bg-opacity-50 hover:text-sm hover:transition-all duration-500 ease-in-out">
                Profile
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
      </div>
    </>
  );
}

export default VendorDashboard;


// import React from 'react';
// import { useState,useEffect } from 'react';
// import {AlertDialogSlide} from '../component/AlertDialogSlide'; // Adjust the path as necessary
// import { useSelector } from 'react-redux';
// import { Link ,Outlet} from "react-router-dom";
// import AvailServiceForm from '../component/UserComponents/AvailServiceForm';
// import { useDispatch } from 'react-redux';
// import { setRouteData } from '../features/routeSlice';
// import { LoadingAnimation } from '../component/LoadingAnimation';
// import useFetch from '../hooks/useFetch';

// function UserDashboard() {
//   //bring routes data first

//   const userData = useSelector((state)=>state.user)
//   console.log(userData)
//   const handleLogout = ()=>{

//   }

//   // const dispatch = useDispatch();
//   // const [searchTerm, setSearchTerm] = useState("");  
//   // const [url, setUrl] = useState(null);
//   // const { data, loading, error, setError, setLoading, setData } = useFetch(url);
//   // if(data?.routes){
//   //   dispatch(setRouteData({
//   //     routeData:data.routes
//   //   }))
//   // }
//   // const routeData = useSelector((state)=>state.route)
//   // console.log(routeData)

//   // useEffect(() => {
//   //   setUrl('http://localhost:8000/admin/Vendor/dropdown/View/Route');
//   //   console.log(data)
//   // }, []);

//   // if(loading){
//   //   return <LoadingAnimation/>
//   // }


//   return (
//     <div className='bg-gray-950 min-h-screen text-yellow-600'>
//       <h1>User Dashboard</h1>
//       <p>Welcome to the user dashboard. Here is your dialog box: {userData.data.Email}</p>
//       <AlertDialogSlide />
//       <button
//       variant="outlined"    
//         onClick={handleLogout}
//         // className="px-6 py-2  text-yellow-600 border-2 border-yellow-600  font-base  hover:bg-gray-700 rounded-md shadow-md"
//         className='transition-all duration-200 border-2 border-yellow-700 rounded-lg p-2 text-yellow-600 hover:bg-yellow-700 hover:bg-opacity-20 hover:border-yellow-500 hover:shadow-yellow-600 '
//       >
//         Logout
//       </button>

//       {/* <button onClick={} >Avail Service </button> */}
//       <div><Link to="routes">View Routes</Link></div>
//       <div><Link to="avail-service">Avail Transport Service</Link></div>
//       <main>
//         <Outlet />
//       </main>
//     </div>
//   );
// }

// export default UserDashboard
