import React from 'react';
import './Sidebar.css';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-logo">Genaral Menu</div>
      <div className="sidebar-menu">
        <ul>
          <li className="active">Dashboard</li>
          <li>Reports</li>
          <li>Catalog</li>
          <li>Payment</li>
          <li>Automation</li>
          <li>Notifications <span className="badge">3</span></li>
        </ul>
      </div>
      <div className="sidebar-support">
        <ul>
          <li>Help</li>
          <li>Settings</li>
          <li>Security</li>
        </ul>
        <button className="logout-btn">Logout</button>
      </div>
    </div>
  );
};

export default Sidebar;
