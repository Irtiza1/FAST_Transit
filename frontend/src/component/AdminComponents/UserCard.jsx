import React from 'react'
import DeleteDialogueBox from '../DeleteDialogueBox/DeleteDialogueBox.jsx'
function UserCard({ user,handleCancelDelete,handleConfirmDelete,showDeleteModal,openDeleteModal }) {
  return (
    <div className=" my-2 bg-gray-800 text-gray-200 p-6 border border-gray-600 rounded transition-shadow duration-300 text-base">
      
      <h4 className="text-2xl font-bold mb-4 text-gray-400">
        {user.UserName}
      </h4>
      <p className="text-gray-300">
        <strong>UserID:</strong> {user.UserID}
      </p>
      <p className="text-gray-300">
        <strong>Email:</strong> {user.Email}
      </p>
      <p className="text-gray-300">
        <strong>Contact Info:</strong> {user.ContactInfo}
      </p>
      
      <button onClick={()=> openDeleteModal(user.UserID)} className="w-20 bg-red-800 bg-opacity-75  border border-red-800 hover:bg-red-900 hover:bg-opacity-75 rounded-lg bg- px-4 py-2 mt-4">
        Delete
      </button>
      <DeleteDialogueBox handleCancelDelete = {handleCancelDelete} handleConfirmDelete={handleConfirmDelete} showDeleteModal={showDeleteModal}/>
    </div>
  )
}

export default UserCard
