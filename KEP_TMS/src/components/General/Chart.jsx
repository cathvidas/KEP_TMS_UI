import React, { useState } from "react";
import Chart from "react-apexcharts";
import proptype from "prop-types"
const StatusChart = ({data}) => {
  const [chartData, setChartData] = useState({
    series: [data],
    options: {
      chart: {
        height: 280,
        type: "radialBar",
      },
      plotOptions: {
        radialBar: {
          hollow: {
            margin: 15,
            size: "70%",
          },

          dataLabels: {
            showOn: "always",
            name: {
              offsetY: -10,
              show: true,
              color: "#888",
              fontSize: "13px",
            },
            value: {
              color: "#111",
              fontSize: "30px",
              show: true,
            },
          },
        },
      },
      stroke: {
        lineCap: "round",
      },
      labels: ["Progress"],
    },
  });

  return (
    <div className="radial-bar-chart">
      <Chart
        options={chartData.options}
        series={chartData.series}
        type="radialBar" // You can change the chart type here (e.g., bar, area)
        height={350}
      />
    </div>
  );
};
StatusChart.propTypes={
    data: proptype.number.isRequired,
}
export default StatusChart;
