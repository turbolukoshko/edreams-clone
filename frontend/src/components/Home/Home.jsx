import React from "react";
import { Outlet } from "react-router";
import SearchPanel from "../SearchPanel/SearchPanel.jsx";

const Home = () => {
  return (
    <div>
      <SearchPanel />
      <Outlet data-test-id="outlet" />
    </div>
  );
};

export default Home;
