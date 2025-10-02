import React, { useState, useCallback } from 'react';
import './Upload.css';

const Upload = () => {
  const [dragActive, setDragActive] = useState(false);
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [analysisStatus, setAnalysisStatus] = useState('idle'); // idle, processing, complete

  const handleDrag = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  }, []);

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files);
    }
  };

  const handleFiles = (fileList) => {
    const newFiles = Array.from(fileList).map(file => ({
      file,
      id: Math.random().toString(36).substr(2, 9),
      name: file.name,
      size: file.size,
      type: file.type,
      status: 'ready'
    }));
    setFiles(prev => [...prev, ...newFiles]);
  };

  const removeFile = (id) => {
    setFiles(prev => prev.filter(file => file.id !== id));
  };

  const startAnalysis = async () => {
    if (files.length === 0) return;
    
    setUploading(true);
    setUploadProgress(0);
    setAnalysisStatus('processing');

    // Simulate upload progress
    const progressInterval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setUploading(false);
          setTimeout(() => {
            setAnalysisStatus('complete');
          }, 1000);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 200);

    // Update file statuses
    setFiles(prev => prev.map(file => ({ ...file, status: 'processing' })));
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="upload-page page-container">
      <div className="container">
        <div>
          <h1 className="section-title">Upload Transit Data</h1>
          <p className="section-subtitle">
            Upload your photometric time series data from Kepler, K2, or TESS missions. 
            Our AI will analyze the light curves to detect potential exoplanet transits.
          </p>

          {/* Upload Area */}
          <div className="upload-section">
            <div
              className={`upload-dropzone ${dragActive ? 'drag-active' : ''}`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <input
                type="file"
                id="file-upload"
                multiple
                accept=".csv,.fits,.txt"
                onChange={handleChange}
                className="file-input"
              />
              <label htmlFor="file-upload" className="upload-label">
                <div className="upload-icon">📤</div>
                <h3>Drop files here or click to browse</h3>
                <p>Supports CSV, FITS, and TXT files up to 100MB</p>
              </label>
            </div>

            {/* File List */}
            {files.length > 0 && (
              <div className="file-list">
                <h3 className="file-list-title">Uploaded Files</h3>
                {files.map((file) => (
                  <div key={file.id} className="file-item">
                    <div className="file-info">
                      <span className="file-icon">📄</span>
                      <div className="file-details">
                        <span className="file-name">{file.name}</span>
                        <span className="file-size">{formatFileSize(file.size)}</span>
                      </div>
                    </div>
                    <div className="file-status">
                      {file.status === 'ready' && (
                        <span className="status-icon ready">✓</span>
                      )}
                      {file.status === 'processing' && (
                        <div className="loading-spinner small"></div>
                      )}
                      {file.status === 'complete' && (
                        <span className="status-icon complete">✓</span>
                      )}
                    </div>
                    {!uploading && (
                      <button
                        onClick={() => removeFile(file.id)}
                        className="remove-file"
                      >
                        ×
                      </button>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Analysis Controls */}
            {files.length > 0 && (
              <div className="analysis-controls">
                <button
                  onClick={startAnalysis}
                  disabled={uploading || analysisStatus === 'processing'}
                  className="btn btn-primary btn-large"
                >
                  {uploading ? (
                    <>
                      <div className="loading-spinner small"></div>
                      Analyzing...
                    </>
                  ) : (
                    <>
                      📊 Start AI Analysis
                    </>
                  )}
                </button>
              </div>
            )}

            {/* Progress Bar */}
            {uploading && (
              <div className="progress-section">
                <div className="progress-info">
                  <span>Processing files...</span>
                  <span>{Math.round(uploadProgress)}%</span>
                </div>
                <div className="progress-bar">
                  <div
                    className="progress-fill"
                    style={{ width: `${uploadProgress}%` }}
                  ></div>
                </div>
              </div>
            )}

            {/* Analysis Status */}
            {analysisStatus === 'complete' && (
              <div className="analysis-complete">
                <span className="complete-icon">✓</span>
                <h3>Analysis Complete!</h3>
                <p>Your data has been processed successfully. View the results to see potential exoplanet detections.</p>
                <button className="btn btn-primary">
                  View Results
                </button>
              </div>
            )}
          </div>

          {/* Info Cards */}
          <div className="info-section">
            <div className="grid grid-3">
              <div className="info-card card">
                <h3>Supported Formats</h3>
                <ul>
                  <li>CSV files with time and flux columns</li>
                  <li>FITS files from NASA missions</li>
                  <li>Plain text files with tabular data</li>
                </ul>
              </div>
              <div className="info-card card">
                <h3>Data Requirements</h3>
                <ul>
                  <li>Minimum 1000 data points</li>
                  <li>Time series photometry data</li>
                  <li>Normalized flux measurements</li>
                </ul>
              </div>
              <div className="info-card card">
                <h3>Analysis Features</h3>
                <ul>
                  <li>Transit detection algorithms</li>
                  <li>Confidence scoring</li>
                  <li>Period and depth estimation</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Upload;