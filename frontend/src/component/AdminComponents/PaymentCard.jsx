import React from 'react'

function PaymentCard({payment}) {
  return ( 
    <div className="my-2 bg-gray-800 text-gray-300 p-6 border border-gray-600 rounded transition-shadow duration-300 text-base">
            <h2 className="text-2xl font-semibold mb-4 text-gray-400">
                Payment ID: {payment.PaymentID}
            </h2>
            <p className="text-gray-300">
                <strong>Amount:</strong> ${payment.Amount}
            </p>
            <p className="text-gray-300">
                <strong>Date:</strong> {payment.Date}
            </p>
            <p className={`text-gray-300 ${payment.PaymentStatus === "Paid" ? "text-green-600" : payment.PaymentStatus === "Failed" ? "text-red-300" : "text-yellow-600"}`}>
                <strong>Status:</strong> {payment.PaymentStatus}
            </p>
            <p className="text-gray-300">
                <strong>User ID:</strong> {payment.UserID}
            </p>
            <p className="text-gray-300">
                <strong>User Name:</strong> {payment.UserName}
            </p>
            <p className="text-gray-300">
                <strong>Vendor ID:</strong> {payment.VendorID}
            </p>
            <p className="text-gray-300">
                <strong>Vendor Name:</strong> {payment.VendorName}
            </p>
        </div>
  )
}

export default PaymentCard
