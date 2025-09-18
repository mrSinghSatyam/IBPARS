from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    features = data.get('features')

    # Dummy logic for now
    risk_score = sum(features) / len(features) * 100

    return jsonify({'risk_score': round(risk_score, 2)})

if __name__ == '__main__':
    app.run(port=8000)