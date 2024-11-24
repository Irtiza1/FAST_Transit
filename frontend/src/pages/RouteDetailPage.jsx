import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { RouteCard } from "../component/RouteCard";
import { LoadingAnimation } from "../component/LoadingAnimation";
function RouteDetailPage() {
  const { routeId } = useParams();
  const [routeDetails, setRouteDetails] = useState(null);

  useEffect(() => {
    // Commenting out the API call for now; using dummy data instead
    // axios.get(`/api/routes/${routeId}`)
    //   .then((response) => {
    //     setRouteDetails(response.data);
    //   })
    //   .catch((error) => {
    //     console.error("Error fetching route details:", error);
    //   });

    // Dummy data for testing
    setRouteDetails({
      id: 1,
      name: "Downtown to Uptown Express",
      startPoint: "Downtown",
      endPoint: "Uptown",
      distance: 15.4,
      estimatedDuration: "30 minutes",
      stops: [
        { stopName: "Downtown Station", latitude: 24.8607, longitude: 67.0011, estimatedArrivalTime: "08:30 AM" },
        { stopName: "Central Park", latitude: 24.8655, longitude: 67.0099, estimatedArrivalTime: "08:45 AM" },
        { stopName: "Uptown Station", latitude: 24.8705, longitude: 67.0153, estimatedArrivalTime: "09:00 AM" }
      ]
    });
  }, [routeId]);

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
          <p className="text-lg font-bold text-yellow-500 ">
          <span className="text-lg font-semibold text-gray-200">Route Name: </span>{routeDetails.name}
          </p>
          <p className=" mb-2">
            <span className="font-semibold text-gray-200">Start Point:</span> {routeDetails.startPoint}
          </p>
          <p className=" mb-2">
            <span className="font-semibold text-gray-200">End Point:</span> {routeDetails.endPoint}
          </p>
          <p className=" mb-2">
            <span className="font-semibold text-gray-200">Distance:</span> {routeDetails.distance} km
          </p>
          <p className=" mb-2">
            <span className="font-semibold text-gray-200">Estimated Duration:</span> {routeDetails.estimatedDuration}
          </p>
        </div>

        {/* Route Stops with Map */}
        {/* <RouteCard routeStops={routeDetails.stops} /> */}
        <RouteCard />
      </div>
    </div>
  );
}

export default RouteDetailPage;
