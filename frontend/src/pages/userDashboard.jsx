import React from 'react';
import {AlertDialogSlide} from '../component/AlertDialogSlide'; // Adjust the path as necessary

function UserDashboard() {
  return (
    <div className='bg-gray-950 min-h-screen text-yellow-600'>
      <h1>User Dashboard</h1>
      <p>Welcome to the user dashboard. Here is your dialog box:</p>
      <AlertDialogSlide />
      
    </div>
  );
}

export default UserDashboard
