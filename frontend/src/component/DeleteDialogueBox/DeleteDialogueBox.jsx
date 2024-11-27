import React from "react";

function DeleteDialogueBox({handleCancelDelete,handleConfirmDelete,showDeleteModal}) {
  return (
    <>
    {showDeleteModal && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-30 flex justify-center items-center text-gray-400 z-20">
          <div className="bg-gray-900 p-6 rounded-xl border border-gray-600">
            <h2 className="text-lg font-bold mb-4">Confirm Delete</h2>
            <p className="mb-6">Are you sure you want to delete this record?</p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={handleCancelDelete}
                className="bg-gray-300  border text-black border-gray-600-800 hover:bg-gray-400 hover:bg-opacity-75 rounded-lg  px-4 py-2"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                className=" bg-red-800  border border-red-800 hover:bg-red-900 hover:bg-opacity-75 rounded-lg  px-4 py-2 "
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
      </>
  );
}

export default DeleteDialogueBox;
