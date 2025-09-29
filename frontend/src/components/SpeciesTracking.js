import React, { useState, useEffect } from 'react';
import SpeciesCard from './SpeciesCard';

const SpeciesTracking = () => {
  const [species, setSpecies] = useState([]);
  const [selectedSpecies, setSelectedSpecies] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [predictionResult, setPredictionResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [apiStatus, setApiStatus] = useState('unknown');

  useEffect(() => {
    fetchSpeciesData();
    checkApiHealth();
  }, []);

  const checkApiHealth = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/health');
      const data = await response.json();
      setApiStatus(data.status === 'healthy' ? 'online' : 'offline');
    } catch (error) {
      setApiStatus('offline');
      console.warn('Backend API is not available:', error);
    }
  };

  const fetchSpeciesData = async () => {
    const mockSpecies = [
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
      },
      {
        id: 3,
        name: 'African Elephant',
        scientificName: 'Loxodonta africana',
        population: 415000,
        status: 'ENDANGERED',
        conservationScore: 72,
        change: '-2.1%',
        image: '/images/elephant.jpg'
      }
    ];
    setSpecies(mockSpecies);
  };

  return (
    <div>
      <h1>Species Tracking</h1>
      <p>API Status: {apiStatus}</p>
      <div className="species-list">
        {species.map((sp) => (
          <SpeciesCard key={sp.id} species={sp} />
        ))}
      </div>
    </div>
  );
};

// ✅ Export the component so it can be imported elsewhere
export default SpeciesTracking;
