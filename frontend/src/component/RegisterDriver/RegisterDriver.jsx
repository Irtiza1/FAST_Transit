import React, { useState } from "react";
import InputMask from "react-input-mask";

const RegisterDriver = () => {
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
    console.log(driverData);
  };

  return (
    <div className="bg-gray-950 min-h-screen p-8">
      <div className="p-6 bg-gray-900 min-h-screen text-gray-100 border border-gray-600 rounded">
    {/* // <div className="flex justify-center p-8 items-center min-h-screen bg-gray-50">
    //   <div className="bg-gray-900  p-6 border rounded border-gray-500 w-full  mx-2"> */}
        <h2 className="text-4xl font-bold mb-4">
            Registered New <span className="text-yellow-500">Driver</span>
          </h2>
        <div className="flex p-2 mt-16 justify-center">
        <form onSubmit={handleSubmit} className="w-full max-w-lg space-y-4 ">
          <div className="flex flex-col md:flex-row md:space-x-4 ">
            <div className="flex-1">
              <label className="block text-lg font-semibold text-gray-400 mb-1">
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                value={driverData.firstName}
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
                name="lastName"
                value={driverData.lastName}
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
                value={driverData.cnic}
                onChange={handleChange}
              >
                {() => (
                  <input
                    type="text"
                    name="cnic"
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
                name="licenseNumber"
                value={driverData.licenseNumber}
                onChange={handleChange}
                className="text-gray-300 bg-gray-800 border border-gray-500 rounded p-2 w-full focus:ring-2 focus:ring-gray-500 transition duration-200"
                required
              />
            </div>
          </div>

          <label className="block text-lg font-semibold text-gray-400   ">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={driverData.email}
            onChange={handleChange}
            className="text-gray-300 bg-gray-800 border border-gray-500 rounded p-2 w-full focus:ring-2 focus:ring-gray-500 transition duration-200"
            required
          />

          <label className="block text-lg font-semibold text-gray-400 ">
            Phone Number
          </label>
          <input
            type="text"
            name="phoneNumber"
            value={driverData.phoneNumber}
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
              name="password"
              value={driverData.password}
              onChange={handleChange}
              className="text-gray-300 bg-gray-800 border border-gray-500 rounded p-2 w-full focus:ring-2 focus:ring-gray-500 transition duration-200"
              required
            />
          </div>

          <div className="flex justify-center mt-6">
            <button
              type="submit"
              className="w-full rounded bg-yellow-500 hover:bg-yellow-400 px-8 py-3 font-bold text-gray-700 transition-all hover:opacity-90 hover:shadow-lg"
            >
              Register
            </button>
          </div>
        </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterDriver;
