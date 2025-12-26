import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const AdminRouter = () => {
  const user = useSelector((state) => state.authen.user);
  console.log(user);
  const isAdmin = user?.rule === "admin";
  return isAdmin ? <Outlet /> : <Navigate to={"/"} />;
};

export default AdminRouter;
