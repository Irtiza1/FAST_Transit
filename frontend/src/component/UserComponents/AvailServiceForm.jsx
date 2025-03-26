import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import axios from 'axios';
import BusLayoutUser from './BusLayoutUser';

const seats = Array.from({ length: 30 }, (_, i) => i + 1); // 30 seats

function AvailServiceForm() {
  // take route data from redux 
  const userData = useSelector((state)=>state.user)
//console.log(userData)

  const routeData = useSelector((state)=>state.route.routeData)

  const [step, setStep] = useState(1);

  const [selectedSeat, setSelectedSeat] = useState({ seatID: null, busID: null });
  const handleSeatSelection = (seatID,busID) => {
    setSelectedSeat({ seatID, busID });
  };

  const [personalDetails, setPersonalDetails] = useState({ name: '', email: '', phone: '' });
  const [busData, setBusData] = useState(null); 

  const handleSubmit = () => {
    const data = { userID:userData.data.UserID,routeID: selectedRoute.RouteID, seatID: selectedSeat.seatID,busID:selectedSeat.busID,stopID: selectedStop.StopID, ...personalDetails };
    console.log('Form Submitted:', data);
    alert('Registration Successful!');
    // API call here if needed
  };

  const [openRoute, setOpenRoute] = useState(null);
  const toggleStops = (route) => {
    setOpenRoute(openRoute === route ? null : route);
  };


  const [selectedStop, setSelectedStop] = useState('');
  const [selectedRoute, setSelectedRoute] = useState('');
  const handleRouteSelect = async (route) => {
    setSelectedRoute(route);
    setOpenRoute(route); // Auto open stops when route is selected
    setSelectedStop(''); // Reset stop if user changes route
    console.log(route)
    try {
      const response = await axios.get(`http://localhost:8000/user/Student/dropdown/View/BusByRouteID/${route.RouteID}`);
      console.log('Fetched Bus Data by routeID:', response.data);
      
      const buses = response.data;

    // Fetch Bus Details for each bus in parallel
      const busDetailsPromises = buses.map(async (bus) => {
        try {
          const detailRes = await axios.get(`http://localhost:8000/admin/Vendor/dropdown/View/BusDetails/${bus.BusID}`);
          return { ...bus, BusDetails: detailRes.data };  // Add BusDetails to the bus object
        } catch (error) {
          console.error(`Error fetching details for BusID ${bus.BusID}`, error);
          return { ...bus, BusDetails: null }; // Handle failure gracefully
        }
      });
      const busesWithDetails = await Promise.all(busDetailsPromises);

      console.log('Buses with details:', busesWithDetails);
      setBusData(busesWithDetails);
      console.log(busesWithDetails)
    } catch (error) {
      console.error('Error fetching bus data:', error);
      setBusData(null);
    }
  };
  
  
  // --------- Step 1 UI ----------
  const renderRouteStep = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-800">Select Your Route</h2>
      <p>Route: {selectedRoute.RouteName} Stop:{selectedStop.StopName}</p>
      {routeData.map((route) => (
        <div key={route} className="border rounded-xl shadow-sm p-4 bg-white">
          <div className="flex justify-between items-center">
            <button
              onClick={() => handleRouteSelect(route)}
              className={`text-left flex-1 transition text-lg font-medium ${
                selectedRoute === route ? 'text-blue-600' : 'text-gray-800 hover:text-blue-500'
              }`}
            >
              {route.RouteName}
            </button>
            <button
              onClick={() => toggleStops(route)}
              className="ml-4 px-3 py-1 rounded-lg bg-gray-200 hover:bg-gray-300 text-sm text-gray-700 transition"
            >
              {openRoute === route ? 'Hide Stops' : 'View Stops'}
            </button>
          </div>

          {/* Animated Stops Section */}
          <motion.div
            initial={false}
            animate={{
              height: openRoute === route ? 'auto' : 0,
              opacity: openRoute === route ? 1 : 0,
            }}
            transition={{ duration: 0.4 }}
            className="overflow-hidden mt-4"
          >
          {openRoute === route && (
            <ul className="space-y-2 pl-4 text-gray-600">
              {route.StopDetails.map((stop, index) => (
                <li 
                  key={index} 
                  className={`border-l-4 pl-3 cursor-pointer 
                    ${selectedStop === stop ? 'border-blue-600 text-blue-600 font-semibold' : 'border-blue-500 hover:text-blue-500'}`}
                  onClick={() => setSelectedStop(stop)}
                >
                  {stop.StopName}
                </li>
              ))}
            </ul>
          )}

          </motion.div>
        </div>
      ))}
    </div>
  );

  // --------- Step 2 UI ----------
  const renderSeatStep = () => (
    <>

      <div>You can select a seat from following available bus</div>
      <div className="mt-4 text-lg text-black">
        Your Selected Seat ID: {selectedSeat.seatID} | Bus ID: {selectedSeat.busID}
      </div>
      {
        
        busData.map((bus)=>(
          <BusLayoutUser busData={bus.BusDetails.data} selectedSeat={selectedSeat} setSelectedSeat={handleSeatSelection} />
        ))}
    </>
  );

  // --------- Step 3 UI ----------
  const renderDetailsStep = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-800">Enter Your Details</h2>
      <input
        type="text"
        placeholder="Full Name"
        value={personalDetails.name}
        onChange={(e) => setPersonalDetails({ ...personalDetails, name: e.target.value })}
        className="w-full p-4 rounded-lg border shadow-sm focus:ring-2 focus:ring-blue-400"
      />
      <input
        type="email"
        placeholder="Email Address"
        value={personalDetails.email}
        onChange={(e) => setPersonalDetails({ ...personalDetails, email: e.target.value })}
        className="w-full p-4 rounded-lg border shadow-sm focus:ring-2 focus:ring-blue-400"
      />
      <input
        type="tel"
        placeholder="Phone Number"
        value={personalDetails.phone}
        onChange={(e) => setPersonalDetails({ ...personalDetails, phone: e.target.value })}
        className="w-full p-4 rounded-lg border shadow-sm focus:ring-2 focus:ring-blue-400"
      />
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-3xl mx-auto bg-white p-8 sm:p-12 rounded-3xl shadow-2xl mt-10 mb-20"
    >
      <h1>User info Just for Testing:{userData?.data.Email} | {userData?.data.Gender} | {userData?.data.FirstName }</h1>
      {/* Title */}
      <h1 className="text-3xl font-bold text-center text-blue-600 mb-10">🚌 Bus Seat Registration</h1>

      {/* Progress Bar */}
      <div className="flex justify-between items-center mb-10">
        <div className={`flex-1 h-2 rounded ${step >= 1 ? 'bg-blue-600' : 'bg-gray-300'}`}></div>
        <div className={`flex-1 h-2 rounded mx-2 ${step >= 2 ? 'bg-blue-600' : 'bg-gray-300'}`}></div>
        <div className={`flex-1 h-2 rounded ${step >= 3 ? 'bg-blue-600' : 'bg-gray-300'}`}></div>
      </div>

      {/* Step Content */}
      {step === 1 && renderRouteStep()}
      {step === 2 && renderSeatStep()}
      {step === 3 && renderDetailsStep()}

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-12">
        <button
          onClick={() => setStep((prev) => Math.max(prev - 1, 1))}
          disabled={step === 1}
          className="px-6 py-3 rounded-xl bg-gray-200 hover:bg-gray-300 text-gray-800 disabled:opacity-50"
        >
          Back
        </button>

        {step < 3 ? (
          <button
            onClick={() => setStep((prev) => prev + 1)}
            disabled={(step === 1 && (!selectedRoute || !selectedStop)) || (step === 2 && !selectedSeat)}
            className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-50"
          >
            Next
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            disabled={!personalDetails.name || !personalDetails.email || !personalDetails.phone}
            className="px-6 py-3 rounded-xl bg-green-600 hover:bg-green-700 text-white disabled:opacity-50"
          >
            Submit
          </button>
        )}
      </div>
    </motion.div>
  );
}

