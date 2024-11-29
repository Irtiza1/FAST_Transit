import React, { useState } from "react";
import { useSelector } from "react-redux";

const ContractAddForm = ({ setAddFormData,handleSubmit }) => {
  // Extracting UniversityID from the adminData saved when logged in
  const adminData = useSelector((state) => state.admin);
  const uniID = adminData.adminData.UniversityID;

  const [formData, setFormData] = useState({
    UniversityID: uniID,
    VendorID: "",
    ContractDetails: "",
    StartDate: "",
    EndDate: "",
    Status: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedFormData = { ...formData, [name]: value };
    setFormData(updatedFormData);
    setAddFormData(updatedFormData); // Pass data to parent
  };

  return (
    <div>
      <h1 className="text-gray-300 text-2xl  font-bold mb-4">
        Fill Out Following <span className="text-yellow-600">Details</span> 
      </h1>
      <div className="space-y-4  text-gray-400 mt-6">
        {/* University ID (Readonly) */}
        {/* <div>
          <label
            htmlFor="UniversityID"
            className="block text-lg font-semibold mb-2"
          >
            University ID
          </label>
          <input
            id="UniversityID"
            name="UniversityID"
            type="text"
            value={uniID}
            readOnly
            className="bg-gray-800 text-gray-400 border border-gray-600 rounded w-full p-3 cursor-not-allowed"
          />
        </div> */}

        {/* Vendor ID */}
        <div>
          <label
            htmlFor="VendorID"
            className="block text-lg font-semibold mb-2"
          >
            Vendor ID
          </label>
          <input
            id="VendorID"
            name="VendorID"
            type="text"
            value={formData.VendorID}
            onChange={handleChange}
            className="bg-gray-800 text-gray-300 border border-gray-600 rounded w-full p-3"
            placeholder="Enter Vendor ID"
          />
        </div>

        {/* Contract Details */}
        <div>
          <label
            htmlFor="ContractDetails"
            className="block text-lg font-semibold mb-2"
          >
            Contract Details
          </label>
          <textarea
            id="ContractDetails"
            name="ContractDetails"
            value={formData.ContractDetails}
            onChange={handleChange}
            className="bg-gray-800 text-gray-300 border border-gray-600 rounded w-full p-3"
            placeholder="Enter Contract Details"
            rows="4"
          />
        </div>

        {/* Start Date */}
        <div>
          <label
            htmlFor="StartDate"
            className="block text-lg font-semibold mb-2"
          >
            Start Date
          </label>
          <input
            id="StartDate"
            name="StartDate"
            type="date"
            value={formData.StartDate}
            onChange={handleChange}
            className="bg-gray-800 text-gray-300 border border-gray-600 rounded w-full p-3"
          />
        </div>

        {/* End Date */}
        <div>
          <label htmlFor="EndDate" className="block text-lg font-semibold mb-2">
            End Date
          </label>
          <input
            id="EndDate"
            name="EndDate"
            type="date"
            value={formData.EndDate}
            onChange={handleChange}
            className="bg-gray-800 text-gray-300 border border-gray-600 rounded w-full p-3"
          />
        </div>

        {/* Status */}
        <div>
          <label htmlFor="Status" className="block text-lg font-semibold mb-2">
            Status
          </label>
          <select
            id="Status"
            name="Status"
            value={formData.Status}
            onChange={handleChange}
            className="bg-gray-800 text-gray-300 border border-gray-600 rounded w-full p-3"
          >
            <option value="" disabled>
              Select Status
            </option>
            <option value="Active">Active</option>
            <option value="Expired">Expired</option> 
            <option value="Cancelled">Cancelled</option> 
          </select>
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

export default ContractAddForm;
