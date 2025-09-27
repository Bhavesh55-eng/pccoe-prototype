# backend/enhanced_predict.py
import tensorflow as tf
from tensorflow import keras
import numpy as np
from PIL import Image
import sqlite3
import json
import sys
import requests
from datetime import datetime

class EnhancedSpeciesPredictor:
    def __init__(self, model_path, database_path, metadata_path):
        self.model = keras.models.load_model(model_path)
        self.database_path = database_path
        
        # Load class names
        with open(metadata_path, 'r') as f:
            self.metadata = json.load(f)
        self.class_names = self.metadata['class_names']
    
    def preprocess_image(self, image_path):
        """Preprocess image for prediction"""
        img = Image.open(image_path).convert('RGB').resize((224, 224))
        img_array = np.array(img) / 255.0
        img_array = np.expand_dims(img_array, axis=0)
        return img_array
    
    def predict_species(self, image_path):
        """Predict species from image"""
        try:
            img_array = self.preprocess_image(image_path)
            predictions = self.model.predict(img_array)
            
            # Get top prediction
            class_index = np.argmax(predictions[0])
            confidence = float(np.max(predictions[0]))
            species_name = self.class_names[class_index]
            
            # Get top 3 predictions
            top_3_indices = np.argsort(predictions[0])[-3:][::-1]
            top_3_predictions = [
                {
                    'species': self.class_names[i],
                    'confidence': f"{predictions[0][i]:.2%}"
                }
                for i in top_3_indices
            ]
            
            return {
                'species': species_name,
                'confidence': f"{confidence:.2%}",
                'top_3_predictions': top_3_predictions
            }
        except Exception as e:
            return {'error': str(e)}
    
    def get_species_info(self, species_name):
        """Get comprehensive species information from database"""
        try:
            conn = sqlite3.connect(self.database_path)
            cursor = conn.cursor()
            
            cursor.execute('''
            SELECT * FROM species_info WHERE species_name = ? OR common_name = ?
            ''', (species_name.lower(), species_name))
            
            result = cursor.fetchone()
            conn.close()
            
            if result:
                columns = [
                    'id', 'species_name', 'common_name', 'scientific_name',
                    'conservation_status', 'population_trend', 'habitat',
                    'lifespan_min', 'lifespan_max', 'average_weight_kg',
                    'average_height_cm', 'diet', 'geographic_range',
                    'threats', 'last_seen_location', 'last_seen_date',
                    'iucn_red_list_category', 'population_estimate', 'created_at'
                ]
                
                species_info = dict(zip(columns, result))
                
                # Format the information nicely
                formatted_info = {
                    'basic_info': {
                        'common_name': species_info['common_name'],
                        'scientific_name': species_info['scientific_name'],
                        'conservation_status': species_info['conservation_status'],
                        'iucn_category': species_info['iucn_red_list_category']
                    },
                    'physical_characteristics': {
                        'average_weight': f"{species_info['average_weight_kg']} kg" if species_info['average_weight_kg'] else 'N/A',
                        'average_height': f"{species_info['average_height_cm']} cm" if species_info['average_height_cm'] else 'N/A',
                        'diet': species_info['diet'],
                        'lifespan': f"{species_info['lifespan_min']}-{species_info['lifespan_max']} years"
                    },
                    'ecological_info': {
                        'habitat': species_info['habitat'],
                        'geographic_range': species_info['geographic_range'],
                        'population_trend': species_info['population_trend'],
                        'estimated_population': species_info['population_estimate']
                    },
                    'conservation_info': {
                        'threats': species_info['threats'],
                        'last_seen_location': species_info['last_seen_location'],
                        'last_seen_date': species_info['last_seen_date']
                    },
                    'danger_status': self.assess_danger_level(species_info['conservation_status'])
                }
                
                return formatted_info
            else:
                return {'error': 'Species information not found in database'}
                
        except Exception as e:
            return {'error': f"Database error: {str(e)}"}
    
    def assess_danger_level(self, conservation_status):
        """Assess danger level based on conservation status"""
        danger_levels = {
            'Critically Endangered': {'level': 'CRITICAL', 'urgency': 'Immediate action required'},
            'Endangered': {'level': 'HIGH', 'urgency': 'Urgent conservation needed'},
            'Vulnerable': {'level': 'MODERATE', 'urgency': 'Conservation attention needed'},
            'Near Threatened': {'level': 'LOW', 'urgency': 'Monitor closely'},
            'Least Concern': {'level': 'MINIMAL', 'urgency': 'Stable population'},
            'Data Deficient': {'level': 'UNKNOWN', 'urgency': 'More research needed'}
        }
        
        return danger_levels.get(conservation_status, {'level': 'UNKNOWN', 'urgency': 'Status unclear'})
    
    def get_recent_sightings(self, species_name):
        """Get recent sighting locations (mock function - integrate with real APIs)"""
        # This would connect to GBIF, iNaturalist, or other biodiversity APIs
        return {
            'recent_sightings': [
                {'location': 'Kruger National Park', 'date': '2024-09-20', 'source': 'Camera trap'},
                {'location': 'Hwange National Park', 'date': '2024-09-15', 'source': 'Field observation'},
                {'location': 'Chobe National Park', 'date': '2024-09-10', 'source': 'Tourist photo'}
            ]
        }
    
    def complete_analysis(self, image_path):
        """Complete analysis combining prediction and species information"""
        # Get species prediction
        prediction_result = self.predict_species(image_path)
        
        if 'error' in prediction_result:
            return prediction_result
        
        species_name = prediction_result['species']
        
        # Get comprehensive species information
        species_info = self.get_species_info(species_name)
        recent_sightings = self.get_recent_sightings(species_name)
        
        # Combine all information
        complete_result = {
            'prediction': prediction_result,
            'species_information': species_info,
            'recent_sightings': recent_sightings,
            'analysis_timestamp': datetime.now().isoformat(),
            'risk_assessment': species_info.get('danger_status', {}),
            'conservation_priority': self.get_conservation_priority(species_info)
        }
        
        return complete_result
    
    def get_conservation_priority(self, species_info):
        """Calculate conservation priority score"""
        if 'danger_status' in species_info:
            level = species_info['danger_status']['level']
            priority_scores = {
                'CRITICAL': 10,
                'HIGH': 8,
                'MODERATE': 6,
                'LOW': 4,
                'MINIMAL': 2,
                'UNKNOWN': 5
            }
            return {
                'priority_score': priority_scores.get(level, 5),
                'priority_level': level,
                'recommendation': species_info['danger_status']['urgency']
            }
        return {'priority_score': 5, 'priority_level': 'UNKNOWN'}

# Usage
if __name__ == "__main__":
    if len(sys.argv) > 1:
        image_path = sys.argv[1]
        
        predictor = EnhancedSpeciesPredictor(
            "enhanced_species_classifier.h5",
            "species_database.db",
            "model_metadata.json"
        )
        
        result = predictor.complete_analysis(image_path)
        print(json.dumps(result, indent=2))
    else:
        print(json.dumps({"error": "No image path provided"}))
