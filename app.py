from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle as pk
import pandas as pd

app = Flask(__name__)
CORS(app)

model = pk.load(open('model.pkl', 'rb'))

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    
    input_df = pd.DataFrame([[
        data['name'], data['year'], data['km_driven'],
        data['fuel'], data['seller_type'], data['transmission'],
        data['owner'], data['mileage'], data['engine'],
        data['max_power'], data['seats']
    ]], columns=['name','year','km_driven','fuel','seller_type',
                 'transmission','owner','mileage','engine','max_power','seats'])
    
    prediction = model.predict(input_df)[0]
    return jsonify({'predicted_price': round(prediction, 2)})

if __name__ == '__main__':
    app.run(debug=True)