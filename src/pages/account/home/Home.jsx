import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import logo from "../../../assets/logo.png";
import Background from "./Background";
import SectionHotMovie from "./SectionHotMovie";

const Home = () => {
  const user = useSelector((state) => state.authen.user);
  const navigate = useNavigate();
  useEffect(() => {
    window.scrollTo({ top: 0 });
  });

  return (
    <>
      <SectionHotMovie />
      <Background user={user} navigate={navigate} logo={logo} />
    </>
  );
};

export default Home;
