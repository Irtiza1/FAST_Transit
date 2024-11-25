import React from 'react';
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const icon = new L.Icon({
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

function RouteCard({ routeStops }) {
  return (
    <div className="bg-gray-800 border border-gray-600 rounded p-6 mb-8">
      <h2 className="text-2xl font-bold mb-4 text-gray-100">Route Stops</h2>
      <div className="lg:flex lg:space-x-6">
        {/* Route Map */}
        <div className="lg:w-1/2 z-0">
          <MapContainer
            center={[24.8607, 67.0011]}
            zoom={13}
            style={{ height: "400px" }}
            className="rounded-lg shadow-lg z-0"
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

            {(routeStops || []).map((stop, index) => (
              <Marker
                key={index}
                position={[
                  parseFloat(stop.Latitude),
                  parseFloat(stop.Longitude),
                ]}
                icon={icon}
              >
                <Popup>
                  <strong>{stop.StopName}</strong>
                </Popup>
              </Marker>
            ))}

            <Polyline
              positions={(routeStops || []).map((stop) => [
                parseFloat(stop.Latitude),
                parseFloat(stop.Longitude),
              ])}
              color="blue"
            />
          </MapContainer>
        </div>
        <div className="lg:w-1/2 mt-4 lg:mt-0">
          <ul className="bg-gray-900 rounded p-4 text-gray-300 border border-gray-600">
            {(routeStops || []).map((stop, index) => (
              <li
                key={index}
                className="m-1 p-2 border-b border-gray-600 last:border-none"
              >
                <div className="flex justify-between">
                  <span className="font-semibold">{stop.StopName}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default RouteCard;
