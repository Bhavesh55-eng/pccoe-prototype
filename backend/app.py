# app.py
from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np
from PIL import Image
import io
import base64
import your_model_module  # Your existing ML model

app = Flask(__name__)
CORS(app)  # Enable CORS for frontend requests

# Load your trained model (modify path as needed)
model = your_model_module.load_model('path/to/your/model')

@app.route('/predict', methods=['POST'])
def predict_image():
    try:
        # Handle file upload from frontend
        if 'image' not in request.files:
            return jsonify({'error': 'No image provided'}), 400
        
        file = request.files['image']
        
        # Process the image
        image = Image.open(file.stream)
        
        # Preprocess image for your model
        processed_image = preprocess_image(image)
        
        # Make prediction
        prediction = model.predict(processed_image)
        result = process_prediction(prediction)
        
        return jsonify({
            'success': True,
            'prediction': result,
            'confidence': float(prediction.max())
        })
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

def preprocess_image(image):
    # Add your image preprocessing logic here
    # Resize, normalize, etc. based on your model requirements
    pass

def process_prediction(prediction):
    # Convert model output to readable format
    # Return class names, probabilities, etc.
    pass

if __name__ == '__main__':
    app.run(debug=True, port=5000)
