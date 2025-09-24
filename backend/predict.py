import tensorflow as tf
from tensorflow import keras
import numpy as np
from PIL import Image

# Load model
model = keras.models.load_model("species_classifier_model.h5")

# Load image
img = Image.open("test.jpg").resize((180, 180))
img_array = np.array(img) / 255.0
img_array = np.expand_dims(img_array, axis=0)

# Predict
predictions = model.predict(img_array)
class_index = np.argmax(predictions)
print("Predicted class:", class_index)
