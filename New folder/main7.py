from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/process_string', methods=['POST'])
def process_string():
    try:
        data = request.json
        print("Received input string:", data['input_string'])
        if 'input_string' not in data:
            return jsonify({"error": "Input string not provided."}), 400
        
        input_string = data['input_string']
        # Perform any processing on the input string here
        processed_string = input_string.upper()  # For example, converting to uppercase
        
        return jsonify({"processed_string": processed_string}), 200
    except Exception as e:
        return jsonify({"error": "Failed to process string: " + str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=8000)
