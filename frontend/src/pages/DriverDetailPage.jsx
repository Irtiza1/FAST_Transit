// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";

// const DriverDetailPage = () => {
//   const { driverId } = useParams();
//   const [driver, setDriver] = useState(null);

//   useEffect(() => {
//     // Fetch driver details from API by driverId
//     // Uncomment and replace the URL when ready to fetch from your API
//     // axios.get(`/api/drivers/${driverId}`)
//     //   .then(response => setDriver(response.data))
//     //   .catch(error => console.error("Error fetching driver details:", error));

//     // Dummy data for testing
//     setDriver({
//       id: driverId,
//       firstName: "John",
//       lastName: "Doe",
//       email: "johndoe@example.com",
//       phoneNumber: "123-456-7890",
//       licenseNumber: "ABC1234567",
//       cnic: "12345-1234567-9",
//       address: "123 Main St, Cityville",
//       dateJoined: "2023-01-15",
//     });
//   }, [driverId]);

//   if (!driver) {
//     return <p className="text-gray-300">Loading driver details...</p>;
//   }

//   return (
//     <div className="bg-gray-950 min-h-screen w-full p-8 flex justify-center items-center">
//       <div className="bg-gray-900 p-8 border rounded border-gray-600  w-full max-w-lg">
//         <h2 className="text-3xl font-bold text-yellow-500 mb-6 text-center">
//           Driver Details
//         </h2>
//         <div className="text-gray-300 space-y-4">
//           <div>
//             <p className="font-semibold text-gray-400">Full Name:</p>
//             <p>{driver.firstName} {driver.lastName}</p>
//           </div>
//           <div>
//             <p className="font-semibold text-gray-400">Email:</p>
//             <p>{driver.email}</p>
//           </div>
//           <div>
//             <p className="font-semibold text-gray-400">Phone Number:</p>
//             <p>{driver.phoneNumber}</p>
//           </div>
//           <div>
//             <p className="font-semibold text-gray-400">License Number:</p>
//             <p>{driver.licenseNumber}</p>
//           </div>
//           <div>
//             <p className="font-semibold text-gray-400">CNIC:</p>
//             <p>{driver.cnic}</p>
//           </div>
//           <div>
//             <p className="font-semibold text-gray-400">Address:</p>
//             <p>{driver.address}</p>
//           </div>
//           <div>
//             <p className="font-semibold text-gray-400">Date Joined:</p>
//             <p>{new Date(driver.dateJoined).toLocaleDateString()}</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DriverDetailPage;
