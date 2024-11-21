import React, { useState } from "react";
import { useSelector } from "react-redux";
import useFetch from "../hooks/useFetch";
import { LoadingAnimation } from "../component/LoadingAnimation";
const AdminDashboard = () => {
  const [selectedOperation, setSelectedOperation] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [entityId, setEntityId] = useState("");
  const [fetchUrl,setFetchUrl] = useState(null)

  const {data,loading,error} = useFetch(fetchUrl)

  // Redux admin data (example data)
  const adminData = useSelector((state) => state.admin);

  // Dropdown options
  const operations = ["Add", "Update", "Delete", "View"];
  const categories = {
    Add: ["Vendor", "Student", "Faculty", "Contract", "Route"],
    Update: [
      "Vendor",
      "Student",
      "Faculty",
      "Contract",
      "Route",
      "Notification",
      "Complain",
      "Alert",
    ],
    Delete: ["Vendor", "Student", "Faculty", "Contract", "Route"],
    View: [
      "Vendor",
      "Student",
      "Faculty",
      "Contract",
      "Payment",
      "Route",
      "Stop",
      "Notification",
      "Complain",
      "Alert",
      "Bus",
      "Driver",
      "Attendance",
    ],
  };

  // Handle operation change
  const handleOperationChange = (event) => {
    setSelectedOperation(event.target.value);
    setSelectedCategory(""); // Reset category on operation change
  };

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Operation:", selectedOperation);
    console.log("Category:", selectedCategory);
    console.log("ID:", entityId);
    if (selectedOperation && selectedCategory) {
      const url = `http://localhost:8000/admin/dropdown/${selectedOperation}/${selectedCategory}/${entityId || ""}`;
      setFetchUrl(url); // Update the URL to trigger the fetch
    }
  console.log(data)
    
  };
  if(loading){
    return(
      <LoadingAnimation/>
    )
  }
  if(error){
    alert('Error ocurred: ',error)
  }
  return (
    <div className="bg-gray-950 p-8">
      <div className="p-6 bg-gray-900 min-h-screen text-gray-200 border border-gray-600 rounded"><h1 className="text-3xl font-bold  mb-6">
        Admin <span className="text-yellow-500">Dashboard</span>
      </h1>
      <div className="w-full mx-auto  rounded">
        <form onSubmit={handleSubmit} className="sm:space-y-6">
          {/* Operation Dropdown */}
          <div className="flex md:flex-row flex-col md:space-x-2 md:justify-between">
          <div className="w-full transition-all duration-500 ">
            <label htmlFor="operation" className="block text-lg font-semibold mb-2">
              Select Operation
            </label>
            <select
              id="operation"
              value={selectedOperation}
              onChange={handleOperationChange}
              className="bg-gray-800 text-gray-300 border border-gray-600 rounded w-full p-3"
              required
            >
              <option value="">Select an operation</option>
              {operations.map((operation, index) => (
                <option key={index} value={operation}>
                  {operation}
                </option>
              ))}
            </select>
          </div>

          {/* Category Dropdown */}
          {selectedOperation && (
            <div className="">
              <label htmlFor="category" className="block text-lg font-semibold mb-2">
                Category
              </label>
              <select
                id="category"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="bg-gray-800 text-gray-300 border border-gray-600 rounded w-full p-3"
                required
              >
                <option value="">Select a category</option>
                {categories[selectedOperation]?.map((category, index) => (
                  <option key={index} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* ID Input */}
          {(selectedOperation === "Update" ||
            selectedOperation === "Delete" ||
            selectedOperation === "View") && (
            <div className="transition-all duration-500 ease-in-out">
              <label htmlFor="entityId" className="block text-lg font-semibold mb-2">
                ID
              </label>
              <input
                id="entityId"
                type="text"
                value={entityId}
                onChange={(e) => setEntityId(e.target.value)}
                className="bg-gray-800 text-gray-300 border border-gray-600 rounded w-full p-3"
                placeholder="Enter ID (e.g., Vendor ID)"
                required
              />
            </div>
          )}

          {/* Submit Button */}
          <div className="flex justify-end my-4 md:mt-4">
            <button
              type="submit"
              className="bg-yellow-500 text-gray-900 p-3 md:px-8 md:mt-5  rounded font-bold hover:bg-yellow-400 transition duration-300"
            >
              Proceed
            </button>
          </div>
          </div>
        </form>
      </div>

      {/* Display Redux Admin Data */}
      {adminData && adminData.UniversityName && (
        <div className="mt-6 text-center">
          <p className="text-lg">University: {adminData.UniversityName}</p>
        </div>
      )}
    </div>
    </div>
  );
};

export default AdminDashboard;
