import React from 'react';
import './Sidebar.css';
import { useLocation, useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const getBasePath = (pathname) => {
    const parts = pathname.split('/').filter(Boolean);
    return `/${parts.slice(0, 2).join('/')}`;
  };

  const currentPath = getBasePath(location.pathname);

  const isActive = (path) => currentPath === path;

  const navigateTo = (path) => navigate(path);

  return (
    <div className="sidebar">
      <div className="sidebar-logo">General Menu</div>
      <div className="sidebar-menu">
        <ul>
          <li className={isActive('/Q3VzdG9tZXI=/dashboard') ? 'active' : ''} onClick={() => navigateTo('/Q3VzdG9tZXI=/dashboard')}>
            Dashboard
          </li>
          <li className={isActive('/Q3VzdG9tZXI=/project') ? 'active' : ''} onClick={() => navigateTo('/Q3VzdG9tZXI=/project')}>
            Project
          </li>
          <li className={isActive('/Q3VzdG9tZXI=/payment') ? 'active' : ''} onClick={() => navigateTo('/Q3VzdG9tZXI=/payment')}>
            Payment
          </li>
          <li className={isActive('/Q3VzdG9tZXI=/notification') ? 'active' : ''} onClick={() => navigateTo('/Q3VzdG9tZXI=/notification')}>
            Notifications <span className="badge">3</span>
          </li>
        </ul>
      </div>
      <div className="sidebar-support">
        <ul>
          <li className={isActive('/Q3VzdG9tZXI=/message') ? 'active' : ''} onClick={() => navigateTo('/Q3VzdG9tZXI=/message')}>
            Message
          </li>
          <li>Settings</li>
        </ul>
        <button className="logout-btn">Logout</button>
      </div>
    </div>
  );
};

export default Sidebar;
