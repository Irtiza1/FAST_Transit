import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import useFetch from "../hooks/useFetch";
import { LoadingAnimation } from "../component/LoadingAnimation";
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
import NotificationAddForm from "../component/AdminComponents/NotificationAddForm";
import ContractAddForm from "../component/AdminComponents/ContractAddForm";
import VendorAddForm from "../component/AdminComponents/VendorAddForm";
import UserCard from "../component/AdminComponents/UserCard";
import RouteCreationForm from "../component/RouteCreationForm/RouteCreationForm";
import CreateRoutePage from "./CreateRoutePage";
import axios from "axios";

const AdminDashboard = () => {
  //admin data was stored in local storage on login
  const adminData = useSelector((state) => state.admin);
  console.log(adminData);
  //it handles operations and category selected for the operation and ID if required for the operarion
  const [formState, setFormState] = useState({
    selectedOperation: "",
    selectedCategory: "",
    entityId: "",
  });
  //it is used to call the api from the cutom hook(useFetch) that i made for fetching data
  const [url, setUrl] = useState(null);
  const { data, loading, error, setError, setLoading, setData } = useFetch(url);

  //this will be used for form of add operation
  const [addOperationFormData, setAddOperationFormData] = useState(null);

  //operations and categories
  const operations = ["Add", "Update", "View"];
  const categories = {
    Add: ["Vendor", "Contract", "Notification","Route"],
    Update: [
      "Vendor",
      "Student",
      "Faculty",
      "Contract",
      "Route",
      "Notification",
      "Complaint",
      "Alert",
    ],
    // Delete: ["Vendor", "Student", "Faculty", "Contract", "Route"],
    View: [
      "User",
      "Vendor",
      "Student",
      "Faculty",
      "Driver",
      "Contract",
      "Payment",
      "Route",
      "Stop",
      "Notification",
      "Complaint",
      "Traffic Alert",
      "Bus",
      "Attendance",
    ],
  };

  //this detects any change in state and runs the fun on changed values
  useEffect(() => {
    setError(false);
    if (formState.selectedOperation === "View" && formState.selectedCategory) {
      const generatedUrl = `http://localhost:8000/admin/dropdown/View/${
        formState.selectedCategory
      }/${formState.entityId || ""}`;
      setUrl(generatedUrl);
    } else {
      setUrl(null);
    }
  }, [
    formState.selectedOperation,
    formState.selectedCategory,
    formState.entityId,
  ]);

  //handles the operationa and category change
  const handleChange = (field, value) => {
    setFormState((prev) => ({ ...prev, [field]: value }));
    if (field === "selectedOperation") {
      setFormState((prev) => ({ ...prev, selectedCategory: "" }));
    }
  };

  //this being used by Add operation to send data
  const handleSubmit = async (event) => {
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
    //handle add for vendor contract and notification
    if (selectedOperation === "Add" && (selectedCategory === "Vendor" || selectedCategory === "Contract" || selectedCategory === "Notificaton")) {
      if (!addOperationFormData) {
        alert("Please fill in all required fields.");
        return;
      }
      try {
        const response = await axios.post(
          `http://localhost:8000/admin/dropdown/Add/${selectedCategory}`,
          addOperationFormData, // Data goes here
          {
            headers: { "Content-Type": "application/json" }, // Headers go here
          }
        );
        console.log(response.data);
        alert(`Successfully added new ${selectedCategory}!`);
      } catch (error) {
        console.error("Error adding entity:", error);
      }
    }
    //handle add for route and stops, it separates route and stops data and sends them to their respective apis 
    if(selectedCategory === "Route" && selectedOperation === "Add"){
      if (!addOperationFormData) {
        alert("Please fill in all required fields.");
        return;
      }
      console.log(addOperationFormData)
      try {
        const routeData = {
          RouteName :addOperationFormData.routeName , 
          StartPoint:addOperationFormData.startPoint.StopName, 
          EndPoint:addOperationFormData.endPoint.StopName
        }
        const response = await axios.post(`http://localhost:8000/admin/dropdown/Add/Route`,routeData)
        const newRouteID =response.data.routeID
        console.log(newRouteID)
        try {
          const routeStops = addOperationFormData.stops.map((stop)=>({
            ...stop,
            RouteID:newRouteID
          }))
          console.log(routeStops)
          const responseFromStopApi = await axios.post(`http://localhost:8000/admin/dropdown/Add/Stop`,routeStops)
          console.log(responseFromStopApi.data)
          alert('Successfully added new Route')
          formState.selectedCategory=""
        } catch (error) {
          console.log(error.message || error)
        }
        
      } catch (error) {
        console.log(error.message || error)
      }
    }
  };

  //this will render forms for add operations
  const renderAddForm = () => {
    switch (formState.selectedCategory) {
      case "Route":
        return(
          <CreateRoutePage setAddFormData={setAddOperationFormData}
          handleSubmitFromAdmin={handleSubmit} addFormData={addOperationFormData}/>
        )
      case "Vendor":
        return (
          <VendorAddForm
            setAddFormData={setAddOperationFormData}
            handleSubmit={handleSubmit}
          />
        );
      case "Contract":
        return (
          <ContractAddForm
            setAddFormData={setAddOperationFormData}
            handleSubmit={handleSubmit}
          />
        );
      case "Notification":
        return (
          <NotificationAddForm
            setAddFormData={setAddOperationFormData}
            handleSubmit={handleSubmit}
          />
        );
      default:
        return null;
    }
  };
  //will be used to handle delete operation
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [recordToDelete, setRecordToDelete] = useState(null);

  //will show confimation message to delete data
  const openDeleteModal = (entityId) => {
    setRecordToDelete(entityId);
    setShowDeleteModal(true);
  };

  //when confirmed by user following function is executed
  const handleConfirmDelete = async () => {
    try {
      const cat=formState.selectedCategory
      const response = await fetch(
        `http://localhost:8000/admin/dropdown/Delete/${formState.selectedCategory}/${recordToDelete}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        alert("Record deleted successfully!");
        setShowDeleteModal(false);
        setRecordToDelete(null);
        // Refresh the data or update the UI
        setUrl(`http://localhost:8000/admin/dropdown/View/${formState.selectedCategory}?t=${Date.now()}`);
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
  const renderDataCards = () => {
    if (!data || formState.selectedOperation !== "View") return null;
    return (
      <div>
        {/* vendor can be deleted */}
        {data?.vendors?.length > 0 && (
          // <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          <div className=" mt-6">
            <h1 className="text-gray-200 text-2xl  font-bold">Vendors</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 ">
              {data.vendors.map((vendor) => (
                <VendorCard key={vendor.VendorID} vendor={vendor} handleCancelDelete={handleCancelDelete} handleConfirmDelete={handleConfirmDelete} showDeleteModal={showDeleteModal} openDeleteModal={openDeleteModal}/>
              ))}
            </div>
          </div>
        )}
        {data?.users?.length > 0 && (
          // <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          <div className=" mt-6">
            <h1 className="text-gray-200 text-2xl  font-bold">Vendors</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 ">
              {data.users.map((user) => (
                <UserCard key={user.UserID} user={user} handleCancelDelete={handleCancelDelete} handleConfirmDelete={handleConfirmDelete} showDeleteModal={showDeleteModal} openDeleteModal={openDeleteModal}/>
              ))}
            </div>
          </div>
        )}

        {data?.students?.length > 0 && (
          <div>
            <h1 className="text-gray-200 text-2xl font-bold">Students</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 ">
              {data.students.map((student) => (
                <StudentCard key={student.studentID} student={student} handleCancelDelete={handleCancelDelete} handleConfirmDelete={handleConfirmDelete} showDeleteModal={showDeleteModal} openDeleteModal={openDeleteModal}/>
              ))}
            </div>
          </div>
        )}

        {data?.faculties?.length > 0 && (
          <div>
            <h1 className="text-gray-200 text-2xl font-bold">Faculties</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 ">
              {data.faculties.map((faculty) => (
                <FacultyCard key={faculty.facultyID} faculty={faculty} handleCancelDelete={handleCancelDelete} handleConfirmDelete={handleConfirmDelete} showDeleteModal={showDeleteModal} openDeleteModal={openDeleteModal}/>
              ))}
            </div>
          </div>
        )}

        {data?.contracts?.length > 0 && (
          <div>
            <h1 className="text-gray-200 text-2xl font-bold">Contracts</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 ">
              {data.contracts.map((contract) => (
                <ContractCard key={contract.contractID} contract={contract} handleCancelDelete={handleCancelDelete} handleConfirmDelete={handleConfirmDelete} showDeleteModal={showDeleteModal} openDeleteModal={openDeleteModal}/>
              ))}
            </div>
          </div>
        )}

        {data?.length > 0 && formState.selectedCategory == "Driver" && (
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
                <RouteCardA key={route.routeID} route={route} data={data} handleCancelDelete={handleCancelDelete} handleConfirmDelete={handleConfirmDelete} showDeleteModal={showDeleteModal} openDeleteModal={openDeleteModal}/>
              ))}
            </div>
          </div>
        )}

        {data?.Notification?.length > 0 && (
          <div className="w-full mt-6">
            <NotificationCard key={Notification.NotificationID} data={data} handleCancelDelete={handleCancelDelete} handleConfirmDelete={handleConfirmDelete} showDeleteModal={showDeleteModal} openDeleteModal={openDeleteModal}/>
          </div>
        )}

        {data?.AttendanceRecords?.length > 0 && <AttendanceCard data={data} />}

        {data?.complaints?.length > 0 && <ComplaintCard data={data} />}

        {data?.traffic_alert?.length > 0 && <TrafficAlertCard data={data} />}
      </div>
    );
  };

  

  return (
    <div className="bg-gray-950 p-8 font-zendot">
      <div className="p-6 bg-gray-900 min-h-screen text-gray-200 border border-gray-600 rounded">
        <h1 className="text-3xl font-bold mb-6">
          Admin <span className="text-yellow-500">Dashboard</span>
        </h1>

        {adminData?.adminData && (
          <p className="text-lg mb-6">
            Admin Info: {adminData.adminData.UniversityID}{" "}
            {adminData.adminData.UniversityName} {adminData.adminData.Email}{" "}
            {adminData.adminData.Location}
          </p>
        )}

        <form className="space-y-6 border border-gray-600 rounded bg-gray-800 p-4">
          <div className="flex flex-col md:flex-row md:space-x-4 space-y-3 md:space-y-0 text-gray-300">
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
                <label
                  htmlFor="entityId"
                  className="block text-lg font-semibold mb-2"
                >
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
        </form>

        <hr className="my-8 mx-4 bg-gray-600 border border-gray-500" />

        {loading && <LoadingAnimation />}
        {error && (
          <div className="flex justify-center">
            <p className="text-gray-400 mt-4 font-bold">No record found</p>
          </div>
        )}
        {/* <p className="text-red-300 mt-4">Error: {error.message || error}</p> */}
        {formState.selectedOperation === "Add" && renderAddForm()}

        {renderDataCards()}
      </div>
    </div>
  );
};

export default AdminDashboard;
