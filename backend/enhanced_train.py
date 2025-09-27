# backend/enhanced_train.py
import tensorflow as tf
from tensorflow import keras
from keras import layers
import pathlib
import json
import sqlite3
import pandas as pd

class SpeciesClassifierWithMetadata:
    def __init__(self, dataset_path, database_path):
        self.dataset_path = pathlib.Path(dataset_path)
        self.database_path = database_path
        self.model = None
        self.class_names = []
        
    def load_dataset(self):
        """Load and prepare image dataset"""
        # Load images
        train_dataset = keras.utils.image_dataset_from_directory(
            self.dataset_path,
            validation_split=0.2,
            subset="training",
            seed=123,
            image_size=(224, 224),
            batch_size=32
        )
        
        val_dataset = keras.utils.image_dataset_from_directory(
            self.dataset_path,
            validation_split=0.2,
            subset="validation",
            seed=123,
            image_size=(224, 224),
            batch_size=32
        )
        
        self.class_names = train_dataset.class_names
        print("Classes found:", self.class_names)
        
        return train_dataset, val_dataset
    
    def build_model(self):
        """Build enhanced model with transfer learning"""
        # Use pre-trained MobileNetV2 as base
        base_model = keras.applications.MobileNetV2(
            input_shape=(224, 224, 3),
            include_top=False,
            weights='imagenet'
        )
        base_model.trainable = False
        
        # Add classification layers
        self.model = keras.Sequential([
            base_model,
            layers.GlobalAveragePooling2D(),
            layers.Dropout(0.3),
            layers.Dense(256, activation='relu'),
            layers.Dropout(0.2),
            layers.Dense(len(self.class_names), activation='softmax', name='species_output')
        ])
        
        # Compile model
        self.model.compile(
            optimizer=keras.optimizers.Adam(learning_rate=0.001),
            loss='sparse_categorical_crossentropy',
            metrics=['accuracy']
        )
        
        return self.model
    
    def train_model(self, train_dataset, val_dataset, epochs=15):
        """Train the model with callbacks"""
        callbacks = [
            keras.callbacks.EarlyStopping(
                monitor='val_accuracy',
                patience=3,
                restore_best_weights=True
            ),
            keras.callbacks.ReduceLROnPlateau(
                monitor='val_loss',
                factor=0.2,
                patience=2,
                min_lr=0.0001
            )
        ]
        
        print("🚀 Training enhanced model...")
        history = self.model.fit(
            train_dataset,
            validation_data=val_dataset,
            epochs=epochs,
            callbacks=callbacks
        )
        
        return history
    
    def save_model_and_metadata(self):
        """Save model and class information"""
        # Save model
        self.model.save("enhanced_species_classifier.h5")
        
        # Save class names and metadata
        metadata = {
            'class_names': self.class_names,
            'model_version': '2.0',
            'trained_date': pd.Timestamp.now().isoformat(),
            'num_classes': len(self.class_names)
        }
        
        with open('model_metadata.json', 'w') as f:
            json.dump(metadata, f, indent=2)
        
        print("✅ Enhanced model and metadata saved!")

# Usage
if __name__ == "__main__":
    trainer = SpeciesClassifierWithMetadata("./docs", "species_database.db")
    
    # Load dataset
    train_ds, val_ds = trainer.load_dataset()
    
    # Build and train model
    model = trainer.build_model()
    history = trainer.train_model(train_ds, val_ds)
    
    # Save everything
    trainer.save_model_and_metadata()
