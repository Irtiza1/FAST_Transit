import React from 'react'

function ContractCard({contract}) {
  return (
    <div className="my-2 bg-gray-800 text-gray-300 p-6 border border-gray-600 rounded transition-shadow duration-300 text-base">
            <h2 className="text-2xl font-semibold mb-4 text-gray-400">
                Contract ID: {contract.ContractID}
            </h2>
            <p className="text-gray-300">
                <strong>University:</strong> {contract.UniversityName} (ID: {contract.UniversityID})
            </p>
            <p className="text-gray-300"> 
                <strong>Vendor:</strong> {contract.VendorName} (ID: {contract.VendorID})
            </p>
            <p className="text-gray-300">
                <strong>Contract Details:</strong> {contract.ContractDetails}
            </p>
            <p className={`text-gray-300 ${contract.ContractStatus === 'Active' ? 'text-green-300' : 'text-red-600'}`}>
                <strong>Status:</strong> {contract.ContractStatus}
            </p>
            <p className="text-gray-300">
                <strong>Start Date:</strong> {contract.StartDate}
            </p>
            <p className="text-gray-300">
                <strong>End Date:</strong> {contract.EndDate}
            </p>
            <p className="text-gray-300">
                <strong>Vendor Contact Info:</strong> {contract.VendorContactInfo}
            </p>
            <p className="text-gray-300">
                <strong>University Email:</strong> {contract.UniversityEmail}
            </p>
        </div>
  )
}

export default ContractCard
