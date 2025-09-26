import React, { useState } from 'react';
import MetricCard from './MetricCard';

const HealthIndicators = () => {
  const [timeRange, setTimeRange] = useState('6months');
  
  const healthMetrics = [
    { title: 'Biodiversity Index', value: 85, change: '+2.3%', trend: 'up' },
    { title: 'Forest Cover', value: 75, change: '-1.8%', trend: 'down' },
    { title: 'Water Quality', value: 90, change: '+4.1%', trend: 'up' },
    { title: 'Air Quality', value: 85, change: '+1.2%', trend: 'up' },
    { title: 'Species Diversity', value: 78, change: '+3.5%', trend: 'up' },
    { title: 'Habitat Connectivity', value: 82, change: '+0.8%', trend: 'up' }
  ];

  return (
    <div className="health-indicators">
      <div className="section-header">
        <h1>Health Indicators</h1>
        <p>Comprehensive ecosystem health monitoring</p>
      </div>

      <div className="metrics-overview">
        <div className="metrics-grid">
          {healthMetrics.map((metric, index) => (
            <MetricCard 
              key={index}
              title={metric.title}
              value={metric.value}
              change={metric.change}
              unit="%"
            />
          ))}
        </div>
      </div>

      <div className="card">
        <div className="chart-header">
          <h2>Ecosystem Health Trends</h2>
          <select 
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="time-range-selector"
          >
            <option value="3months">Last 3 Months</option>
            <option value="6months">Last 6 Months</option>
            <option value="1year">Last Year</option>
            <option value="2years">Last 2 Years</option>
          </select>
        </div>
        
        <div className="health-chart">
          <div className="chart-placeholder">
            <p>Health indicators trend chart for {timeRange}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HealthIndicators;
