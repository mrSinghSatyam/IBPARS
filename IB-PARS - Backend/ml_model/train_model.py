import pandas as pd
from sklearn.linear_model import LinearRegression
import joblib

# Sample data — You can connect to MongoDB later
data = {
    'hour': [1, 3, 5, 7, 10, 12, 14, 16, 18, 20],
    'outages': [0, 1, 1, 2, 2, 3, 4, 4, 5, 6],
    'riskScore': [10, 20, 25, 35, 40, 55, 70, 75, 85, 95]
}

df = pd.DataFrame(data)

# Train model
X = df[['hour', 'outages']]
y = df['riskScore']

model = LinearRegression()
model.fit(X, y)

# Save model
joblib.dump(model, 'risk_model.pkl')
print("✅ Model trained and saved as risk_model.pkl")
