from flask import Flask, request, jsonify
import os
import pickle
from langchain_community.vectorstores import FAISS
from langchain_community.document_loaders import PyPDFLoader
from langchain_community.embeddings import HuggingFaceEmbeddings
from langchain_google_genai import ChatGoogleGenerativeAI

app = Flask(__name__)

# Load database
db_filename = "db.pkl"
if os.path.exists(db_filename):
    with open(db_filename, "rb") as f:
        db = pickle.load(f)

# Function to process query and generate response
def process_query_and_generate_response(query, db):
    docs = db.similarity_search(query)
    content = "\n".join([x.page_content for x in docs])
    qa_prompt = "Use the following pieces of context to answer the user's question. If you don't know the answer, just say that you don't know, don't try to make up an answer.----------------"
    input_text = qa_prompt + "\nContext:" + content + "\nUser question:\n" + query
    llm = ChatGoogleGenerativeAI(model="gemini-pro", google_api_key="AIzaSyDbqUJwrU4txlAWOKr9QN_-dqLgtpB1VUQ")

    result = llm.invoke(input_text)
    return result.content

@app.route('/', methods=['GET'])
def process_query():
    query = request.args.get('query')
    response = process_query_and_generate_response(query, db)
    data = response.strip().strip('`')
    return data.replace('\n', ' ')

if __name__ == '__main__':
    app.run(debug=True, port=8000)