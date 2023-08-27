import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import NavBar from "../components/NavBar";
import Transaction from "../pages/Transaction";
import Profile from "../pages/Profile";
import PaymentRequest from "../pages/PaymentRequest";
import RouteProtect from "../components/RouteProtect";
function UserRoutes() {
  return (
    <>
      <NavBar />
      <RouteProtect>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/fund-transfer" element={<Transaction />} />
          <Route path="/fund-request" element={<PaymentRequest />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </RouteProtect>
    </>
  );
}

export default UserRoutes;
