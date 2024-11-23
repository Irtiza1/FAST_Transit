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
    Update: ["Vendor", "Student", "Faculty", "Contract", "Route", "Notification", "Complain", "Alert"],
    Delete: ["Vendor", "Student", "Faculty", "Contract", "Route"],
    View: ["Vendor", "Student", "Faculty", "Contract", "Payment", "Route", "Stop", "Notification", "Complain", "Alert", "Bus", "Driver", "Attendance"],
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
    <div className="bg-gray-950 p-8">
      <div className="p-6 bg-gray-900 min-h-screen text-gray-200 border border-gray-600 rounded">
        <h1 className="text-3xl font-bold mb-6">
          Admin <span className="text-yellow-500">Dashboard</span>
        </h1>
        
        {adminData?.adminData && (
          <p className="text-lg text-white mb-6">
            Admin Info: {adminData.adminData.UniversityID} {adminData.adminData.UniversityName} {adminData.adminData.Email} {adminData.adminData.Location}
          </p>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-col md:flex-row md:space-x-4">
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
          <button type="submit" className="bg-yellow-500 w-full  text-gray-900 p-3 rounded font-bold hover:bg-yellow-400 transition duration-300">
            Proceed
          </button>
        </form>
        
        {/* loading */}
        {loading && <LoadingAnimation />}

        {/* error if any*/}
        {error && <p className="text-red-300 mt-4">Error: {error.message || error}</p>}

        {/* show vendor data if requested */}
        {data?.vendors?.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {data.vendors.map((vendor) => (
              <VendorCard key={vendor.VendorID} vendor={vendor} />
            ))}
          </div>
        ) : (
          !loading && !error && <p className="text-gray-400 mt-16 text-center font-bold">Nothing to show</p>
        )}

        {/* show student data if requested */}
        {data?.students?.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {data.students.map((student) => (
              <StudentCard key={student.studentID} student={student} />
            ))}
          </div>
        ) : (
          !loading && !error && <p className="text-gray-400 mt-16 text-center font-bold">Nothing to show</p>
        )}

        {/* show faculty data if requested */}
        {data?.faculties?.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {data.faculties.map((faculty) => (
              <FacultyCard key={faculty.facultyID} faculty={faculty} />
            ))}
          </div>
        ) : (
          !loading && !error && <p className="text-gray-400 mt-16 text-center font-bold">Nothing to show</p>
        )}

        {/* show contract data if requested */}
        {data?.contracts?.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {data.contracts.map((contract) => (
            <ContractCard key={contract.contractID} contract={contract} />
          ))}
        </div>
        ) : (
          !loading && !error && <p className="text-gray-400 mt-16 text-center font-bold">Nothing to show</p>
        )}

        {/* show driver data if requested */}
        {data?.drivers?.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {data.drivers.map((driver) => (
            <DriverCard key={driver.driverID} driver={driver} />
          ))}
        </div>
        ) : (
          !loading && !error && <p className="text-gray-400 mt-16 text-center font-bold">Nothing to show</p>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;


// import React, { useState } from "react";
// import { useSelector } from "react-redux";
// import useFetch from "../hooks/useFetch";
// import { LoadingAnimation } from "../component/LoadingAnimation";
// const AdminDashboard = () => {
//   const [selectedOperation, setSelectedOperation] = useState("");
//   const [selectedCategory, setSelectedCategory] = useState("");
//   const [entityId, setEntityId] = useState("");
//   const [url, setUrl] = useState(null);
//   const [dataRes, setDataRes] = useState(null);
//   const { data, loading, error } = useFetch(url);

//   const adminData = useSelector((state) => state.admin);
//   console.log(adminData);
//   const operations = ["Add", "Update", "Delete", "View"];
//   const categories = {
//     Add: ["Vendor", "Student", "Faculty", "Contract", "Route"],
//     Update: [
//       "Vendor",
//       "Student",
//       "Faculty",
//       "Contract",
//       "Route",
//       "Notification",
//       "Complain",
//       "Alert",
//     ],
//     Delete: ["Vendor", "Student", "Faculty", "Contract", "Route"],
//     View: [
//       "Vendor",
//       "Student",
//       "Faculty",
//       "Contract",
//       "Payment",
//       "Route",
//       "Stop",
//       "Notification",
//       "Complain",
//       "Alert",
//       "Bus",
//       "Driver",
//       "Attendance",
//     ],
//   };

//   const handleOperationChange = (event) => {
//     setSelectedOperation(event.target.value);
//     setSelectedCategory("");
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     if (!selectedOperation || !selectedCategory) {
//       alert("Please select an operation and category.");
//       return;
//     }
//     if (["Update", "Delete"].includes(selectedOperation) && !entityId) {
//       alert("Please provide an ID for this operation.");
//       return;
//     }
//     const generatedUrl = `http://localhost:8000/admin/dropdown/${selectedOperation}/${selectedCategory}/${
//       entityId || ""
//     }`;
//     setUrl(generatedUrl);
//     console.log(data);
//     // const url = `http://localhost:8000/admin/dropdown/${selectedOperation}/${selectedCategory}/${entityId || ""}`;
//     // await fetchData(url); // `fetchData` now logs or handles data internally
//   };

//   if (loading) {
//     return <LoadingAnimation />;
//   }
//   if (error) {
//     alert(`Error occurred: ${error.message || error}`);
//   }

//   return (
//     <div className="bg-gray-950 p-8">
//       <div className="p-6 bg-gray-900 min-h-screen text-gray-200 border border-gray-600 rounded">
//         <h1 className="text-3xl font-bold  mb-6">
//           Admin <span className="text-yellow-500">Dashboard</span>
//         </h1>
//         {/* Display Redux Admin Data */}
//         {adminData && (
//           <div className="mt-6 text-center">
//             <p className="text-lg text-white">
//               Admin Info: {adminData.adminData.UniversityID}{" "}
//               {adminData.adminData.UniversityName} {adminData.adminData.Email}{" "}
//               {adminData.adminData.Location}
//             </p>
//           </div>
//         )}
//         <div className="w-full mx-auto  rounded">
//           <form onSubmit={handleSubmit} className="sm:space-y-6">
//             {/* Operation Dropdown */}
//             <div className="flex md:flex-row flex-col md:space-x-2 md:justify-between">
//               <div className="w-full transition-all duration-500 ">
//                 <label
//                   htmlFor="operation"
//                   className="block text-lg font-semibold mb-2"
//                 >
//                   Select Operation
//                 </label>
//                 <select
//                   id="operation"
//                   value={selectedOperation}
//                   onChange={handleOperationChange}
//                   className="bg-gray-800 text-gray-300 border border-gray-600 rounded w-full p-3"
//                   required
//                 >
//                   <option value="">Select an operation</option>
//                   {operations.map((operation, index) => (
//                     <option key={index} value={operation}>
//                       {operation}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               {/* Category Dropdown */}
//               {selectedOperation && (
//                 <div className="">
//                   <label
//                     htmlFor="category"
//                     className="block text-lg font-semibold mb-2"
//                   >
//                     Category
//                   </label>
//                   <select
//                     id="category"
//                     value={selectedCategory}
//                     onChange={(e) => setSelectedCategory(e.target.value)}
//                     className="bg-gray-800 text-gray-300 border border-gray-600 rounded w-full p-3"
//                     required
//                   >
//                     <option value="">Select a category</option>
//                     {categories[selectedOperation]?.map((category, index) => (
//                       <option key={index} value={category}>
//                         {category}
//                       </option>
//                     ))}
//                   </select>
//                 </div>
//               )}

//               {/* ID Input */}
//               {(selectedOperation === "Update" ||
//                 selectedOperation === "Delete" ||
//                 selectedOperation === "View") && (
//                 <div className="transition-all duration-500 ease-in-out">
//                   <label
//                     htmlFor="entityId"
//                     className="block text-lg font-semibold mb-2"
//                   >
//                     ID
//                   </label>
//                   <input
//                     id="entityId"
//                     type="text"
//                     value={entityId}
//                     onChange={(e) => setEntityId(e.target.value)}
//                     className="bg-gray-800 text-gray-300 border border-gray-600 rounded w-full p-3"
//                     placeholder="Enter ID (e.g., Vendor ID)"
//                   />
//                 </div>
//               )}

//               {/* Submit Button */}
//               <div className="flex justify-end my-4 md:mt-4">
//                 <button
//                   type="submit"
//                   className="bg-yellow-500 text-gray-900 p-3 md:px-8 md:mt-5  rounded font-bold hover:bg-yellow-400 transition duration-300"
//                 >
//                   Proceed
//                 </button>
//               </div>
//             </div>
//           </form>
//         </div>
//         <h2 className="text-gray-50">
//           {loading && "Loading..."}
//           {error && `Error: ${error.message || error}`}
//           {!loading && !error && data?.vendors?.length > 0 && (
//             <div>
//               <h3 className="text-lg font-bold mb-4">Vendor Data</h3>
//               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//                 {data.vendors.map((vendor) => (
//                   <div
//                     key={vendor.VendorID}
//                     className="bg-gray-800 text-gray-200 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
//                   >
//                     <h4 className="text-xl font-semibold mb-2">
//                       {vendor.VendorName}
//                     </h4>
//                     <p className="text-gray-400 text-sm">
//                       <span className="font-bold">Email:</span> {vendor.Email}
//                     </p>
//                     <p className="text-gray-400 text-sm">
//                       <span className="font-bold">Contact Info:</span>{" "}
//                       {vendor.ContactInfo}
//                     </p>
//                     <p className="text-gray-400 text-sm">
//                       <span className="font-bold">Vendor ID:</span>{" "}
//                       {vendor.VendorID}
//                     </p>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}
//           {!loading && !error && data?.vendors?.length === 0 && (
//             <p className="text-gray-400">No Vendor Data Available</p>
//           )}
//         </h2>
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;
