import React, { useEffect, useState } from "react";
import { FaPlus, FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import axios from 'axios';
import { LoadingAnimation } from "../component/LoadingAnimation";
import useFetch from "../hooks/useFetch";
import { useDispatch } from "react-redux";
import { setRouteData } from "../features/routeSlice";
import { useSelector } from "react-redux";

const RoutesPage = () => {
  const dispatch = useDispatch();

  const [searchTerm, setSearchTerm] = useState("");  
  const [url, setUrl] = useState(null);
  const { data, loading, error, setError, setLoading, setData } = useFetch(url);
  if(data?.routes){
    dispatch(setRouteData({
      routeData:data.routes
    }))
  }
  const adminData = useSelector((state)=>state.route)
  console.log(adminData)
  // setRoutes(useSelector((state)=> state.route))
  // console.log(routes)
  useEffect(() => {
    setUrl('http://localhost:8000/admin/Vendor/dropdown/View/Route');
    console.log(data)
  }, []);
  if(loading){
    return <LoadingAnimation/>
  }
  return (
    <div className="bg-gray-950 p-8">
      <div className="p-6 bg-gray-900 min-h-screen text-gray-100 border border-gray-600 rounded">
        
        {/* Header with Title, Search Bar, and Add Button */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-6 space-y-4 lg:space-y-0">
          <h2 className="text-4xl font-bold mb-4">
            Registered <span className="text-yellow-500">Routes</span>
          </h2>

          <div className="flex lg:items-center justify-between space-x-2">
            {/* Search Bar */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search routes"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="text-gray-300 bg-gray-800 border border-gray-600 rounded p-2 pl-10 lg:w-64 md:w-64 w-2/3 focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition duration-200"
              />
              <FaSearch className="absolute left-3 top-3 text-gray-500" />
            </div>

            {/* Add Route Button */}
            {/* <Link to='/vendor/create-route' className="flex items-center bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold lg:px-4 lg:py-2 md:px-4 md:py-2 p-1 rounded text-sm">
              <FaPlus className="mr-2 text-sm" /> Add New Route
            </Link> */}
          </div>
        </div>

        {/* Route Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data?.routes
            .filter(
              (route) =>
                route.RouteName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                route.RouteStartPoint.toLowerCase().includes(searchTerm.toLowerCase()) ||
                route.RouteEndPoint.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map((route) => (
              <Link to={`/vendor/route/${route.RouteID}`}
                key={route.id}
                className="bg-gray-800 border border-gray-700 rounded-lg p-4 cursor-pointer hover:bg-gray-900 hover:shadow-lg transition-shadow duration-200"
              >
                <h2 className="text-lg font-semibold text-yellow-500 mb-2">
                  {route.RouteName}
                </h2>
                <p className="text-gray-400 mb-1">
                  <span className="font-medium text-gray-200">Start Point:</span> {route.RouteStartPoint}
                </p>
                <p className="text-gray-400">
                  <span className="font-medium text-gray-200">End Point:</span> {route.RouteEndPoint}
                </p>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
};

export default RoutesPage;
