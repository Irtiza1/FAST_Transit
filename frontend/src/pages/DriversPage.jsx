import React, { useEffect, useState } from "react";
import { FaSearch, FaPlus, FaEllipsisV } from "react-icons/fa";
import { Link } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { LoadingAnimation } from "../component/LoadingAnimation";
import DeleteDialogueBox from "../component/DeleteDialogueBox/DeleteDialogueBox";


function DriversPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [menuOpen, setMenuOpen] = useState(null);
  const [url, setUrl] = useState(null);
  const { data, loading, error, setError, setLoading, setData } = useFetch(url);

  //will be used to handle delete operation
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [recordToDelete, setRecordToDelete] = useState(null);
  //will show confimation message to delete data
  const openDeleteModal = (entityId) => {
    setRecordToDelete(entityId);
    setShowDeleteModal(true);
  };
  const handleConfirmDelete = async () => {
    try {
      // const cat=formState.selectedCategory
      const response = await fetch(
        `http://localhost:8000/admin/vendor/dropdown/Delete/Driver/${recordToDelete}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        alert("Record deleted successfully!");
        setShowDeleteModal(false);
        setRecordToDelete(null);
        // Refresh the data or update the UI
        setUrl(`http://localhost:8000/admin/vendor/dropdown/View/Driver?t=${Date.now()}`);
      } else {
        alert("Failed to delete the record.");
      }
    } catch (error) {
      console.error("Error deleting record:", error);
    }
  };

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
    setRecordToDelete(null);
  };
  useEffect(() => {
    setUrl('http://localhost:8000/admin/Vendor/dropdown/View/Driver');
    console.log(data)
  }, []);

  const filteredDrivers = data?.filter(data =>
    `${data.DriverName}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleMenu = (driverId) => {
    setMenuOpen(menuOpen === driverId ? null : driverId);
  };

  if(loading){
    return <LoadingAnimation/>
  }
  return (
    <div className="bg-gray-950 min-h-screen p-8 text-gray-100">
      <div className="p-6 bg-gray-900 min-h-screen text-gray-100 border border-gray-600 rounded">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-6 space-y-4 lg:space-y-0">
          <h2 className="text-4xl font-bold mb-4">
            Registered <span className="text-yellow-500">Drivers</span>
          </h2>
          <div className="flex lg:items-center justify-between space-x-2">
            <div className="relative">
              <input
                type="text"
                placeholder="Search drivers"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="text-gray-300 bg-gray-800 border border-gray-600 rounded p-2 pl-10 lg:w-64 md:w-64 w-2/3 focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition duration-200"
              />
              <FaSearch className="absolute left-3 top-3 text-gray-500" />
            </div>
            <Link to='/vendor/register-driver' className="flex items-center bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold lg:px-4 lg:py-2 md:px-4 md:py-2 p-1 rounded text-sm">
              <FaPlus className="mr-2 text-sm" /> Add New Driver
            </Link>
          </div>
        </div>
        {/* <div>{data.drivers[0]?.firstName}</div> */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredDrivers?.map((driver) => (
            <div key={driver.id} className="bg-gray-800 p-6 border border-gray-700 rounded-lg shadow relative">
              {/* Options Menu Button */}
              {/* <div className="absolute top-2 right-2">
                <button
                  onClick={() => toggleMenu(driver.DriverID)}
                  className="text-gray-400 hover:text-gray-200 focus:outline-none"
                >
                  <FaEllipsisV />
                </button>
                {menuOpen === driver.DriverID && (
                  <div className="absolute right-0 mt-2 w-28 bg-gray-800 border border-gray-700 rounded shadow-lg">
                    <button
                      onClick={() => alert(`Updating driver ${driver.firstName} ${driver.lastName}`)}
                      className="block w-full text-left px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white"
                    >
                      Update
                    </button>
                    <button
                      onClick={()=> openDeleteModal(driver.DriverID)}
                      className="block w-full text-left px-4 py-2 text-red-500 hover:bg-gray-700 hover:text-white"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
              <DeleteDialogueBox handleCancelDelete = {handleCancelDelete} handleConfirmDelete={handleConfirmDelete} showDeleteModal={showDeleteModal}/> */}

              <h2 className="text-xl font-semibold text-yellow-500">
                {driver.DriverName}
              </h2>
              <p className="text-gray-300">Driver ID: {driver.DriverID}</p>
              <p className="text-gray-300">Phone: {driver.PhoneNumber}</p>
              <p className="text-gray-300">License: {driver.LicenseNumber}</p>
              <p className="text-gray-300">Bus ID: {driver.BusID}</p>
              <p className="text-gray-300">Bus number: {driver.BusNumber}</p>
              {/* <p className="text-gray-300">Address: {driver.address}</p>
              <p className="text-gray-300">
                Date Joined: {new Date(driver.dateJoined).toLocaleDateString()}
              </p> */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default DriversPage;
