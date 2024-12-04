import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { RouteCard } from "../component/RouteCard";
import { LoadingAnimation } from "../component/LoadingAnimation";
import { useSelector } from "react-redux";
function RouteDetailPage() {
  const { routeId } = useParams();
  const numericRouteId = Number(routeId); 
  // const [routeDetails, setRouteDetails] = useState(null);
  const routeData = useSelector((state)=>state.route.routeData)
  const [routeDetails,setRouteDetails] = useState(null)
  console.log(routeData)
  useEffect(() => {
    const foundRoute = routeData.find((route) => route.RouteID === numericRouteId);
    setRouteDetails(foundRoute); // Updates state only once per change in dependencies
  }, [routeId, routeData]);

  if (!routeDetails) {
    return <> <LoadingAnimation/> </>;
  }

  return (
    <div className="bg-gray-950 p-8">
      <div className="p-6 bg-gray-900 min-h-screen text-gray-100 border border-gray-600 rounded">
      <h2 className="text-4xl font-bold mb-4">
          <span className="text-yellow-500">Route</span> Details
        </h2>
        {/* Route Information */}
        <div className="mb-8 text-gray-400">
        <p className=" mb-2">
            <span className="font-semibold text-gray-200">Route ID:</span> {routeDetails.RouteID}
          </p>
          <p className="text-lg font-bold text-yellow-500 ">
          <span className="text-lg font-semibold text-gray-200">Route Name: </span>{routeDetails.RouteName}
          </p>
          <p className=" mb-2">
            <span className="font-semibold text-gray-200">Start Point:</span> {routeDetails.RouteStartPoint}
          </p>
          <p className=" mb-2">
            <span className="font-semibold text-gray-200">End Point:</span> {routeDetails.RouteEndPoint}
          </p>
          <p className=" mb-2">
            <span className="font-semibold text-gray-200">Number of stops:</span> {routeDetails.NumberOfStops}
          </p>
        
          
        </div>

        {/* Route Stops with Map */}
        <RouteCard routeStops={routeDetails?.StopDetails} />
      </div>
    </div>
  );
}

export default RouteDetailPage;
