const VendorCard = ({ vendor }) => (
    <div className="bg-gray-800 text-gray-200 p-6 rounded transition-shadow duration-300">
      <h4 className="text-xl font-semibold mb-2">{vendor.VendorName}</h4>
      <p className="text-gray-400 text-sm">
        <span className="font-bold">Email:</span> {vendor.Email}
      </p>
      <p className="text-gray-400 text-sm">
        <span className="font-bold">Contact Info:</span> {vendor.ContactInfo}
      </p>
      <p className="text-gray-400 text-sm">
        <span className="font-bold">Vendor ID:</span> {vendor.VendorID}
      </p>
    </div>
  );
  
  export default VendorCard;
  