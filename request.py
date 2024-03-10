import requests
from utils import encode_image

# Caminho da imagem que você deseja enviar
image_path = 'dados.jpeg'

# URL do endpoint
url = 'http://127.0.0.1:5000/detect_number'

with open(image_path, 'rb') as image_file:
    image_content = image_file.read()


# Enviar a requisição POST com a imagem
response = requests.post(url, files={'image': image_content})

# Verificar a resposta
if response.status_code == 200:
    result = response.json()['result']
    print(result)
else:
    print("Erro ao enviar a imagem. Código de status:", response.status_code)
