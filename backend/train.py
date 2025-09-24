import tensorflow as tf
from tensorflow import keras
from tensorflow.keras import layers
import pathlib

# Path to dataset (go up one folder from src/ and into docs/)
dataset_path = pathlib.Path("../docs")

# Load dataset
train_dataset = keras.utils.image_dataset_from_directory(
    dataset_path,
    image_size=(180, 180),
    batch_size=32
)
# Print detected class names
class_names = train_dataset.class_names
print("✅ Classes found:", class_names)

# Normalize pixel values (0–255 → 0–1)
normalization_layer = layers.Rescaling(1./255)
train_dataset = train_dataset.map(lambda x, y: (normalization_layer(x), y))

# Build model
model = keras.Sequential([
    keras.Input(shape=(180, 180, 3)),
    layers.Conv2D(32, 3, activation='relu'),
    layers.MaxPooling2D(),
    layers.Conv2D(64, 3, activation='relu'),
    layers.MaxPooling2D(),
    layers.Flatten(),
    layers.Dense(128, activation='relu'),
    layers.Dense(len(class_names), activation='softmax')  # Output layer
])

# Compile model
model.compile(
    optimizer='adam',
    loss='sparse_categorical_crossentropy',
    metrics=['accuracy']
)

# Train model
print("🚀 Training started...")
model.fit(train_dataset, epochs=5)
print("✅ Training complete!")

# Save model
model.save("../species_classifier_model.h5")
print("💾 Model saved as species_classifier_model.h5")
