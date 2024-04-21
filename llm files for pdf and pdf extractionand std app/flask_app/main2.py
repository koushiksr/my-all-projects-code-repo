from flask import Flask, request, jsonify
import os
import re
import json
import pickle
from langchain_community.vectorstores import FAISS
from langchain_community.document_loaders import PyPDFLoader
from langchain_community.embeddings import HuggingFaceEmbeddings
from langchain_google_genai import ChatGoogleGenerativeAI

app = Flask(__name__)

# Load database
db_filename = "db.pkl"
try:
    if os.path.exists(db_filename):
        with open(db_filename, "rb") as f:
            db = pickle.load(f)
except Exception as e:
    print("Failed to load database:", e)
    db = None

# Function to process query and generate response
def process_query_and_generate_response(query, db):
    try:
        if db is not None:
            docs = db.similarity_search(query)
            content = "\n".join([x.page_content for x in docs])
            qa_prompt = "Use the following pieces of context to answer the user's question. If you don't know the answer, just say that you don't know, don't try to make up an answer.----------------"
            input_text = qa_prompt + "\nContext:" + content + "\nUser question:\n" + query
            llm = ChatGoogleGenerativeAI(model="gemini-pro", google_api_key="AIzaSyDbqUJwrU4txlAWOKr9QN_-dqLgtpB1VUQ")

            result = llm.invoke(input_text)
            return result.content
        else:
            return "Database not available."
    except Exception as e:
        return "Error processing query: " + str(e)

@app.route('/', methods=['GET'])
def process_query():
    try:
        query = "i need  all data as feilds and values as a json format "  # request.args.get('query')
        response = process_query_and_generate_response(query, db)
        data = response.strip().strip('`')
        data1 = data.replace('\n', ' ')
        pattern = re.compile(r'{.*?}', re.DOTALL)
        matches = re.findall(pattern, data1)
        if matches:
            finaldata = matches[0]
            data_dict = json.loads(finaldata)
            modified_dict = {key.replace(" ", "_"): value for key, value in data_dict.items()}
            json_data = json.dumps(modified_dict, indent=2)
            return json_data
        else:
            print("No JSON data found in HTML")
            return jsonify({"error": "No JSON data found in HTML"})
    except Exception as e:
        return jsonify({"error": "Failed to process query: " + str(e)})

if __name__ == '__main__':
    app.run(debug=True, port=8000)
