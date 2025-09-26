import React, { useState, useEffect } from 'react';

const MapView = () => {
  const [selectedLayer, setSelectedLayer] = useState('biodiversity');
  const [mapData, setMapData] = useState([]);

  const layers = [
    { id: 'biodiversity', name: 'Biodiversity Index', color: '#16a34a' },
    { id: 'threats', name: 'Threat Levels', color: '#dc2626' },
    { id: 'species', name: 'Species Populations', color: '#2563eb' },
    { id: 'habitat', name: 'Habitat Quality', color: '#059669' }
  ];

  return (
    <div className="map-view">
      <div className="section-header">
        <h1>Interactive Map View</h1>
        <p>Real-time biodiversity monitoring across regions</p>
      </div>

      <div className="map-container-full">
        <div className="map-controls">
          <div className="layer-selector">
            <h3>Map Layers</h3>
            {layers.map(layer => (
              <button
                key={layer.id}
                className={`layer-btn ${selectedLayer === layer.id ? 'active' : ''}`}
                onClick={() => setSelectedLayer(layer.id)}
                style={{ borderColor: layer.color }}
              >
                <span className="layer-color" style={{ backgroundColor: layer.color }}></span>
                {layer.name}
              </button>
            ))}
          </div>
        </div>

        <div className="map-display">
          <div className="map-placeholder">
            <p>Interactive map will be rendered here</p>
            <p>Current layer: <strong>{layers.find(l => l.id === selectedLayer)?.name}</strong></p>
          </div>
        </div>

        <div className="map-legend">
          <h4>Legend</h4>
          <div className="legend-items">
            <div className="legend-item">
              <span className="legend-color healthy"></span>
              <span>Healthy (75-100)</span>
            </div>
            <div className="legend-item">
              <span className="legend-color at-risk"></span>
              <span>At Risk (60-74)</span>
            </div>
            <div className="legend-item">
              <span className="legend-color critical"></span>
              <span>Critical (&lt;60)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapView;
