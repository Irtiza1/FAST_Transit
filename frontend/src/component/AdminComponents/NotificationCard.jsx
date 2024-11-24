import React from "react";

const NotificationDisplay = ({ data }) => {
  if (!data || !data.Notification || data.Notification.length === 0) {
    return <div className="text-center text-gray-500 italic">No notifications available</div>;
  }

  return (
    <div className="w-full p-6 bg-gray-800 border border-gray-600 rounded  text-gray-200 min-h-screen ">
      {/* Header Section */}
      <h1 className="text-3xl font-bold text-gray-200 m-2">Notifications</h1>
      <div className="mb-6 flex justify-center items-center bg-gray-800  text-white p-5 ">
        <div className="flex md:space-x-4 space-x-1">
          <div className="px-4 py-2 bg-blue-600 bg-opacity-60 rounded-full md:text-sm text-xs font-medium shadow-sm">
            Total: {data.totalNotification}
          </div>
          <div className="px-4 py-2 bg-green-600 bg-opacity-60 rounded-full md:text-sm text-xs font-medium shadow-sm">
            Info: {data.NotificationTypeCounts.info}
          </div>
          <div className="px-4 py-2 bg-yellow-600 bg-opacity-60 rounded-full md:text-sm text-xs font-medium shadow-sm">
            Warning: {data.NotificationTypeCounts.warning}
          </div>
          <div className="px-4 py-2 bg-red-600 bg-opacity-60 rounded-full md:text-sm text-xs font-medium shadow-sm">
            Alert: {data.NotificationTypeCounts.alert}
          </div>
        </div>
      </div>

      {/* Notification List */}
      <div className="grid gap-6">
        {data.Notification.map((notification) => (
          <div
            key={notification.NotificationID}
            className="p-6 rounded bg-gray-900 border-l-8 hover:shadow-lg transition-shadow duration-300"
            style={{
              borderColor:
                notification.Type === "Info"
                  ? "#3b82f6"
                  : notification.Type === "Warning"
                  ? "#facc15"
                  : "#ef4444",
            }}
          >
            <div className="flex justify-between items-center">
              <div className="text-lg font-medium  text-gray-200">
                {notification.NotificationText}
              </div>
              <span className="text-xs text-gray-200 font-semibold">{notification.Date}</span>
            </div>

            <div className="mt-2 text-gray-400">
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

            <div className="mt-3 text-sm text-gray-400">
              Type: <span className="font-semibold capitalize">{notification.Type}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationDisplay;
