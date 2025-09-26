import React from 'react';
import './Sidebar.css';

const Sidebar = ({ activeSection, setActiveSection, systemStatus }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'map-view', label: 'Map View', icon: '🗺️' },
    { id: 'species-tracking', label: 'Species Tracking', icon: '🦁' },
    { id: 'health-indicators', label: 'Health Indicators', icon: '💚' },
    { id: 'threat-alerts', label: 'Threat Alerts', icon: '⚠️' },
    { id: 'analytics', label: 'Analytics', icon: '📈' },
    { id: 'data-management', label: 'Data Management', icon: '💾' },
    { id: 'reports', label: 'Reports', icon: '📋' },
    { id: 'settings', label: 'Settings', icon: '⚙️' }
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h2>BioMonitor</h2>
        <div className="navigation-label">Navigation</div>
      </div>
      
      <nav className="sidebar-nav">
        {menuItems.map((item) => (
          <button
            key={item.id}
            className={`nav-item ${activeSection === item.id ? 'active' : ''}`}
            onClick={() => setActiveSection(item.id)}
          >
            <span className="nav-icon">{item.icon}</span>
            <span className="nav-label">{item.label}</span>
          </button>
        ))}
      </nav>
      
      <div className="system-status">
        <h3>System Status</h3>
        <div className={`status-indicator ${systemStatus === 'operational' ? 'status-operational' : 'status-critical'}`}>
          <span className="status-dot"></span>
          <span>All systems {systemStatus}</span>
        </div>
        <div className="status-details">
          <div className="status-item">
            <span className="status-dot green"></span>
            System Online
          </div>
          <div className="status-item">
            <span className="status-dot green"></span>
            Live Data
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
