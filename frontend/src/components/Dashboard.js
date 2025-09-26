import React, { useState, useEffect } from 'react';
import SpeciesCard from './SpeciesCard';
import ThreatAlert from './ThreatAlert';
import MetricCard from './MetricCard';

const Dashboard = () => {
  const [speciesData, setSpeciesData] = useState([]);
  const [threats, setThreats] = useState([]);
  const [metrics, setMetrics] = useState({});

  useEffect(() => {
    // Mock data - in real app, fetch from API
    setSpeciesData([
      {
        id: 1,
        name: 'Bengal Tiger',
        scientificName: 'Panthera tigris tigris',
        population: 2574,
        status: 'ENDANGERED',
        conservationScore: 75,
        change: '+8.5%',
        image: '/images/tiger.jpg'
      },
      {
        id: 2,
        name: 'Mountain Gorilla',
        scientificName: 'Gorilla beringei beringei',
        population: 1063,
        status: 'CRITICALLY ENDANGERED',
        conservationScore: 68,
        change: '+12.3%',
        image: '/images/gorilla.jpg'
      }
    ]);

    setThreats([
      {
        id: 1,
        type: 'Deforestation',
        location: 'Amazon Basin, Brazil',
        description: 'Rapid forest clearing detected',
        area: '2,450 hectares',
        timeAgo: '2 hours ago',
        severity: 'HIGH',
        trend: 'increasing'
      },
      {
        id: 2,
        type: 'Water Pollution',
        location: 'Mekong Delta, Vietnam',
        description: 'Chemical runoff from agriculture',
        area: '45 km stretch',
        timeAgo: '6 hours ago',
        severity: 'MEDIUM',
        trend: 'stable'
      }
    ]);

    setMetrics({
      biodiversityIndex: { value: 85, change: '+2.3%' },
      forestCover: { value: 75, change: '-1.8%' },
      waterQuality: { value: 90, change: '+4.1%' },
      airQuality: { value: 85, change: '+1.2%' }
    });
  }, []);

  const chartData = [65, 70, 75, 80, 85, 90, 95, 88];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'];

  return (
    <div className="dashboard">
      <div className="dashboard-grid">
        <div className="main-panel">
          <div className="card">
            <h2>Species Tracking</h2>
            <p className="section-subtitle">Monitoring critical species populations</p>
            <div className="species-list">
              {speciesData.map(species => (
                <SpeciesCard key={species.id} species={species} />
              ))}
            </div>
            <button className="btn btn-secondary" style={{ marginTop: '16px' }}>
              View All Species
            </button>
          </div>

          <div className="card">
            <h2>Health Indicators</h2>
            <p className="section-subtitle">Ecosystem health metrics over time</p>
            <div className="chart-container">
              {chartData.map((value, index) => (
                <div 
                  key={index}
                  className="chart-bar"
                  style={{ height: `${value}%` }}
                  title={`${months[index]}: ${value}%`}
                ></div>
              ))}
            </div>
            <div className="chart-labels">
              {months.map(month => (
                <span key={month} className="chart-label">{month}</span>
              ))}
            </div>
            <button className="btn btn-secondary" style={{ marginTop: '16px' }}>
              View Detailed Report
            </button>
          </div>
        </div>

        <div className="side-panel">
          <div className="card">
            <h2>Map Monitoring</h2>
            <div className="map-placeholder">
              <div className="map-legend">
                <div className="legend-item">
                  <span className="legend-color" style={{ backgroundColor: '#16a34a' }}></span>
                  <span>Healthy (75-100)</span>
                </div>
                <div className="legend-item">
                  <span className="legend-color" style={{ backgroundColor: '#f59e0b' }}></span>
                  <span>At Risk (60-74)</span>
                </div>
                <div className="legend-item">
                  <span className="legend-color" style={{ backgroundColor: '#dc2626' }}></span>
                  <span>Critical (&lt;60)</span>
                </div>
              </div>
              <div className="map-controls">
                <button className="map-btn">Layers</button>
              </div>
            </div>
          </div>

          <div className="card">
            <h2>Threat Alerts</h2>
            <div className="alert-summary">
              <span className="alert-count high">2 High</span>
              <span className="alert-count medium">2 Medium</span>
            </div>
            <p className="section-subtitle">Active environmental threats</p>
            <div className="threats-list">
              {threats.map(threat => (
                <ThreatAlert key={threat.id} threat={threat} />
              ))}
            </div>
            <button className="btn btn-secondary" style={{ marginTop: '16px' }}>
              View All Alerts
            </button>
            <button className="btn btn-primary" style={{ marginTop: '8px', width: '100%' }}>
              Emergency Protocol
            </button>
          </div>
        </div>
      </div>

      <div className="metrics-grid">
        <MetricCard 
          title="Biodiversity Index"
          value={metrics.biodiversityIndex?.value}
          change={metrics.biodiversityIndex?.change}
          unit="%"
        />
        <MetricCard 
          title="Forest Cover"
          value={metrics.forestCover?.value}
          change={metrics.forestCover?.change}
          unit="%"
        />
        <MetricCard 
          title="Water Quality"
          value={metrics.waterQuality?.value}
          change={metrics.waterQuality?.change}
          unit="%"
        />
        <MetricCard 
          title="Air Quality"
          value={metrics.airQuality?.value}
          change={metrics.airQuality?.change}
          unit="%"
        />
      </div>
    </div>
  );
};

export default Dashboard;