export default  AvailServiceForm 

// import * as React from 'react';
// import Box from '@mui/material/Box';
// import Stepper from '@mui/material/Stepper';
// import Step from '@mui/material/Step';
// import StepLabel from '@mui/material/StepLabel';
// import StepContent from '@mui/material/StepContent';
// import Button from '@mui/material/Button';
// import Paper from '@mui/material/Paper';
// import Typography from '@mui/material/Typography';

// const steps = [
//   {
//     label: 'Select campaign settings',
//     description: `For each ad campaign that you create, you can control how much
//               you're willing to spend on clicks and conversions, which networks
//               and geographical locations you want your ads to show on, and more.`,
//   },
//   {
//     label: 'Create an ad group',
//     description:
//       'An ad group contains one or more ads which target a shared set of keywords.',
//   },
//   {
//     label: 'Create an ad',
//     description: `Try out different ad text to see what brings in the most customers,
//               and learn how to enhance your ads using features like ad extensions.
//               If you run into any problems with your ads, find out how to tell if
//               they're running and how to resolve approval issues.`,
//   },
// ];

// export default function AvailServiceForm() {
//   const [activeStep, setActiveStep] = React.useState(0);

//   const handleNext = () => {
//     setActiveStep((prevActiveStep) => prevActiveStep + 1);
//   };

//   const handleBack = () => {
//     setActiveStep((prevActiveStep) => prevActiveStep - 1);
//   };

//   const handleReset = () => {
//     setActiveStep(0);
//   };

//   return (
//     <Box sx={{ maxWidth: 400 }}>
//       <Stepper activeStep={activeStep} orientation="vertical">
//         {steps.map((step, index) => (
//           <Step key={step.label}>
//             <StepLabel
//               optional={
//                 index === steps.length - 1 ? (
//                   <Typography variant="caption">Last step</Typography>
//                 ) : null
//               }
//             >
//               {step.label}
//             </StepLabel>
//             <StepContent>
//               <Typography>{step.description}</Typography>
//               <Box sx={{ mb: 2 }}>
//                 <Button
//                   variant="contained"
//                   onClick={handleNext}
//                   sx={{ mt: 1, mr: 1 }}
//                 >
//                   {index === steps.length - 1 ? 'Finish' : 'Continue'}
//                 </Button>
//                 <Button
//                   disabled={index === 0}
//                   onClick={handleBack}
//                   sx={{ mt: 1, mr: 1 }}
//                 >
//                   Back
//                 </Button>
//               </Box>
//             </StepContent>
//           </Step>
//         ))}
//       </Stepper>
//       {activeStep === steps.length && (
//         <Paper square elevation={0} sx={{ p: 3 }}>
//           <Typography>All steps completed - you&apos;re finished</Typography>
//           <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
//             Reset
//           </Button>
//         </Paper>
//       )}
//     </Box>
//   );
// }
