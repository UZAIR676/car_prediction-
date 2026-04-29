 🚗 Car Price Prediction — ML + Full Stack Web App

A machine learning web application that predicts used car prices based on vehicle specifications.

## 🔧 Tech Stack
- **ML Model**: Random Forest Regressor (92% R² accuracy)
- **Backend**: Python, Flask, Scikit-learn, Pandas
- **Frontend**: React.js + Vite
- **Data**: 8,000+ used car listings (Indian market)

## ✨ Features
- Predict used car price based on brand, year, fuel type, transmission, mileage, engine specs and more
- Clean modern UI with dark/light mode toggle
- Price displayed in USD and INR
- REST API backend with Flask

## 📊 Model Details
- Algorithm: Random Forest Regressor
- Training Data: 6,700+ cleaned records
- Accuracy: 82% R² Score
- Features: Brand, Year, KM Driven, Fuel Type, Transmission, Owner, Mileage, Engine, Max Power, Seats

## 🚀 How to Run

### Backend
cd "car price prediction"
pip install flask flask-cors scikit-learn pandas
python app.py

### Frontend
cd car-frontend
npm install
npm run dev

Open http://localhost:5173
