import React, { useState } from "react";
import InputMask from "react-input-mask";
const RegisterDriver = () => {
  const [driverData, setDriverData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    licenseNumber: "",
    driverId: "",
  });

  const handleChange = (e) => {
    setDriverData({ ...driverData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // handle form submission logic (e.g., API call)
    console.log(driverData);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-950 ">
      <div className="bg-gray-900 p-8 border rounded border-gray-500 w-full max-w-md  mx-2">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-50">
          Register <span className="text-yellow-500">Driver</span>
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">

          <div>
            <label className="block text-lg font-semibold text-gray-400 mb-1">
              First Name
            </label>
            <input
              type="text"
              name="firstName"
              value={driverData.firstName}
              onChange={handleChange}
              className="text-gray-300 bg-gray-800 border border-gray-500  rounded p-2 w-full focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition duration-200"
              required
            />
          </div>

          <div>
            <label className="block text-lg font-semibold text-gray-400 mb-1">Last Name</label>
            <input
              type="text"
              name="lastName"
              value={driverData.lastName}
              onChange={handleChange}
              className="text-gray-300 bg-gray-800 border border-gray-500  rounded p-2 w-full focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition duration-200"
              required
            />
          </div>
          {/* Last Name */}
          <div>
            <label className="block text-lg font-semibold text-gray-400 mb-1">CNIC</label>
            <InputMask
              mask="99999-9999999-9"
              value={driverData.cnic}
              onChange={handleChange}
              placeholder="12345-1234567-9"
            >
              {() => (
                <input
                  type="text"
                  name="cnic"
                  className="text-gray-300 bg-gray-800 border border-gray-500  rounded p-2 w-full focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition duration-200"
                  required
                />
              )}
            </InputMask>
            <small className="text-gray-400">Format: 12345-1234567-9</small>
          </div>
          
          {/* Email */}
          <div>
            <label className="block text-lg font-semibold text-gray-400 mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={driverData.email}
              onChange={handleChange}
              className="text-gray-300 bg-gray-800 border border-gray-500  rounded p-2 w-full focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition duration-200"
              required
            />
          </div>

          {/* Phone Number */}
          <div>
            <label className="block text-lg font-semibold text-gray-400 mb-1">
              Phone Number
            </label>
            <input
              type="text"
              name="phoneNumber"
              value={driverData.phoneNumber}
              onChange={handleChange}
              className="text-gray-300 bg-gray-800 border border-gray-500  rounded p-2 w-full focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition duration-200"
              required
            />
          </div>

          {/* License Number */}
          <div>
            <label className="block text-lg font-semibold text-gray-400 mb-1">
              License Number
            </label>
            <input
              type="text"
              name="licenseNumber"
              value={driverData.licenseNumber}
              onChange={handleChange}
              className="text-gray-300 bg-gray-800 border border-gray-500  rounded p-2 w-full focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition duration-200"
              required
            />
          </div>

          {/* Driver ID */}
          {/* <div>
            <label className="block text-gray-600 font-medium">Driver ID</label>
            <input
              type="text"
              name="driverId"
              value={driverData.driverId}
              onChange={handleChange}
              className="w-full mt-2 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
              required
            />
          </div> */}

          {/* Submit Button */}
          <div className="flex justify-center mt-6">
            <button
              type="submit"
              className="w-full rounded bg-yellow-300 hover:bg-yellow-400 px-8 py-3 mt-5 mb-2 font-bold text-gray-700  transition-all hover:opacity-90 hover:shadow-lg"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterDriver;
