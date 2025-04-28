import React from 'react';
import Sidebar from '../../Component/SideBar/Sidebar';
import Header from '../../Component/Header/Header';
import { Outlet } from 'react-router-dom';
import './DashboardLayout.scss';

const DashboardLayout = ({ children }) => {
  return (
    <div className="dashboard-layout">
      <Header />
      <div className="main-container">
        <Sidebar />
        <div className="main-view">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
