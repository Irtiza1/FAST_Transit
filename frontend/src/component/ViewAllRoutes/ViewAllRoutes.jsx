import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Polyline, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "tailwindcss/tailwind.css";

// Custom marker icon setup
const icon = new L.Icon({
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

// Dummy route data
const dummyRoutes = [
  {
    routeName: "Route 1",
    stops: [
      { stopName: "Stop 1", latitude: 24.8575, longitude: 67.2645 },
      { stopName: "Stop 2", latitude: 24.8625, longitude: 67.2695 },
      { stopName: "Stop 3", latitude: 24.8675, longitude: 67.2745 },
    ],
  },
  {
    routeName: "Route 2",
    stops: [
      { stopName: "Stop A", latitude: 24.8500, longitude: 67.2600 },
      { stopName: "Stop B", latitude: 24.8550, longitude: 67.2650 },
      { stopName: "Stop C", latitude: 24.8600, longitude: 67.2700 },
    ],
  },
];

function ViewAllRoutes() {
  const [selectedRoute, setSelectedRoute] = useState(null);

  return (
    <div className="p-6 bg-gray-900 min-h-screen text-gray-100 border border-gray-500 rounded">
      <h2 className="text-4xl font-bold mb-8 text-center">View All <span className="text-yellow-500">Routes</span></h2>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* List of Routes */}
        <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
          <h3 className="text-2xl font-bold mb-4">Available Routes</h3>
          <ul className="space-y-4">
            {dummyRoutes.map((route, index) => (
              <li
                key={index}
                onClick={() => setSelectedRoute(route)}
                className="cursor-pointer p-4 bg-gray-700 hover:bg-gray-600 rounded-lg transition duration-200"
              >
                <span className="text-xl font-semibold">{route.routeName}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Map and Route Details */}
        <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
          {selectedRoute ? (
            <>
              <h3 className="text-2xl font-bold mb-4">{selectedRoute.routeName}</h3>
              <MapContainer
                center={[selectedRoute.stops[0].latitude, selectedRoute.stops[0].longitude]}
                zoom={13}
                style={{ height: "400px" }}
                className="rounded-lg shadow-lg"
              >
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

                {/* Markers and Polyline for the selected route */}
                {selectedRoute.stops.map((stop, index) => (
                  <Marker
                    key={index}
                    position={[stop.latitude, stop.longitude]}
                    icon={icon}
                  >
                    <Popup>{stop.stopName}</Popup>
                  </Marker>
                ))}
                <Polyline
                  positions={selectedRoute.stops.map((stop) => [stop.latitude, stop.longitude])}
                  color="blue"
                />
              </MapContainer>

              <ul className="mt-4 space-y-2 text-gray-300">
                {selectedRoute.stops.map((stop, index) => (
                  <li key={index} className="flex justify-between p-2 border-b border-gray-700 last:border-none">
                    <span>{stop.stopName}</span>
                    <span>Lat: {stop.latitude.toFixed(4)}, Lng: {stop.longitude.toFixed(4)}</span>
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <p className="text-center text-gray-500">Select a route to view details</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default ViewAllRoutes;
