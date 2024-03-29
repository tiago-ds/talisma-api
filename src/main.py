from flask import Flask, Response, request, jsonify
import os
from webcam.webcam_controlller import capture_image
from utils import detect_number
from flask_cors import CORS
from servo.servo import launchDice
from time import sleep


app = Flask(__name__)
CORS(app)

# Rota para obter a imagem da webcam
@app.route('/webcam', methods=['GET'])
def get_webcam_image():
    number = request.args.get('number')
    if number is None:
        return Response("O parâmetro 'number' é obrigatório.", status=400)
    launchDice(number)

    sleep(2)

    image_path = 'newImage.jpg'

    if os.path.exists(image_path):
        os.remove(image_path)
    
    capture_image(image_path)
    
    if os.path.exists(image_path):
        api_key = os.getenv("api_key")
        
        with open(image_path, 'rb') as image_file:
            image_content = image_file.read()

        result = detect_number(image_content, api_key)
        return jsonify({"result": result})
    else:
        return Response("Erro ao capturar a imagem da webcam.", status=500)

# Inicia o servidor
if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5001))
    app.run(host='0.0.0.0', port=port)
