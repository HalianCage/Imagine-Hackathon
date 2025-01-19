from flask import Flask, request, jsonify
import joblib
import numpy as np

app = Flask(__name__)

# Load the trained model (make sure the file is in the correct location)
model = joblib.load('fine_tuned_crop_milestone_model.pkl')

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json(force=True)  # Get input data as JSON

        # Ensure the input is a list or array and convert it to numpy array
        input_data = np.array(data['input']).reshape(1, -1)  # Convert to numpy array for prediction

        print("Received input data:", input_data)

        # Make the prediction using the model
        prediction = model.predict(input_data)

        # Return the prediction as JSON
        return jsonify({'prediction': int(prediction[0])})

    except Exception as e:
        # Handle any errors that occur during processing
        print("Error:", str(e))
        return jsonify({'error': 'Error processing the data'}), 500

if __name__ == '__main__':
    app.run(port=5000)
