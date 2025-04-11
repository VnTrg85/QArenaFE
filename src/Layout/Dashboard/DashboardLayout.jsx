import React from 'react';
import './DashboardLayout.scss';

const DashboardLayout = ({ children }) => {
  return (
    <div className="dashboard-layout">
      <div className="main-view">
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;
