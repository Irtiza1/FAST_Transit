import React, { useState } from "react";
import { useSelector } from "react-redux";

const NotificationAddForm = ({ setAddFormData,handleSubmit }) => {
  // Extracting UniversityID (which is also admin ID) from the adminData saved when logged in
  const adminData = useSelector((state) => state.admin);
  const uniID = adminData.adminData.UniversityID;

  // Form data state for the notification
  const [formData, setFormData] = useState({
    adminID: uniID,
    NotificationText: "",
    Type: "", // Types can be: Info, Warning, Alert
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedFormData = { ...formData, [name]: value };
    setFormData(updatedFormData);
    setAddFormData(updatedFormData); // Pass data to parent
  };

  return (
    <div>
      <h1 className="text-gray-200 text-2xl  font-bold mb-4">
        Fill Out Following <span className="text-yellow-600">Details</span> 
      </h1>
      <div className="space-y-4  text-gray-400 mt-6">
        {/* Admin ID (Readonly) */}
        {/* <div>
          <label htmlFor="adminID" className="block text-lg font-semibold mb-2">
            Admin ID
          </label>
          <input
            id="adminID"
            name="adminID"
            type="text"
            value={formData.adminID}
            readOnly
            className="bg-gray-800 text-gray-400 border border-gray-600 rounded w-full p-3 cursor-not-allowed"
          />
        </div> */}

        {/* Notification Text */}
        <div>
          <label
            htmlFor="NotificationText"
            className="block text-lg font-semibold mb-2"
          >
            Notification Text
          </label>
          <textarea
            id="NotificationText"
            name="NotificationText"
            value={formData.NotificationText}
            onChange={handleChange}
            className="bg-gray-800 text-gray-300 border border-gray-600 rounded w-full p-3"
            placeholder="Enter Notification Text"
            rows="4"
          />
        </div>

        {/* Notification Type */}
        <div>
          <label htmlFor="Type" className="block text-lg font-semibold mb-2">
            Type
          </label>
          <select
            id="Type"
            name="Type"
            value={formData.Type}
            onChange={handleChange}
            className="bg-gray-800 text-gray-300 border border-gray-600 rounded w-full p-3"
          >
            <option value="" disabled>
              Select Notification Type
            </option>
            <option value="Info">Info</option>
            <option value="Warning">Warning</option>
            <option value="Alert">Alert</option>
          </select>
        </div>
        <button
            type="submit"
            onClick={handleSubmit}
            className="bg-yellow-600 w-full my-2 text-gray-900 p-3 rounded font-bold hover:bg-yellow-500 transition duration-300"
          >
            Submit
          </button>
      </div>
    </div>
  );
};

export default NotificationAddForm;
