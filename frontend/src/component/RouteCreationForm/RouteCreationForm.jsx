import React, { useState, useRef, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
  useMap,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import axios from "axios";
import "tailwindcss/tailwind.css";

const icon = new L.Icon({
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

function RouteCreationForm({ routeData, setRouteData, existingRoute }) {
  const [searchInput, setSearchInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchedLocation, setSearchedLocation] = useState(null);
  const searchResultsRef = useRef(null);

  function MapClickHandler() {
    useMapEvents({
      click: (event) => {
        addStop(event.latlng.lat, event.latlng.lng);
      },
    });
    return null;
  }

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        searchResultsRef.current &&
        !searchResultsRef.current.contains(event.target)
      ) {
        setSearchResults([]); // Close search results
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const addStop = (lat, lng, name = `Stop ${routeData.stops.length + 1}`) => {
    setSearchedLocation(null);
    const newStop = {
      stopName: name,
      latitude: lat,
      longitude: lng,
      estimatedArrivalTime: null,
    };
    setRouteData((prevData) => {
      const stops = [...prevData.stops, newStop];
      const startPoint = stops[0];
      const endPoint = stops[stops.length - 1];
      return { ...prevData, stops, startPoint, endPoint };
    });
  };

  const removeStop = (index) => {
    setRouteData((prevData) => {
      const stops = prevData.stops.filter((_, i) => i !== index);
      const startPoint = stops[0];
      const endPoint = stops[stops.length - 1];
      return { ...prevData, stops, startPoint, endPoint };
    });
  };

  const searchLocation = async () => {
    if (searchInput.trim() === "") return;
    const response = await axios.get(
      "https://nominatim.openstreetmap.org/search",
      {
        params: {
          q: searchInput,
          format: "json",
        },
      }
    );
    setSearchResults(response.data);
  };

  const selectSearchResult = (result) => {
    const { lat, lon } = result;
    setSearchedLocation([parseFloat(lat), parseFloat(lon)]);
    setSearchResults([]);
    setSearchInput("");
  };

  const CenterMapOnSearch = () => {
    const map = useMap();
    if (searchedLocation) {
      map.setView(searchedLocation, 15);
    }
    return null;
  };

  const handleStopNameChange = (index, newName) => {
    setRouteData((prevData) => {
      const updatedStops = prevData.stops.map((stop, i) => {
        if (i === index) {
          return { ...stop, stopName: newName };
        }
        return stop;
      });
      return { ...prevData, stops: updatedStops };
    });
  };
  useEffect(() => {
    if (existingRoute) {
      setRouteData({
        routeName: existingRoute.routeName,
        startPoint: existingRoute.startPoint,
        endPoint: existingRoute.endPoint,
        stops: existingRoute.stops,
      });
    }
  }, [existingRoute]);
  return (
    <>
      <div className="lg:flex lg:space-x-6 border border-gray-600 rounded px-4 py-8 my-6">
        <div className=" lg:w-2/3">
          <h2 className="text-4xl font-bold mb-4 text-gray-100">
            Register New <span className="text-yellow-500">Route</span>
          </h2>
        </div>

        <div className="w-full">
          <input
            placeholder="Enter route name"
            type="text"
            value={routeData.routeName}
            onChange={(e) =>
              setRouteData({ ...routeData, routeName: e.target.value })
            }
            className="text-gray-300 bg-gray-800 border border-gray-600  rounded p-2 w-full focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition duration-200"
          />
        </div>
      </div>

      <div className="lg:flex lg:space-x-6">
        {/* Left Column: Search & Map */}
        <div className="lg:w-1/2 space-y-4">
          {/* Search input above the map */}
          <div className="relative mb-4 w-full flex flex-col items-center">
            <div className="flex w-full">
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Search for location"
                className="text-gray-300 bg-gray-800 border border-gray-600 border-r-0  rounded-l p-2 w-full   focus:ring-transparent focus:border-none "
              />
              <button
                onClick={searchLocation}
                className="bg-gray-500 hover:bg-yellow-600 text-white px-4 py-1 border border-gray-600 rounded-r w-1/3 font-semibold"
              >
                Search
              </button>
            </div>

            {/* Search results */}
            {searchResults.length > 0 && (
              <ul
                ref={searchResultsRef}
                className="absolute top-full  text-gray-300  bg-gray-800 border border-gray-600  max-h-40 overflow-y-auto w-full z-20 "
              >
                {searchResults.map((result, index) => (
                  <li
                    key={index}
                    onClick={() => selectSearchResult(result)}
                    className="p-2 cursor-pointer  hover:bg-gray-900 text-sm"
                  >
                    {result.display_name}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <MapContainer
            center={[24.8575, 67.2645]}
            zoom={15}
            style={{ height: "400px" }}
            className="rounded-lg shadow-lg z-0"
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <CenterMapOnSearch />
            <MapClickHandler />

            {routeData.stops.map((stop, index) => (
              <Marker
                key={index}
                position={[stop.latitude, stop.longitude]}
                icon={icon}
              >
                <Popup>
                  {stop.stopName}
                  <button
                    onClick={() => removeStop(index)}
                    className="bg-red-500 text-white px-2 py-1 rounded mt-2 block text-center w-full"
                  >
                    Remove
                  </button>
                </Popup>
              </Marker>
            ))}

            {routeData.stops.length > 1 && (
              <Polyline
                positions={routeData.stops.map((stop) => [
                  stop.latitude,
                  stop.longitude,
                ])}
                color="blue"
              />
            )}
          </MapContainer>
        </div>

        {/* Right Column: Stops Information */}
        <div className="lg:w-1/2 mt-6 lg:mt-0 ">
          <h4 className="text-3xl font-bold mb-4 text-gray-100">Stops </h4>
          <span className="text-sm font-normal p-2 text-gray-100">
            You may edit stop name by clicking on them
          </span>
          <ul className="bg-gray-800 mt-2  rounded text-gray-300 md:max-h-[375px] md:overflow-y-auto">
            {routeData.stops.map((stop, index) => (
              <li
                key={index}
                className="mb-2 p-2  border-b  border-gray-600 last:border-none"
              >
                <div className="flex justify-between">
                  <span>
                    <input
                      type="text"
                      value={stop.stopName}
                      onChange={(e) =>
                        handleStopNameChange(index, e.target.value)
                      }
                      className="bg-gray-800 text-gray-300 p-2"
                    />
                  </span>
                  {/* <span className="p-2">
                    Lat: {stop.latitude.toFixed(4)}, Lng:{" "}
                    {stop.longitude.toFixed(4)}
                  </span> */}
                  <button
                    onClick={() => removeStop(index)}
                    className="text-red-400 hover:bg-red-950 rounded p-2"
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default RouteCreationForm;
