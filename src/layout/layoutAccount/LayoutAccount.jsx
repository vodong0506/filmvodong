import React from "react";
import Navbar from "../../components/NavBar";
import { Outlet } from "react-router-dom";
import Footer from "../../components/Footer";

const LayoutAccount = ({ children }) => {
  return (
    <>
      <header>
        <Navbar />
      </header>
      <main>{children}</main>
      <footer>
        <Footer />
      </footer>
    </>
  );
};

export default LayoutAccount;
