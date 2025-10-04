import React, { useEffect, useRef } from 'react';
import './CosmicDust.css';

const CosmicDust = ({ density = 'medium', speed = 1 }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Clear existing particles
    container.innerHTML = '';

    const densityMap = {
      low: 20,
      medium: 40,
      high: 60
    };

    const particleCount = densityMap[density] || densityMap.medium;

    // Create dust particles
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'cosmic-dust-particle';
      
      // Random properties
      const size = Math.random() * 3 + 1;
      const x = Math.random() * 100;
      const y = Math.random() * 100;
      const duration = (Math.random() * 30 + 20) / speed;
      const delay = Math.random() * 10;
      const opacity = Math.random() * 0.4 + 0.1;
      const drift = Math.random() * 20 - 10;
      
      particle.style.cssText = `
        left: ${x}%;
        top: ${y}%;
        width: ${size}px;
        height: ${size}px;
        opacity: ${opacity};
        animation-duration: ${duration}s;
        animation-delay: ${delay}s;
        --drift: ${drift}px;
      `;
      
      container.appendChild(particle);
    }

    // Create larger cosmic debris
    for (let i = 0; i < 5; i++) {
      const debris = document.createElement('div');
      debris.className = 'cosmic-debris';
      
      const size = Math.random() * 8 + 4;
      const x = Math.random() * 100;
      const y = Math.random() * 100;
      const duration = (Math.random() * 40 + 30) / speed;
      const delay = Math.random() * 15;
      const opacity = Math.random() * 0.3 + 0.1;
      const rotation = Math.random() * 360;
      
      debris.style.cssText = `
        left: ${x}%;
        top: ${y}%;
        width: ${size}px;
        height: ${size}px;
        opacity: ${opacity};
        animation-duration: ${duration}s;
        animation-delay: ${delay}s;
        transform: rotate(${rotation}deg);
      `;
      
      container.appendChild(debris);
    }
  }, [density, speed]);

  return <div ref={containerRef} className="cosmic-dust-container" />;
};

export default CosmicDust;