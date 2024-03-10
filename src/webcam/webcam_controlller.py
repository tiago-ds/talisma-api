import cv2

# Caminho do dispositivo de vídeo
device = 0

# Largura e altura da imagem capturada
width = 300
height = 300

# Configurações da captura
capture = cv2.VideoCapture(device)
capture.set(cv2.CAP_PROP_FRAME_WIDTH, width)
capture.set(cv2.CAP_PROP_FRAME_HEIGHT, height)

# Função para capturar a imagem
def capture_image(image_name):
    ret, frame = capture.read()
    if ret:
        cv2.imwrite(image_name, frame)
        print("Imagem capturada com sucesso!")
    else:
        print("Erro ao capturar imagem.")
