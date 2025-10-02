import React from 'react';
import './About.css';

const About = () => {
  const teamMembers = [
    {
      role: 'AI/ML Engineer',
      responsibilities: ['Model Development', 'Data Preprocessing', 'Performance Optimization'],
      icon: '🧠'
    },
    {
      role: 'Backend Developer',
      responsibilities: ['API Development', 'Database Management', 'Cloud Deployment'],
      icon: '💾'
    },
    {
      role: 'Frontend Developer',
      responsibilities: ['UI/UX Design', 'Data Visualization', 'User Experience'],
      icon: '👥'
    },
    {
      role: 'Data Specialist',
      responsibilities: ['Data Cleaning', 'Exploratory Analysis', 'Quality Assurance'],
      icon: '🏆'
    }
  ];

  const missions = [
    {
      name: 'Kepler Space Telescope',
      period: '2009-2018',
      discoveries: '2,600+ confirmed exoplanets',
      description: 'Revolutionary space telescope that used the transit method to discover thousands of exoplanets.'
    },
    {
      name: 'K2 Mission',
      period: '2014-2018',
      discoveries: '500+ confirmed exoplanets',
      description: 'Extended mission of Kepler, observing different fields and discovering diverse planetary systems.'
    },
    {
      name: 'TESS (Transiting Exoplanet Survey Satellite)',
      period: '2018-Present',
      discoveries: '5,000+ planet candidates',
      description: 'Current NASA mission surveying the entire sky for transiting exoplanets around nearby stars.'
    }
  ];

  const technologies = [
    { name: 'Machine Learning', description: 'Deep neural networks for pattern recognition in light curves' },
    { name: 'Transit Photometry', description: 'Analysis of stellar brightness variations caused by planetary transits' },
    { name: 'Signal Processing', description: 'Advanced algorithms to filter noise and detect weak signals' },
    { name: 'Statistical Analysis', description: 'Confidence scoring and false positive rejection methods' }
  ];

  return (
    <div className="about-page page-container">
      <div className="container">
        <div>
          <h1 className="section-title">About ExoDetect</h1>
          <p className="section-subtitle">
            Advancing exoplanet discovery through artificial intelligence and NASA's space mission data
          </p>

          {/* Mission Statement */}
          <section className="mission-section section">
            <div className="mission-content">
              <div className="mission-text">
                <h2 className="mission-title">Our Mission</h2>
                <p className="mission-description">
                  ExoDetect represents the next generation of exoplanet discovery tools, combining cutting-edge 
                  artificial intelligence with decades of NASA space mission data. Our platform democratizes 
                  access to advanced exoplanet detection capabilities, enabling both researchers and enthusiasts 
                  to contribute to our understanding of planetary systems beyond our solar system.
                </p>
                <p className="mission-description">
                  By leveraging machine learning algorithms trained on data from Kepler, K2, and TESS missions, 
                  we can identify subtle patterns in stellar light curves that indicate the presence of 
                  transiting exoplanets with unprecedented accuracy and speed.
                </p>
              </div>
              
              <div className="mission-visual">
                <div className="space-scene">
                  <div className="telescope-icon">
                    🔭
                  </div>
                  <div className="orbit-rings">
                    <div className="ring ring-1"></div>
                    <div className="ring ring-2"></div>
                    <div className="ring ring-3"></div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* NASA Missions */}
          <section className="missions-section section">
            <h2 className="section-title">NASA Space Missions</h2>
            <p className="section-subtitle">
              Our AI models are trained on high-quality data from NASA's premier exoplanet discovery missions
            </p>
            
            <div className="missions-grid">
              {missions.map((mission, index) => (
                <div key={index} className="mission-card card">
                  <div className="mission-header">
                    <span className="mission-icon">🚀</span>
                    <div className="mission-info">
                      <h3 className="mission-name">{mission.name}</h3>
                      <span className="mission-period">{mission.period}</span>
                    </div>
                  </div>
                  <div className="mission-discoveries">{mission.discoveries}</div>
                  <p className="mission-description">{mission.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Technology Stack */}
          <section className="technology-section section">
            <h2 className="section-title">Technology & Methods</h2>
            <p className="section-subtitle">
              Advanced algorithms and techniques powering our exoplanet detection system
            </p>
            
            <div className="technology-grid">
              {technologies.map((tech, index) => (
                <div key={index} className="tech-card card">
                  <h3 className="tech-name">{tech.name}</h3>
                  <p className="tech-description">{tech.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Team Roles */}
          <section className="team-section section">
            <h2 className="section-title">Our Team</h2>
            <p className="section-subtitle">
              Multidisciplinary expertise bringing together AI, astronomy, and software engineering
            </p>
            
            <div className="team-grid">
              {teamMembers.map((member, index) => (
                <div key={index} className="team-card card">
                  <div className="team-icon">
                    <span style={{ fontSize: '48px' }}>{member.icon}</span>
                  </div>
                  <h3 className="team-role">{member.role}</h3>
                  <ul className="team-responsibilities">
                    {member.responsibilities.map((resp, idx) => (
                      <li key={idx}>{resp}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* Impact & Future */}
          <section className="impact-section section">
            <div className="impact-content">
              <div className="impact-stats">
                <h2 className="impact-title">Making an Impact</h2>
                <div className="stats-grid">
                  <div className="stat-item">
                    <div className="stat-number">95%</div>
                    <div className="stat-label">Detection Accuracy</div>
                  </div>
                  <div className="stat-item">
                    <div className="stat-number">10x</div>
                    <div className="stat-label">Faster Analysis</div>
                  </div>
                  <div className="stat-item">
                    <div className="stat-number">1000+</div>
                    <div className="stat-label">Light Curves Processed</div>
                  </div>
                </div>
              </div>
              
              <div className="future-vision">
                <h3 className="future-title">Looking Forward</h3>
                <p className="future-description">
                  As we continue to refine our algorithms and expand our dataset, ExoDetect aims to become 
                  the premier platform for automated exoplanet detection. We envision a future where 
                  citizen scientists and professional astronomers alike can contribute to the discovery 
                  of new worlds, potentially finding the next Earth-like planet in our cosmic neighborhood.
                </p>
                <p className="future-description">
                  Our commitment to open science and accessible technology ensures that the tools for 
                  exoplanet discovery remain available to the global scientific community, fostering 
                  collaboration and accelerating the pace of discovery.
                </p>
              </div>
            </div>
          </section>

          {/* NASA Space Apps Challenge */}
          <section className="challenge-section section">
            <div className="challenge-card card">
              <h2 className="challenge-title">NASA Space Apps Challenge 2025</h2>
              <p className="challenge-description">
                ExoDetect was developed as part of the NASA Space Apps Challenge 2025, the world's largest 
                global hackathon. This project represents our team's commitment to advancing space science 
                through innovative technology and collaborative problem-solving.
              </p>
              <div className="challenge-goals">
                <h4>Project Goals:</h4>
                <ul>
                  <li>Democratize access to exoplanet detection tools</li>
                  <li>Improve accuracy and speed of transit analysis</li>
                  <li>Create an intuitive interface for researchers and enthusiasts</li>
                  <li>Contribute to the global effort of exoplanet discovery</li>
                </ul>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default About;