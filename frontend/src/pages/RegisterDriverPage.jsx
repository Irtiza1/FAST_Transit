import React from "react";
import { useState } from "react";
import { RegisterDriver } from "../component/RegisterDriver";
function RegisterDriverPage() {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if(driverData.firstName === "" ||
      driverData.lastName=== ""||
      driverData.email=== ""||
      driverData.phoneNumber=== ""||
      driverData.licenseNumber=== ""||
      driverData.cnic=== ""||
      driverData.password=== ""){
        alert("All details are required.")
    }else{
    
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
          Register
        </button>
      </div>
      </div>
      </div>
    </>
  );
}

export default RegisterDriverPage;
