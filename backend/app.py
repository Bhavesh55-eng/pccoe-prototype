# backend/app.py - Complete Flask API Server
from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import os
import sys
import json
import tempfile
import sqlite3
from werkzeug.utils import secure_filename
import tensorflow as tf
from tensorflow import keras
import numpy as np
from PIL import Image
from datetime import datetime

app = Flask(__name__)
CORS(app, origins=["http://localhost:3000"])  # Allow React frontend

# Configuration
UPLOAD_FOLDER = 'uploads'
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif', 'bmp', 'webp'}
MAX_CONTENT_LENGTH = 16 * 1024 * 1024  # 16MB max file size

app.config['MAX_CONTENT_LENGTH'] = MAX_CONTENT_LENGTH

# Create upload directory if it doesn't exist
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

class EnhancedSpeciesPredictor:
    def __init__(self, model_path, database_path, metadata_path):
        try:
            # Load the trained model
            if os.path.exists(model_path):
                self.model = keras.models.load_model(model_path)
                print(f"✅ Model loaded successfully from {model_path}")
            else:
                # Fallback to basic model if enhanced model doesn't exist
                basic_model_path = "species_classifier_model.h5"
                if os.path.exists(basic_model_path):
                    self.model = keras.models.load_model(basic_model_path)
                    print(f"✅ Fallback model loaded from {basic_model_path}")
                else:
                    print("❌ No model file found!")
                    self.model = None
            
            self.database_path = database_path
            
            # Load metadata or use default class names
            if os.path.exists(metadata_path):
                with open(metadata_path, 'r') as f:
                    self.metadata = json.load(f)
                    self.class_names = self.met
