import React from 'react'

function LoadingAnimation() {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-950">
      <div className="text-center">
        {/* Spinner */}
        <div className="relative w-16 h-16 border-4 border-yellow-600 border-opacity-50 rounded-full animate-spin before:absolute before:w-full before:h-full before:border-4 before:border-yellow-600 before:border-t-transparent before:rounded-full before:animate-spin-slow"></div>

        {/* Loading Text */}
        <p className="mt-4 text-yellow-600 text-lg font-bold animate-pulse">
          Loading
        </p>
      </div>
    </div>
  )
}

export default LoadingAnimation
