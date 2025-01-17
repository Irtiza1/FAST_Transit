import React, { useState } from "react";
import { Typewriter } from "react-simple-typewriter";
import InputMask from "react-input-mask";
import axios from "axios";
import Alert from '@mui/material/Alert';
import Snackbar from "@mui/material/Snackbar";


function Register() {
  const [alert,setAlert] = useState({message:"" , serverity:""  , open: false})
  const handleCloseAlert = () => {
    setAlert({ ...alert, open: false });
  };
  const [ConfirmPassword, setConfirmPassword] = useState("");
  const [formData, setFormData] = useState({
    FirstName: "",
    LastName: "",
    Email: "",
    PhoneNumber: "",
    CNIC: "",
    Password: "",
    Gender: "",
    Role: "",
    Location: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const removeDashesFromCNIC = (cnic) => {
    return cnic.replace(/-/g, ""); 
  };
  const emailPattern = /^[a-zA-Z0-9._%+-]+@nu\.edu\.pk$/;
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!emailPattern.test(formData.Email)) {
      setAlert({ message: "Please enter a valid email address (e.g., xyz@nu.edu.pk).", severity: "error", open: true });
       return;
      // return(<Alert severity="error">Please enter a valid email address (e.g., xyz@nu.edu.pk).</Alert>)
    }
    if (formData.Password !== ConfirmPassword) {
      // alert("Passwords do not match!");
      // return;
      setAlert({ message: "Passwords do not match!", severity: "error", open: true });
      return;
    }
    formData.CNIC = removeDashesFromCNIC(formData.CNIC);
  
    try {
      console.log(formData); 
      const response = await axios.post("http://localhost:8000/user/signup", formData);
      console.log(response)
      setAlert({ message: response.data.message, severity: "success", open: true });
    } catch (error) {
      console.error("Error during registration:", error);
      setAlert({ message: "Registration failed. Please try again.", severity: "error", open: true });
    }
  };

  return (
    <div className="flex h-full min-h-screen flex-col lg:flex-row">
      <div className="bg-gray-950 text-gray-200 px-6 py-12 w-full lg:w-1/2 lg:px-10 lg:py-20 font-electrolize">
        <p className="my-2 text-7xl font-extrabold tracking-wider">FAST</p>
        <p className="font-bold text-5xl">Transit</p>
        <p className="mt-32 font-bold text-5xl text-yellow-500">
          <Typewriter
            words={["Start your journey with us"]}
            loop={false}
            cursor
            cursorStyle="_"
            typeSpeed={200}
            deleteSpeed={150}
            delaySpeed={1000}
          />
        </p>
        <p className="mt-4 text-yellow-700 font-semibold text-2xl">Join the community that moves forward fast!</p>
      </div>

      <form onSubmit={handleSubmit} className="w-full max-w-lg px-6 py-12 lg:w-1/2 lg:py-10 m-auto font-zendot">
        {/* {alert.message && (
        <Alert severity={alert.serverity} className="mb-4">
          {alert.message}
        </Alert>
        )} */}
        <h2 className="mb-2 text-3xl font-bold">Sign Up</h2>
        <a href="http://localhost:5173/login" className="mb-4 block font-bold text-gray-400 hover:text-gray-800">Already have an account?</a>

        <p className="mb-2 font-medium text-black">Are you a?</p>
        <div className="mb-2 flex flex-col gap-4 sm:flex-row">
          <select
            name="Role"
            value={formData.Role}
            onChange={handleChange}
            className="w-full px-4 py-2 border-2 rounded-md"
            required
          >
            <option value="">Please select from dropdown</option>
            <option value="Student">Student</option>
            <option value="Faculty">Faculty</option>
          </select>
        </div>

        <div className="mb-2 flex flex-col sm:flex-row gap-4">
          <input
            type="text"
            name="FirstName"
            value={formData.FirstName}
            onChange={handleChange}
            className="w-full px-4 py-2 border-2 rounded-md"
            placeholder="First Name"
            required
          />
          <input
            type="text"
            name="LastName"
            value={formData.LastName}
            onChange={handleChange}
            className="w-full px-4 py-2 border-2 rounded-md"
            placeholder="Last Name"
            required
          />
          <select
            name="Gender"
            value={formData.Gender}
            onChange={handleChange}
            className="w-full px-4 py-2 border-2 rounded-md"
            required
          >
            <option value="">Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div className="mb-2 flex flex-col sm:flex-row gap-4">
          <InputMask
            mask="99999-9999999-9"
            value={formData.CNIC}
            onChange={handleChange}
            className="w-full px-4 py-2 border-2 rounded-md"
            name="CNIC"
            placeholder="CNIC"
            required
          />
          <input
            type="text"
            name="PhoneNumber"
            value={formData.PhoneNumber}
            onChange={handleChange}
            className="w-full px-4 py-2 border-2 rounded-md"
            placeholder="Phone Number"
            required
          />
        </div>
        <div className="mb-2">
          <input
            type="text"
            name="Location"
            value={formData.Location}
            onChange={handleChange}
            className="w-full px-4 py-2 border-2 rounded-md"
            placeholder="Location"
            required
          />
        </div>
        
        <input
          type="email"
          name="Email"
          value={formData.Email}
          onChange={handleChange}
          className="w-full px-4 py-2 mb-2 border-2 rounded-md"
          placeholder="Email (e.g., abc@nu.edu.pk)"
          required
        />
        <div className="mb-2 flex flex-col sm:flex-row gap-4">
          <input
            type="password"
            name="Password"
            value={formData.Password}
            onChange={handleChange}
            className="w-full px-4 py-2 mb-2 border-2 rounded-md"
            placeholder="Password"
            required
          />
          <input
            type="password"
            name="ConfirmPassword"
            value={ConfirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full px-4 py-2 mb-2 border-2 rounded-md"
            placeholder="Confirm Password"
            required
          />
        </div>

        <button className="w-full px-8 py-3 bg-gray-300 hover:bg-gray-400 rounded font-bold text-gray-900">Sign Up</button>
      </form>
      <Snackbar
        open={alert.open}
        autoHideDuration={6000}
        onClose={handleCloseAlert}
        anchorOrigin={{ vertical: "top", horizontal: "center" }} // Custom position
      >
        <Alert 
          severity={alert.severity} 
          onClose={handleCloseAlert} 
          className="w-full max-w-md mx-auto text-sm sm:text-base font-medium text-center p-4"
        >
          {alert.message}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default Register;
