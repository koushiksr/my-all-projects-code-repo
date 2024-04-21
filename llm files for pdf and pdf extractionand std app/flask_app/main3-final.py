from flask import Flask, request, jsonify
import os
import pickle
from langchain_google_genai import ChatGoogleGenerativeAI

app = Flask(__name__)

def process_query_and_generate_response(query, db):
    docs = db.similarity_search(query)
    content = "\n".join([x.page_content for x in docs])
    qa_prompt = "Use the following pieces of context to answer the user's question. If you don't know the answer, just say that you don't know, don't try to make up an answer.----------------"
    input_text = qa_prompt + "\nContext:" + content + "\nUser question:\n" + query
    llm = ChatGoogleGenerativeAI(model="gemini-pro")
    result = llm.invoke(input_text)
    result1=result.content.replace('\n', '')
    cleaned_json = result1[7:-3]
    import json
    cleaned_json_dict = json.loads(cleaned_json)
    cleaned_data = {k.replace(' ', '_'): v.replace('\n', '') if isinstance(v, str) else v for k, v in cleaned_json_dict.items()}
    return cleaned_data

os.environ["GOOGLE_API_KEY"]= "AIzaSyDbqUJwrU4txlAWOKr9QN_-dqLgtpB1VUQ"
@app.route('/', methods=['GET'])
def process_query():
    try:
        query = request.args.get('query')
        print(query)
        if not query:
            return jsonify({"error": "Query parameter is missing."})
        
        db_filename = "db.pkl"
        if os.path.exists(db_filename):
            with open(db_filename, "rb") as f:
                db = pickle.load(f)
        else:
            db = None
        
        response = process_query_and_generate_response(query, db)
        return response
    except Exception as e:
        return jsonify({"error": "Failed to process query: " + str(e)})

if __name__ == '__main__':
    app.run(debug=True, port=8000)
#final