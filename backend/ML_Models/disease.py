from flask import Flask, request, jsonify
import onnxruntime as ort
from PIL import Image
import numpy as np
import io
import json
import os
import psycopg2
from datetime import datetime
from dotenv import load_dotenv

# Load environment variables from .env
load_dotenv()

app = Flask(__name__)

# Load the ONNX model
session = ort.InferenceSession("crop_disease_efficientnet.onnx")

# Load class labels from file
with open("class_names.json") as f:
    class_labels = json.load(f)

# Connect to PostgreSQL using env vars
def get_db_connection():
    return psycopg2.connect(
        dbname=os.getenv("DB_NAME"),
        user=os.getenv("DB_USER"),
        password=os.getenv("DB_PASSWORD"),
        host=os.getenv("DB_HOST"),
        port=os.getenv("DB_PORT")
    )

def preprocess_image(image_bytes):
    image = Image.open(io.BytesIO(image_bytes)).convert("RGB")
    image = image.resize((224, 224))
    img_array = np.array(image).astype(np.float32) / 255.0
    img_array = np.transpose(img_array, (2, 0, 1))
    mean = np.array([0.485, 0.456, 0.406]).reshape(3, 1, 1)
    std = np.array([0.229, 0.224, 0.225]).reshape(3, 1, 1)
    img_array = (img_array - mean) / std
    return np.expand_dims(img_array, axis=0).astype(np.float32)

@app.route('/disease', methods=['POST'])
def predict():
    if 'image' not in request.files:
        print("Error: No image file in request")
        return jsonify({'error': 'No image file in request'}), 400

    image_bytes = request.files['image'].read()
    input_tensor = preprocess_image(image_bytes)

    input_name = session.get_inputs()[0].name
    output = session.run(None, {input_name: input_tensor})
    prediction_idx = int(np.argmax(output[0]))
    prediction_label = class_labels[prediction_idx]

    try:
        conn = get_db_connection()
        cur = conn.cursor()
        cur.execute("""
            CREATE TABLE IF NOT EXISTS disease_records (
                id SERIAL PRIMARY KEY,
                user_id INT NOT NULL,
                disease_name VARCHAR(100) NOT NULL,
                time_stamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        """)
        cur.execute(
            "INSERT INTO disease_records (user_id, disease_name) VALUES (%s, %s)",
            (1, prediction_label)
        )
        conn.commit()
        cur.close()
        conn.close()

    except Exception as e:
        print(f"Database error: {e}")

    # Optional JSON logging
    file_path = "diseases.json"
    disease_data = {"disease": prediction_label}
    existing_data = []
    if os.path.exists(file_path):
        with open(file_path, "r") as f:
            existing_data = json.load(f)
    existing_data.append(disease_data)
    with open(file_path, "w") as f:
        json.dump(existing_data, f, indent=4)

    return jsonify({'prediction': prediction_label})

if __name__ == '__main__':
    app.run(debug=True)
