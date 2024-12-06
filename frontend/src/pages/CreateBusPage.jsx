import React, { useState, useEffect } from "react";
import { BusCreationForm } from "../component/BusCreationForm";
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
  const [MaleRows, setMaleRows] = useState(null);
  const [FemaleRows, setFemaleRows] = useState(null);
  const [numberPlate, setNumberPlate] = useState("");

  //states for route incase of existing route selection
  const [showRouteCreationForm, setShowRouteCreationForm] = useState(false);
  const [showSelectedRouteInfo, setShowSelectedRouteInfo] = useState(false);
  const [selectedRoute, setSelectedRoute] = useState(null);
  const [existingRoutes, setExistingRoutes] = useState([]);
  //states for driver incase of existing driver selection
  const [showDriverForm, setShowDrivernForm] = useState(false);
  const [showSelectedDriverInfo, setShowSelectedDrivernInfo] = useState(false);
  const [selectedDriver, setSelectedDriver] = useState({});
  const [existingDrivers, setExistingDrivers] = useState([]);

  useEffect(() => {
    const fetchDriverAndRouteData = async () => {
      try {
        const [driverResponse, routeResponse] = await Promise.all([
          axios.get("http://localhost:8000/admin/Vendor/dropdown/View/Driver"),
          axios.get("http://localhost:8000/admin/Vendor/dropdown/View/Route"),
        ]);
        setExistingDrivers(driverResponse.data);
        setExistingRoutes(routeResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchDriverAndRouteData();
  }, []);

  const handleRouteSelect = (routeID) => {
    //console.log(routeID)
    const route = existingRoutes.routes.find((r) => r.RouteID == routeID);
    //console.log(route)
    setSelectedRoute(route);
    //console.log(selectedRoute)
    setShowSelectedRouteInfo(true);
  };

  const handleDriverSelect = (driverId) => {
    const driver = existingDrivers.find((d) => d.DriverID == driverId);
    setSelectedDriver(driver);
    //setShowDrivernForm(false);
    setShowSelectedDrivernInfo(true);
  };
  const handleSubmit = async () => {
    const maleRowsArray = MaleRows ? MaleRows.split(",").map(Number) : [];
    const femaleRowsArray = FemaleRows ? FemaleRows.split(",").map(Number) : [];
    const postData = {
      BusNumber: numberPlate,
      RouteID: selectedRoute?.RouteID || null,
      DriverID: selectedDriver?.DriverID || null,
      LeftRows: parseInt(numberOfLeftRows, 10),
      LeftSeatsPerRow: parseInt(numberOfSeatsInLeftRows, 10),
      RightRows: parseInt(numberOfRightRows, 10),
      RightSeatsPerRow: parseInt(numberOfSeatsInRightRows, 10),
      VendorID: 1, //making it hardcoded because login backend not built
      MaleRows: maleRowsArray,
      FemaleRows: femaleRowsArray,
    };
    console.log(postData)
    // const response = await axios.post('http://localhost:8000/admin/Vendor/dropdown/Add/Bus')
    try {
      const response = await axios.post(
        "http://localhost:8000/admin/Vendor/dropdown/Add/Bus",
        postData
      );
  
      if (response.status === 201) {
        alert("Bus registered successfully!");
        // Optionally reset form or redirect
      } else {
        alert("Failed to register the bus. Please try again.",response.status);
      }
    } catch (error) {
      console.error("Error submitting the bus data:", error);
      alert("An error occurred while registering the bus.");
    }

  };
  useEffect(() => {
    if (numberOfSeatsInLeftRows !== null && numberOfSeatsInRightRows !== null) {
      setNumberOfSeatsInLastRows(
        parseInt(numberOfSeatsInLeftRows, 10) +
          parseInt(numberOfSeatsInRightRows, 10) +
          1
      );
    }
  }, [numberOfSeatsInLeftRows, numberOfSeatsInRightRows]);

  console.log(existingDrivers);
  console.log(existingRoutes);
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
            MaleRows={MaleRows}
            FemaleRows={FemaleRows}
            setMaleRows={setMaleRows}
            setFemaleRows={setFemaleRows}
          />
        </div>

        <div className="p-8">
          <div className="w-full ">
            <p className="text-3xl font-bold mb-6 text-gray-50">
              Assign <span className="text-yellow-500">Route</span>
            </p>
            <div className="flex flex-col sm:flex-row md:items-center md:justify-between">
              <select
                className="w-full p-2 bg-gray-800 border border-gray-600 rounded text-gray-300 m-1"
                onChange={(e) => {
                  const selectedValue = e.target.value;
                  if (selectedValue === "") {
                    // If "Select an existing route" is selected, set selectedRoute to null
                    setSelectedRoute(null);
                    setShowSelectedRouteInfo(false);
                  } else {
                    handleRouteSelect(selectedValue);
                  }
                }}
                defaultValue=""
              >
                <option value="">Select an existing route</option>
                {existingRoutes?.routes?.map((route) => (
                  <option key={route.RouteID} value={route.RouteID}>
                    ID: {route.RouteID} Name: {route.RouteName}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* remember ismay data pass hoga bus stops ka */}
          {showSelectedRouteInfo && (
            <div className="p-1">
              <RouteCard routeStops={selectedRoute.StopDetails} />
            </div>
          )}

          <div className="w-full my-8 ">
            <p className="text-3xl font-bold mb-6 text-gray-50">
              Assign <span className="text-yellow-500">Driver</span>
            </p>
            <div className="flex flex-col sm:flex-row md:items-center md:justify-between">
              <select
                className="w-full p-2 bg-gray-800 border border-gray-600 rounded text-gray-300 m-1"
                onChange={(e) => {
                  const selectedValue = e.target.value;
                  if (selectedValue === "") {
                    // If "Select an existing driver" is selected, set selectedDriver to null
                    setSelectedDriver(null);
                    setShowSelectedDrivernInfo(false);
                  } else {
                    handleDriverSelect(selectedValue);
                  }
                }}
                defaultValue=""
              >
                <option value="">Select an existing driver</option>
                {existingDrivers
                  ?.filter((driver) => !driver.BusID)
                  .map((driver) => (
                    <option key={driver.DriverID} value={driver.DriverID}>
                      ID: {driver.DriverID} Name: {driver.DriverName}
                    </option>
                  ))}
              </select>
            </div>
          </div>

          {showSelectedDriverInfo && (
            <>
              <div className="bg-gray-800 border border-gray-600 rounded p-6 w-full  ">
                <h2 className="text-2xl font-bold  text-gray-100  mb-4">
                  Driver Information
                </h2>
                <p className="text-gray-400 mb-2">
                  <span className="font-semibold text-gray-200">Name:</span>{" "}
                  {selectedDriver.DriverName || "N/A"}
                </p>
                <p className="text-gray-400 mb-2">
                  <span className="font-semibold text-gray-200">
                    License Number:
                  </span>{" "}
                  {selectedDriver.LicenseNumber || "N/A"}
                </p>
                <p className="text-gray-400 mb-2">
                  <span className="font-semibold text-gray-200">Phone:</span>{" "}
                  {selectedDriver.PhoneNumber || "N/A"}
                </p>
              </div>
            </>
          )}
        </div>
        <button
          onClick={handleSubmit}
          className="w-full rounded bg-yellow-500 hover:bg-yellow-400 px-8 py-3 mt-5 mb-2 font-bold text-gray-700  transition-all hover:opacity-90 hover:shadow-lg"
        >
          Register Bus
        </button>
      </div>
    </div>
  );
}

export default CreateBusPage;
