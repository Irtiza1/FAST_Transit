import React, { useEffect, useState } from "react";
import BusInfoCard from "../component/BusInfoCard/BusInfoCard";
import DriverInfoCard from "../component/DriverInfoCard/DriverInfoCard";
import { BusLayout } from "../component/BusLayout";
import { RouteCard } from "../component/RouteCard";
import { LoadingAnimation } from "../component/LoadingAnimation";
import { useParams } from "react-router-dom";
import axios from "axios";
const BusDetailPage = () => {
  const { busID } = useParams();
  const [busData, setBusData] = useState(null);
  const [busDetailData, setBusDetailData] = useState(null);
  const [driver,setDriver] = useState(null);
  // const [routeStops, setRouteStops] = useState([]);

  useEffect(() => {
    const fetchBusData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/admin/Vendor/dropdown/View/Bus`
        );
        if (response.status === 200) {
          // Find the selected bus by BusID
          const selectedBus = response.data.find(
            (bus) => bus.BusID === parseInt(busID)
          );
          if (selectedBus) {
            setBusData(selectedBus);
          } else {
            alert("Bus not found.");
          }
        } else {
          alert("Failed to fetch the bus data.");
        }
      } catch (error) {
        console.error(error);
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
        console.error(error);
      }
    };

    fetchBusData();
    fetchBusDetailData();
  }, [busID]);

  // Fetch the driver once busData has been set
  useEffect(() => {
    if (busData && busData.DriverID) {
      const fetchDriverData = async () => {
        try {
          const response = await axios.get(
            `http://localhost:8000/admin/Vendor/dropdown/View/Driver/${busData.DriverID}`
          );
          if (response.status === 200) {
            setDriver(response.data);
          } else {
            alert("Failed to fetch driver data.");
          }
        } catch (error) {
          console.error(error);
        }
      };

      fetchDriverData();
    }
  }, [busData]); // This effect runs only when busData changes

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
          {/* <BusLayout bus={bus} /> */}
        </div>

        {/* <RouteCard /> */}
      </div>
    </div>
  );
};

export default BusDetailPage;
