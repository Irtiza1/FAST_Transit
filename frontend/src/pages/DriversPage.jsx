import React, { useEffect, useState } from "react";
import { FaSearch, FaPlus, FaEllipsisV } from "react-icons/fa";
import { Link } from "react-router-dom";
function DriversPage() {
  const [drivers, setDrivers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [menuOpen, setMenuOpen] = useState(null);

  useEffect(() => {
    // Fetch drivers from API
    // Uncomment and replace the URL when ready to fetch from your API
    // axios.get('/api/drivers')
    //   .then(response => setDrivers(response.data))
    //   .catch(error => console.error("Error fetching drivers:", error));

    // Dummy data for testing
    setDrivers([
      {
        id: 1,
        firstName: "John",
        lastName: "Doe",
        email: "johndoe@example.com",
        phoneNumber: "123-456-7890",
        licenseNumber: "ABC1234567",
        cnic: "12345-1234567-9",
        // address: "123 Main St, Cityville",
        // dateJoined: "2023-01-15",
      },
      {
        id: 2,
        firstName: "Jane",
        lastName: "Smith",
        email: "janesmith@example.com",
        phoneNumber: "987-654-3210",
        licenseNumber: "XYZ7654321",
        cnic: "98765-9876543-1",
        // address: "456 Elm St, Townsville",
        // dateJoined: "2023-02-20",
      },
    ]);
  }, []);

  const filteredDrivers = drivers.filter(driver =>
    `${driver.firstName} ${driver.lastName}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleMenu = (driverId) => {
    setMenuOpen(menuOpen === driverId ? null : driverId);
  };

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

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredDrivers.map((driver) => (
            <div key={driver.id} className="bg-gray-800 p-6 border border-gray-700 rounded-lg shadow relative">
              {/* Options Menu Button */}
              <div className="absolute top-2 right-2">
                <button
                  onClick={() => toggleMenu(driver.id)}
                  className="text-gray-400 hover:text-gray-200 focus:outline-none"
                >
                  <FaEllipsisV />
                </button>
                {menuOpen === driver.id && (
                  <div className="absolute right-0 mt-2 w-28 bg-gray-800 border border-gray-700 rounded shadow-lg">
                    <button
                      onClick={() => alert(`Updating driver ${driver.firstName} ${driver.lastName}`)}
                      className="block w-full text-left px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => alert(`Deleting driver ${driver.firstName} ${driver.lastName}`)}
                      className="block w-full text-left px-4 py-2 text-red-500 hover:bg-gray-700 hover:text-white"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>

              <h2 className="text-xl font-semibold text-yellow-500">
                {driver.firstName} {driver.lastName}
              </h2>
              <p className="text-gray-300">Email: {driver.email}</p>
              <p className="text-gray-300">Phone: {driver.phoneNumber}</p>
              <p className="text-gray-300">License: {driver.licenseNumber}</p>
              <p className="text-gray-300">CNIC: {driver.cnic}</p>
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
