import openai
import base64
import os
from dotenv import load_dotenv

load_dotenv()



def encode_image(image_content):
    return base64.b64encode(image_content).decode('utf-8')

def detect_number(image_content, api_key):
    base64_image =  encode_image(image_content)
    
    openai.api_key = api_key
    client = openai.OpenAI(api_key=api_key)

    response = client.chat.completions.create(
      model="gpt-4-vision-preview",
      messages=[
        {
          "role": "user",
          "content": [
            {"type": "text", "text": "Qual o número que está virado para cima? Diga apenas o número e nada mais, em algarismos."},
            {
              "type": "image_url",
              "image_url": {
                "url": f"data:image/jpeg;base64,{base64_image}",
              },
            },
          ],
        }
      ],
      max_tokens=300,
    )

    numero_detectado = response.choices[0].message.content
    if numero_detectado.isdigit() and 1 <= int(numero_detectado) <= 6:
        return numero_detectado
    else:
        return "Não foi possível reconhecer o número ou a imagem não representa um dado."
