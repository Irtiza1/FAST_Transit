import React from "react";
import { useState } from "react";
import { RegisterDriver } from "../component/RegisterDriver";
import useApi from "../hooks/useApi";
function RegisterDriverPage() {
  const [driverData, setDriverData] = useState({
    FirstName: "",
    LastName: "",
    Email: "",
    PhoneNumber: "",
    LicenseNumber: "",
    CNIC: "",
    Password: "",
    Location:"",
    BusID:null,

  });
  const { sendData, response, loading, error } = useApi();
  const handleChange = (e) => {
    setDriverData({ ...driverData, [e.target.name]: e.target.value });
  };
  // FirstName, LastName, Email, Password, PhoneNumber, CNIC, Location, LicenseNumber, BusID, Gender = "Male", Role = "Driver", isActive = 1, Status = "Registered" ,VendorID
  const handleSubmit =async (e) => {
    e.preventDefault();
    if(driverData.FirstName === "" ||
      driverData.LastName=== ""||
      driverData.Email=== ""||
      driverData.PhoneNumber=== ""||
      driverData.LicenseNumber=== ""||
      driverData.CNIC=== ""||
      driverData.Password=== "" ||
      driverData.Location === ""){
        alert("All details are required.")
    }else{
      try {
        await sendData("http://localhost:8000/admin/vendor/dropdown/Add/Driver", "POST", {
          ...driverData,
          Gender: "Male",
          Role: "Driver",
          isActive: 1,
          Status: "Registered",
          VendorID: 1, // Abhi backend par login controller nhi ha vendor isliye testinfg purpose keliye hardcoded
        });
  
        if (response) {
          alert("Driver registered successfully!");
          setDriverData({
            FirstName: "",
            LastName: "",
            Email: "",
            PhoneNumber: "",
            LicenseNumber: "",
            CNIC: "",
            Password: "",
            Location: "",
            BusID: null,
          });
        }
      } catch (err) {
        console.error("Error registering driver:", err);
      }
    
    console.log(driverData);
    }
  };
  return (
    <>
      <div className="bg-gray-950 min-h-screen p-8">
      <div className="p-6 bg-gray-900 min-h-screen text-gray-100 border border-gray-600 rounded">
      <RegisterDriver
        driverData={driverData}
        setDriverData={setDriverData}
        handleChange={handleChange}
      />
      <div className="flex justify-center mt-6">
        <button
          onClick={handleSubmit}
          type="submit"
          className="w-full max-w-lg  rounded bg-yellow-500 hover:bg-yellow-400 px-8 py-3 font-bold text-gray-700 transition-all hover:opacity-90 hover:shadow-lg"
        >
          {loading ? "Registering..." : "Register"}
        </button>
      </div>
      {error && <p className="mt-4 text-red-500 text-center">{error.message}</p>}
      </div>
      </div>
    </>
  );
}

export default RegisterDriverPage;
