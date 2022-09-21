import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";

import React, { useState, useEffect } from "react";

import Dishwasher from "/Users/will/Applications/and-zero-frontend/src/images/dishwasher.svg";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

// ChartJS.defaults.global.defaultFontColor = "#fff";

function Stats() {
  const [chartData, setChartData] = useState({
    datasets: [],
  });

  const [chartOptions, setChartOptions] = useState({});

  useEffect(() => {
    setChartData({
      labels: ["Woods", "Wangari ", "Adams", "Dekker", "Somerville", "Jemison"],
      datasets: [
        {
          label: "Who is the judge?",
          data: [12, 55, 14, 14, 56, 80],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)",
            "rgba(200, 200, 100, 1)",
          ],
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(255, 159, 64, 0.2)",
            "rgba(200, 200, 100, 1)",
          ],
        },
      ],
    });
    setChartOptions({
      responsive: true,
      plugins: {
        legend: {
          labels: {
            fontColor: "#fff",
            font: {
              size: 20,
            },
          },
          position: "top",
        },
        title: {
          display: true,
          text: "Cups saved between clubs",
        },
      },
    });
  }, []);

  return (
    // <div className="hero min-h-screen">
    //   <div className="mt-48" id="pie-chart">
    //     <h1>Stats</h1>
    //     <div>
    //       <div className="mt-48">
    //         <h1>Total ANDIs Pledged</h1>
    //         <h2>63</h2>
    //       </div>
    //       <div>
    //         <h1>Total Cups Saved</h1>
    //         <h2>147</h2>
    //       </div>
    //     </div>
    //     <Pie options={chartOptions} data={chartData} />
    //     <h2>147</h2>
    //   </div>
    // </div>

    <div className="hero min-h-screen">
      <div className="hero-overlay bg-opacity-60"></div>
      <div className="hero-content text-center text-neutral-content flex flex-col">
        <div className="max-w-md">
          <h1 className="mb-5 text-2xl font-bold">
            {" "}
            Welcome Here's How You're Doing:
          </h1>
          <div className="flex text-center justify-evenly">
            <div className="statBackground">
              <p className="mb-5"> Total ANDis Pledged</p>
              <p className="mb-5 statNumber"> 63</p>
            </div>
            <div>
              <p className="mb-5"> Total Cups Saved</p>
              <p className="mb- statNumber"> 147</p>
            </div>
          </div>

          <div>
            <h1 className="mb-4">
              Your Club Has Saved Enough Energy To Run the Dishwasher:
            </h1>
            <div className="flex justify-evenly items-center">
              <h2 id="dishwasherX">7x</h2>
              <img id="dishwasherImg" src={Dishwasher} alt="" />
            </div>
          </div>

          <div className=""></div>
        </div>
        <div id="pie-chart">
          <Pie options={chartOptions} data={chartData} />
        </div>
      </div>
    </div>
  );
}

export default Stats;
