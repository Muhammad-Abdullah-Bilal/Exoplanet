import React, { useState } from 'react';
import './Results.css';

const Results = () => {
  const [selectedResult, setSelectedResult] = useState(0);

  // Mock analysis results
  const analysisResults = [
    {
      id: 1,
      filename: 'kepler_lightcurve_001.csv',
      status: 'exoplanet_detected',
      confidence: 94.7,
      planetType: 'Hot Jupiter',
      transitDepth: 0.012,
      orbitalPeriod: 3.52,
      planetRadius: '1.2 Jupiter radii',
      hostStarTemp: 5800,
      processingTime: '2.3s',
      detectionMethod: 'Transit Photometry',
      snr: 12.4
    },
    {
      id: 2,
      filename: 'tess_sector_14_tic.csv',
      status: 'candidate',
      confidence: 78.3,
      planetType: 'Super Earth',
      transitDepth: 0.003,
      orbitalPeriod: 12.8,
      planetRadius: '1.6 Earth radii',
      hostStarTemp: 4200,
      processingTime: '1.8s',
      detectionMethod: 'Transit Photometry',
      snr: 8.7
    },
    {
      id: 3,
      filename: 'k2_campaign_5_epic.csv',
      status: 'no_detection',
      confidence: 23.1,
      planetType: null,
      transitDepth: null,
      orbitalPeriod: null,
      planetRadius: null,
      hostStarTemp: 6100,
      processingTime: '1.5s',
      detectionMethod: 'Transit Photometry',
      snr: 3.2
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'exoplanet_detected': return '#4caf50';
      case 'candidate': return '#ff9800';
      case 'no_detection': return '#f44336';
      default: return '#90a4ae';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'exoplanet_detected': return '✓';
      case 'candidate': return '⚠';
      case 'no_detection': return '⚠';
      default: return '⚠';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'exoplanet_detected': return 'Exoplanet Detected';
      case 'candidate': return 'Candidate Detection';
      case 'no_detection': return 'No Detection';
      default: return 'Unknown';
    }
  };

  const currentResult = analysisResults[selectedResult];

  return (
    <div className="results-page page-container">
      <div className="container">
        <div>
          <h1 className="section-title">Analysis Results</h1>
          <p className="section-subtitle">
            Review the AI model's analysis of your uploaded transit photometry data. 
            Each result includes confidence scores, planetary parameters, and detailed explanations.
          </p>

          {/* Results Overview */}
          <div className="results-overview">
            <div className="results-tabs">
              {analysisResults.map((result, index) => (
                <button
                  key={result.id}
                  className={`result-tab ${selectedResult === index ? 'active' : ''}`}
                  onClick={() => setSelectedResult(index)}
                >
                  <div className="tab-info">
                    <span className="tab-filename">{result.filename}</span>
                    <div className="tab-status" style={{ color: getStatusColor(result.status) }}>
                      <span>{getStatusIcon(result.status)}</span>
                      <span>{getStatusText(result.status)}</span>
                    </div>
                  </div>
                  <div className="tab-confidence">
                    {result.confidence.toFixed(1)}%
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Main Result Display */}
          <div className="result-content">
            {/* Status Card */}
            <div className="status-card card">
              <div className="status-header">
                <div className="status-icon" style={{ color: getStatusColor(currentResult.status) }}>
                  <span style={{ fontSize: '32px' }}>{getStatusIcon(currentResult.status)}</span>
                </div>
                <div className="status-info">
                  <h2 className="status-title">{getStatusText(currentResult.status)}</h2>
                  <p className="status-filename">{currentResult.filename}</p>
                </div>
                <div className="confidence-score">
                  <div className="confidence-number">{currentResult.confidence.toFixed(1)}%</div>
                  <div className="confidence-label">Confidence</div>
                </div>
              </div>

              {currentResult.status !== 'no_detection' && (
                <div className="planet-parameters">
                  <div className="parameter">
                    <span className="param-label">Planet Type</span>
                    <span className="param-value">{currentResult.planetType}</span>
                  </div>
                  <div className="parameter">
                    <span className="param-label">Transit Depth</span>
                    <span className="param-value">{(currentResult.transitDepth * 100).toFixed(3)}%</span>
                  </div>
                  <div className="parameter">
                    <span className="param-label">Orbital Period</span>
                    <span className="param-value">{currentResult.orbitalPeriod} days</span>
                  </div>
                  <div className="parameter">
                    <span className="param-label">Planet Radius</span>
                    <span className="param-value">{currentResult.planetRadius}</span>
                  </div>
                </div>
              )}

              <div className="analysis-metadata">
                <div className="metadata-item">
                  <span className="metadata-icon">⏱️</span>
                  <span>Processing Time: {currentResult.processingTime}</span>
                </div>
                <div className="metadata-item">
                  <span className="metadata-icon">📈</span>
                  <span>SNR: {currentResult.snr}</span>
                </div>
              </div>
            </div>

            {/* Charts Section */}
            <div className="charts-section">
              {/* Light Curve Chart Placeholder */}
              <div className="chart-card card">
                <h3 className="chart-title">Transit Light Curve</h3>
                <div className="chart-placeholder">
                  <div className="chart-visual">
                    <div className="light-curve">
                      <div className="curve-line"></div>
                      <div className="transit-dip"></div>
                    </div>
                    <p>Interactive light curve visualization</p>
                    <p>Time (hours) vs Normalized Flux</p>
                  </div>
                </div>
              </div>

              {/* Confidence Chart Placeholder */}
              <div className="chart-card card">
                <h3 className="chart-title">Classification Confidence</h3>
                <div className="chart-placeholder">
                  <div className="confidence-bars">
                    <div className="confidence-bar-item">
                      <span>Exoplanet</span>
                      <div className="bar">
                        <div 
                          className="bar-fill" 
                          style={{ width: `${currentResult.confidence}%` }}
                        ></div>
                      </div>
                      <span>{currentResult.confidence.toFixed(1)}%</span>
                    </div>
                    <div className="confidence-bar-item">
                      <span>False Positive</span>
                      <div className="bar">
                        <div 
                          className="bar-fill secondary" 
                          style={{ width: `${100 - currentResult.confidence}%` }}
                        ></div>
                      </div>
                      <span>{(100 - currentResult.confidence).toFixed(1)}%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Explanation Section */}
            <div className="explanation-card card">
              <h3 className="explanation-title">AI Model Explanation</h3>
              <div className="explanation-content">
                {currentResult.status === 'exoplanet_detected' && (
                  <p>
                    The AI model has detected a strong transit signal with {currentResult.confidence.toFixed(1)}% confidence. 
                    The periodic dimming pattern indicates a {currentResult.planetType.toLowerCase()} with an orbital period of {currentResult.orbitalPeriod} days. 
                    The transit depth of {(currentResult.transitDepth * 100).toFixed(3)}% suggests a planet radius of approximately {currentResult.planetRadius}.
                    The high signal-to-noise ratio ({currentResult.snr}) and consistent transit shape support this classification.
                  </p>
                )}
                {currentResult.status === 'candidate' && (
                  <p>
                    The AI model has identified a potential exoplanet candidate with {currentResult.confidence.toFixed(1)}% confidence. 
                    While the transit signal shows promising characteristics of a {currentResult.planetType.toLowerCase()}, 
                    additional observations or analysis may be needed to confirm the detection. 
                    The moderate signal-to-noise ratio ({currentResult.snr}) suggests caution in interpretation.
                  </p>
                )}
                {currentResult.status === 'no_detection' && (
                  <p>
                    The AI model found no significant evidence of planetary transits in this light curve data. 
                    With only {currentResult.confidence.toFixed(1)}% confidence for any planetary signal, 
                    the variations in brightness are likely due to stellar activity, instrumental noise, or other astrophysical phenomena. 
                    The low signal-to-noise ratio ({currentResult.snr}) indicates no clear periodic dimming pattern characteristic of exoplanet transits.
                  </p>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="result-actions">
              <button className="btn btn-primary">
                📥 Export Report
              </button>
              <button className="btn btn-secondary">
                📤 Share Results
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Results;