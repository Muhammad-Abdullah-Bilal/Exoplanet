import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

const Planet = ({ color = '#4fc3f7', size = 1, rotationSpeed = 0.01, rings = false }) => {
  const meshRef = useRef();
  const ringsRef = useRef();

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += rotationSpeed;
    }
    if (ringsRef.current) {
      ringsRef.current.rotation.z += rotationSpeed * 0.5;
    }
  });

  const planetTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 256;
    const ctx = canvas.getContext('2d');
    
    // Create a gradient for the planet surface
    const gradient = ctx.createLinearGradient(0, 0, 512, 256);
    gradient.addColorStop(0, color);
    gradient.addColorStop(0.5, '#ffffff');
    gradient.addColorStop(1, color);
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 512, 256);
    
    // Add some surface details
    ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
    for (let i = 0; i < 20; i++) {
      const x = Math.random() * 512;
      const y = Math.random() * 256;
      const radius = Math.random() * 20 + 5;
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fill();
    }
    
    return new THREE.CanvasTexture(canvas);
  }, [color]);

  return (
    <group>
      <mesh ref={meshRef} position={[0, 0, 0]}>
        <sphereGeometry args={[size, 32, 32]} />
        <meshStandardMaterial 
          map={planetTexture}
          roughness={0.8}
          metalness={0.2}
        />
      </mesh>
      
      {rings && (
        <mesh ref={ringsRef} rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[size * 1.2, size * 1.8, 64]} />
          <meshBasicMaterial 
            color={color} 
            transparent 
            opacity={0.6} 
            side={THREE.DoubleSide}
          />
        </mesh>
      )}
      
      {/* Atmosphere glow */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[size * 1.05, 32, 32]} />
        <meshBasicMaterial 
          color={color}
          transparent
          opacity={0.1}
          side={THREE.BackSide}
        />
      </mesh>
    </group>
  );
};

const Stars = ({ count = 500 }) => {
  const starsRef = useRef();
  
  const positions = React.useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 200;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 200;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 200;
    }
    return positions;
  }, [count]);

  return (
    <points ref={starsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial color="white" size={1} sizeAttenuation={false} />
    </points>
  );
};

const Planet3D = ({ 
  color = '#4fc3f7', 
  size = 1, 
  rotationSpeed = 0.01, 
  rings = false,
  showStars = true,
  enableControls = false,
  className = '',
  style = {}
}) => {
  return (
    <div className={`planet-3d ${className}`} style={{ width: '100%', height: '200px', ...style }}>
      <Canvas camera={{ position: [0, 0, 4], fov: 50 }}>
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#4dd0e1" />
        
        {showStars && <Stars count={500} />}
        
        <Planet 
          color={color} 
          size={size} 
          rotationSpeed={rotationSpeed} 
          rings={rings}
        />
        
        {enableControls && <OrbitControls enableZoom={false} />}
      </Canvas>
    </div>
  );
};

export default Planet3D;