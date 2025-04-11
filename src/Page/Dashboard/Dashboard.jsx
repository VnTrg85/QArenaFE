import React from 'react';
import './Dashboard.scss';
import DashboardLayout from '../../Layout/Dashboard/DashboardLayout';
import StatisticChart from '../../Component/StatisticChart/StatisticChart';
import ProjectList from '../../Component/ProjectList/ProjectList';

const Dashboard = () => {
  return (
    <DashboardLayout>
      <div className="dashboard">
        <div className="top-boxes">
          <div className="summary-card">$19,238<br/><small>Total Revenue</small></div>
          <div className="summary-card">30,187<br/><small>Page Views</small></div>
          <div className="summary-card">1,685<br/><small>Product Sold</small></div>
          <div className="summary-card">$1,304<br/><small>Profit</small></div>
        </div>
        <div className="charts-section">
          <StatisticChart/>
        </div>
        <ProjectList/>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
