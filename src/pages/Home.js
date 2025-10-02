import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const features = [
    {
      icon: '📤',
      title: 'Upload Data',
      description: 'Upload your transit photometry data and let our AI analyze potential exoplanet candidates.',
      link: '/upload'
    },
    {
      icon: '🔍',
      title: 'Explore Gallery',
      description: 'Browse through confirmed exoplanets with interactive visualizations and detailed information.',
      link: '/gallery'
    },
    {
      icon: '📊',
      title: 'View Results',
      description: 'Analyze detection results with confidence scores and detailed explanations.',
      link: '/results'
    }
  ];

  const stats = [
    { number: '5000+', label: 'Exoplanets Detected' },
    { number: '95%', label: 'Model Accuracy' },
    { number: '3', label: 'NASA Missions' },
    { number: '24/7', label: 'AI Processing' }
  ];

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">
              Discover <span className="text-gradient">Exoplanets</span> with AI
            </h1>
            <p className="hero-subtitle">
              Harness the power of machine learning to detect exoplanets from NASA's Kepler, K2, and TESS mission data. 
              Our advanced AI models analyze transit photometry to identify planetary candidates with unprecedented accuracy.
            </p>
            <div className="hero-actions">
              <Link to="/upload" className="btn btn-primary">
                📤 Start Analysis
              </Link>
              <Link to="/gallery" className="btn btn-secondary">
                🔭 Explore Gallery
              </Link>
            </div>
          </div>
          
          <div className="hero-visual">
            <div className="planet-system">
              <div className="star"></div>
              <div className="orbit orbit-1">
                <div className="planet planet-1"></div>
              </div>
              <div className="orbit orbit-2">
                <div className="planet planet-2"></div>
              </div>
              <div className="orbit orbit-3">
                <div className="planet planet-3"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features section">
        <div className="container">
          <h2 className="section-title">Powerful Features</h2>
          <p className="section-subtitle">
            Everything you need to analyze exoplanet data and make groundbreaking discoveries
          </p>
          
          <div className="grid grid-3">
            {features.map((feature, index) => (
              <div key={index} className="feature-card card">
                <div className="feature-icon">
                  <span style={{ fontSize: '48px' }}>{feature.icon}</span>
                </div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
                <Link to={feature.link} className="feature-link">
                  Learn More →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats section">
        <div className="container">
          <div className="grid grid-4">
            {stats.map((stat, index) => (
              <div key={index} className="stat-card">
                <div className="stat-number">{stat.number}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section className="technology section">
        <div className="container">
          <div className="tech-content">
            <div className="tech-text">
              <h2 className="section-title text-left">Advanced AI Technology</h2>
              <p className="tech-description">
                Our machine learning models are trained on extensive NASA datasets from multiple missions. 
                Using deep learning techniques, we can identify subtle patterns in light curves that indicate 
                planetary transits with remarkable precision.
              </p>
              <div className="tech-features">
                <div className="tech-feature">
                  <span className="tech-feature-icon">⚡</span>
                  <span>Real-time Processing</span>
                </div>
                <div className="tech-feature">
                  <span className="tech-feature-icon">🌍</span>
                  <span>Multi-mission Support</span>
                </div>
                <div className="tech-feature">
                  <span className="tech-feature-icon">📊</span>
                  <span>Confidence Scoring</span>
                </div>
              </div>
            </div>
            
            <div className="tech-visual">
              <div className="ai-visualization">
                <div className="neural-network">
                  <div className="layer input-layer">
                    <div className="node"></div>
                    <div className="node"></div>
                    <div className="node"></div>
                    <div className="node"></div>
                  </div>
                  <div className="layer hidden-layer">
                    <div className="node"></div>
                    <div className="node"></div>
                    <div className="node"></div>
                  </div>
                  <div className="layer output-layer">
                    <div className="node"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta section">
        <div className="container">
          <div className="cta-content">
            <h2 className="cta-title">Ready to Discover New Worlds?</h2>
            <p className="cta-description">
              Join the next generation of exoplanet hunters and contribute to our understanding of the universe.
            </p>
            <Link to="/upload" className="btn btn-primary btn-large">
              📤 Start Your Discovery
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;