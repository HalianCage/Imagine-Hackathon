from flask import Flask, request, jsonify
import cv2
import numpy as np
import os

app = Flask(__name__)

def analyze_leaf_disease(image):
    image = cv2.imread(image)
    if image is None:
        raise ValueError("Image not found or invalid format")

    hsv = cv2.cvtColor(image, cv2.COLOR_BGR2HSV)

    # Leaf segmentation
    lower_green = np.array([25, 40, 40])
    upper_green = np.array([90, 255, 255])
    leaf_mask = cv2.inRange(hsv, lower_green, upper_green)

    kernel = np.ones((5, 5), np.uint8)
    leaf_mask = cv2.morphologyEx(leaf_mask, cv2.MORPH_CLOSE, kernel)
    leaf_mask = cv2.morphologyEx(leaf_mask, cv2.MORPH_OPEN, kernel)

    # Yellow regions
    lower_yellow = np.array([20, 100, 100])
    upper_yellow = np.array([35, 255, 255])
    yellow_mask = cv2.inRange(hsv, lower_yellow, upper_yellow)

    # Brown regions
    lower_brown = np.array([10, 50, 20])
    upper_brown = np.array([20, 255, 200])
    brown_mask = cv2.inRange(hsv, lower_brown, upper_brown)

    # Black regions
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    _, black_mask = cv2.threshold(gray, 40, 255, cv2.THRESH_BINARY_INV)

    # Combine masks
    combined_disease_mask = cv2.bitwise_or(yellow_mask, brown_mask)
    combined_disease_mask = cv2.bitwise_or(combined_disease_mask, black_mask)

    disease_in_leaf = cv2.bitwise_and(combined_disease_mask, combined_disease_mask, mask=leaf_mask)

    diseased_pixels = cv2.countNonZero(disease_in_leaf)
    leaf_pixels = cv2.countNonZero(leaf_mask)
    spread_percentage = (diseased_pixels / leaf_pixels) * 100 if leaf_pixels > 0 else 0

    return round(spread_percentage, 2)

@app.route('/spreadPercent', methods=['POST'])
def analyze():
    if 'image' not in request.files:
        return jsonify({'error': 'No image provided'}), 400

    image_file = request.files['image']
    if image_file.filename == '':
        return jsonify({'error': 'Empty filename'}), 400

    temp_path = f'temp_{image_file.filename}'
    image_file.save(temp_path)

    try:
        spread = analyze_leaf_disease(temp_path)
        os.remove(temp_path)
        return jsonify({'spread_percentage': spread})
    except Exception as e:
        if os.path.exists(temp_path):
            os.remove(temp_path)
        return jsonify({'error': str(e)}), 500


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001, debug=True)