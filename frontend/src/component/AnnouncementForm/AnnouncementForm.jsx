
import React, { useState } from "react";
import "tailwindcss/tailwind.css";

function AnnouncementForm() {
  const [announcementData, setAnnouncementData] = useState({
    title: "",
    date: "",
    type: "",
    routes: [],
    message: "",
    contactNumber: "",
    email: "",
    attachment: null,
  });

  const announcementTypes = [
    "Schedule Change",
    "Route Update",
    "General Notice",
    "Other",
  ];

  const routes = ["Route A", "Route B", "Route C"]; // Example route options

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAnnouncementData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileUpload = (e) => {
    setAnnouncementData((prevData) => ({
      ...prevData,
      attachment: e.target.files[0],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit form logic here
    console.log("Announcement Submitted:", announcementData);
  };

  return (
    <div className="p-6 bg-gray-900 min-h-screen text-gray-100 border border-gray-500 rounded">
      <h2 className="text-4xl font-bold mb-6 text-center">
        Make an <span className="text-yellow-500">Announcement</span>
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Announcement Title */}
        <div>
          <label className="block text-lg font-semibold mb-2">Title</label>
          <input
            type="text"
            name="title"
            value={announcementData.title}
            onChange={handleInputChange}
            placeholder="Enter announcement title"
            className="w-full bg-gray-800 border border-gray-500 rounded p-3 focus:ring-2 focus:ring-gray-500 focus:border-gray-500"
          />
        </div>

        {/* Announcement Date */}
        <div>
          <label className="block text-lg font-semibold mb-2">Date</label>
          <input
            type="date"
            name="date"
            value={announcementData.date}
            onChange={handleInputChange}
            className="w-full bg-gray-800 border border-gray-500 rounded p-3 focus:ring-2 focus:ring-gray-500 focus:border-gray-500"
          />
        </div>

        {/* Announcement Type */}
        <div>
          <label className="block text-lg font-semibold mb-2">Type</label>
          <select
            name="type"
            value={announcementData.type}
            onChange={handleInputChange}
            className="w-full bg-gray-800 border border-gray-500 rounded p-3 focus:ring-2 focus:ring-gray-500 focus:border-gray-500"
          >
            <option value="">Select announcement type</option>
            {announcementTypes.map((type, index) => (
              <option key={index} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        {/* Affected Routes */}
        <div>
          <label className="block text-lg font-semibold mb-2">
            Affected Routes
          </label>
          <select
            multiple
            name="routes"
            value={announcementData.routes}
            onChange={(e) =>
              setAnnouncementData({
                ...announcementData,
                routes: Array.from(e.target.selectedOptions, (option) => option.value),
              })
            }
            className="w-full bg-gray-800 border border-gray-500 rounded p-3 focus:ring-2 focus:ring-gray-500 focus:border-gray-500"
          >
            {routes.map((route, index) => (
              <option key={index} value={route}>
                {route}
              </option>
            ))}
          </select>
          <p className="text-xs mt-2 text-gray-400">
            Hold down the Ctrl (Windows) or Command (Mac) key to select multiple routes.
          </p>
        </div>

        {/* Message */}
        <div>
          <label className="block text-lg font-semibold mb-2">Message</label>
          <textarea
            name="message"
            value={announcementData.message}
            onChange={handleInputChange}
            rows="5"
            placeholder="Enter detailed announcement message"
            className="w-full bg-gray-800 border border-gray-500 rounded p-3 focus:ring-2 focus:ring-gray-500 focus:border-gray-500"
          ></textarea>
        </div>

        {/* Contact Information */}
        <div>
          <label className="block text-lg font-semibold mb-2">Contact Number</label>
          <input
            type="tel"
            name="contactNumber"
            value={announcementData.contactNumber}
            onChange={handleInputChange}
            placeholder="Enter contact number"
            className="w-full bg-gray-800 border border-gray-500 rounded p-3 focus:ring-2 focus:ring-gray-500 focus:border-gray-500"
          />
        </div>
        <div>
          <label className="block text-lg font-semibold mb-2">Email</label>
          <input
            type="email"
            name="email"
            value={announcementData.email}
            onChange={handleInputChange}
            placeholder="Enter contact email"
            className="w-full bg-gray-800 border border-gray-500 rounded p-3 focus:ring-2 focus:ring-gray-500 focus:border-gray-500"
          />
        </div>

        {/* Attachment */}
        <div>
          <label className="block text-lg font-semibold mb-2">Attachment (Optional)</label>
          <input
            type="file"
            onChange={handleFileUpload}
            className="w-full bg-gray-800 border border-gray-500 rounded p-3 focus:ring-2 focus:ring-gray-500 focus:border-gray-500"
          />
          {announcementData.attachment && (
            <p className="text-xs mt-2 text-gray-400">File selected: {announcementData.attachment.name}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-3 rounded-lg transition duration-200"
        >
          Publish Announcement
        </button>
      </form>
    </div>
  );
}

export default AnnouncementForm;

