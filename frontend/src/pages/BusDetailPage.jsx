import React, { useEffect, useState } from "react";
import BusInfoCard from "../component/BusInfoCard/BusInfoCard";
import DriverInfoCard from "../component/DriverInfoCard/DriverInfoCard";
import { BusLayout } from "../component/BusLayout";
import { RouteCard } from "../component/RouteCard";
import { LoadingAnimation } from "../component/LoadingAnimation";
import { useParams } from "react-router-dom";
import axios from "axios";

const bbusData = {
  message: "Bus details retrieved successfully.",
  data: {
    BusID: 30,
    BusNumber: "BUS-004",
    TotalSeats: 26,
    LeftRows: 4,
    LeftSeatsPerRow: 3,
    RightRows: 4,
    RightSeatsPerRow: 2,
    LastSeatsPerRow: 6,
    TotalOccupiedSeats: 0,
    MaleRowNumbers: [1, 2],
    FemaleRowNumbers: [5, 6],
    Seats: [
      // Left side seats
      { SeatID: 1, RowID: 1, SeatNumber: 1, OccupancyStatus: "Available", BookingStatus: "Not Booked" },
      { SeatID: 2, RowID: 1, SeatNumber: 2, OccupancyStatus: "Available", BookingStatus: "Not Booked" },
      { SeatID: 3, RowID: 1, SeatNumber: 3, OccupancyStatus: "Occupied", BookingStatus: "Booked" },
      { SeatID: 4, RowID: 2, SeatNumber: 1, OccupancyStatus: "Available", BookingStatus: "Not Booked" },
      { SeatID: 5, RowID: 2, SeatNumber: 2, OccupancyStatus: "Available", BookingStatus: "Not Booked" },
      { SeatID: 6, RowID: 2, SeatNumber: 3, OccupancyStatus: "Available", BookingStatus: "Not Booked" },
      { SeatID: 7, RowID: 3, SeatNumber: 1, OccupancyStatus: "Occupied", BookingStatus: "Booked" },
      { SeatID: 8, RowID: 3, SeatNumber: 2, OccupancyStatus: "Available", BookingStatus: "Not Booked" },
      { SeatID: 9, RowID: 3, SeatNumber: 3, OccupancyStatus: "Available", BookingStatus: "Not Booked" },
      { SeatID: 10, RowID: 4, SeatNumber: 1, OccupancyStatus: "Available", BookingStatus: "Not Booked" },
      { SeatID: 11, RowID: 4, SeatNumber: 2, OccupancyStatus: "Occupied", BookingStatus: "Booked" },
      { SeatID: 12, RowID: 4, SeatNumber: 3, OccupancyStatus: "Available", BookingStatus: "Not Booked" },

      // Right side seats
      { SeatID: 13, RowID: 1, SeatNumber: 1, OccupancyStatus: "Available", BookingStatus: "Not Booked" },
      { SeatID: 14, RowID: 1, SeatNumber: 2, OccupancyStatus: "Occupied", BookingStatus: "Booked" },
      { SeatID: 15, RowID: 2, SeatNumber: 1, OccupancyStatus: "Available", BookingStatus: "Not Booked" },
      { SeatID: 16, RowID: 2, SeatNumber: 2, OccupancyStatus: "Available", BookingStatus: "Not Booked" },
      { SeatID: 17, RowID: 3, SeatNumber: 1, OccupancyStatus: "Available", BookingStatus: "Not Booked" },
      { SeatID: 18, RowID: 3, SeatNumber: 2, OccupancyStatus: "Occupied", BookingStatus: "Booked" },
      { SeatID: 19, RowID: 4, SeatNumber: 1, OccupancyStatus: "Available", BookingStatus: "Not Booked" },
      { SeatID: 20, RowID: 4, SeatNumber: 2, OccupancyStatus: "Available", BookingStatus: "Not Booked" },

      // Last row seats
      { SeatID: 21, RowID: 5, SeatNumber: 1, OccupancyStatus: "Available", BookingStatus: "Not Booked" },
      { SeatID: 22, RowID: 5, SeatNumber: 2, OccupancyStatus: "Occupied", BookingStatus: "Booked" },
      { SeatID: 23, RowID: 5, SeatNumber: 3, OccupancyStatus: "Available", BookingStatus: "Not Booked" },
      { SeatID: 24, RowID: 5, SeatNumber: 4, OccupancyStatus: "Available", BookingStatus: "Not Booked" },
      { SeatID: 25, RowID: 5, SeatNumber: 5, OccupancyStatus: "Available", BookingStatus: "Not Booked" },
      { SeatID: 26, RowID: 5, SeatNumber: 6, OccupancyStatus: "Available", BookingStatus: "Not Booked" },
    ],
  },
};

