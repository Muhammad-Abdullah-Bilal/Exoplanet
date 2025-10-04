import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="header-content">
        <div className="header-left">
          <button className="menu-btn">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M3 12H21M3 6H21M3 18H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
        </div>
        
        <div className="header-center">
          <div className="app-logo">
            <div className="logo-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                <circle cx="12" cy="12" r="6" fill="currentColor"/>
                <circle cx="12" cy="12" r="2" fill="var(--primary-bg)"/>
              </svg>
            </div>
            <span className="app-title">Exoplanet Lab</span>
          </div>
        </div>
        
        <div className="header-right">
          <button className="share-btn">Share</button>
        </div>
      </div>
    </header>
  );
};

export default Header;