// import React, { useEffect, useState } from 'react';
// import { FaBullhorn, FaBus, FaChartBar, FaClipboardList } from 'react-icons/fa';
// import {Link, NavLink} from 'react-router-dom';

// function HomePage() {
//   const [isLoaded, setIsLoaded] = useState(false);

//   useEffect(() => {
//     const timer = setTimeout(() => setIsLoaded(true), 500); // Delay to load cards
//     return () => clearTimeout(timer);
//   }, []);

//   const features = [
//     {
//       id: 1,
//       icon: <FaBullhorn className="text-6xl text-gray-500" />,
//       title: 'Make an Announcement',
//       description: 'Reach out to your audience with ease.',
//       linkTo:''
//     },
//     {
//       id: 2,
//       icon: <FaBus className="text-6xl text-gray-500" />,
//       title: 'Register a Bus',
//       description: 'Add new buses to your fleet.',
//       linkTo:'create-bus'
//     },
//     {
//       id: 3,
//       icon: <FaChartBar className="text-6xl text-gray-500" />,
//       title: 'View Stats',
//       description: 'Get insights on performance.',
//       linkTo:''
//     },
//     {
//       id: 4,
//       icon: <FaClipboardList className="text-6xl text-gray-500" />,
//       title: 'View Registrations',
//       description: 'Manage bus registrations easily.',
//       linkTo:''
//     },
//   ];

//   return (
//     <div className="min-h-screen bg p-6 flex flex-col items-center relative">
//       {/* Subtle background pattern */}
//       <div className="absolute inset-0 bg-gray-950 pointer-events-none"></div>

//       <h1 className="text-5xl font-extrabold text-gray-50 mb-12 z-10">
//         Vendor Dashboard
//       </h1>

//       <div  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 w-full max-w-7xl">
//         {features.map((feature, index) => (
//           <NavLink
//             to={`/${feature.linkTo}`}
//             key={feature.id}
//             className={`transform transition-transform duration-500 ease-in-out ${
//               isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
//             } delay-${index * 200}`}
//             style={{ transitionDelay: `${index * 200}ms` }} // Smooth staggered animation
//           >
//             <div className="bg-gray-300 rounded-xl border border-black  p-10 w-72 h-72 flex flex-col items-center justify-center hover:bg-gray-50 hover:-translate-y-4 transition-transform">
//               {feature.icon}
//               <h3 className="mt-6 text-2xl font-semibold text-gray-800 text-center">
//                 {feature.title}
//               </h3>
//               <p className="mt-2 text-gray-600 text-center">{feature.description}</p>
//             </div>
//           </NavLink>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default HomePage;
// import React from "react";

// const Dashboard = () => {
//   return (
//     <div className="p-6 bg-gray-900 min-h-screen text-gray-100 space-y-6">
//       <h2 className="text-4xl font-bold text-center mb-8">
//         Vendor <span className="text-yellow-500">Dashboard</span>
//       </h2>

//       <div className="flex flex-col lg:flex-row gap-6">
//         {/* Left Side (Main Content) */}
//         <div className="lg:w-2/3 space-y-6">
//           {/* View Buses Card */}
//           <div className="bg-gray-800 p-4 rounded-lg shadow-lg space-y-4">
//             <h3 className="text-2xl font-bold">Buses</h3>
//             <ul className="space-y-2">
//               {/* Display 2-3 buses */}

//               <li className="p-2 bg-gray-700 rounded flex justify-between"><span className="m-1">Bus 1</span><span className="m-1">capacity:32</span><span className="m-1">Route Name:</span>Diver Name:</li>
//               <li className="p-2 bg-gray-700 rounded flex justify-between"><span className="m-1">Bus 1</span><span className="m-1">capacity:32</span><span className="m-1">Route Name:</span>Diver Name:</li>
//               <li className="p-2 bg-gray-700 rounded flex justify-between"><span className="m-1">Bus 1</span><span className="m-1">capacity:32</span><span className="m-1">Route Name:</span>Diver Name:</li>
//             </ul>
//             <button className="text-yellow-500 mt-2 hover:underline">View All</button>
//           </div>