const BusDetailPage = () => {
  const { busID } = useParams();
  const [busData, setBusData] = useState(null);
  const [busDetailData, setBusDetailData] = useState(null);
  const [driver,setDriver] = useState(null);
  const [routeStops, setRouteStops] = useState();

  useEffect(() => {
    const fetchBusData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/admin/Vendor/dropdown/View/Bus`
        );
        if (response.status === 200) {
          const selectedBus = response.data.find(
            (bus) => bus.BusID === parseInt(busID)
          );
          if (selectedBus) {
            setBusData(selectedBus);
            try {
              const rresponse = await axios.get(
                "http://localhost:8000/admin/Vendor/dropdown/View/Route"
              );
              if (rresponse.status === 200) {
                const route = rresponse.data.routes.find(
                  (route) => route.RouteID === selectedBus.RouteID
                );
                setRouteStops(route?.StopDetails || []);
              }
            } catch (error) {
              console.error("Error fetching route data:", error.message);
            }
          } else {
            alert("Bus not found.");
          }
        } else {
          alert("Failed to fetch bus data.");
        }
      } catch (error) {
        console.error("Error fetching bus data:", error);
      }
    };
  
    const fetchBusDetailData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/admin/Vendor/dropdown/View/BusDetails/${busID}`
        );
        if (response.status === 200) {
          setBusDetailData(response.data);
          console.log(response.data)
        } else {
          alert("Failed to fetch bus details.");
        }
      } catch (error) {
        console.error("Error fetching bus details:", error);
      }
    };
  
    fetchBusData();
    fetchBusDetailData();
  }, [busID]);

  useEffect(() => {
    const fetchDriverData = async () => {
      if (busData?.DriverID) {
        try {
          const response = await axios.get(
            `http://localhost:8000/admin/Vendor/dropdown/View/Driver/${busData.DriverID}`
          );
          if (response.status === 200) {
            setDriver(response.data);
            console.log('driver',response.data)
          } else {
            alert("Failed to fetch driver data.");
          }
        } catch (error) {
          console.error("Error fetching driver data:", error);
        }
      }
    };
  
    fetchDriverData();
  }, [busData]);

  if (!busData || !busDetailData || !driver) {
    return <LoadingAnimation />;
  }

  return (
    <div className="bg-gray-950 p-8 min-h-screen text-gray-100">
      <div className="p-6 border border-gray-600 rounded bg-gray-900">
        <h2 className="text-4xl font-bold mb-4">
          <span className="text-yellow-500">Bus</span> Details
        </h2>
        {/* Info Cards Row */}
        <div className="flex flex-col md:flex-row gap-8 mb-8 mt-8 ">
          <div className="bg-gray-800 border border-gray-600 rounded p-6 w-full lg:w-1/2 ">
            <h2 className="text-2xl font-bold  text-gray-100 mb-4">
              Bus Information
            </h2>
            <p className="text-gray-400 mb-2">
              <span className="font-semibold text-gray-200">Bus ID:</span>{" "}
              {busDetailData?.data?.BusID || "N/A"}
            </p>
            <p className="text-gray-400 mb-2">
              <span className="font-semibold text-gray-200">Bus Number:</span>{" "}
              {busDetailData?.data?.BusNumber || "N/A"}
            </p>
            <p className="text-gray-400 mb-2">
              <span className="font-semibold text-gray-200">Route:</span>{" "}
              {busData?.RouteName || "N/A"}
            </p>
            <p className="text-gray-400 mb-2">
              <span className="font-semibold text-gray-200">Total Seats:</span>{" "}
              {busDetailData?.data?.TotalSeats || "N/A"}
            </p>
          </div>


          <DriverInfoCard driver={driver[0]} />
        </div>

        {/* Bus Layout Section */}
        <div className="bg-gray-800 border border-gray-600 rounded p-6 mb-8 ">
          <h2 className="text-2xl font-bold  text-gray-100 md:mb-8 mb-2">
            Bus Layout
          </h2>
          <BusLayout busData={busDetailData.data} />
        </div>

        <RouteCard routeStops={routeStops}/>
      </div>
    </div>
  );
};

export default BusDetailPage;
