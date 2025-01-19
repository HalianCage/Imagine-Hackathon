from flask import Flask, request, jsonify
import joblib
# from PIL import Image
# import io

app = Flask(__name__)

# Load the .pkl model
model = joblib.load('ML1.pkl')  # Load your .pkl model file

@app.route('/disease', methods=['POST'])
def predict():
    if 'image' not in request.files:
        return jsonify({'error': 'No image file in request'}), 400

    image_file = request.files['image']
    # image_bytes = image_file.read()  # Get raw image bytes

    # # Convert image to PIL format (model may expect a specific format, e.g., PIL, numpy array, etc.)
    # image = Image.open(io.BytesIO(image_bytes))

    # Make the prediction using the model (you can adjust this based on the model input)
    prediction = model.predict([image_file])  # Assuming the model accepts a list of images

    # Return the prediction result as a string
    return jsonify({'prediction': str(prediction[0])})

if __name__ == '__main__':
    app.run(debug=True)
