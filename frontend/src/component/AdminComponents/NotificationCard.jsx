import React from "react";
import DeleteDialogueBox from "../DeleteDialogueBox/DeleteDialogueBox";
const NotificationDisplay = ({
  data,
  handleCancelDelete,
  handleConfirmDelete,
  showDeleteModal,
  openDeleteModal,
}) => {
  if (!data || !data.Notification || data.Notification.length === 0) {
    -xl;
    return (
      <div className="text-center text-gray-500 italic">
        No notifications available
      </div>
    );
  }

  return (
    <div className="w-full  bg-gray-900 shadow-lg rounded-lg ">
      {/* Header Section */}
      <h2 className="text-3xl font-bold text-gray-200 mb-6">Notifications</h2>
      <div className="flex flex-col md:flex-row md:justify-end justify-center items-center m-1 mb-8">
        {data?.totalNotification > 1 && (
          <div className="flex flex-wrap md:justify-end justify-center  gap-4 mt-4 md:mt-0">
            <div className="bg-gray-500 text-gray-200 bg-opacity-60  px-4 py-2 rounded-xl">
              Total Notifications: {data.totalNotification}
            </div>
            <div className="bg-green-600 bg-opacity-60 text-gray-200 px-4 py-2 rounded-xl">
              Info: {data.NotificationTypeCounts.info}
            </div>
            <div className="bg-yellow-600 bg-opacity-60 text-gray-200 px-4 py-2 rounded-xl">
              Warning: {data.NotificationTypeCounts.warning}
            </div>
            <div className="bg-red-600 bg-opacity-60 text-gray-200 px-4 py-2 rounded-xl">
              Alert: {data.NotificationTypeCounts.alert}
            </div>
          </div>
        )}
      </div>

      {/* Notification List */}
      <div className="w-full my-2">
        {data.Notification.map((notification) => (
          <div
            key={notification.NotificationID}
            className="border-l-8 shadow-lg rounded-lg p-6 bg-gray-800 hover:shadow-xl transition-shadow mb-2"
            style={{
              borderColor:
                notification.Type === "Info"
                  ? "#3b82f6"
                  : notification.Type === "Warning"
                  ? "#facc15"
                  : "#ef4444",
            }}
          >
            <div className="flex justify-between items-center mb-2">
              <div className="text-xl font-semibold  text-gray-200">
                {notification.NotificationText}
              </div>
            </div>

            <div className="mt-2 text-gray-200">
              {notification.UserID ? (
                <span>
                  From:{" "}
                  <strong className="text-gray-200">
                    {notification.UserName}
                  </strong>
                </span>
              ) : (
                <span>
                  From:{" "}
                  <strong className="text-yellow-600">
                    {notification.AdminName}
                  </strong>
                </span>
              )}
            </div>

            <div className="mt-3 text-sm text-gray-200">
              Type:{" "}
              <span className="font-semibold capitalize">
                {notification.Type}
              </span>
            </div>
            <div className="text-medium text-gray-400 mt-6">
              <span className="text-base text-gray-200 font-medium ">
                {notification.Date}
              </span>
            </div>
            <button
              onClick={() => openDeleteModal(notification.NotificationID)}
              className="w-20 bg-red-800 bg-opacity-75  border border-red-800 hover:bg-red-900 hover:bg-opacity-75 rounded-lg bg- px-4 py-2 mt-4"
            >
              Delete
            </button>
            <DeleteDialogueBox
              handleCancelDelete={handleCancelDelete}
              handleConfirmDelete={handleConfirmDelete}
              showDeleteModal={showDeleteModal}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationDisplay;
