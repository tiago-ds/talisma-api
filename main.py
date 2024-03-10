import os
from flask import Flask, request, jsonify
from utils import detect_number

app = Flask(__name__)

@app.route('/detect_number', methods=['POST'])
def detect_number_api():
    api_key = os.getenv("api_key")
    image_content = request.files['image'].read()

    result = detect_number(image_content, api_key)
    return jsonify({"result": result})

if __name__ == '__main__':
    app.run(debug=True)