//           {/* Routes and Drivers Cards */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             {/* View Routes Card */}
//             <div className="bg-gray-800 p-4 rounded-lg shadow-lg space-y-4">
//               <h3 className="text-2xl font-bold">View Routes</h3>
//               <ul className="space-y-2">
//                 {/* Display 2-3 routes */}
//                 <li className="p-2 bg-gray-700 rounded">Route 1 Details</li>
//                 <li className="p-2 bg-gray-700 rounded">Route 2 Details</li>
//                 <li className="p-2 bg-gray-700 rounded">Route 3 Details</li>
//               </ul>
//               <button className="text-yellow-500 mt-2 hover:underline">View All</button>
//             </div>

//             {/* View Drivers Card */}
//             <div className="bg-gray-800 p-4 rounded-lg shadow-lg space-y-4">
//               <h3 className="text-2xl font-bold">View Drivers</h3>
//               <ul className="space-y-2">
//                 {/* Display 2-3 drivers */}
//                 <li className="p-2 bg-gray-700 rounded">Driver 1 Details</li>
//                 <li className="p-2 bg-gray-700 rounded">Driver 2 Details</li>
//                 <li className="p-2 bg-gray-700 rounded">Driver 3 Details</li>
//               </ul>
//               <button className="text-yellow-500 mt-2 hover:underline">View All</button>
//             </div>
//           </div>
//         </div>

//         {/* Right Side (Notifications and Complaints) */}
//         <div className="lg:w-1/3 space-y-6">
//           {/* Notifications Card */}
//           <div className="bg-gray-800 p-4 rounded-lg shadow-lg space-y-4">
//             <h3 className="text-2xl font-bold">Notifications</h3>
//             <ul className="space-y-2">
//               {/* Display few notifications */}
//               <li className="p-2 bg-gray-700 rounded">Notification 1</li>
//               <li className="p-2 bg-gray-700 rounded">Notification 2</li>
//               <li className="p-2 bg-gray-700 rounded">Notification 3</li>
//             </ul>
//             <button className="text-yellow-500 mt-2 hover:underline">View All</button>
//           </div>

//           {/* Complaints Card */}
//           <div className="bg-gray-800 p-4 rounded-lg shadow-lg space-y-4">
//             <h3 className="text-2xl font-bold">Complaints</h3>
//             <ul className="space-y-2">
//               {/* Display few complaints */}
//               <li className="p-2 bg-gray-700 rounded">Complaint 1</li>
//               <li className="p-2 bg-gray-700 rounded">Complaint 2</li>
//               <li className="p-2 bg-gray-700 rounded">Complaint 3</li>
//             </ul>
//             <button className="text-yellow-500 mt-2 hover:underline">View All</button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;

import React from "react";
import { FaPlus } from "react-icons/fa";

