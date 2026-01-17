import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import logo from "../../../assets/logo.png";
import Background from "./Background";
import SectionHotMovie from "./SectionHotMovie";
import SectionCategories from "./SectionCategories";
import SectionTrendding from "./SectionTrendding";

const Home = () => {
  const user = useSelector((state) => state.authen.user);
  const navigate = useNavigate();
  useEffect(() => {
    window.scrollTo({ top: 0 });
  });

  return (
    <>
      <Background user={user} navigate={navigate} logo={logo} />
      <SectionHotMovie />
      <div className="px-5 md:px-10 lg:px-30 bg-[rgb(13,13,12)]">
        <SectionCategories />
        <SectionTrendding />
      </div>
    </>
  );
};

export default Home;
