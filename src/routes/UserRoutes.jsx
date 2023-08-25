import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import NavBar from "../components/NavBar";
import Transaction from "../pages/Transaction";
import Profile from "../pages/Profile";
import PaymentRequest from "../pages/PaymentRequest";
import { useStateContext } from "../context/ContextProvider";
function UserRoutes() {
  const { isLogin } = useStateContext();
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/fund-transfer"
          element={isLogin ? <Transaction /> : <Navigate to="/" />}
        />
        <Route
          path="/fund-request"
          element={isLogin ? <PaymentRequest /> : <Navigate to="/" />}
        />
        <Route
          path="/profile"
          element={isLogin ? <Profile /> : <Navigate to="/" />}
        />
      </Routes>
    </>
  );
}

export default UserRoutes;
