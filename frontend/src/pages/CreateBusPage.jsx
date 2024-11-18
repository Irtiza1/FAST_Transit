import React, { useState, useEffect } from "react";
import { BusCreationForm } from "../component/BusCreationForm";
import RouteCreationForm from "../component/RouteCreationForm/RouteCreationForm";
import { RegisterDriver } from "../component/RegisterDriver";
import DriverInfoCard from "../component/DriverInfoCard/DriverInfoCard";
import RouteCard from "../component/RouteCard/RouteCard";
import axios from "axios";
function CreateBusPage() {
  //states for buses
  const [numberOfLeftRows, setNumberOfLeftRows] = useState(null);
  const [numberOfSeatsInLeftRows, setNumberOfSeatsInLeftRows] = useState(null);
  const [numberOfRightRows, setNumberOfRightRows] = useState(null);
  const [numberOfSeatsInRightRows, setNumberOfSeatsInRightRows] =
    useState(null);
  const [numberOfSeatsInLastRows, setNumberOfSeatsInLastRows] = useState(null);
  const [numberPlate, setNumberPlate] = useState("");
//state for route incase of new route
  const [routeData, setRouteData] = useState({
    routeName: "",
    startPoint: null,
    endPoint: null,
    stops: [],
  });
  //states of driver incase of new driver
  const [driverData, setDriverData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    licenseNumber: "",
    cnic: "",
    password: "",
  });

  const handleChange = (e) => {
    setDriverData({ ...driverData, [e.target.name]: e.target.value });
  };

  //states for route incase of existing route selection
  const [showRouteCreationForm, setShowRouteCreationForm] = useState(false);
  const [showSelectedRouteInfo , setShowSelectedRouteInfo] =useState(false );
  const [selectedRoute, setSelectedRoute] = useState({});
  const [existingRoutes, setExistingRoutes] = useState([]);
  //states for driver incase of existing driver selection
  const [showDriverForm, setShowDrivernForm] = useState(false);
  const [showSelectedDriverInfo, setShowSelectedDrivernInfo] = useState(false);
  const [selectedDriver, setSelectedDriver] = useState({});
  const [existingDrivers, setExistingDrivers] = useState([]);

  useEffect(() => {
    //fetching existing drivers and routes 
    axios
      .get("/api/routes")
      .then((response) => {
        if (Array.isArray(response.data)) {
          setExistingRoutes(response.data);
        } else {
          console.error("Unexpected response format:", response.data);
          setExistingRoutes([]); // Fallback to an empty array
        }
      })
      .catch((error) => {
        console.error("Error fetching routes:", error);
        setExistingRoutes([]); // Handle errors by setting an empty array
      });
  }, []);

  const handleRouteSelect = (routeId) => {
    const route = existingRoutes.find((r) => r.id === routeId);
    setSelectedRoute(route);
    setShowSelectedRouteInfo(true);
    setShowRouteCreationForm(false);
  };

  const handleDriverSelect = (driverId) => {
    const driver = existingDrivers.find((d) => d.id === driverId);
    setSelectedDriver(driver);
    setShowDrivernForm(false);
    setShowSelectedDrivernInfo(true);
  };

  return (
    <div className="p-8 min-h-screen bg-gray-950">
      <div className="bg-gray-900  border rounded border-gray-600">
        <div className=" container flex flex-col lg:flex-row items-center lg:items-start justify-between space-y-8 lg:space-y-0 lg:space-x-0">
          <BusCreationForm
            numberPlate={numberPlate}
            setNumberPlate={setNumberPlate}
            numberOfLeftRows={numberOfLeftRows}
            setNumberOfLeftRows={setNumberOfLeftRows}
            numberOfSeatsInLeftRows={numberOfSeatsInLeftRows}
            setNumberOfSeatsInLeftRows={setNumberOfSeatsInLeftRows}
            numberOfRightRows={numberOfRightRows}
            setNumberOfRightRows={setNumberOfRightRows}
            numberOfSeatsInRightRows={numberOfSeatsInRightRows}
            setNumberOfSeatsInRightRows={setNumberOfSeatsInRightRows}
            numberOfSeatsInLastRows={numberOfSeatsInLastRows}
            setNumberOfSeatsInLastRows={setNumberOfSeatsInLastRows}
          />
        </div>

        <div className="p-8">
          <div className="w-full ">
            <p className="text-3xl font-bold mb-6 text-gray-50">
              Assign <span className="text-yellow-500">Route</span>
            </p>
            <div className="flex flex-col sm:flex-row md:items-center md:justify-between">
              <select
                className="w-full md:w-3/4 p-2 bg-gray-800 border border-gray-600 rounded text-gray-300 m-1"
                onChange={(e) => handleRouteSelect(e.target.value)}
                defaultValue=""
              >
                <option value="" disabled>
                  Select an existing route
                </option>
                {existingRoutes.map((route) => (
                  <option key={route.id} value={route.id}>
                    {route.routeName}
                  </option>
                ))}
              </select>

              {/* <div className="w-1/3"> */}
              <div
                className="w-full md:w-1/3 bg-yellow-500 hover:bg-yellow-400 hover:cursor-pointer text-center text-gray-700 font-bold p-2 m-1 rounded"
                onClick={() => {
                  setShowRouteCreationForm(true);
                  setSelectedRoute(null); // Reset selected route
                  setShowSelectedDrivernInfo(false)
                }}
              >
                Assign New Route
              </div>
              {/* </div> */}
            </div>
          </div>
          {showRouteCreationForm && (
            <RouteCreationForm
              routeData={routeData}
              setRouteData={setRouteData}
              existingRoute={selectedRoute}
            />
          )}

          {/* remember ismay data pass hoga bus stops ka */}
          {showSelectedRouteInfo && (
            <div className="p-1">
              <RouteCard />
            </div>
          )

          }

          <div className="w-full my-8 ">
            <p className="text-3xl font-bold mb-6 text-gray-50">
              Assign <span className="text-yellow-500">Driver</span>
            </p>
            <div className="flex flex-col sm:flex-row md:items-center md:justify-between">
              <select
                className="w-full md:w-3/4 p-2 bg-gray-800 border border-gray-600 rounded text-gray-300 m-1"
                onChange={(e) => handleDriverSelect(e.target.value)}
                defaultValue=""
              >
                <option value="" disabled>
                  Select an existing driver
                </option>
                {existingDrivers.map((driver) => (
                  <option key={driver.id} value={driver.id}>
                    {driver.firstName} {driver.lastName}
                  </option>
                ))}
              </select>

              {/* <div className="w-1/3"> */}
              <div
                className="w-full md:w-1/3 bg-yellow-500 hover:bg-yellow-400 hover:cursor-pointer text-center text-gray-700 font-bold p-2 m-1 rounded"
                onClick={() => {
                  setShowDrivernForm(true);
                  setSelectedDriver(null)
                  setShowSelectedDrivernInfo(false); // Reset selected route
                }}
              >
                Assign New Driver
              </div>
              {/* </div> */}


            </div>
          </div>
          {
            showDriverForm && (
              <RegisterDriver 
              driverData={driverData} setDriverData={setDriverData} handleChange={handleChange} />
            )
          }
          {
            showSelectedDriverInfo && (
              <DriverInfoCard driver={selectedDriver}/>
            )
          }
        </div>
      </div>
    </div>
  );
}

export default CreateBusPage;
