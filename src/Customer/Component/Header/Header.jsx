import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <div className="header">
      <div className="nav-tabs">
        <img src="/icons/i-qarenalogo.svg" alt="Qarena Logo" className="header-logo" />
        <button className="tab active">Summary</button>
        <button className="tab">Products</button>
        <button className="tab">Customers</button>
        <button className="tab">Performance</button>
      </div>
      <div className="header-right">
        <input type="text" placeholder="Search..." className="search-input" />
        <img src="" alt="avatar" className="avatar" />
      </div>
    </div>
  );
};

export default Header;
