const VendorCard = ({ vendor }) => (
    <div className="w-full my-2  bg-gray-800 text-gray-200 p-6 border border-gray-600 rounded transition-shadow duration-300 text-base">
      <h4 className="text-2xl font-bold mb-4 text-gray-400">{vendor.VendorName}</h4>
      <div className="flex md:flex-row md:space-x-8 md:space-y-0  flex-col space-y-2">
      <p className="text-gray-300 ">
        <span className="font-bold">Email:</span> {vendor.Email}
      </p>
      <p className="text-gray-300 ">
        <span className="font-bold">Contact Info:</span> {vendor.ContactInfo}
      </p>
      <p className="text-gray-300 ">
        <span className="font-bold">Vendor ID:</span> {vendor.VendorID}
      </p>
      </div>
    </div>
  );
  
  export default VendorCard;
  