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

import Dishwasher from "../images/dishwasher.svg";

ChartJS.register(
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend,
	ArcElement,
);

// ChartJS.defaults.global.defaultFontColor = "#fff";

function Stats() {
	const [chartData, setChartData] = useState({
		datasets: [],
	});

	const [chartOptions, setChartOptions] = useState({});
	const [cupsData, setCupsData] = useState({});
	const [clubsList, setClubsList] = useState([]);

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

	const fetchClubs = async () => {
		const clubUrl = "http://localhost:3001/clubs";
		const response = await fetch(clubUrl);
		if (!response.ok) {
			throw new Error("Data could not be fetched");
		}
		const data = await response.json();
		console.log("data", data);
		setClubsList(data);
		return data;
	};

	const getDataFromClubs = () => {
		for (const club of clubsList) {
			fetch(`http://localhost:3001/cups/${club.id}`)
				.then((response) => response.json())
				.then((data) => {
					console.log("clubsList", data);
				})
				.catch((error) => {
					console.log(error);
				});
		}
	};

	const getCupsData = () => {
		fetch("http://localhost:3001/cups")
			.then((response) => response.json())
			.then((data) => {
				console.log("cupsdata", data);
				setCupsData(data);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	const calculateUsage = (cupsData.totalCupsSaved * 0.58 * 365) / 9.5;
	const formattedNumber = Math.floor(calculateUsage);

	useEffect(() => {
		fetchClubs();
		getCupsData();
	}, []);

	useEffect(() => {
		if (clubsList) {
			getDataFromClubs();
		}
	}, [clubsList]);

	return (
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
							<p className="mb-5 statNumber"> {cupsData.totalUsers}</p>
						</div>
						<div>
							<p className="mb-5"> Total Cups Saved</p>
							<p className="mb- statNumber"> {cupsData.totalCupsSaved}</p>
						</div>
					</div>

					<div>
						<h1 className="mb-4">
							Your Club Has Saved Enough Energy To Run the Dishwasher:
						</h1>
						<div className="flex justify-evenly items-center">
							<h2 id="dishwasherX">x {formattedNumber}</h2>
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
