import React from 'react';
import {AlertDialogSlide} from '../component/AlertDialogSlide'; // Adjust the path as necessary
import { useSelector } from 'react-redux';
function UserDashboard() {
  const userData = useSelector((state)=>state.user)
  console.log(userData)
  return (
    <div className='bg-gray-950 min-h-screen text-yellow-600'>
      <h1>User Dashboard</h1>
      <p>Welcome to the user dashboard. Here is your dialog box: {userData.data.Email}</p>
      <AlertDialogSlide />
      
    </div>
  );
}

export default UserDashboard
