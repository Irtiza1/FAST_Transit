import React from "react";

const NotificationDisplay = ({ data }) => {
  if (!data || !data.Notification || data.Notification.length === 0) {
    return <div className="text-center text-gray-500 italic">No notifications available</div>;
  }

  return (
    <div className="w-full  bg-gray-900 shadow-lg rounded-lg ">
      {/* Header Section */}
      <h2 className="text-3xl font-bold text-gray-200 mb-6">Notifications</h2>
      <div className="flex flex-col md:flex-row justify-center items-center mb-8">
      <div className="flex flex-wrap justify-center items-center gap-4 mt-4 md:mt-0">
          <div className="bg-gray-500 text-gray-200 bg-opacity-60  px-4 py-2 rounded">
            Total Notifications: {data.totalNotification}
          </div>
          <div className="bg-green-600 bg-opacity-60 text-gray-200 px-4 py-2 rounded">
            Info: {data.NotificationTypeCounts.info}
          </div>
          <div className="bg-yellow-600 bg-opacity-60 text-gray-200 px-4 py-2 rounded">
            Warning: {data.NotificationTypeCounts.warning}
          </div>
          <div className="bg-red-600 bg-opacity-60 text-gray-200 px-4 py-2 rounded">
            Alert: {data.NotificationTypeCounts.alert}
          </div>
        </div>
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
              <span className="text-xs text-gray-200 font-semibold">{notification.Date}</span>
            </div>

            <div className="mt-2 text-gray-200">
              {notification.UserID ? (
                <span>
                  From: <strong className="text-gray-200">{notification.UserName}</strong>
                </span>
              ) : (
                <span>
                  From: <strong className="text-yellow-600">{notification.AdminName}</strong>
                </span>
              )}
            </div>

            <div className="mt-3 text-sm text-gray-200">
              Type: <span className="font-semibold capitalize">{notification.Type}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationDisplay;
