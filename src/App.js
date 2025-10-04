import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import BottomNav from './components/BottomNav';
import EnhancedSpaceBackground from './components/EnhancedSpaceBackground';
import FloatingParticles from './components/FloatingParticles';
import CosmicDust from './components/CosmicDust';
import Home from './pages/Home';
import ExoplanetCatalog from './pages/ExoplanetCatalog';
import DiscoveryCards from './pages/DiscoveryCards';
import LightCurveExplorer from './pages/LightCurveExplorer';
import TransitSimulator from './pages/TransitSimulator';
import MissionLog from './pages/MissionLog';
import InteractiveHub from './pages/InteractiveHub';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <EnhancedSpaceBackground intensity="high" />
        <CosmicDust density="medium" speed={0.8} />
        <FloatingParticles count={40} speed={0.6} />
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/catalog" element={<ExoplanetCatalog />} />
            <Route path="/discovery" element={<DiscoveryCards />} />
            <Route path="/explorer" element={<LightCurveExplorer />} />
            <Route path="/simulator" element={<TransitSimulator />} />
            <Route path="/missions" element={<MissionLog />} />
            <Route path="/interactive" element={<InteractiveHub />} />
          </Routes>
        </main>
        <BottomNav />
      </div>
    </Router>
  );
}

export default App;