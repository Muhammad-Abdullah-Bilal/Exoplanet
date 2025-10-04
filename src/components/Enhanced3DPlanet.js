import React, { useRef, useEffect, useState } from 'react';
import './Enhanced3DPlanet.css';

const Enhanced3DPlanet = ({ 
  color = '#4fc3f7', 
  size = 'medium', 
  hasRings = false,
  hasAtmosphere = true,
  rotationSpeed = 1,
  className = '',
  style = {},
  planetType = 'terrestrial' // terrestrial, gas-giant, ice-giant
}) => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width, height;

    const resizeCanvas = () => {
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Planet properties based on size
    const sizeMap = {
      small: 40,
      medium: 60,
      large: 80
    };
    
    const planetRadius = sizeMap[size] || sizeMap.medium;
    let rotation = 0;
    let time = 0;

    const drawPlanetSurface = (centerX, centerY, radius, baseColor, type) => {
      // Create surface texture based on planet type
      const surfaceCanvas = document.createElement('canvas');
      surfaceCanvas.width = radius * 4;
      surfaceCanvas.height = radius * 2;
      const surfaceCtx = surfaceCanvas.getContext('2d');
      
      // Base gradient
      const baseGradient = surfaceCtx.createLinearGradient(0, 0, surfaceCanvas.width, 0);
      
      if (type === 'gas-giant') {
        // Gas giant bands
        baseGradient.addColorStop(0, baseColor);
        baseGradient.addColorStop(0.3, adjustColor(baseColor, 20));
        baseGradient.addColorStop(0.7, adjustColor(baseColor, -20));
        baseGradient.addColorStop(1, baseColor);
        
        surfaceCtx.fillStyle = baseGradient;
        surfaceCtx.fillRect(0, 0, surfaceCanvas.width, surfaceCanvas.height);
        
        // Add bands
        for (let i = 0; i < 8; i++) {
          const y = (i / 8) * surfaceCanvas.height;
          const bandHeight = surfaceCanvas.height / 12;
          
          surfaceCtx.fillStyle = adjustColor(baseColor, (i % 2) * 15 - 7.5);
          surfaceCtx.fillRect(0, y, surfaceCanvas.width, bandHeight);
        }
        
        // Add storm spots
        for (let i = 0; i < 3; i++) {
          const x = Math.random() * surfaceCanvas.width;
          const y = Math.random() * surfaceCanvas.height;
          const stormRadius = Math.random() * 20 + 10;
          
          const stormGradient = surfaceCtx.createRadialGradient(x, y, 0, x, y, stormRadius);
          stormGradient.addColorStop(0, adjustColor(baseColor, 40));
          stormGradient.addColorStop(1, 'transparent');
          
          surfaceCtx.fillStyle = stormGradient;
          surfaceCtx.beginPath();
          surfaceCtx.arc(x, y, stormRadius, 0, Math.PI * 2);
          surfaceCtx.fill();
        }
      } else if (type === 'ice-giant') {
        // Ice giant appearance
        baseGradient.addColorStop(0, baseColor);
        baseGradient.addColorStop(0.5, adjustColor(baseColor, 30));
        baseGradient.addColorStop(1, adjustColor(baseColor, -10));
        
        surfaceCtx.fillStyle = baseGradient;
        surfaceCtx.fillRect(0, 0, surfaceCanvas.width, surfaceCanvas.height);
        
        // Add ice crystals effect
        for (let i = 0; i < 50; i++) {
          const x = Math.random() * surfaceCanvas.width;
          const y = Math.random() * surfaceCanvas.height;
          
          surfaceCtx.fillStyle = 'rgba(255, 255, 255, 0.3)';
          surfaceCtx.beginPath();
          surfaceCtx.arc(x, y, Math.random() * 2 + 1, 0, Math.PI * 2);
          surfaceCtx.fill();
        }
      } else {
        // Terrestrial planet
        baseGradient.addColorStop(0, adjustColor(baseColor, -20));
        baseGradient.addColorStop(0.5, baseColor);
        baseGradient.addColorStop(1, adjustColor(baseColor, -30));
        
        surfaceCtx.fillStyle = baseGradient;
        surfaceCtx.fillRect(0, 0, surfaceCanvas.width, surfaceCanvas.height);
        
        // Add continents/features
        for (let i = 0; i < 15; i++) {
          const x = Math.random() * surfaceCanvas.width;
          const y = Math.random() * surfaceCanvas.height;
          const featureSize = Math.random() * 15 + 5;
          
          surfaceCtx.fillStyle = adjustColor(baseColor, Math.random() * 40 - 20);
          surfaceCtx.beginPath();
          surfaceCtx.arc(x, y, featureSize, 0, Math.PI * 2);
          surfaceCtx.fill();
        }
      }
      
      // Apply texture to planet
      ctx.save();
      
      // Create clipping mask for planet
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      ctx.clip();
      
      // Calculate texture offset based on rotation
      const textureOffset = (rotation * 2) % surfaceCanvas.width;
      
      // Draw texture with rotation effect
      ctx.drawImage(
        surfaceCanvas,
        -textureOffset, centerY - radius,
        surfaceCanvas.width, radius * 2
      );
      
      // Draw wrapped portion
      if (textureOffset > 0) {
        ctx.drawImage(
          surfaceCanvas,
          surfaceCanvas.width - textureOffset, centerY - radius,
          surfaceCanvas.width, radius * 2
        );
      }
      
      ctx.restore();
    };

    const adjustColor = (color, amount) => {
      const hex = color.replace('#', '');
      const r = Math.max(0, Math.min(255, parseInt(hex.substr(0, 2), 16) + amount));
      const g = Math.max(0, Math.min(255, parseInt(hex.substr(2, 2), 16) + amount));
      const b = Math.max(0, Math.min(255, parseInt(hex.substr(4, 2), 16) + amount));
      return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
    };

    const drawPlanet = () => {
      const centerX = width / 2;
      const centerY = height / 2;
      
      // Draw planet surface
      drawPlanetSurface(centerX, centerY, planetRadius, color, planetType);
      
      // Draw 3D shading
      const shadowGradient = ctx.createRadialGradient(
        centerX + planetRadius * 0.3, centerY - planetRadius * 0.3, 0,
        centerX, centerY, planetRadius
      );
      shadowGradient.addColorStop(0, 'rgba(0, 0, 0, 0)');
      shadowGradient.addColorStop(0.7, 'rgba(0, 0, 0, 0.3)');
      shadowGradient.addColorStop(1, 'rgba(0, 0, 0, 0.7)');
      
      ctx.fillStyle = shadowGradient;
      ctx.beginPath();
      ctx.arc(centerX, centerY, planetRadius, 0, Math.PI * 2);
      ctx.fill();
      
      // Draw highlight
      const highlightGradient = ctx.createRadialGradient(
        centerX - planetRadius * 0.4, centerY - planetRadius * 0.4, 0,
        centerX - planetRadius * 0.4, centerY - planetRadius * 0.4, planetRadius * 0.8
      );
      highlightGradient.addColorStop(0, 'rgba(255, 255, 255, 0.4)');
      highlightGradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.1)');
      highlightGradient.addColorStop(1, 'transparent');
      
      ctx.fillStyle = highlightGradient;
      ctx.beginPath();
      ctx.arc(centerX, centerY, planetRadius, 0, Math.PI * 2);
      ctx.fill();
      
      // Draw atmosphere if enabled
      if (hasAtmosphere) {
        const atmosphereGradient = ctx.createRadialGradient(
          centerX, centerY, planetRadius,
          centerX, centerY, planetRadius * 1.2
        );
        atmosphereGradient.addColorStop(0, color + '40');
        atmosphereGradient.addColorStop(0.5, color + '20');
        atmosphereGradient.addColorStop(1, 'transparent');
        
        ctx.fillStyle = atmosphereGradient;
        ctx.beginPath();
        ctx.arc(centerX, centerY, planetRadius * 1.2, 0, Math.PI * 2);
        ctx.fill();
      }
      
      // Draw rings if enabled
      if (hasRings) {
        const ringInner = planetRadius * 1.3;
        const ringOuter = planetRadius * 1.8;
        
        // Ring shadow on planet
        ctx.save();
        ctx.globalCompositeOperation = 'multiply';
        ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
        ctx.beginPath();
        ctx.ellipse(centerX, centerY + planetRadius * 0.1, planetRadius * 0.8, planetRadius * 0.1, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
        
        // Draw rings
        for (let i = 0; i < 3; i++) {
          const ringRadius = ringInner + (ringOuter - ringInner) * (i / 3);
          const ringWidth = (ringOuter - ringInner) / 6;
          
          const ringGradient = ctx.createRadialGradient(
            centerX, centerY, ringRadius - ringWidth,
            centerX, centerY, ringRadius + ringWidth
          );
          ringGradient.addColorStop(0, 'transparent');
          ringGradient.addColorStop(0.4, color + '60');
          ringGradient.addColorStop(0.6, color + '80');
          ringGradient.addColorStop(1, 'transparent');
          
          ctx.strokeStyle = ringGradient;
          ctx.lineWidth = ringWidth;
          ctx.beginPath();
          ctx.ellipse(centerX, centerY, ringRadius, ringRadius * 0.2, 0, 0, Math.PI * 2);
          ctx.stroke();
        }
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      
      // Update rotation and time
      rotation += rotationSpeed * 0.5;
      time += 0.016;
      
      // Add hover effect
      if (isHovered) {
        ctx.save();
        ctx.shadowBlur = 20;
        ctx.shadowColor = color;
        drawPlanet();
        ctx.restore();
      } else {
        drawPlanet();
      }
      
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [color, size, hasRings, hasAtmosphere, rotationSpeed, planetType, isHovered]);

  return (
    <div 
      className={`enhanced-3d-planet ${className}`} 
      style={style}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <canvas ref={canvasRef} className="enhanced-planet-canvas" />
      
      <div className="planet-info-overlay">
        <div className="planet-type-indicator">
          {planetType === 'gas-giant' && '🪐'}
          {planetType === 'ice-giant' && '❄️'}
          {planetType === 'terrestrial' && '🌍'}
        </div>
      </div>
    </div>
  );
};

export default Enhanced3DPlanet;