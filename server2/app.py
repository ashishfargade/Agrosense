import pickle
from flask import Flask, request, jsonify
import numpy as np
from flask_cors import CORS

# http://127.0.0.1:5000
app = Flask(__name__)
# CORS(app, origins=["http://localhost:5173, http://localhost:3000"])
CORS(app)

crop_to_int = {
    'Barley': 0,
    'Cotton': 1,
    'Ground Nuts': 2,
    'Maize': 3,
    'Millets': 4,
    'Oil seeds': 5,
    'Paddy': 6,
    'Pulses': 7,
    'Sugarcane': 8,
    'Tobacco': 9,
    'Wheat': 10
}

soil_to_int = {'Black': 0, 'Clayey': 1, 'Loamy': 2, 'Red': 3, 'Sandy': 4}

int_to_fert = {0: '10-26-26', 1: '14-35-14', 2: '17-17-17', 3: '20-20', 4: '28-28', 5: 'DAP', 6: 'Urea'}

def encode_soil(soil_type):
    return soil_to_int.get(soil_type, None)

def encode_crop(crop_name):
    return crop_to_int.get(crop_name, None)

def decode_fert(fert_no):
    return int_to_fert.get(fert_no, None)


with open('model/xgb_pipeline.pkl', 'rb') as f:
    model = pickle.load(f)

@app.route('/predict/xgb', methods = ['POST'])
def predict():
    try:
        data = request.json.get('input_data')
        if not data:
            return jsonify({'error': 'No input data'}), 400
        
        # data = [label_encoder.transform([feature])[0] if isinstance(feature, str) else feature for feature in data]
        # print(data[3])
        # print(data[4])
    
        soil_type = data[3]
        encoded_soil_value = encode_soil(soil_type)
        data[3] = encoded_soil_value

        crop_name = data[4]
        encoded_crop_value = encode_crop(crop_name)
        data[4] = encoded_crop_value
        
        prediction = model.predict([data])[0]
        
        prediction = int(prediction) if isinstance(prediction, np.integer) else prediction
        
        fert_name = decode_fert(prediction)

        return jsonify({'prediction': fert_name})
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
if __name__ == '__main__':
    app.run(debug=True)