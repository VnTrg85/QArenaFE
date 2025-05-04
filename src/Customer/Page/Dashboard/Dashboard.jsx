import React, { useEffect, useState } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import { getBugReports, getBugFixRate, getSeverityBugCounts, getBugReportSummary } from '../../Service/TestProject/index';
import './Dashboard.css';

import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, ArcElement, PointElement, LineElement } from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, ArcElement, PointElement, LineElement);

const Dashboard = ({ userId, projectId }) => {
  const [bugReports, setBugReports] = useState([]);
  const [bugFixRate, setBugFixRate] = useState({});
  const [severityBugCounts, setSeverityBugCounts] = useState([]);
  const [bugReportSummary, setBugReportSummary] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resBugReports = await getBugReports(projectId);
        const resFixRate = await getBugFixRate(userId);
        const resSeverity = await getSeverityBugCounts(userId);
        const resBugReportSummary = await getBugReportSummary(userId);

        setBugReports(resBugReports);
        setBugFixRate(resFixRate);
        setSeverityBugCounts(resSeverity);
        setBugReportSummary(resBugReportSummary);
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };

    fetchData();
  }, [userId, projectId]);

  const summaryData = {
    labels: bugReportSummary.map((item) => item.date),
    datasets: [
      {
        label: 'Bug Reports Count',
        data: bugReportSummary.map((item) => item.count),
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const fixRateData = {
    labels: ['Fixed', 'Rejected'],
    datasets: [
      {
        label: 'Fix Rate',
        data: [
          bugFixRate.fixed || 0,
          bugFixRate.rejected || 0
        ],
        backgroundColor: ['rgba(75, 192, 192, 0.2)', 'rgba(255, 99, 132, 0.2)'],
        borderColor: ['rgba(75, 192, 192, 1)', 'rgba(255, 99, 132, 1)'],
        borderWidth: 1,
      },
    ],
  };

  const severityData = {
    labels: severityBugCounts.map((item) => item.severity),
    datasets: [
      {
        label: 'Bug Count by Severity',
        data: severityBugCounts.map((item) => item.count),
        backgroundColor: ['rgba(255, 159, 64, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 99, 132, 0.2)'],
        borderColor: ['rgba(255, 159, 64, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 99, 132, 1)'],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="dashboard">
      <div className="card summary-card">
        <h3>Bug Report Summary</h3>
        <Line data={summaryData} />
      </div>
      
      <div className="card fix-rate-card">
        <h3>Bug Fix Rate</h3>
        <Bar data={fixRateData} />
      </div>

      <div className="card severity-card">
        <h3>Bug Count by Severity</h3>
        <Bar data={severityData} />
      </div>

      <div className="card total-bug-card">
        <h3>Total Bug Reports</h3>
        <p>{bugReports.length}</p>
      </div>
    </div>
  );
};

export default Dashboard;
