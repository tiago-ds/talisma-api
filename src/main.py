from flask import Flask, Response
import os
from webcam.webcam_controlller import capture_image

app = Flask(__name__)

# Rota para obter a imagem da webcam
@app.route('/webcam', methods=['GET'])
def get_webcam_image():
    image_data = capture_image('newImage.jpg')
    
    if image_data is not None:
        return Response(image_data, mimetype='image/jpeg')
    else:
        return Response("Erro ao capturar a imagem da webcam.", status=500)

# Inicia o servidor
if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5001))
    app.run(host='0.0.0.0', port=port)
