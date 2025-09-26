import React, { useState, useEffect } from 'react';
import SpeciesCard from './SpeciesCard';

const SpeciesTracking = () => {
  const [species, setSpecies] = useState([]);
  const [selectedSpecies, setSelectedSpecies] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [predictionResult, setPredictionResult] = useState(null);

  useEffect(() => {
    // Fetch species data from API
    fetchSpeciesData();
  }, []);

  const fetchSpeciesData = async () => {
    // Mock data - replace with actual API call
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

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      setUploadedImage(URL.createObjectURL(file));
      
      // Send image to backend for prediction
      const formData = new FormData();
      formData.append('image', file);
      
      try {
        const response = await fetch('/api/predict', {
          method: 'POST',
          body: formData,
        });
        const result = await response.json();
        setPredictionResult(result);
      } catch (error) {
        console.error('Prediction failed:', error);
      }
    }
  };

  return (
    <div className="species-tracking">
      <div className="section-header">
        <h1>Species Tracking</h1>
        <p>Monitor and identify species populations</p>
      </div>

      <div className="tracking-grid">
        <div className="card">
          <h2>Species Identification</h2>
          <div className="upload-area">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              id="image-upload"
              style={{ display: 'none' }}
            />
            <label htmlFor="image-upload" className="upload-button">
              📷 Upload Species Image
            </label>
            
            {uploadedImage && (
              <div className="uploaded-image">
                <img src={uploadedImage} alt="Uploaded species" />
                {predictionResult && (
                  <div className="prediction-result">
                    <h3>Prediction Result:</h3>
                    <p><strong>Species:</strong> {predictionResult.species}</p>
                    <p><strong>Confidence:</strong> {predictionResult.confidence}%</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="card">
          <h2>Live Species Data</h2>
          <div className="species-filter">
            <select onChange={(e) => setSelectedSpecies(e.target.value)}>
              <option value="">All Species</option>
              {species.map(s => (
                <option key={s.id} value={s.id}>{s.name}</option>
              ))}
            </select>
          </div>
          
          <div className="species-list">
            {species.map(speciesItem => (
              <SpeciesCard key={speciesItem.id} species={speciesItem} />
            ))}
          </div>
        </div>
      </div>

      <div className="card">
        <h2>Population Trends</h2>
        <div className="trends-chart">
          {/* Chart component would go here */}
          <div className="chart-placeholder">
            Population trends chart will be displayed here
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpeciesTracking;
