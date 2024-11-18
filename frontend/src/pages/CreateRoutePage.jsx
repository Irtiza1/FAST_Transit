import React, { useState, useEffect } from "react";
import RouteCreationForm from "../component/RouteCreationForm/RouteCreationForm";
function CreateRoutePage() {
  const [routeData, setRouteData] = useState({
    routeName: "",
    startPoint: null,
    endPoint: null,
    stops: [],
  });
  const handleSubmit=(e)=>{
    e.preventDefault();
    console.log(routeData)
  }
  return (
    <div className="bg-gray-950 py-8 px-8">
      <div className="p-6 bg-gray-900 min-h-screen text-gray-100 border border-gray-600 rounded">
        <RouteCreationForm routeData={routeData} setRouteData={setRouteData} />
        <button onClick={handleSubmit} className="w-full rounded bg-yellow-500 hover:bg-yellow-400 px-8 py-3 mt-5 mb-2 font-bold text-gray-700  transition-all hover:opacity-90 hover:shadow-lg">
          Register Route
        </button>
      </div>
    </div>
  );
}

export default CreateRoutePage;
