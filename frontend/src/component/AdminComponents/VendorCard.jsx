import DeleteDialogueBox from "../DeleteDialogueBox/DeleteDialogueBox";
const VendorCard = ({ vendor,handleCancelDelete,handleConfirmDelete,showDeleteModal,openDeleteModal }) => (
    <div className="my-2 bg-gray-800 text-gray-200 p-6 border border-gray-600 rounded transition-shadow duration-300 text-base">
      <h4 className="text-2xl font-bold mb-4 text-gray-400">{vendor.VendorName}</h4>
      
      <p className="text-gray-300 ">
        <span className="font-bold">Email:</span> {vendor.Email}
      </p>
      <p className="text-gray-300 ">
        <span className="font-bold">Contact Info:</span> {vendor.ContactInfo}
      </p>
      <p className="text-gray-300 ">
        <span className="font-bold">Vendor ID:</span> {vendor.VendorID}
      </p>
      <button onClick={()=> openDeleteModal(vendor.VendorID)} className="w-20 bg-red-800 bg-opacity-75  border border-red-800 hover:bg-red-900 hover:bg-opacity-75 rounded-lg bg- px-4 py-2 mt-4">
        Delete
      </button>
      <DeleteDialogueBox handleCancelDelete = {handleCancelDelete} handleConfirmDelete={handleConfirmDelete} showDeleteModal={showDeleteModal}/>
    </div>
  );
  
  export default VendorCard;
  