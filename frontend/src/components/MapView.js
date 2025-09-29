import React, { useState } from 'react';

const MapView = () => {
  const [selectedLayer, setSelectedLayer] = useState('biodiversity');

  const layers = [
    { id: 'biodiversity', name: 'Biodiversity Index', color: '#16a34a' },
    { id: 'threats', name: 'Threat Levels', color: '#dc2626' },
    { id: 'species', name: 'Species Populations', color: '#2563eb' },
    { id: 'habitat', name: 'Habitat Quality', color: '#059669' }
  ];

  // Inline styles
  const styles = {
    mapView: { fontFamily: 'Arial, sans-serif', padding: '20px' },
    sectionHeader: { marginBottom: '20px' },
    sectionTitle: { marginBottom: '5px', fontSize: '28px' },
    sectionSubtitle: { color: '#555' },
    mapContainerFull: { display: 'flex', gap: '30px', flexWrap: 'wrap' },
    mapControls: { minWidth: '200px' },
    layerSelector: { display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '10px' },
    layerBtn: {
      display: 'flex',
      alignItems: 'center',
      padding: '8px 12px',
      borderRadius: '6px',
      backgroundColor: 'white',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      border: '2px solid',
    },
    layerBtnActive: { fontWeight: 'bold', boxShadow: '0 0 5px rgba(0,0,0,0.2)' },
    layerColor: { display: 'inline-block', width: '16px', height: '16px', borderRadius: '50%', marginRight: '8px' },
    mapDisplay: { flex: 1, minWidth: '300px' },
    mapPlaceholder: {
      border: '2px dashed #aaa',
      borderRadius: '8px',
      height: '250px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#666',
      textAlign: 'center',
    },
    mapLegend: { minWidth: '150px' },
    legendItems: { display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '10px' },
    legendItem: { display: 'flex', alignItems: 'center', gap: '6px' },
    legendColor: (bgColor) => ({ width: '18px', height: '18px', borderRadius: '4px', backgroundColor: bgColor }),
  };

  return (
    <div style={styles.mapView}>
      <div style={styles.sectionHeader}>
        <h1 style={styles.sectionTitle}>Interactive Map View</h1>
        <p style={styles.sectionSubtitle}>Real-time biodiversity monitoring across regions</p>
      </div>

      <div style={styles.mapContainerFull}>
        {/* Layer Selector */}
        <div style={styles.mapControls}>
          <div style={styles.layerSelector}>
            <h3>Map Layers</h3>
            {layers.map(layer => (
              <button
                key={layer.id}
                onClick={() => setSelectedLayer(layer.id)}
                style={{
                  ...styles.layerBtn,
                  borderColor: layer.color,
                  ...(selectedLayer === layer.id ? styles.layerBtnActive : {}),
                }}
              >
                <span style={{ ...styles.layerColor, backgroundColor: layer.color }}></span>
                {layer.name}
              </button>
            ))}
          </div>
        </div>

        {/* Map Display */}
        <div style={styles.mapDisplay}>
          <div style={styles.mapPlaceholder}>
            <p>Interactive map will be rendered here</p>
            <p>
              Current layer: <strong>{layers.find(l => l.id === selectedLayer)?.name}</strong>
            </p>
          </div>
        </div>

        {/* Map Legend */}
        <div style={styles.mapLegend}>
          <h4>Legend</h4>
          <div style={styles.legendItems}>
            <div style={styles.legendItem}>
              <span style={styles.legendColor('#16a34a')}></span>
              <span>Healthy (75-100)</span>
            </div>
            <div style={styles.legendItem}>
              <span style={styles.legendColor('#f59e0b')}></span>
              <span>At Risk (60-74)</span>
            </div>
            <div style={styles.legendItem}>
              <span style={styles.legendColor('#dc2626')}></span>
              <span>Critical (&lt;60)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapView;
