import React, { useState, useMemo } from 'react';
import './Gallery.css';

const Gallery = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [selectedPlanet, setSelectedPlanet] = useState(null);

  // Mock exoplanet data
  const exoplanets = [
    {
      id: 1,
      name: 'Kepler-452b',
      type: 'Super Earth',
      discoveryYear: 2015,
      mass: '5.0 Earth masses',
      radius: '1.6 Earth radii',
      orbitalPeriod: '385 days',
      temperature: '265 K',
      distance: '1,402 light years',
      hostStar: 'Kepler-452',
      method: 'Transit',
      confidence: 99.7,
      description: 'Often called "Earth\'s cousin," this planet orbits in the habitable zone of a Sun-like star.',
      image: 'kepler-452b'
    },
    {
      id: 2,
      name: 'TRAPPIST-1e',
      type: 'Terrestrial',
      discoveryYear: 2017,
      mass: '0.77 Earth masses',
      radius: '0.92 Earth radii',
      orbitalPeriod: '6.1 days',
      temperature: '251 K',
      distance: '40 light years',
      hostStar: 'TRAPPIST-1',
      method: 'Transit',
      confidence: 99.9,
      description: 'One of seven Earth-sized planets in the TRAPPIST-1 system, located in the habitable zone.',
      image: 'trappist-1e'
    },
    {
      id: 3,
      name: 'HD 209458 b',
      type: 'Hot Jupiter',
      discoveryYear: 1999,
      mass: '0.69 Jupiter masses',
      radius: '1.38 Jupiter radii',
      orbitalPeriod: '3.5 days',
      temperature: '1,130 K',
      distance: '159 light years',
      hostStar: 'HD 209458',
      method: 'Transit',
      confidence: 99.8,
      description: 'The first exoplanet discovered transiting its star, nicknamed "Osiris."',
      image: 'hd-209458b'
    },
    {
      id: 4,
      name: 'Proxima Centauri b',
      type: 'Terrestrial',
      discoveryYear: 2016,
      mass: '1.17 Earth masses',
      radius: '1.1 Earth radii',
      orbitalPeriod: '11.2 days',
      temperature: '234 K',
      distance: '4.24 light years',
      hostStar: 'Proxima Centauri',
      method: 'Radial Velocity',
      confidence: 99.2,
      description: 'The closest known exoplanet to Earth, orbiting our nearest stellar neighbor.',
      image: 'proxima-b'
    },
    {
      id: 5,
      name: 'K2-18 b',
      type: 'Sub-Neptune',
      discoveryYear: 2015,
      mass: '8.6 Earth masses',
      radius: '2.3 Earth radii',
      orbitalPeriod: '33 days',
      temperature: '279 K',
      distance: '124 light years',
      hostStar: 'K2-18',
      method: 'Transit',
      confidence: 98.5,
      description: 'A potentially habitable exoplanet with water vapor detected in its atmosphere.',
      image: 'k2-18b'
    },
    {
      id: 6,
      name: 'TOI-715 b',
      type: 'Super Earth',
      discoveryYear: 2024,
      mass: '3.02 Earth masses',
      radius: '1.55 Earth radii',
      orbitalPeriod: '19.3 days',
      temperature: '280 K',
      distance: '137 light years',
      hostStar: 'TOI-715',
      method: 'Transit',
      confidence: 97.8,
      description: 'A recently discovered super-Earth in the habitable zone of a nearby red dwarf star.',
      image: 'toi-715b'
    }
  ];

  const planetTypes = ['all', 'Terrestrial', 'Super Earth', 'Sub-Neptune', 'Hot Jupiter'];

  const filteredPlanets = useMemo(() => {
    return exoplanets.filter(planet => {
      const matchesSearch = planet.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           planet.hostStar.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter = selectedFilter === 'all' || planet.type === selectedFilter;
      return matchesSearch && matchesFilter;
    });
  }, [searchTerm, selectedFilter]);

  const getPlanetColor = (type) => {
    const colors = {
      'Terrestrial': '#4fc3f7',
      'Super Earth': '#81c784',
      'Sub-Neptune': '#64b5f6',
      'Hot Jupiter': '#ffb74d',
      'Gas Giant': '#ba68c8'
    };
    return colors[type] || '#90a4ae';
  };

  return (
    <div className="gallery-page page-container">
      <div className="container">
        <div>
          <h1 className="section-title">Exoplanet Gallery</h1>
          <p className="section-subtitle">
            Explore confirmed exoplanets discovered by NASA's space missions. 
            Each planet represents a unique world with its own characteristics and mysteries.
          </p>

          {/* Search and Filter Controls */}
          <div className="controls-section">
            <div className="search-bar">
              <span className="search-icon">🔍</span>
              <input
                type="text"
                placeholder="Search planets or host stars..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
            </div>
            
            <div className="filter-controls">
              <span className="filter-icon">🔽</span>
              <select
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
                className="filter-select"
              >
                {planetTypes.map(type => (
                  <option key={type} value={type}>
                    {type === 'all' ? 'All Types' : type}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Planet Grid */}
          <div className="planets-grid">
            {filteredPlanets.map((planet, index) => (
              <div
                key={planet.id}
                className="planet-card card"
                onClick={() => setSelectedPlanet(planet)}
              >
                <div className="planet-visual">
                  <div 
                    className="planet-sphere"
                    style={{ 
                      background: `radial-gradient(circle at 30% 30%, ${getPlanetColor(planet.type)}, ${getPlanetColor(planet.type)}88)`
                    }}
                  ></div>
                  <div className="planet-glow" style={{ boxShadow: `0 0 30px ${getPlanetColor(planet.type)}44` }}></div>
                </div>
                
                <div className="planet-info">
                  <h3 className="planet-name">{planet.name}</h3>
                  <div className="planet-type" style={{ color: getPlanetColor(planet.type) }}>
                    {planet.type}
                  </div>
                  
                  <div className="planet-stats">
                    <div className="stat">
                      <span className="stat-icon">🌍</span>
                      <span>{planet.radius}</span>
                    </div>
                    <div className="stat">
                      <span className="stat-icon">📅</span>
                      <span>{planet.orbitalPeriod}</span>
                    </div>
                    <div className="stat">
                      <span className="stat-icon">🌡️</span>
                      <span>{planet.temperature}</span>
                    </div>
                  </div>
                  
                  <div className="confidence-bar">
                    <div className="confidence-label">Confidence: {planet.confidence}%</div>
                    <div className="confidence-track">
                      <div 
                        className="confidence-fill"
                        style={{ width: `${planet.confidence}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredPlanets.length === 0 && (
            <div className="no-results">
              <span className="no-results-icon">🔍</span>
              <h3>No planets found</h3>
              <p>Try adjusting your search terms or filters</p>
            </div>
          )}
        </div>
      </div>

      {/* Planet Detail Modal */}
      {selectedPlanet && (
        <div
          className="modal-overlay"
          onClick={() => setSelectedPlanet(null)}
        >
          <div
            className="planet-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              className="modal-close"
              onClick={() => setSelectedPlanet(null)}
            >
              ×
            </button>
            
            <div className="modal-content">
              <div className="modal-visual">
                <div 
                  className="modal-planet"
                  style={{ 
                    background: `radial-gradient(circle at 30% 30%, ${getPlanetColor(selectedPlanet.type)}, ${getPlanetColor(selectedPlanet.type)}88)`
                  }}
                ></div>
              </div>
              
              <div className="modal-info">
                <h2 className="modal-title">{selectedPlanet.name}</h2>
                <div className="modal-type" style={{ color: getPlanetColor(selectedPlanet.type) }}>
                  {selectedPlanet.type}
                </div>
                
                <p className="modal-description">{selectedPlanet.description}</p>
                
                <div className="modal-details">
                  <div className="detail-grid">
                    <div className="detail-item">
                      <span className="detail-label">Discovery Year</span>
                      <span className="detail-value">{selectedPlanet.discoveryYear}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Mass</span>
                      <span className="detail-value">{selectedPlanet.mass}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Radius</span>
                      <span className="detail-value">{selectedPlanet.radius}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Orbital Period</span>
                      <span className="detail-value">{selectedPlanet.orbitalPeriod}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Temperature</span>
                      <span className="detail-value">{selectedPlanet.temperature}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Distance</span>
                      <span className="detail-value">{selectedPlanet.distance}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Host Star</span>
                      <span className="detail-value">{selectedPlanet.hostStar}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Detection Method</span>
                      <span className="detail-value">{selectedPlanet.method}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;