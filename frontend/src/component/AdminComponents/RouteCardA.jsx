import React from "react";
import RouteCard from "../RouteCard/RouteCard.jsx";

function RouteCardA({ route }) {
  return (
    <div className="bg-gray-800 text-gray-100 rounded-lg shadow-lg p-6 mb-6">
      {/* Route Information */}
      <div className="mb-4">
        <h2 className="text-xl font-bold mb-2">{route.RouteName}</h2>
        <div className="text-sm text-gray-400">
          <p><strong>Start Point:</strong> {route.RouteStartPoint}</p>
          <p><strong>End Point:</strong> {route.RouteEndPoint}</p>
          <p><strong>Number of Stops:</strong> {route.NumberOfStops}</p>
        </div>
      </div>

      {/* Stops Details */}
      <div className="w-full">
        <RouteCard routeStops={route.StopDetails} />
      </div>
    </div>
  );
}

export default RouteCardA;
