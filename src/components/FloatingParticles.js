import React, { useEffect, useRef } from 'react';
import './FloatingParticles.css';

const FloatingParticles = ({ count = 50, speed = 1 }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Clear existing particles
    container.innerHTML = '';

    // Create particles
    for (let i = 0; i < count; i++) {
      const particle = document.createElement('div');
      particle.className = 'floating-particle';
      
      // Random properties
      const size = Math.random() * 4 + 1;
      const x = Math.random() * 100;
      const y = Math.random() * 100;
      const duration = (Math.random() * 20 + 10) / speed;
      const delay = Math.random() * 5;
      const opacity = Math.random() * 0.6 + 0.2;
      
      particle.style.cssText = `
        left: ${x}%;
        top: ${y}%;
        width: ${size}px;
        height: ${size}px;
        opacity: ${opacity};
        animation-duration: ${duration}s;
        animation-delay: ${delay}s;
      `;
      
      container.appendChild(particle);
    }
  }, [count, speed]);

  return <div ref={containerRef} className="floating-particles-container" />;
};

export default FloatingParticles;