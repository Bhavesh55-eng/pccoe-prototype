import React from 'react';

const ThreatAlert = ({ threat }) => {
  const getSeverityClass = (severity) => {
    return severity === 'HIGH' ? 'severity-high' : 'severity-medium';
  };

  const getThreatClass = (severity) => {
    return severity === 'HIGH' ? 'threat-high' : 'threat-medium';
  };

  return (
    <div className={`threat-alert ${getThreatClass(threat.severity)}`}>
      <div className="threat-info">
        <h4>{threat.type}</h4>
        <div className="threat-location">{threat.location}</div>
        <div className="threat-description">{threat.description}</div>
        <div className="threat-details">
          Area: {threat.area}
        </div>
      </div>
      <div className="threat-meta">
        <div className={`threat-severity ${getSeverityClass(threat.severity)}`}>
          {threat.severity}
        </div>
        <div className="threat-time">{threat.timeAgo}</div>
        <div className="threat-trend">{threat.trend}</div>
      </div>
    </div>
  );
};

export default ThreatAlert;
