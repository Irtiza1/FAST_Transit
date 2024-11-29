import React, { useState } from "react";

const VendorAddForm = ({ setAddFormData,handleSubmit }) => {
  const [formData, setFormData] = useState({
    Email: "",
    Password: "",
    VendorName: "",
    ContactInfo: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedFormData = { ...formData, [name]: value };
    setFormData(updatedFormData);
    setAddFormData(updatedFormData); // Pass data to parent
  };

  return (
    <div>
      <h1 className="text-gray-300 text-2xl font-bold mb-4">
        Fill Out Following <span className="text-yellow-600">Details</span>
      </h1>
      <div className="space-y-4 text-gray-400 mt-6">
        <div>
          <label
            htmlFor="VendorName"
            className="block text-lg font-semibold mb-2"
          >
            Vendor Name
          </label>
          <input
            id="VendorName"
            name="VendorName"
            type="text"
            value={formData.VendorName}
            onChange={handleChange}
            className="bg-gray-800 text-gray-300 border border-gray-600 rounded w-full p-3"
            placeholder="Enter Vendor Name"
          />
        </div>
        <div>
          <label htmlFor="Email" className="block text-lg font-semibold mb-2">
            Email
          </label>
          <input
            id="Email"
            name="Email"
            type="email"
            value={formData.Email}
            onChange={handleChange}
            className="bg-gray-800 text-gray-300 border border-gray-600 rounded w-full p-3"
            placeholder="Enter Vendor Email"
          />
        </div>
        <div>
          <label
            htmlFor="Password"
            className="block text-lg font-semibold mb-2"
          >
            Password
          </label>
          <input
            id="Password"
            name="Password"
            type="password"
            value={formData.Password}
            onChange={handleChange}
            className="bg-gray-800 text-gray-300 border border-gray-600 rounded w-full p-3"
            placeholder="Enter Password"
          />
        </div>
        <div>
          <label
            htmlFor="ContactInfo"
            className="block text-lg font-semibold mb-2"
          >
            Contact Number
          </label>
          <input
            id="ContactInfo"
            name="ContactInfo"
            type="text"
            value={formData.ContactInfo}
            onChange={handleChange}
            className="bg-gray-800 text-gray-300 border border-gray-600 rounded w-full p-3"
            placeholder="Enter Contact Number"
          />
        </div>
        <div className="flex justify-center"><button
            type="submit"
            onClick={handleSubmit}
            className="items-center bg-yellow-600 w-40 my-2 text-gray-900 p-3 rounded font-bold hover:bg-yellow-500 transition duration-300"
          >
            Submit
          </button></div>
      </div>
    </div>
  );
};

export default VendorAddForm;
