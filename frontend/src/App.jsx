import React from "react";
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from "react-router-dom";
import './App.css';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import CreateBusPage from "./pages/CreateBusPage";
import TestConnection from "./pages/TestConnection";
import RegisterDriverPage from "./pages/RegisterDriverPage";
import CreateRoutePage from "./pages/CreateRoutePage";
import BusPage from "./pages/BusesPage";
import DriversPage from "./pages/DriversPage";
import RoutesPage from "./pages/RoutesPage";
import BusDetailPage from "./pages/BusDetailPage";
import RouteDetailPage from "./pages/RouteDetailPage";
import VendorDashboard from "./pages/VendorDashboard";
import AdminDashboard from "./pages/AdminDashboard";
function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="register" element={<RegisterPage />} />
        <Route path="login" element={<LoginPage />} />
        {/* <Route path="home" element={<HomePage />} /> */}
        <Route path="vendor" element={<VendorDashboard />}>
          <Route path="buses" element={<BusPage />} />
          <Route path="" index element={<BusPage />} />
          <Route path="buses/:busID" element={<BusDetailPage />} />
          <Route path="create-bus" element={<CreateBusPage />} />
          <Route path="routes" element={<RoutesPage />} />
          <Route path="route/:routeId" element={<RouteDetailPage />} />
          <Route path="create-route" element={<CreateRoutePage />} />
          <Route path="drivers" element={<DriversPage />} />
          <Route path="register-driver" element={<RegisterDriverPage />} />
        </Route>
        <Route path="admin" element={<AdminDashboard/>}>
        </Route>
      </>
    )
  );

  return <RouterProvider router={router} />;
}

export default App;
