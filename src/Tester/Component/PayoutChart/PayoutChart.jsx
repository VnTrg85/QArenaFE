// components/PayoutChart.jsx
import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

// Register chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const PayoutChart = ({ data }) => {
	const [chartData, setChartData] = useState(null);
	function getRandomColor() {
		const letters = "0123456789ABCDEF";
		let color = "#";
		for (let i = 0; i < 6; i++) {
			color += letters[Math.floor(Math.random() * 16)];
		}
		return color;
	}
	useEffect(() => {
		const labels = data.map(item => item.date);
		const values = data.map(item => item.totalAmount);

		setChartData({
			labels,
			datasets: [
				{
					label: "Payout",
					data: values,
					backgroundColor: values.map(() => getRandomColor()),
					borderColor: "rgba(75, 192, 192, 1)",
					borderWidth: 1,
				},
			],
		});
	}, [data]);

	const options = {
		responsive: true,
		plugins: {
			legend: { display: false, position: "top" },
			title: { display: true, text: "Monthly Payout" },
		},
		scales: {
			y: { beginAtZero: true },
		},
	};

	return (
		<div>
			<h2>Payout per Month</h2>
			{chartData ? <Bar options={options} data={chartData} /> : <p>Loading chart...</p>}
		</div>
	);
};

export default PayoutChart;
