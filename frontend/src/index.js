import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
// Assuming you have an existing form with file input
document.getElementById('uploadForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const fileInput = document.getElementById('imageInput');
    const file = fileInput.files[0];
    
    if (!file) {
        alert('Please select an image');
        return;
    }
    
    // Show loading state (optional)
    const submitButton = document.getElementById('submitButton');
    const originalText = submitButton.textContent;
    submitButton.textContent = 'Processing...';
    submitButton.disabled = true;
    
    try {
        // Create FormData for file upload
        const formData = new FormData();
        formData.append('image', file);
        
        // Send to your Flask API
        const response = await fetch('http://localhost:5000/predict', {
            method: 'POST',
            body: formData
        });
        
        const result = await response.json();
        
        if (result.success) {
            // Display results in your existing UI
            displayResults(result.prediction, result.confidence);
        } else {
            alert('Error: ' + result.error);
        }
        
    } catch (error) {
        console.error('Error:', error);
        alert('Failed to process image');
    } finally {
        // Reset button state
        submitButton.textContent = originalText;
        submitButton.disabled = false;
    }
});

function displayResults(prediction, confidence) {
    // Update your existing results display area
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = `
        <h3>Prediction Results:</h3>
        <p><strong>Classification:</strong> ${prediction}</p>
        <p><strong>Confidence:</strong> ${(confidence * 100).toFixed(2)}%</p>
    `;
}
async function handleImageUpload(file) {
    const loadingElement = document.getElementById('loading');
    const errorElement = document.getElementById('error');
    const resultsElement = document.getElementById('results');
    
    // Show loading, hide others
    loadingElement.style.display = 'block';
    errorElement.style.display = 'none';
    resultsElement.style.display = 'none';
    
    try {
        const formData = new FormData();
        formData.append('image', file);
        
        const response = await fetch('/predict', {
            method: 'POST',
            body: formData
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        // Hide loading, show results
        loadingElement.style.display = 'none';
        resultsElement.style.display = 'block';
        
        // Update results without changing UI structure
        updateResultsDisplay(data);
        
    } catch (error) {
        loadingElement.style.display = 'none';
        errorElement.style.display = 'block';
        errorElement.textContent = 'Error processing image: ' + error.message;
    }
}
