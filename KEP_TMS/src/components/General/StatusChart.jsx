import { useState } from "react";
import Chart from "react-apexcharts";
import proptype from "prop-types";
const StatusChart = ({ series, label, value , color}) => {
  const [chartData, setChartData] = useState({
    series: [series],
    options: {
      chart: {
        type: "radialBar",
      },
      fill: {
        type: "solid",
        colors: [color?? "#00a76f"],
      },
      plotOptions: {
        radialBar: {
          hollow: {
            margin: 0,
            size: "70%",
          },

          dataLabels: {
            showOn: "always",
            name: {
              offsetY: -10,
              show: true,
              color: "#888",
              fontSize: "1.2rem",
            },
            value: {
              color: "#111",
              fontSize: "25px",
              show: true,
              formatter: () => value,
            },
          },
        },
      },
      stroke: {
        lineCap: "round",
      },
      labels: [label ?? "Progress"],
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
StatusChart.propTypes = {
  series: proptype.number,
  label: proptype.string,
  value: proptype.string,
  height: proptype.number,
  color: proptype.string,
};
export default StatusChart;
