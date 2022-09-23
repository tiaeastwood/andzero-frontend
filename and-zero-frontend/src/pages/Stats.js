import { Pie } from "react-chartjs-2";
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

import Dishwasher from "../images/dishwasher.svg";
import Car from "../images/car.svg";
import Forest from "../images/forest.svg";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

function Stats() {
  const [chartData, setChartData] = useState({
    datasets: [],
  });

	const [chartOptions, setChartOptions] = useState({});
	const [cupsData, setCupsData] = useState({});
	const [clubsList, setClubsList] = useState([]);
	const [fact, setFact] = useState({});

  const fetchClubs = async () => {
    const clubUrl = "http://localhost:3001/clubs";
    const response = await fetch(clubUrl);
    if (!response.ok) {
      throw new Error("Data could not be fetched");
    }
    const data = await response.json();
    setClubsList(data);
    return data;
  };

  const getDataFromClubs = async () => {
    const arr = [];
    try {
      for (const club of clubsList) {
        const response = await fetch(`http://localhost:3001/cups/${club.id}`);

        if (!response.ok) {
          throw new Error("Data could not be fetched");
        }

        const data = await response.json();

        const newItem = {
          clubId: club.id,
          clubName: club.club,
          data: data.totalCupsSaved,
        };
        arr.push(newItem);
      }
      let names = [];
      let stats = [];

      for (let i = 0; i < arr.length; i++) {
        names.push(arr[i].clubName);
      }

      for (let i = 0; i < arr.length; i++) {
        stats.push(arr[i].data);
      }

      setChartData({
        labels: names,
        datasets: [
          {
            label: "Who is the judge?",
            data: stats,
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
							color: "white",
							fontColor: "#fff",
							font: {
								size: 16,
							},
						},
						position: "top",
					},
					title: {
						color: "white",
						display: true,
						text: "Cups saved between clubs",
						font: {
							size: 20,
						},
					},
				},
			});
		} catch (error) {
			console.log(error);
		}
	};

  const getCupsData = () => {
    fetch("http://localhost:3001/cups")
      .then((response) => response.json())
      .then((data) => {
        setCupsData(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const calculateUsage = (cupsData.totalCupsSaved * 0.58 * 365) / 9.5;
  const formattedNumber = Math.floor(calculateUsage);

	const treesNeeded = (cupsData.totalCupsSaved * 110 * 365) / 25000;
	const formattedTreesNeeded = Math.floor(treesNeeded);

	const milesEquivalent = cupsData.totalCupsSaved * 365 * 0.59;
	const formattedMilesEquivalent = Math.floor(milesEquivalent);

	const factBankObject = {
		dishwasher: {
			introText: "AND has saved enough energy to run a dishwasher this many times:",
			figure: formattedNumber,
			img: Dishwasher,
			src: "*based on figures by Bosch, 9 things you didn’t know about your dishwasher, 2020.",
		},
		trees: {
			introText:
				"The Disposable Cups AND is no longer using will contribute to this many trees absorbing CO2 from elsewhere:",
			figure: formattedTreesNeeded,
			img: Forest,
			src: "**based on figures from ecotree.green.",
		},
		miles: {
			introText:
				"Using a reusable cup has saved as much CO2 from the production of disposable cups as driving this many miles:",
			figure: formattedMilesEquivalent,
			img: Car,
			src: "**based on figures from nimblefins.co.uk, using data from Department for Transport, 2022.",
		},
	};

	function chooseFact() {
		const randItem = ["dishwasher", "trees", "miles"];
		const rand = Math.floor(Math.random() * 3);
		const randomFact = randItem[rand];
		return factBankObject[randomFact];
	}

	useEffect(() => {
		fetchClubs();
		getCupsData();
	}, []);

	useEffect(() => {
		if (cupsData) {
			const result = chooseFact();
			setFact(result);
		}
	}, [cupsData]);

	useEffect(() => {
		if (clubsList) {
			getDataFromClubs();
		}
	}, [clubsList]);

	return (
		<div id="stats-page" className="hero min-h-screen">
			<div className="hero-overlay bg-opacity-60"></div>
			<div className="hero-content text-center text-neutral-content flex flex-col">
				<div className="max-w-md">
					<h1 className="mb-5 text-2xl font-bold">
						{" "}
						Welcome! Here's how you're doing:
					</h1>
					<div className="flex text-center justify-evenly">
						<div className="statBackground">
							<p className="mb-5"> Total ANDis Pledged</p>
							<p className="mb-5 statNumber"> {cupsData.totalUsers}</p>
						</div>
						<div>
							<p className="mb-5"> Total Cups Saved</p>
							<p className="mb- statNumber"> {cupsData.totalCupsSaved}</p>
						</div>
					</div>

					<div id="featured-stat">
						<h1 className="mb-4">{fact.introText}</h1>
						<div className="flex justify-evenly items-center">
							<p className="text-xl">{fact.figure} In A Year!</p>
							<img id="dishwasherImg" src={fact.img} alt="fact" />
						</div>
						<p className="text-xs mt-5">{fact.src}</p>
					</div>
				</div>
				<div id="pie-chart">
					<Pie options={chartOptions} data={chartData} />
				</div>
			</div>
		</div>
	);
}

export default Stats;
