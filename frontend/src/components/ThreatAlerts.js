import React, { useState, useEffect } from 'react';
import ThreatAlert from './ThreatAlert';

const ThreatAlerts = () => {
  const [threats, setThreats] = useState([]);
  const [filterSeverity, setFilterSeverity] = useState('all');

  useEffect(() => {
    fetchThreats();
  }, []);

  const fetchThreats = async () => {
    // Mock data - replace with API call
    const mockThreats = [
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
      },
      {
        id: 3,
        type: 'Illegal Hunting',
        location: 'Serengeti National Park, Tanzania',
        description: 'Poaching activity detected',
        area: 'Protected zone',
        timeAgo: '1 day ago',
        severity: 'HIGH',
        trend: 'increasing'
      }
    ];
    setThreats(mockThreats);
  };

  const filteredThreats = threats.filter(threat => 
    filterSeverity === 'all' || threat.severity === filterSeverity
  );

  return (
    <div className="threat-alerts-page">
      <div className="section-header">
        <h1>Threat Alerts</h1>
        <p>Monitor and respond to environmental threats</p>
      </div>

      <div className="alerts-controls">
        <div className="filter-controls">
          <select 
            value={filterSeverity}
            onChange={(e) => setFilterSeverity(e.target.value)}
          >
            <option value="all">All Threats</option>
            <option value="HIGH">High Severity</option>
            <option value="MEDIUM">Medium Severity</option>
            <option value="LOW">Low Severity</option>
          </select>
        </div>
        
        <div className="alert-summary">
          <div className="summary-item">
            <span className="count">{threats.filter(t => t.severity === 'HIGH').length}</span>
            <span className="label high">High Priority</span>
          </div>
          <div className="summary-item">
            <span className="count">{threats.filter(t => t.severity === 'MEDIUM').length}</span>
            <span className="label medium">Medium Priority</span>
          </div>
        </div>
      </div>

      <div className="threats-container">
        {filteredThreats.map(threat => (
          <ThreatAlert key={threat.id} threat={threat} />
        ))}
      </div>

      <div className="emergency-actions">
        <button className="btn btn-primary emergency-btn">
          🚨 Activate Emergency Protocol
        </button>
      </div>
    </div>
  );
};

export default ThreatAlerts;

