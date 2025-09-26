import tensorflow as tf
from tensorflow import keras
import numpy as np
from PIL import Image
import json
import sys
import os

def predict_species(image_path):
    try:
        # Load model
        model = keras.models.load_model("species_classifier_model.h5")
        
        # Class names from your dataset
        class_names = ['Cat', 'Hen', 'Hippopotamus', 'Horse', 'Turtle', 'elephant', 'sheep', 'squirrel']
        
        # Load and preprocess image
        img = Image.open(image_path).resize((180, 180))
        img = img.convert('RGB')  # Ensure RGB format
        img_array = np.array(img) / 255.0
        img_array = np.expand_dims(img_array, axis=0)
        
        # Make prediction
        predictions = model.predict(img_array)
        class_index = np.argmax(predictions)
        confidence = float(predictions[0][class_index]) * 100
        
        # Get species info
        species_info = get_species_info(class_names[class_index])
        
        result = {
            "species": class_names[class_index],
            "confidence": round(confidence, 2),
            "class_index": int(class_index),
            "all_probabilities": [float(p) for p in predictions[0]],
            "species_info": species_info
        }
        
        return result
        
    except Exception as e:
        return {"error": str(e)}

def get_species_info(species_name):
    # Mock species information - replace with real database
    species_database = {
        "elephant": {
            "scientific_name": "Loxodonta africana",
            "conservation_status": "ENDANGERED",
            "habitat": "African savannas, forests, deserts",
            "population": "~415,000",
            "threats": ["Poaching", "Habitat loss", "Human-wildlife conflict"]
        },
        "Cat": {
            "scientific_name": "Felis catus",
            "conservation_status": "DOMESTICATED",
            "habitat": "Worldwide (domestic)",
            "population": "~600 million",
            "threats": ["None - domestic species"]
        },
        "Horse": {
            "scientific_name": "Equus caballus",
            "conservation_status": "DOMESTICATED",
            "habitat": "Worldwide (domestic)",
            "population": "~75 million",
            "threats": ["None - domestic species"]
        },
        "Turtle": {
            "scientific_name": "Testudines",
            "conservation_status": "VARIES BY SPECIES",
            "habitat": "Oceans, rivers, land",
            "population": "Variable by species",
            "threats": ["Climate change", "Plastic pollution", "Habitat loss"]
        }
    }
    
    return species_database.get(species_name, {
        "scientific_name": "Unknown",
        "conservation_status": "UNKNOWN",
        "habitat": "Unknown",
        "population": "Unknown",
        "threats": ["Unknown"]
    })

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print(json.dumps({"error": "Please provide image path"}))
        sys.exit(1)
    
    image_path = sys.argv[1]
    
    if not os.path.exists(image_path):
        print(json.dumps({"error": "Image file not found"}))
        sys.exit(1)
    
    result = predict_species(image_path)
    print(json.dumps(result))
