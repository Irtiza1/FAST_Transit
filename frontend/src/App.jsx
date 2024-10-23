import React, { useEffect,useState } from "react";
import {Route,createBrowserRouter,createRoutesFromElements,RouterProvider} from "react-router-dom";
import './App.css'
import RegisterPage from './pages/RegisterPage'
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage'
import CreateBusPage from "./pages/CreateBusPage";
import TestConnection from "./pages/TestConnection";
function App() {
  
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
      <Route path="register" element={<RegisterPage/>} />
      <Route path="login" element={<LoginPage/>} />
      <Route path="home" element={<HomePage/>} />
      <Route path="create-bus" element={<CreateBusPage/>} />
      <Route path="test" element={<TestConnection/>} />
      </>
    )
  )

  return (
    <>
      <RouterProvider router={router} />
    </>
  )

}

export default App
