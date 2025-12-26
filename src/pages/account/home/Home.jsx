import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import logo from "../../../assets/logo.png";
import Background from "./Background";

const Home = () => {
  const user = useSelector((state) => state.authen.user);
  const navigate = useNavigate();

  return (
    <>
      <Background user={user} navigate={navigate} logo={logo} />
    </>
  );
};

export default Home;
