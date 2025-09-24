import tensorflow as tf
from tensorflow import keras
from tensorflow.keras import layers
import pathlib
dataset_path = pathlib.Path("docs")

# Path to dataset
dataset_path = pathlib.Path("docs")

# Load dataset
train_dataset = keras.utils.image_dataset_from_directory(
    dataset_path,
    image_size=(180, 180),
    batch_size=32
)

# Normalize pixel values
normalization_layer = layers.Rescaling(1./255)
train_dataset = train_dataset.map(lambda x, y: (normalization_layer(x), y))

# Build model
model = keras.Sequential([
    layers.Conv2D(32, 3, activation='relu', input_shape=(180, 180, 3)),
    layers.MaxPooling2D(),
    layers.Conv2D(64, 3, activation='relu'),
    layers.MaxPooling2D(),
    layers.Flatten(),
    layers.Dense(128, activation='relu'),
    layers.Dense(len(train_dataset.class_names), activation='softmax')
])

# Compile model
model.compile(optimizer='adam',
              loss='sparse_categorical_crossentropy',
              metrics=['accuracy'])

# Train
model.fit(train_dataset, epochs=5)

# Save model
model.save("species_classifier_model.h5")

print("✅ Training complete. Model saved as species_classifier_model.h5")
