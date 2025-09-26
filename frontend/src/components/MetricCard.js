import React from 'react';

const MetricCard = ({ title, value, change, unit = '' }) => {
  const isPositive = change && change.startsWith('+');
  
  return (
    <div className="metric-card">
      <div className="metric-title">{title}</div>
      <div className="metric-value">{value}{unit}</div>
      {change && (
        <div className={`metric-change ${isPositive ? 'positive' : 'negative'}`}>
          {change}
        </div>
      )}
    </div>
  );
};

export default MetricCard;
