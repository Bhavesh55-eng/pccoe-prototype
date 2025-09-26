import React from 'react';

const SpeciesCard = ({ species }) => {
  const getStatusClass = (status) => {
    return status === 'CRITICALLY ENDANGERED' ? 'critically-endangered' : 'endangered';
  };

  const getScoreClass = (score) => {
    if (score >= 75) return 'score-good';
    if (score >= 60) return 'score-warning';
    return 'score-critical';
  };

  return (
    <div className="species-card">
      <img 
        src={species.image || '/images/placeholder-animal.jpg'} 
        alt={species.name}
        className="species-image"
      />
      <div className="species-info">
        <h3>{species.name}</h3>
        <div className="scientific-name">{species.scientificName}</div>
        <div className="species-stats">
          <div className="stat">
            <span className="stat-label">Population:</span>
            <span className="stat-value">{species.population.toLocaleString()}</span>
          </div>
          <div className="stat">
            <span className="stat-label">Status:</span>
            <span className={`stat-value ${getStatusClass(species.status)}`}>
              {species.status}
            </span>
          </div>
          <div className="stat">
            <span className="stat-label">Change:</span>
            <span className={`stat-value ${species.change.startsWith('+') ? 'positive' : 'negative'}`}>
              {species.change}
            </span>
          </div>
        </div>
        <div className="conservation-score">
          <span className="stat-label">Conservation Score</span>
          <div className="score-bar">
            <div 
              className={`score-fill ${getScoreClass(species.conservationScore)}`}
              style={{ width: `${species.conservationScore}%` }}
            ></div>
          </div>
          <span className="stat-value">{species.conservationScore}%</span>
        </div>
      </div>
    </div>
  );
};

export default SpeciesCard;
