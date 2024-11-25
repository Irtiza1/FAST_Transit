import React from "react";

const TrafficAlert = ({ data }) => {
  const { totalAlert, AlertSeverityCounts, traffic_alert } = data;

  return (
    <div className="w-full  bg-gray-900 shadow-lg rounded-lg ">
      {/* Overview Section */}
      <h2 className="text-3xl font-bold text-gray-200 mb-6">Traffic Alerts</h2>
      <div className="flex flex-col md:flex-row md:justify-end justify-center items-center m-1 mb-8">
      <div className="flex flex-wrap md:justify-end justify-center  gap-4 mt-4 md:mt-0">
        <div className="bg-gray-500 text-gray-200 bg-opacity-60  px-4 py-2 rounded-xl">
          Total Alerts: {totalAlert}
        </div> 
        <div className="bg-green-600 bg-opacity-60 text-gray-200 px-4 py-2 rounded-xl">
          Low Severity: {AlertSeverityCounts.low}
        </div>
        <div className="bg-yellow-600 bg-opacity-60 text-gray-200 px-4 py-2 rounded-xl">
          Medium Severity: {AlertSeverityCounts.medium}
        </div>
        <div className="bg-red-600 bg-opacity-60 text-gray-200 px-4 py-2 rounded-xl">
          High Severity: {AlertSeverityCounts.high}
        </div>
      </div>
      </div>

      {/* Alert Details Section */}
      <div className="w-full my-2">
        {traffic_alert.map((alert) => (
          <div
            key={alert.AlertID}
            className="border-l-8 shadow-lg rounded-lg p-6 bg-gray-800 hover:shadow-xl transition-shadow mb-2"
            style={{
              borderColor:
                alert.Severity === "High"
                  ? "#ef4444"
                  : alert.Severity === "Meduim"
                  ? "#facc15"
                  : "#16a34a",
            }}
          >
            <div className="flex justify-between items-center mb-2">
              <div className="text-xl font-semibold  text-gray-200">
                {alert.RouteName}
              </div>
              <span
                className={`bg-red-600 bg-opacity-60 text-gray-200 md:px-10 px-4 py-2 rounded-xl  ${
                  alert.Severity === "High"
                    ? "bg-red-600"
                    : alert.Severity === "Medium"
                    ? "bg-yellow-600"
                    : "bg-green-600"
                }`}
              >
                {alert.Severity}
              </span>
            </div>
            <div className="flex justify-between mt-6">
            <p className="text-gray-400 mb-2">{alert.AlertDetails}</p>
            <div className="text-medium text-gray-200">
              <span className="font-medium">Date:</span> {alert.Date} |{" "}
              <span className="font-medium">Time:</span> {alert.Time}
            </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrafficAlert;