const Dashboard = () => {
  return (
    <div className="bg-gray-950 p-8">
      <div className="p-6 bg-gray-900 min-h-screen text-gray-100 space-y-6 border border-gray-500  rounded">
        <h2 className="text-4xl font-bold mb-8">
          Vendor <span className="text-yellow-500">Dashboard</span>
        </h2>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left Side (Main Content) */}
          <div className="lg:w-2/3 space-y-6">
            {/* View Buses Card */}
            <div className="bg-gray-900 p-6 rounded border border-gray-500 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-bold">Buses</h3>
                <div className="flex items-center space-x-4">
                  {/* Search Bar */}
                  <input
                    type="text"
                    placeholder="Search bus..."
                    className="px-4 py-2 rounded-lg text-gray-300 bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 border border-gray-500"
                  />
                  {/* Add Bus Button */}
                  <button className="flex items-center px-4 py-2 bg-yellow-500 text-gray-900 font-bold rounded-lg hover:bg-yellow-600 transition">
                    <FaPlus className="mr-2" />
                    Add Bus
                  </button>
                </div>
              </div>
              <ul className="space-y-2">
                {/* Display 2-3 buses */}
                <li className="p-2 bg-gray-700 rounded flex justify-between">
                  <span className="m-1">Bus Number</span>
                  <span className="m-1">capacity:32</span>
                  <span className="m-1">Route Name: Not assigned</span>
                  <span className="m-1">Diver Name: Not assigned</span>
                </li>
                <li className="p-2 bg-gray-700 rounded flex justify-between">
                  <span className="m-1">Bus Number</span>
                  <span className="m-1">capacity:32</span>
                  <span className="m-1">Route Name: Not assigned</span>
                  <span className="m-1">Diver Name: Not assigned</span>
                </li>
                <li className="p-2 bg-gray-700 rounded flex justify-between">
                  <span className="m-1">Bus Number</span>
                  <span className="m-1">capacity:32</span>
                  <span className="m-1">Route Name: Not assigned</span>
                  <span className="m-1">Diver Name: Not assigned</span>
                </li>
              </ul>
              <button className="text-yellow-500 mt-2 hover:underline ">
                View All
              </button>
            </div>

            {/* Routes and Drivers Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* View Routes Card */}
              <div className="bg-gray-900 border border-gray-500 p-4 rounded  space-y-4">
                <h3 className="text-2xl font-bold">View Routes</h3>
                <ul className="space-y-2">
                  {/* Display 2-3 routes */}
                  <li className="p-2 bg-gray-700 rounded">Route 1 Details</li>
                  <li className="p-2 bg-gray-700 rounded">Route 2 Details</li>
                  <li className="p-2 bg-gray-700 rounded">Route 3 Details</li>
                </ul>
                <button className="text-yellow-500 mt-2 hover:underline">
                  View All
                </button>
              </div>

              {/* View Drivers Card */}
              <div className="bg-gray-900 border border-gray-500 p-4 rounded space-y-4">
                <h3 className="text-2xl font-bold">View Drivers</h3>
                <ul className="space-y-2">
                  {/* Display 2-3 drivers */}
                  <li className="p-2 bg-gray-700 rounded">Driver 1 Details</li>
                  <li className="p-2 bg-gray-700 rounded">Driver 2 Details</li>
                  <li className="p-2 bg-gray-700 rounded">Driver 3 Details</li>
                </ul>
                <button className="text-yellow-500 mt-2 hover:underline">
                  View All
                </button>
              </div>
            </div>
          </div>

          {/* Right Side (Notifications and Complaints) */}
          <div className="lg:w-1/3 space-y-6">
            {/* Notifications Card */}
            <div className="bg-gray-900 border border-gray-500 p-4 rounded space-y-4">
              <h3 className="text-2xl font-bold">Notifications</h3>
              <ul className="space-y-2">
                {/* Display few notifications */}
                <li className="p-2 bg-gray-700 rounded">Notification 1</li>
                <li className="p-2 bg-gray-700 rounded">Notification 2</li>
                <li className="p-2 bg-gray-700 rounded">Notification 3</li>
              </ul>
              <button className="text-yellow-500 mt-2 hover:underline">
                View All
              </button>
            </div>

            {/* Complaints Card */}
            <div className="bg-gray-900 border border-gray-500 p-4 rounded space-y-4">
              <h3 className="text-2xl font-bold">Complaints</h3>
              <ul className="space-y-2">
                {/* Display few complaints */}
                <li className="p-2 bg-gray-700 rounded">Complaint 1</li>
                <li className="p-2 bg-gray-700 rounded">Complaint 2</li>
                <li className="p-2 bg-gray-700 rounded">Complaint 3</li>
              </ul>
              <button className="text-yellow-500 mt-2 hover:underline">
                View All
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
