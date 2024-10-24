import React, { useState } from "react";
import { Typewriter } from "react-simple-typewriter";
import InputMask from "react-input-mask";
import axios from "axios";

function Register() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    cnic: "",
    password: "",
    gender: "",
    role: "Vendor", // Default role set to "Vendor"
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8000/user/signup", formData);
      alert(response.data.message);
    } catch (error) {
      console.error("Error during registration:", error);
      alert("Registration failed. Please try again.");
    }
  };

  return (
    <div className="flex h-full min-h-screen flex-col lg:flex-row">
      {/* Left Column - Title and Typewriter */}
      <div className="bg-gray-950 text-gray-200 px-6 py-12 w-full lg:w-1/2 lg:px-10 lg:py-20 ">
        <p className="my-2 text-7xl font-extrabold tracking-wider sm:text-7xl lg:text-7xl">FAST</p>
        <p className="font-bold text-5xl sm:text-5xl">Transit</p>
        <p className="mt-32 font-bold sm:text-4xl md:text-5xl lg:text-5xl text-yellow-500">
          <span className="whitespace-normal break-words">
            <Typewriter
              words={["Start your journey with us"]}
              loop={false}
              cursor
              cursorStyle="_"
              typeSpeed={200}
              deleteSpeed={150}
              delaySpeed={1000}
            />
          </span>
        </p>
        <p className="mt-4 text-yellow-700 font-semibold leading-relaxed text-2xl">
          Join the community that moves forward fast!
        </p>
      </div>

      {/* Right Column - Form */}
      <form onSubmit={handleSubmit} className="w-full max-w-lg px-6 py-12 lg:w-1/2 lg:py-20 m-auto">
        <h2 className="mb-2 text-3xl font-bold">Sign Up</h2>
        <a href="#" className="mb-16 block font-bold text-gray-400 hover:text-gray-800">
          Already Have an account?
        </a>

        <p className="mb-2 font-medium text-black">Are you a?</p>
        <div className="mb-8 flex flex-col gap-4 sm:flex-row">
          {/* Role Selection */}
          <div className="relative flex w-full items-center justify-center rounded-xl bg-gray-50 px-4 py-3 font-medium text-gray-700 sm:w-1/2">
            <input
              className="peer hidden"
              type="radio"
              name="role"
              value="Vendor"
              id="roleVendor"
              checked={formData.role === "Vendor"}
              onChange={handleChange}
            />
            <label
              className="peer-checked:border-gray-600 peer-checked:bg-gray-200 absolute inset-0 cursor-pointer rounded-xl border"
              htmlFor="roleVendor"
            ></label>
            <div className="peer-checked:border-transparent peer-checked:bg-gray-600 peer-checked:ring-2 absolute left-4 h-5 w-5 rounded-full border-2 border-gray-300 bg-gray-200 ring-gray-600 ring-offset-2"></div>
            <span className="pointer-events-none z-10">Vendor</span>
          </div>

          <div className="relative flex w-full items-center justify-center rounded-xl bg-gray-50 px-4 py-3 font-medium text-gray-700 sm:w-1/2">
            <input
              className="peer hidden"
              type="radio"
              name="role"
              value="Student or Faculty"
              id="roleStudent"
              checked={formData.role === "Student or Faculty"}
              onChange={handleChange}
            />
            <label
              className="peer-checked:border-gray-600 peer-checked:bg-gray-200 absolute inset-0 cursor-pointer rounded-xl border"
              htmlFor="roleStudent"
            ></label>
            <div className="peer-checked:border-transparent peer-checked:bg-gray-600 peer-checked:ring-2 absolute left-4 h-5 w-5 rounded-full border-2 border-gray-300 bg-gray-200 ring-gray-600 ring-offset-2"></div>
            <span className="pointer-events-none z-10">Student or Faculty</span>
          </div>
        </div>

        {/* First Name */}
        <p className="mb-2 font-medium text-black">First Name</p>
        <div className="mb-6">
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className="w-full px-4 py-2 text-base text-gray-700 placeholder-gray-400 focus:outline-none border-2 rounded-md"
            placeholder="Enter your first name"
            required
          />
        </div>

        {/* Last Name */}
        <p className="mb-2 font-medium text-black">Last Name</p>
        <div className="mb-6">
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className="w-full px-4 py-2 text-base text-gray-700 placeholder-gray-400 focus:outline-none border-2 rounded-md"
            placeholder="Enter your last name"
            required
          />
        </div>

        {/* CNIC */}
        <div className="mb-6">
          <label className="block text-lg font-semibold text-black mb-1">CNIC</label>
          <InputMask
            mask="99999-9999999-9"
            value={formData.cnic}
            onChange={handleChange}
            className="w-full px-4 py-2 text-base text-gray-700 placeholder-gray-400 focus:outline-none border-2 rounded-md"
            name="cnic"
            placeholder="12345-1234567-9"
            required
          />
          <small className="text-gray-400">Format: 12345-1234567-9</small>
        </div>

        {/* Gender Selection */}
        <p className="mb-2 font-medium text-black">Gender</p>
        <div className="mb-6">
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="w-full px-4 py-2 text-base text-gray-700 placeholder-gray-400 focus:outline-none border-2 rounded-md"
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Phone Number */}
        <p className="mb-2 font-medium text-black">Phone Number</p>
        <div className="mb-6">
          <input
            type="text"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            className="w-full px-4 py-2 text-base text-gray-700 placeholder-gray-400 focus:outline-none border-2 rounded-md"
            placeholder="Enter your phone number"
            required
          />
        </div>

        {/* Email */}
        <p className="mb-2 font-medium text-black">Email</p>
        <div className="mb-6">
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 text-base text-gray-700 placeholder-gray-400 focus:outline-none border-2 rounded-md"
            placeholder="Enter your email"
            required
          />
        </div>

        {/* Password */}
        <p className="mb-2 font-medium text-black">Password</p>
        <div className="mb-6">
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-2 text-base text-gray-700 placeholder-gray-400 focus:outline-none border-2 rounded-md"
            placeholder="Choose a password (minimum 8 characters)"
            required
          />
        </div>

        <button className="w-full rounded bg-gray-300 hover:bg-gray-400 px-8 py-3 font-bold text-gray-900 transition-all hover:opacity-90 hover:shadow-lg">
          Sign Up
        </button>
      </form>
    </div>
  );
}

export default Register;
