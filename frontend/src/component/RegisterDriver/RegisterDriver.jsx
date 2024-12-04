import React, { useState } from "react";
import InputMask from "react-input-mask";

const RegisterDriver = ({ driverData, setDriverData, handleChange }) => {
  return (
    <>
      <h2 className="text-4xl font-bold mb-4 text-gray-200">
        Registered New <span className="text-yellow-500">Driver</span>
      </h2>
      <div className="flex p-2 mt-16 justify-center">
        <form className="w-full max-w-lg space-y-4 ">
          <div className="flex flex-col md:flex-row md:space-x-4 ">
            <div className="flex-1">
              <label className="block text-lg font-semibold text-gray-400 mb-1">
                First Name
              </label>
              <input
                type="text"
                name="FirstName"
                value={driverData.FirstName}
                onChange={handleChange}
                className="text-gray-300 bg-gray-800 border border-gray-500 rounded p-2 w-full focus:ring-2 focus:ring-gray-500 transition duration-200"
                required
              />
            </div>
            <div className="flex-1 mt-4 md:mt-0">
              <label className="block text-lg font-semibold text-gray-400 mb-1">
                Last Name
              </label>
              <input
                type="text"
                name="LastName"
                value={driverData.LastName}
                onChange={handleChange}
                className="text-gray-300 bg-gray-800 border border-gray-500 rounded p-2 w-full focus:ring-2 focus:ring-gray-500 transition duration-200"
                required
              />
            </div>
          </div>
          <div className="flex flex-col md:flex-row md:space-x-4">
            <div className="flex-1">
              <label className="block text-lg font-semibold text-gray-400 mb-1">
                CNIC
              </label>

              <InputMask
                mask="99999-9999999-9"
                value={driverData.CNIC}
                onChange={handleChange}
              >
                {() => (
                  <input
                    type="text"
                    name="CNIC"
                    placeholder="12345-1234567-9"
                    className="text-gray-300 bg-gray-800 border border-gray-500 rounded p-2 w-full focus:ring-2 focus:ring-gray-500 transition duration-200"
                    required
                  />
                )}
              </InputMask>
            </div>
            <div className="flex-1 mt-4 md:mt-0">
              <label className="block text-lg font-semibold text-gray-400 mb-1">
                License Number
              </label>
              <input
                type="text"
                name="LicenseNumber"
                value={driverData.LicenseNumber}
                onChange={handleChange}
                className="text-gray-300 bg-gray-800 border border-gray-500 rounded p-2 w-full focus:ring-2 focus:ring-gray-500 transition duration-200"
                required
              />
            </div>
          </div>
          <label className="block text-lg font-semibold text-gray-400 ">
            Phone Number
          </label>
          <input
            type="text"
            name="PhoneNumber"
            value={driverData.PhoneNumber}
            onChange={handleChange}
            className="text-gray-300 bg-gray-800 border border-gray-500 rounded p-2 w-full focus:ring-2 focus:ring-gray-500 transition duration-200"
            required
          />
          
              <label className="block text-lg font-semibold text-gray-400">
                Location
              </label>
              <input
                type="text"
                name="Location"
                value={driverData.Location}
                onChange={handleChange}
                className="text-gray-300 bg-gray-800 border border-gray-500 rounded p-2 w-full focus:ring-2 focus:ring-gray-500 transition duration-200"
                required
              />
           
          <label className="block text-lg font-semibold text-gray-400   ">
            Email
          </label>
          <input
            type="email"
            name="Email"
            value={driverData.Email}
            onChange={handleChange}
            className="text-gray-300 bg-gray-800 border border-gray-500 rounded p-2 w-full focus:ring-2 focus:ring-gray-500 transition duration-200"
            required
          />

          

          <div>
            <label className="block text-lg font-semibold text-gray-400 mb-1">
              Password
            </label>
            <input
              type="password"
              name="Password"
              value={driverData.Password}
              onChange={handleChange}
              className="text-gray-300 bg-gray-800 border border-gray-500 rounded p-2 w-full focus:ring-2 focus:ring-gray-500 transition duration-200"
              required
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default RegisterDriver;
