import React, { useEffect, useRef } from 'react';
import './EnhancedSpaceBackground.css';

const EnhancedSpaceBackground = ({ intensity = 'high' }) => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width, height;

    const resizeCanvas = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Enhanced star field
    const stars = [];
    const starCount = intensity === 'high' ? 400 : 250;
    
    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 3 + 0.5,
        opacity: Math.random() * 0.8 + 0.2,
        twinkleSpeed: Math.random() * 0.03 + 0.01,
        twinklePhase: Math.random() * Math.PI * 2,
        color: Math.random() > 0.8 ? `hsl(${Math.random() * 60 + 200}, 70%, 80%)` : '#ffffff'
      });
    }

    // Nebula clouds
    const nebulaClouds = [];
    const nebulaCount = intensity === 'high' ? 8 : 5;
    
    for (let i = 0; i < nebulaCount; i++) {
      nebulaClouds.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 200 + 100,
        opacity: Math.random() * 0.15 + 0.05,
        color: `hsl(${Math.random() * 120 + 200}, 60%, 50%)`,
        drift: Math.random() * 0.3 + 0.1,
        pulse: Math.random() * 0.02 + 0.01
      });
    }

    // Shooting stars
    const shootingStars = [];
    
    const createShootingStar = () => {
      if (Math.random() < 0.003) {
        shootingStars.push({
          x: Math.random() * width,
          y: Math.random() * height * 0.5,
          length: Math.random() * 80 + 20,
          speed: Math.random() * 8 + 4,
          angle: Math.random() * Math.PI / 4 + Math.PI / 4,
          opacity: 1,
          life: 0
        });
      }
    };

    // Distant galaxies
    const galaxies = [];
    const galaxyCount = intensity === 'high' ? 6 : 3;
    
    for (let i = 0; i < galaxyCount; i++) {
      galaxies.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 60 + 30,
        opacity: Math.random() * 0.1 + 0.03,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: Math.random() * 0.005 + 0.001
      });
    }

    let time = 0;

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      time += 0.016;

      // Draw nebula clouds
      nebulaClouds.forEach(cloud => {
        ctx.save();
        const pulseOpacity = cloud.opacity * (0.7 + 0.3 * Math.sin(time * cloud.pulse));
        ctx.globalAlpha = pulseOpacity;
        
        const gradient = ctx.createRadialGradient(
          cloud.x + Math.sin(time * cloud.drift) * 30,
          cloud.y + Math.cos(time * cloud.drift * 0.7) * 20,
          0,
          cloud.x + Math.sin(time * cloud.drift) * 30,
          cloud.y + Math.cos(time * cloud.drift * 0.7) * 20,
          cloud.size
        );
        
        gradient.addColorStop(0, cloud.color);
        gradient.addColorStop(0.5, cloud.color.replace('50%', '30%'));
        gradient.addColorStop(1, 'transparent');
        
        ctx.fillStyle = gradient;
        ctx.filter = 'blur(25px)';
        ctx.beginPath();
        ctx.arc(
          cloud.x + Math.sin(time * cloud.drift) * 30,
          cloud.y + Math.cos(time * cloud.drift * 0.7) * 20,
          cloud.size,
          0,
          Math.PI * 2
        );
        ctx.fill();
        ctx.restore();
      });

      // Draw distant galaxies
      galaxies.forEach(galaxy => {
        ctx.save();
        ctx.globalAlpha = galaxy.opacity;
        ctx.translate(galaxy.x, galaxy.y);
        ctx.rotate(galaxy.rotation + time * galaxy.rotationSpeed);
        
        const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, galaxy.size);
        gradient.addColorStop(0, 'rgba(255, 255, 255, 0.8)');
        gradient.addColorStop(0.3, 'rgba(100, 181, 246, 0.4)');
        gradient.addColorStop(0.7, 'rgba(156, 39, 176, 0.2)');
        gradient.addColorStop(1, 'transparent');
        
        ctx.fillStyle = gradient;
        ctx.filter = 'blur(15px)';
        
        // Draw spiral arms
        for (let i = 0; i < 3; i++) {
          ctx.save();
          ctx.rotate((i * Math.PI * 2) / 3);
          ctx.beginPath();
          ctx.ellipse(0, 0, galaxy.size, galaxy.size * 0.3, 0, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }
        
        ctx.restore();
      });

      // Draw stars with enhanced effects
      stars.forEach(star => {
        ctx.save();
        const twinkle = 0.4 + 0.6 * Math.sin(time * star.twinkleSpeed + star.twinklePhase);
        ctx.globalAlpha = star.opacity * twinkle;
        
        ctx.fillStyle = star.color;
        ctx.shadowBlur = star.size * 3;
        ctx.shadowColor = star.color;
        
        // Draw cross pattern for brighter stars
        if (star.size > 2) {
          ctx.strokeStyle = star.color;
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.moveTo(star.x - star.size * 2, star.y);
          ctx.lineTo(star.x + star.size * 2, star.y);
          ctx.moveTo(star.x, star.y - star.size * 2);
          ctx.lineTo(star.x, star.y + star.size * 2);
          ctx.stroke();
        }
        
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      // Create shooting stars
      createShootingStar();

      // Draw shooting stars
      shootingStars.forEach((star, index) => {
        ctx.save();
        ctx.globalAlpha = star.opacity;
        
        const gradient = ctx.createLinearGradient(
          star.x, star.y,
          star.x - Math.cos(star.angle) * star.length,
          star.y - Math.sin(star.angle) * star.length
        );
        gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
        gradient.addColorStop(0.5, 'rgba(100, 181, 246, 0.8)');
        gradient.addColorStop(1, 'transparent');
        
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 2;
        ctx.lineCap = 'round';
        
        ctx.beginPath();
        ctx.moveTo(star.x, star.y);
        ctx.lineTo(
          star.x - Math.cos(star.angle) * star.length,
          star.y - Math.sin(star.angle) * star.length
        );
        ctx.stroke();
        
        // Update shooting star
        star.x += Math.cos(star.angle) * star.speed;
        star.y += Math.sin(star.angle) * star.speed;
        star.life += 0.016;
        star.opacity = Math.max(0, 1 - star.life / 2);
        
        // Remove expired shooting stars
        if (star.opacity <= 0 || star.x > width || star.y > height) {
          shootingStars.splice(index, 1);
        }
        
        ctx.restore();
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [intensity]);

  return (
    <div className="enhanced-space-background">
      <canvas ref={canvasRef} className="enhanced-space-canvas" />
      <div className="cosmic-gradient-overlay" />
    </div>
  );
};

export default EnhancedSpaceBackground;