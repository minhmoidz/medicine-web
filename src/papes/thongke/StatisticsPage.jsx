import React from 'react';
import "./StatisticsPage.scss";
import Siderbar from "../../components/siderbar/Siderbar.jsx";
import Navbar from "../../components/navbar/Navbar.jsx";
import { LineGraph } from "./Line.jsx";

const StatisticsPage = () => {
  return (
    <div className="side">
      <Siderbar />
      <div className="navb">
        <Navbar />
        <div className="graph">
          <LineGraph/> {/* Render the LineGraph component */}
        </div>
      </div>
    </div>
  );
};

export default StatisticsPage;
