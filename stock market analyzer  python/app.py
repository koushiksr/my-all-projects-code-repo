from flask import Flask
import pandas as pd
from datetime import datetime

app = Flask(__name__)

# Read the CSV file into a DataFrame
# df = pd.read_csv('NIFTY50.csv')
df = pd.read_csv('NIFTY BANK_Historical_PR_15042023to15042024.csv')

# df['Date'] = pd.to_datetime(df['Date'], format='%d %b%y')
df['Date'] = pd.to_datetime(df['Date'], format='%d %b %Y')

df = df.sort_values(by='Date', ascending=False)
most_recent_close = df.iloc[0]['Close']
previous_close = df.iloc[1]['Close']
price_difference = most_recent_close - previous_close
negative_diff_df = df[df['Close'] < df['Open']]
average_negative_diff = negative_diff_df['Close'].mean()
percentage_change = ((most_recent_close-average_negative_diff) / most_recent_close) * 100
percentage_change = round(percentage_change, 2)
print("Recent Close:", most_recent_close)
print("Percentage average divided latest close :", percentage_change, "%")

if __name__ == "__main__":
    app.run(debug=True)
