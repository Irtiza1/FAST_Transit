import React from "react";
const Dashboard = () => {
  return (
    // <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-b from-blue-300 to-blue-500 overflow-hidden relative">
    //   {/* Clouds */}
    //   <div className="absolute top-10 w-full flex justify-around opacity-70">
    //     <div className="h-16 w-32 bg-white rounded-full animate-cloud-move"></div>
    //     <div className="h-12 w-24 bg-white rounded-full animate-cloud-move"></div>
    //     <div className="h-20 w-36 bg-white rounded-full animate-cloud-move"></div>
    //   </div>
      
    //   {/* Bus Animation */}
    //   <div className="flex items-center animate-bus-move space-x-4">
    //     <FaBus className="text-6xl text-yellow-500 animate-bounce-wheels" />
    //     <div className="flex space-x-1">
    //       <div className="h-2 w-2 bg-gray-700 rounded-full animate-bounce-wheels"></div>
    //       <div className="h-2 w-2 bg-gray-700 rounded-full animate-bounce-wheels"></div>
    //     </div>
    //   </div>
      
    //   {/* Loading Text */}
    //   <p className="mt-6 text-white text-lg font-bold animate-pulse">
    //     Loading, please wait...
    //   </p>
      
    //   {/* Road */}
    //   <div className="absolute bottom-0 w-full h-10 bg-gray-800 flex items-center">
    //     <div className="h-1 w-10 bg-yellow-500 mx-2 animate-cloud-move"></div>
    //     <div className="h-1 w-10 bg-yellow-500 mx-2 animate-cloud-move"></div>
    //     <div className="h-1 w-10 bg-yellow-500 mx-2 animate-cloud-move"></div>
    //   </div>
    // </div>
    
    // <div className="flex items-center justify-center h-screen bg-gray-950 relative overflow-hidden">
    //   {/* Animated Bus */}
    //   <div className="absolute animate-bus-move">
    //     <FaBusAlt className="text-yellow-600 text-6xl drop-shadow-lg" />
    //   </div>

    //   {/* Road */}
    //   <div className="absolute bottom-0 w-full h-2 bg-gray-800 flex items-center">
    //     <div className="w-1/4 h-2 bg-gray-600"></div>
    //     <div className="w-1/4 h-2 bg-gray-800"></div>
    //     <div className="w-1/4 h-2 bg-gray-600"></div>
    //     <div className="w-1/4 h-2 bg-gray-800"></div>
    //   </div>

    //   {/* Loading Text */}
    //   <p className="absolute bottom-10 text-yellow-600 text-lg font-bold animate-pulse">
    //     Loading your transport data...
    //   </p>
    // </div>


    <div className="flex items-center justify-center h-screen bg-gray-950">
      <div className="text-center">
        {/* Spinner */}
        <div className="relative w-16 h-16 border-4 border-yellow-600 border-opacity-50 rounded-full animate-spin before:absolute before:w-full before:h-full before:border-4 before:border-yellow-600 before:border-t-transparent before:rounded-full before:animate-spin-slow"></div>

        {/* Loading Text */}
        <p className="mt-4 text-yellow-600 text-lg font-bold animate-pulse">
          Loading
        </p>
      </div>
    </div>
    
  );
};

export default Dashboard;
