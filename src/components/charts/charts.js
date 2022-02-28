import React from "react";
import {
  lineChartDataCharts2,
  lineChartOptionsCharts2,
} from "./chartData";
import LineChart from "./lineChart";

const Charts = () => {
  return (
    <React.Fragment>
      <LineChart
        chartData={lineChartDataCharts2}
        chartOptions={lineChartOptionsCharts2}
      />
    </React.Fragment>
  );
};

export default Charts;
