import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

const Star = ({ size = 0.5 }) => {
  const meshRef = useRef();

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.005;
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      <sphereGeometry args={[size, 32, 32]} />
      <meshBasicMaterial color="#ffd700" />
      <pointLight intensity={2} color="#ffd700" />
    </mesh>
  );
};

const OrbitingPlanet = ({ 
  radius = 2, 
  speed = 0.01, 
  planetSize = 0.1, 
  color = '#4fc3f7',
  offset = 0 
}) => {
  const groupRef = useRef();
  const planetRef = useRef();

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += speed;
    }
    if (planetRef.current) {
      planetRef.current.rotation.y += 0.02;
    }
  });

  return (
    <group ref={groupRef} rotation={[0, offset, 0]}>
      {/* Orbit path */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[radius - 0.01, radius + 0.01, 64]} />
        <meshBasicMaterial 
          color="#4dd0e1" 
          transparent 
          opacity={0.3}
        />
      </mesh>
      
      {/* Planet */}
      <mesh ref={planetRef} position={[radius, 0, 0]}>
        <sphereGeometry args={[planetSize, 16, 16]} />
        <meshStandardMaterial color={color} roughness={0.8} />
      </mesh>
    </group>
  );
};

const Stars = ({ count = 1000 }) => {
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
      <pointsMaterial color="white" size={2} sizeAttenuation={false} />
    </points>
  );
};

const SolarSystem3D = ({ 
  className = '',
  style = {},
  enableControls = true,
  autoRotate = true
}) => {
  const planets = [
    { radius: 1.5, speed: 0.02, size: 0.08, color: '#ff6b35', offset: 0 },
    { radius: 2.2, speed: 0.015, size: 0.12, color: '#4fc3f7', offset: Math.PI / 3 },
    { radius: 3.0, speed: 0.01, size: 0.15, color: '#81c784', offset: Math.PI / 2 },
    { radius: 4.2, speed: 0.008, size: 0.25, color: '#ffb74d', offset: Math.PI },
  ];

  return (
    <div className={`solar-system-3d ${className}`} style={{ width: '100%', height: '300px', ...style }}>
      <Canvas camera={{ position: [0, 2, 6], fov: 60 }}>
        <ambientLight intensity={0.2} />
        
        <Stars count={1000} />
        
        {/* Central Star */}
        <Star size={0.3} />
        
        {/* Orbiting Planets */}
        {planets.map((planet, index) => (
          <OrbitingPlanet
            key={index}
            radius={planet.radius}
            speed={planet.speed}
            planetSize={planet.size}
            color={planet.color}
            offset={planet.offset}
          />
        ))}
        
        {enableControls && (
          <OrbitControls 
            enableZoom={true}
            autoRotate={autoRotate}
            autoRotateSpeed={0.5}
            minDistance={3}
            maxDistance={10}
          />
        )}
      </Canvas>
    </div>
  );
};

export default SolarSystem3D;