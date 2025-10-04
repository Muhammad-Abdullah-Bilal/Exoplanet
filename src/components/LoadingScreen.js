import React from 'react';
import './LoadingScreen.css';

const LoadingScreen = () => {
  return (
    <div className="loading-screen">
      <div className="loading-content">
        <div className="loading-logo">
          <div className="logo-icon">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
              <circle cx="12" cy="12" r="6" fill="currentColor" opacity="0.3"/>
              <circle cx="12" cy="12" r="2" fill="currentColor"/>
            </svg>
          </div>
          <h1>Exoplanet Lab</h1>
        </div>
        
        <div className="loading-animation">
          <div className="orbit">
            <div className="planet planet-1"></div>
          </div>
          <div className="orbit orbit-2">
            <div className="planet planet-2"></div>
          </div>
          <div className="orbit orbit-3">
            <div className="planet planet-3"></div>
          </div>
        </div>
        
        <div className="loading-text">
          <p>Initializing AI systems...</p>
          <div className="loading-bar">
            <div className="loading-progress"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;