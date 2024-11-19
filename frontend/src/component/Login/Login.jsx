import React, { useState } from "react";
import { Typewriter } from "react-simple-typewriter";
import axios, { formToJSON } from "axios";
import useFetch from "../../hooks/useFetch";

function Login() {
  const [formData, setFormData] = useState({
    Email: "",
    Password: "",
    Role: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const emailPattern = /^[a-zA-Z0-9._%+-]+@nu\.edu\.pk$/;
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!emailPattern.test(formData.Email)) {
      alert("Please enter a valid email address (e.g., xyz@nu.edu.pk)");
      return;
    }
    
    if(formData.Role === 'Admin'){
      const {data,loading,error} = useFetch("http://localhost:8000/user/login")
    }

    try {
      console.log(formData); 
      const response = await axios.post("http://localhost:8000/user/login", formData);
      alert(response.data.message);
    } catch (error) {
      console.error("Error during Login:", error);
      alert("Login failed. Please try again.");
    }
  };

  return (
    <div className="flex h-full min-h-screen flex-col lg:flex-row ">
      <div className="bg-gray-950 text-gray-200 px-6 py-12 w-full lg:w-1/2 lg:px-10 lg:py-20 font-electrolize">
        <p className="my-2 text-7xl font-extrabold tracking-wider">FAST</p>
        <p className="font-bold text-5xl">Transit</p>
        <p className="mt-32 font-bold text-5xl text-yellow-500">
          <Typewriter
            words={["Continue your journey with us"]}
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

      <form onSubmit={handleSubmit} className="w-full max-w-lg px-6 py-12 lg:w-1/2 lg:py-10 m-auto font-zendot" >
        <h2 className="mb-2 text-3xl font-bold">Sign In</h2>
        <a href="http://localhost:5173/register" className="mb-4 block font-bold text-gray-400 hover:text-gray-800">Don't have an account?</a>

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
            <option value="Vendor">Vendor</option>
            <option value="Driver">Driver</option>
            <option value="Admin">Admin</option>
          </select>
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
          <input
            type="password"
            name="Password"
            value={formData.Password}
            onChange={handleChange}
            className="w-full px-4 py-2 mb-2 border-2 rounded-md"
            placeholder="Password"
            required
          />
         

        <button className="w-full px-8 py-3 bg-gray-300 hover:bg-gray-400 rounded font-bold text-gray-900">Sign Up</button>
      </form>
    </div>
  );
}

export default Login;

