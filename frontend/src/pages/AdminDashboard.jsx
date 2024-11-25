import React, { useState } from "react";
import { useSelector } from "react-redux";
import useFetch from "../hooks/useFetch";
import {LoadingAnimation} from "../component/LoadingAnimation";
import Dropdown from "../component/AdminComponents/Dropdown";
import VendorCard from "../component/AdminComponents/VendorCard";
import StudentCard from "../component/AdminComponents/StudentCard";
import FacultyCard from "../component/AdminComponents/FacultyCard";
import ContractCard from "../component/AdminComponents/ContractCard";
import DriverCard from "../component/AdminComponents/DriverCard";
import PaymentCard from "../component/AdminComponents/PaymentCard";
import RouteCardA from "../component/AdminComponents/RouteCardA";
import NotificationCard from "../component/AdminComponents/NotificationCard";
import AttendanceCard from "../component/AdminComponents/AttendanceCard";
import ComplaintCard from "../component/AdminComponents/ComplaintCard";
import TrafficAlertCard from "../component/AdminComponents/TrafficAlertCard";

const AdminDashboard = () => {
  const [formState, setFormState] = useState({
    selectedOperation: "",
    selectedCategory: "",
    entityId: "",
  });
  const [url, setUrl] = useState(null);
  const { data, loading, error } = useFetch(url);

  const adminData = useSelector((state) => state.admin);
  
  const operations = ["Add", "Update", "Delete", "View"];
  const categories = {
    Add: ["Vendor", "Student", "Faculty", "Contract", "Route"],
    Update: ["Vendor", "Student", "Faculty", "Contract", "Route", "Notification", "Complaint", "Alert"],
    Delete: ["Vendor", "Student", "Faculty", "Contract", "Route"],
    View: ["Vendor", "Student", "Faculty", "Driver", "Contract", "Payment", "Route", "Stop", "Notification", "Complaint", "Traffic Alert", "Bus", "Attendance"],
  };

  const handleChange = (field, value) => {
    setFormState((prev) => ({ ...prev, [field]: value }));
    if (field === "selectedOperation") {
      setFormState((prev) => ({ ...prev, selectedCategory: "" }));
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const { selectedOperation, selectedCategory, entityId } = formState;

    if (!selectedOperation || !selectedCategory) {
      alert("Please select an operation and category.");
      return;
    }
    if (["Update", "Delete"].includes(selectedOperation) && !entityId) {
      alert("Please provide an ID for this operation.");
      return;
    }

    const generatedUrl = `http://localhost:8000/admin/dropdown/${selectedOperation}/${selectedCategory}/${entityId || ""}`;
    setUrl(generatedUrl);
    console.log(data)
  };

  return (
    <div className="bg-gray-950 p-8 font-zendot">
      <div className="p-6 bg-gray-900 min-h-screen text-gray-200 border border-gray-600 rounded">
        <h1 className="text-3xl font-bold mb-6">
          Admin <span className="text-yellow-500">Dashboard</span>
        </h1>
        
        {adminData?.adminData && (
          <p className="text-lg text-white mb-6">
            Admin Info: {adminData.adminData.UniversityID} {adminData.adminData.UniversityName} {adminData.adminData.Email} {adminData.adminData.Location}
          </p>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-6 border border-gray-600 bg-gray-800 p-4">
          <div className="flex flex-col md:flex-row md:space-x-4 space-y-3 md:space-y-0">
            <Dropdown
              label="Select Operation"
              options={operations}
              value={formState.selectedOperation}
              onChange={(value) => handleChange("selectedOperation", value)}
            />
            {formState.selectedOperation && (
              <Dropdown
                label="Select Category"
                options={categories[formState.selectedOperation]}
                value={formState.selectedCategory}
                onChange={(value) => handleChange("selectedCategory", value)}
              />
            )}
            {(formState.selectedOperation === "Update" ||
              formState.selectedOperation === "Delete" ||
              formState.selectedOperation === "View") && (
              <div className="w-full">
                <label htmlFor="entityId" className="block text-lg font-semibold mb-2">
                  ID
                </label>
                <input
                  id="entityId"
                  type="text"
                  value={formState.entityId}
                  onChange={(e) => handleChange("entityId", e.target.value)}
                  className="bg-gray-800 text-gray-300 border border-gray-600 rounded w-full p-3"
                  placeholder="Enter ID (e.g., Vendor ID)"
                />
              </div>
            )}
          </div>
          <button type="submit" className="bg-yellow-600  w-full  text-gray-900 p-3 rounded font-bold hover:bg-yellow-500 transition duration-300">
            Proceed
          </button>
        </form>
        
          <hr className="my-8 mx-4 bg-gray-600 border border-gray-500"/>

        {/* loading */}
        {loading && <LoadingAnimation />}

        {/* error if any*/}
        {error && <p className="text-red-300 mt-4">Error: {error.message || error}</p>}

        {/* show data if requested */}
        {data ? (
          <div>
            {data?.vendors?.length > 0 && (
              // <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
              <div className="w-full mt-6">
                <h1 className="text-gray-200 text-2xl  font-bold">Vendors</h1>
                {data.vendors.map((vendor) => (
                  <VendorCard key={vendor.VendorID} vendor={vendor} />
                ))}
              </div>
            )}

            {data?.students?.length > 0 && (
              <div>
              <h1 className="text-gray-200 text-2xl font-bold">Students</h1>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 ">
                {data.students.map((student) => (
                  <StudentCard key={student.studentID} student={student} />
                ))}
              </div>
              </div>
            )}

            {data?.faculties?.length > 0 && (
              <div>
              <h1 className="text-gray-200 text-2xl font-bold">Faculties</h1>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 ">
                {data.faculties.map((faculty) => (
                  <FacultyCard key={faculty.facultyID} faculty={faculty} />
                ))}
              </div>
              </div>
            )}

            {data?.contracts?.length > 0 && (
              <div>
              <h1 className="text-gray-200 text-2xl font-bold">Contracts</h1>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 ">
                {data.contracts.map((contract) => (
                  <ContractCard key={contract.contractID} contract={contract} />
                ))}
              </div>
              </div>
            )}

            {data?.length > 0 && formState.selectedCategory == 'Driver' && (
              <div>
              <h1 className="text-gray-200 text-2xl font-bold">Drivers</h1>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 ">
                {data.map((driver) => (
                  <DriverCard key={driver.driverID} driver={driver} />
                ))}
              </div>
              </div>
            )}

            {data?.Payment?.length > 0 && (
              <div>
              <h1 className="text-gray-200 text-2xl font-bold">Payments</h1>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 ">
                {data.Payment.map((Pay) => (
                  <PaymentCard key={Pay.PaymentID} payment={Pay} />
                ))}
              </div>
              </div>
            )}

            {data?.routes?.length > 0 && (
              <div>
              <h1 className="text-gray-200 text-2xl font-bold">Routes</h1>
              <div className="w-full ">
                {data.routes.map((route) => (
                  <RouteCardA key={route.routeID} route={route} />
                ))}
              </div>
              </div>
            )}

            {data?.Notification?.length > 0 && (
              <div className="w-full mt-6">
                
                <NotificationCard key={Notification.NotificationID} data={data} />
              </div>
            )}

            {data?.AttendanceRecords?.length > 0 && (
              <AttendanceCard  data={data}/>
             )}

             {data?.complaints?.length > 0 && (
              <ComplaintCard data = {data}/>
             )}

             {data?.traffic_alert?.length > 0 && (
              <TrafficAlertCard data= {data}/>
             )

             }
          </div>
        ) : (
          !loading && !error && <p className="text-gray-400 mt-16 text-center font-bold">Nothing to show</p>
        )}


        
      </div>
    </div>
  );
};

export default AdminDashboard;
