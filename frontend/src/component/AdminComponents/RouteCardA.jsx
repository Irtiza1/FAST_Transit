import React from "react";
import RouteCard from "../RouteCard/RouteCard.jsx";
import DeleteDialogueBox from "../DeleteDialogueBox/DeleteDialogueBox.jsx";
function RouteCardA({
  route,
  handleCancelDelete,
  handleConfirmDelete,
  showDeleteModal,
  openDeleteModal,
}) {
  return (
    <div className="bg-gray-800 text-gray-300 border border-gray-600 rounded p-6 mb-6 my-2">
      {/* Route Information */}
      <div className="md:flex md:justify-between mb-4">
        <div>
          <h2 className="text-xl font-bold mb-2">{route.RouteName}</h2>
          <div className="text-sm text-gray-400">
            <p>
              <strong>Start Point:</strong> {route.RouteStartPoint}
            </p>
            <p>
              <strong>End Point:</strong> {route.RouteEndPoint}
            </p>
            <p>
              <strong>Number of Stops:</strong> {route.NumberOfStops}
            </p>
          </div>
        </div>
        <div>
          <button
            onClick={() => openDeleteModal(route.RouteID)}
            className="w-20 bg-red-800 bg-opacity-75  border border-red-800 hover:bg-red-900 hover:bg-opacity-75 rounded-lg bg- px-4 py-2 md:mt-0 mt-4"
          >
            Delete
          </button>
          <DeleteDialogueBox
            handleCancelDelete={handleCancelDelete}
            handleConfirmDelete={handleConfirmDelete}
            showDeleteModal={showDeleteModal}
          />
        </div>
      </div>

      {/* Stops Details */}
      <div className="w-full">
        <RouteCard routeStops={route.StopDetails} />
      </div>
    </div>
  );
}

export default RouteCardA;
