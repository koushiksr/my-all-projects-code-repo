import os
import json
from flask import Flask, request, jsonify
from io import BytesIO
from langchain_community.document_loaders import PyPDFLoader
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_community.embeddings import HuggingFaceEmbeddings
from langchain_community.vectorstores import FAISS

app = Flask(__name__)

from dotenv import load_dotenv
load_dotenv()

def process_query_and_generate_response(query, pages):
    if not pages:
        return {"error": "No pages found."}

    try:
        content = "\n".join([x.page_content for x in pages])
        qa_prompt = "Use the following pieces of context to answer the user's question. If you don't know the answer, just say that you don't know, don't try to make up an answer.----------------"
        input_text = qa_prompt + "\nContext:" + content + "\nUser question:\n" + query
        llm = ChatGoogleGenerativeAI(model="gemini-pro")
        result = llm.invoke(input_text)
        result1 = result.content.replace('\n', '')
        cleaned_json = result1[7:-3]
        cleaned_json_dict = json.loads(cleaned_json)
        cleaned_data = {k.replace(' ', '_'): v.replace('\n', '') if isinstance(v, str) else v for k, v in cleaned_json_dict.items()}
        return cleaned_data
    except Exception as e:
        return {"error": "Failed to process query: " + str(e)}

os.environ["GOOGLE_API_KEY"]= os.getenv("API_KEY")

@app.route('/', methods=['POST', 'GET'])
def process_pdf_and_query():
    try:
        pdf_content = request.files.get('pdf')
        if not pdf_content:
            return "PDF content is missing."

        query = request.args.get('query', '')
        if not query:
            return "Query parameter is missing."

        pdf_bytes = pdf_content.read()
        pages = PyPDFLoader(BytesIO(pdf_bytes)).load_and_split()
        embeddings = HuggingFaceEmbeddings(model_name="all-MiniLM-L6-v2")
        db = FAISS.from_documents(pages, embeddings)
        response = process_query_and_generate_response(query, db)
        return jsonify(response)

    except Exception as e:
        return "Failed to process PDF and query: " + str(e)

if __name__ == '__main__':
    app.run(port=8000)
