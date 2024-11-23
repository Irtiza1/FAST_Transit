import React from 'react'

function ContractCard({contract}) {
  return (
    <div className="bg-gray-800 text-gray-200 p-6 rounded text-sm transition-shadow duration-300">
            <h2 className="text-xl font-semibold mb-2">
                Contract ID: {contract.ContractID}
            </h2>
            <p className="text-gray-400">
                <strong>University:</strong> {contract.UniversityName} (ID: {contract.UniversityID})
            </p>
            <p className="text-gray-400">
                <strong>Vendor:</strong> {contract.VendorName} (ID: {contract.VendorID})
            </p>
            <p className="text-gray-400">
                <strong>Contract Details:</strong> {contract.ContractDetails}
            </p>
            <p className={`text-gray-400 ${contract.ContractStatus === 'Active' ? 'text-green-600' : 'text-red-600'}`}>
                <strong>Status:</strong> {contract.ContractStatus}
            </p>
            <p className="text-gray-400">
                <strong>Start Date:</strong> {contract.StartDate}
            </p>
            <p className="text-gray-400">
                <strong>End Date:</strong> {contract.EndDate}
            </p>
            <p className="text-gray-400">
                <strong>Vendor Contact Info:</strong> {contract.VendorContactInfo}
            </p>
            <p className="text-gray-400">
                <strong>University Email:</strong> {contract.UniversityEmail}
            </p>
        </div>
  )
}

export default ContractCard
