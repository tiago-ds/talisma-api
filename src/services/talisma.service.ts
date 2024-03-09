import { captureImage } from "../webcam/webcam.controller";
import fs from 'fs';

const newImagesPath = '/tmp'

export function captureDiceImage(imageName: string) {
    try {
        captureImage(imageName);
        fs.readFile(`${imageName}`, (err, data) => {
            if (err) {
              console.error('Error reading image:', err);
              return null;
            }
            return data;
        });
    } catch(err) {
        console.log(err)
    }
}
