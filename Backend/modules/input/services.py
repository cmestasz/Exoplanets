from fastapi import UploadFile
from .models import Action
import numpy as np
import cv2

async def process_input(file: UploadFile) -> str:
    file_bytes = await file.read()

    # Siempreeee que se trabaje con arreglos grandes, usen numpy
    np_array = np.frombuffer(file_bytes, np.uint8)
    img = cv2.imdecode(np_array, cv2.IMREAD_COLOR)

    cv2.imwrite("image.jpg", img)
    # aca se procesa la imagen

    action = Action.ZOOM_IN

    return action.value
