import React from "react";
import Navbar from "../../components/NavBar";
import { Outlet } from "react-router-dom";

const LayoutAccount = ({ children }) => {
  return (
    <>
      <header>
        <Navbar />
      </header>
      <main>{children}</main>
    </>
  );
};

export default LayoutAccount;
