import React from 'react'

function PaymentCard({payment}) {
  return (
    <div className="bg-gray-800 text-gray-200 p-6 rounded text-sm transition-shadow duration-300">
            <h2 className="text-xl font-semibold mb-2">
                Payment ID: {payment.PaymentID}
            </h2>
            <p className="text-gray-400">
                <strong>Amount:</strong> ${payment.Amount}
            </p>
            <p className="text-gray-400">
                <strong>Date:</strong> {payment.Date}
            </p>
            <p className={`text-gray-400 ${payment.PaymentStatus === "Paid" ? "text-green-600" : payment.PaymentStatus === "Failed" ? "text-red-300" : "text-yellow-600"}`}>
                <strong>Status:</strong> {payment.PaymentStatus}
            </p>
            <p className="text-gray-400">
                <strong>User ID:</strong> {payment.UserID}
            </p>
            <p className="text-gray-400">
                <strong>User Name:</strong> {payment.UserName}
            </p>
            <p className="text-gray-400">
                <strong>Vendor ID:</strong> {payment.VendorID}
            </p>
            <p className="text-gray-400">
                <strong>Vendor Name:</strong> {payment.VendorName}
            </p>
        </div>
  )
}

export default PaymentCard
