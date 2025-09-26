import React, { useState, useEffect } from 'react';
import './App.css';
import Dashboard from './components/Dashboard';
import MapView from './components/MapView';
import SpeciesTracking from './components/SpeciesTracking';
import HealthIndicators from './components/HealthIndicators';
import ThreatAlerts from './components/ThreatAlert';
import Analytics from './components/Analytics';
import DataManagement from './components/DataManagement';
import Reports from './components/Reports';
import Settings from './components/Settings';
import Sidebar from './components/Sidebar';

function App() {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [systemStatus, setSystemStatus] = useState('operational');

  const renderActiveComponent = () => {
    switch(activeSection) {
      case 'dashboard':
        return <Dashboard />;
      case 'map-view':
        return <MapView />;
      case 'species-tracking':
        return <SpeciesTracking />;
      case 'health-indicators':
        return <HealthIndicators />;
      case 'threat-alerts':
        return <ThreatAlerts />;
      case 'analytics':
        return <Analytics />;
      case 'data-management':
        return <DataManagement />;
      case 'reports':
        return <Reports />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="app">
      <Sidebar 
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        systemStatus={systemStatus}
      />
      <main className="main-content">
        <header className="app-header">
          <h1>BIODIVERSITY ECOSYSTEM MONITORING PLATFORM</h1>
          <p>Real-time environmental monitoring and conservation</p>
        </header>
        {renderActiveComponent()}
      </main>
    </div>
  );
}

export default App;
