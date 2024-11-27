import React, { useEffect, useState } from "react";
import BusInfoCard from "../component/BusInfoCard/BusInfoCard";
import DriverInfoCard from "../component/DriverInfoCard/DriverInfoCard";
import { BusLayout } from "../component/BusLayout";
import { RouteCard } from "../component/RouteCard";
import { LoadingAnimation } from "../component/LoadingAnimation";

const BusDetailPage = () => {
  const [busData, setBusData] = useState(null);
  const [routeStops, setRouteStops] = useState([]);

  useEffect(() => {
    // Simulated bus data
    const fetchBusData = async () => {
      const busResponse = {
        bus: {
          numberPlate: "AB1234",
          occupiedSeats: [
            { seatNumber: 2, gender: "male" },
            { seatNumber: 5, gender: "female" },
            { seatNumber: 9, gender: "male" },
          ],
          layout: [
            { row: 1, left: [1, 2], right: [3, 4], last: [] },
            { row: 2, left: [5, 6], right: [7, 8], last: [] },
            { row: 3, left: [9, 10], right: [11, 12], last: [] },
            { row: 4, left: [13, 14], right: [15, 16], last: [] },
            { row: 5, left: [17, 18], right: [19, 20], last: [] },
            {
              row: 6,
              left: [21, 22],
              right: [23, 24],
              last: [25, 26, 27, 28, 29, 29],
            },
          ],
        },
        driver: {
          name: "John Doe",
          contact: "123-456-7890",
        },
      };
      setBusData(busResponse);
    };

    // Simulated route stops data
    const fetchRouteStops = async () => {
      const routeResponse = [
        {
          stopName: "Main Station",
          latitude: 24.8607,
          longitude: 67.0011,
          estimatedArrivalTime: "08:00 AM",
        },
        {
          stopName: "Central Market",
          latitude: 24.8623,
          longitude: 67.0204,
          estimatedArrivalTime: "08:15 AM",
        },
        {
          stopName: "Park Avenue",
          latitude: 24.8655,
          longitude: 67.0359,
          estimatedArrivalTime: "08:30 AM",
        },
        {
          stopName: "City Square",
          latitude: 24.8691,
          longitude: 67.0506,
          estimatedArrivalTime: "08:45 AM",
        },
        {
          stopName: "University Campus",
          latitude: 24.8713,
          longitude: 67.0652,
          estimatedArrivalTime: "09:00 AM",
        },
      ];
      setRouteStops(routeResponse);
    };

    fetchBusData();
    fetchRouteStops();
  }, []);

  if (!busData) {
    return <> <LoadingAnimation/> </>
  }

  const { bus, driver } = busData;

  // Check seat occupancy and gender
  // const getSeatClass = (seatNumber) => {
  //   const occupiedSeat = bus.occupiedSeats.find(
  //     (seat) => seat.seatNumber === seatNumber
  //   );
  //   if (occupiedSeat) {
  //     return occupiedSeat.gender === "male" ? "bg-blue-500" : "bg-pink-500";
  //   }
  //   return "bg-yellow-600"; // Vacant seat
  // };

  return (
    <div className="bg-gray-950 p-8 min-h-screen text-gray-100">
      <div className="p-6 border border-gray-600 rounded bg-gray-900">
        <h2 className="text-4xl font-bold mb-4">
          <span className="text-yellow-500">Bus</span> Details
        </h2>
        {/* Info Cards Row */}
        <div className="flex flex-col md:flex-row gap-8 mb-8 mt-8 ">
          <BusInfoCard busData={bus} />
          <DriverInfoCard driver={driver} />
        </div>

        {/* Bus Layout Section */}
        <div className="bg-gray-800 border border-gray-600 rounded p-6 mb-8 ">
          <h2 className="text-2xl font-bold  text-gray-100 md:mb-8 mb-2">
            Bus Layout
          </h2>
          <BusLayout bus={bus} />
        </div>
        
        <RouteCard />

      </div>
    </div>
  );
};

export default BusDetailPage;
