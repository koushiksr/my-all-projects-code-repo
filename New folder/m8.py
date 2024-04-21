import os
import pickle
from flask import Flask, request, jsonify
from langchain_google_genai import ChatGoogleGenerativeAI

app = Flask(__name__)

# Load the database file
db_filename = "db.pkl"
if os.path.exists(db_filename):
    with open(db_filename, "rb") as f:
        db = pickle.load(f)
else:
    db = None

os.environ["GOOGLE_API_KEY"] = "AIzaSyDbqUJwrU4txlAWOKr9QN_-dqLgtpB1VUQ"

@app.route('/process_string', methods=['POST'])
def process_string():
    try:
        data = request.json
        input_string = data.get('input_string', '')  # Get the input string from JSON data
        print(data,'data')
        if not input_string:
            return jsonify({"error": "Input string is missing."})

        if db is None:
            return jsonify({"error": "Database not found."})

        # Process the query and generate response
        llm = ChatGoogleGenerativeAI(model="gemini-pro")
        result = llm.invoke("Use the following pieces of context to answer the user's question. If you don't know the answer, just say that you don't know, don't try to make up an answer.----------------\nUser question:\n" + input_string)
        response = result.content.strip()
        
        print("Response:", response)
        return jsonify({"response": response})
    except Exception as e:
        print("Error:", e)
        return jsonify({"error": "Failed to process query: " + str(e)})

if __name__ == '__main__':
    app.run(debug=True, port=8000)
